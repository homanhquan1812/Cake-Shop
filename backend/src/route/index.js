require('dotenv').config()

const loginRouter = require('./login')
const registerRouter = require('./register')
const productRouter = require('./product')
const updateInfoRouter = require('./updateinfo')
const orderRouter = require('./order')

function route(app) {
    app.use('/products', productRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use(`/updateinfo`, updateInfoRouter)
    app.use('/order', orderRouter)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route