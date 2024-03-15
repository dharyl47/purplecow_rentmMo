import React from 'react'

import PaymentForm from '@/components/payment/PaymentForm'
import NavBarMain from '@/components/common/NavBarMain'

const Payment = () => {
  return (
    <div>
        <div className="bg-black">
            <NavBarMain />
        </div>
        
        <PaymentForm />
    </div>
  )
}

export default Payment