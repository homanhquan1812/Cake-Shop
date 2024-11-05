import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'

const ProductDetails = () => {
    const { id } = useParams()
    const [productsId, setProductsId] = useState([])
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [cart, setCart] = useState({
      items: [],
      totalPrice: 0
    })
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const navigateTo = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    const isJwtExpired = (token) => {
      if (!token) return true
      const parts = token.split('.')
      if (parts.length !== 3) return true
      try {
          const payload = JSON.parse(atob(parts[1]))
          if (!payload.exp) return false
          const currentTime = Math.floor(Date.now() / 1000)
          return payload.exp < currentTime
      } catch (error) {
          console.error('Error decoding token:', error)
          return true
      }
    }

    const handleAddProduct = () => {
      navigateTo('/products')
    }

    const loginDirect = () => {
      navigateTo('/login')
    }

    const addproducts = async() => {
      try {
        const token = localStorage.getItem('token')

        let decodedToken

        if (token) {
            decodedToken = jwtDecode(token)

            setUserId(decodedToken.id)
        }

        const response = await axios.post(`http://localhost:5000/updateinfo/addproducts`, {
          id: decodedToken.id,
          name: productsId.name,
          price: productsId.price,
          photo: productsId.photo,
          productId: productsId.id
        })

        if (response.status == 201) {
          console.log('products added to cart successfully.')
          navigateTo('/cart')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const fetchProductsAPI = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/edit/${id}`)

        if (response.status == 200) {
          console.log('Data fetched successfully.')
          const data = await response.json()
          setProductsId(data.products)
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    }

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      if (token && !isJwtExpired(token)) {
          setIsLoggedIn(true)
      } else {
          setIsLoggedIn(false)
          localStorage.removeItem('token')
      }
    }

    useEffect(() => {
      fetchProductsAPI()
      checkLoginStatus()
    
        // Fetch data every 2 seconds
        const intervalId = setInterval(() => {
          fetchProductsAPI()
          checkLoginStatus()
        }, 2000)
    
        return () => clearInterval(intervalId)
      }, [])

  return (
    <div>
        <Heads
        additionalStylesheets={[
          "/css/bootstrap.min.css",
          "/css/site.css",
          "/css/style.css"
        ]}
        additionalTitle={[
          "Chi tiết sản phẩm"
        ]}></Heads>
        <Headers></Headers>
        <div class="container">
            <main role="main" class="pb-3">
              <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Other products</button>
            </main>
        </div>
        <div className="text-center" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {
            productsId && (
                <div className="col-sm-6 col-lg-9">
                      <div className="card" style={{marginTop: '16px'}}>
                        <div className="card-body">
                        <h1 className="card-title">{productsId.name}</h1>
                        <br></br>
                        <img style={{width: '300px'}} className="card-img-top" src={productsId.photo} />
                        <br></br>
                        <br></br>
                        <br></br>
                          <p className="card-text">{productsId.description}</p>
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gridTemplateRows: 'repeat(2, auto)',
                            gap: '10px'
                            }}>
                            {
                              isLoggedIn ? (
                                <button type='button' onClick={addproducts} className="btn btn-danger">Buy now</button>
                              ) : (
                                <button type='button' onClick={loginDirect} className="btn btn-danger">Buy now</button>
                              )
                            }
                            <a href="#" className="btn btn-warning">{productsId.price} VND</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>   
            )
        }
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footers></Footers>
    </div>
  )
}

export default ProductDetails