const { pool } = require('../../../config/db')

class ProductController
{
    /*
     * 1. Show all products
    */
    // [GET] /product
    async getAllProducts(req, res, next)
    {
        try {
            const query = `
                SELECT * FROM products`
            const result = await pool.query(query)

            res.status(200).json({
                products: result.rows
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Get a product
    */
    // [GET] /product/edit/:id
    async getAProduct(req, res, next)
    {
        try {        
            const productId = req.params.id;

            const query = `
                SELECT * FROM products WHERE id = $1
            `;

            const result = await pool.query(query, [productId]);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: "No Product found!"
                });
            }

            res.status(200).json({
                products: result.rows[0]
            });
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Get all products registered by user
    */
    // [GET] /product/productregistered
    async getAllProductsRegistered(req, res, next) {
        try {
            const query = `
                SELECT id, cart, name, username
                FROM users
            `
            const result = await pool.query(query)
    
            res.status(200).json({
                users: result.rows
            })
        } catch (error) {
            next(error)
        }
    }    

    /*
     * 3. Add a Product
    */
    // [POST] /product/add
    async postAProduct(req, res, next) {
        try {
            const { name, description, price, photo } = req.body
            const query = `
                INSERT INTO Products (name, description, price, photo)
                VALUES ($1, $2, $3, $4)
            `
            await pool.query(query, [name, description, price, photo])
    
            res.status(201).json({
                message: "Product added successfully!"
            })
        } catch (error) {
            next(error)
        }
    }    

    /*
     * 4. Edit a Product
    */
    // [PUT] /product/edit/:id
    async putAProduct(req, res, next) {
        try {
            const { name, type, description, price, duration, photo } = req.body;
            const productId = req.params.id;

            // Start a transaction
            const client = await pool.connect();
            
            try {
                await client.query('BEGIN');

                // Update Product_info
                const ProductInfoQuery = `
                    UPDATE products
                    SET name = $1, description = $2, photo = $3
                    WHERE id = $4
                `;
                await client.query(ProductInfoQuery, [name, description, photo, productId]);

                // Commit the transaction
                await client.query('COMMIT');

                res.status(200).json({
                    message: "Product updated successfully!"
                });
            } catch (error) {
                // Rollback the transaction in case of an error
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            next(error)
        }
    }    

    /*
     * 5. Delete a Product
    */
    // [DELETE] /product/:id
    async deleteAProduct(req, res, next) {
        const productId = req.params.id;

        try {
            // Start a transaction
            const client = await pool.connect();
            
            try {
                await client.query('BEGIN');

                // Delete from r2s_Product (if this is a separate table)
                const r2sProductDeleteQuery = `
                    DELETE FROM products
                    WHERE id = $1
                `;
                await client.query(r2sProductDeleteQuery, [productId]);

                // Commit the transaction
                await client.query('COMMIT');

                res.status(200).json({
                    message: "Product deleted successfully!"
                });
            } catch (error) {
                // Rollback the transaction in case of an error
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController