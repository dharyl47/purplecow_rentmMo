import React from 'react'

import Navbar from '@/components/common/NavBar'
import PaymentForm from '@/components/payment/PaymentForm'

const Payment = () => {
  return (
    <div>
        <div className="bg-black">
            <Navbar />
        </div>
        
        <PaymentForm />
    </div>
  )
}

export default Payment