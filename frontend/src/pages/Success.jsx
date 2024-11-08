import React, { useEffect, useState } from 'react'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigateTo = useNavigate()

  const coursesDirect = () => {
    navigateTo('/products')
  }

  const homeDirect = () => {
    navigateTo('/home')
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
        "Thành công - R2Sshop"
      ]}></Heads>
        <Headers></Headers>
      <div className="success_detail">
          <h2>Ordered successfully!</h2>
          <i className="fa-solid fa-check" />
          <h3>We have received your orders.</h3>
          <h3>Please keep in touch!</h3>
      </div>
      <div className="success_button">
          <button className="button-pink " onClick={coursesDirect}>Continue buying</button>
          <button className="button-pink " onClick={homeDirect}>Homepage</button>
      </div>
      <Footers></Footers>
        <a href="#" className="backtotop cd-top text-replace js-cd-top">
            <i className="fa fa-angle-up" />
        </a>
    </div>
  )
}

export default Success