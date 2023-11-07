import React from 'react'
import { Button } from '@radix-ui/themes'
import HeroPage from '../pageComponents/HeroPage'
import HowItWorks from '../pageComponents/HowItWorks'
import HostBookCards from '../pageComponents/HostBookCards'
import Footer from '../components/Footer'
const Dashboard = () => {
  return (
    <div>
    <HeroPage />
    <HowItWorks />
    <HostBookCards />
    <Footer />
    </div>
  )
}

export default Dashboard