import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'

const Transactions = () => {
  const { id } = useParams()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = jwtDecode(token)

      setRole(decodedToken.role)
      setUserId(decodedToken.id)
      setName(decodedToken.name)
      setPhoneNumber(decodedToken.phonenumber)
      setEmail(decodedToken.email)
      setUsername(decodedToken.username)
    }

    if (role === 'Admin') {
      // For Admin's transactions
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/order')
  
          if (response.status === 200) {
            const data = await response.json()
            setOrders(data.orders)
            console.log('Got all orders successfully.')
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData()

      const intervalId = setInterval(() => {
        fetchData()
      }, 6000) // 60 seconds
  
      return () => clearInterval(intervalId)
    } else {
      // For specific user's transactions
      const fetchData2 = async () => {
        try {
          const response = await fetch('http://localhost:5000/order')
          if (response.status === 200) {
            const data = await response.json()
            const userOrders = data.orders.filter(order => order.user_id === userId)
            setUserOrders(userOrders)
            console.log("Got user's orders successfully.")
          }
        } catch (error) {
          console.error(error)
        }
      }

      fetchData2()

      const intervalId = setInterval(() => {
        fetchData2()
      }, 6000) // 60 seconds
  
      return () => clearInterval(intervalId)
    }
  }, [userId])

  return (
    <div>
      <Heads
      additionalStylesheets={[
        "/css/bootstrap.min.css",
        "/css/site.css",
        "/css/style.css"
      ]}
      additionalTitle={[
        "Lịch sử mua hàng - R2Sshop"
      ]}></Heads>
      <Headers></Headers>
      <div class="container">
        <main role="main" class="pb-3">
          <div>
            <br></br>
            {
              role == 'User' ? (
                <>
                <h2>History:</h2>
                  <div id="container" style={{marginTop: '50px'}}>
                    <div className="printing-history-box">
                    <div className="table-container">
                        <table className="content-table">
                        <thead>
                            <tr>
                            <th>Ordering date</th>
                            <th>Products + Quantity</th>
                            <th>Total price</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            userOrders.map((order, index) => (
                              (order.cart.items.length > 0) ? (
                                <tr key={index}>
                                <td>{order.created_at}</td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '20px', marginBottom: '20px'}}>
                                      {item.name} x {item.quantity}
                                    </div>
                                  ))
                                }
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                  {order.status ? (
                                    <button type="button" className="btn btn-success">Success</button>
                                  ) : (
                                    <button type="button" className="btn btn-danger">Failure</button>
                                  )}
                                </td>
                              </tr>
                              ) : (
                                <td colSpan={4}>No orders yet.</td>
                              )
                            ))
                          }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </>
              ) : (
                <>
                <h2>All orders:</h2>
                <div id="container" style={{marginTop: '50px'}}>
                    <div className="printing-history-box">
                    <div className="table-container">
                        <table className="content-table">
                        <thead>
                            <tr>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Ordering date</th>
                            <th>Product + Quantity</th>
                            <th>Total price</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            orders.map((order, index) => (
                              (order.cart.items.length > 0) && (
                                <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.created_at}</td>
                                {
                                  order.cart.items.map((item, index) => (
                                    <div key={index} style={{marginTop: '20px', marginBottom: '20px'}}>
                                      {item.name} x {item.quantity}
                                    </div>
                                  ))
                                }
                                <td>{order.cart.totalPrice}</td>
                                <td>
                                  {order.status ? (
                                    <button type="button" className="btn btn-success">Success</button>
                                  ) : (
                                    <button type="button" className="btn btn-danger">Failure</button>
                                  )}
                                </td>
                              </tr>
                              )
                            ))
                          }
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </>
              )
            }
          </div>
        </main>
      </div>
      <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footers></Footers>
    </div>
  )
}

export default Transactions