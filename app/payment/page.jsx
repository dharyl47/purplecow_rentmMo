import React from 'react'

// import Navbar from '@/components/common/NavBar'
import NavBarMain from "@/components/common/NavBarMain/NavBar";
import PaymentForm from '@/components/payment/PaymentForm'

const Payment = () => {
  return (
    <div>
        <div className="bg-black">
            {/* <NavBarMain /> */}
            <NavbarMain />
        </div>
        
        <PaymentForm />
    </div>
  )
}

export default Payment