import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'

const EditProducts = () => {
  const { id } = useParams()
const [productsData, setproductsData] = useState(null)
const [name, setName] = useState('')
const [type, setType] = useState('')
const [price, setPrice] = useState('')
const [description, setDescription] = useState('')
const [duration, setDuration] = useState('')
const [photo, setPhoto] = useState('')
const navigateTo = useNavigate()

useEffect(() => {
  const fetchproductsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/edit/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch data!')
      }
      
      const data = await response.json()
      setproductsData(data.products)
      setName(data.products.name || '')
      setPrice(data.products.price || '')
      setDescription(data.products.description || '')
      setPhoto(data.products.photo || '')
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  fetchproductsData()
}, [id])

const submit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.put(`http://localhost:5000/products/edit/${id}`, {
      name, description, type, price, duration, photo
    })
    if (response.status === 200) {
      console.log('Updated products successfully!', response.data)
      navigateTo('/products')
    }
  } catch (error) {
    console.error("Error: ", error)
  }
}

  const deleteProduct = async (id, e) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`http://localhost:5000/products/edit/${id}`)
      
      if (response.status == 200) {
        navigateTo('/products')
        console.log('products deleted successfully.')
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div>
      <Heads
      additionalStylesheets={[
        "/css/bootstrap.min.css",
        "/css/site.css",
        "/css/style.css"
      ]}
      additionalTitle={[
        "Product adjustments"
      ]} />
      <Headers />
      <div className="container">
        <main role="main" className="pb-3">
          <div>
            <br />
            <h2>Product adjustments:</h2>
            <br></br>
            {
              productsData && (
                <div>
                  <form onSubmit={submit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="name" defaultValue={productsData.name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Description</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="description" defaultValue={productsData.description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Price</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="price" defaultValue={productsData.price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Image Link</label>
                <div className="col-sm-6">
                  <input type="text" className="form-control" name="photo" defaultValue={productsData.photo} onChange={(e) => setPhoto(e.target.value)} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="offset-sm-3 col-sm-2 d-grid">
                  <button type="submit" className="btn btn-primary">Update now</button>
                </div>
                <div className="col-sm-2 d-grid">
                  <a className="btn btn-danger" onClick={(e) => deleteProduct(productsData.id, e)} role="button">Delete now</a>
                </div>
                <div className="col-sm-2 d-grid">
                  <a className="btn btn-outline-primary" href="/products" role="button">Leave</a>
                </div>
              </div>
            </form>
                </div>
              )
            }
          </div>
        </main>
      </div>
      <Footers />
    </div>
  )
}

export default EditProducts
