import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'

const AddProducts = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();

    try {
      const number_of_students = 0
      const response = await axios.post('http://localhost:5000/products/add', {
        name, description, price, photo
      })

      if (response.status == 201) {
        console.log('Added a new course successfully!')
        alert('Added a new course successfully!')
        navigate('/products')
      }
    } catch (error) {
      console.error("Error adding a new course:", error)
    }
  }

  return (
    <div>
      <Heads additionalStylesheets={[
        "/css/bootstrap.min.css",
        "/css/site.css",
        "/css/style.css"
      ]}
      additionalTitle={[
        "Add a new product"
      ]}/>
      <Headers />
      <div className="container">
        <main role="main" className="pb-3">
          <br />
          <h2>New product:</h2>
          <br />
          <form method="POST" onSubmit={submit}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Price</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Image Link</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="photo" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="offset-sm-3 col-sm-3 d-grid">
                <button type="submit" className="btn btn-primary">Create now</button>
              </div>
              <div className="col-sm-3 d-grid">
                <a className="btn btn-outline-primary" href="/courses" role="button">Leave</a>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footers />
    </div>
  )
}

export default AddProducts