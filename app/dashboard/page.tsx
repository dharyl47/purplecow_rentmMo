import React from 'react'
import { Button } from '@radix-ui/themes'
import HeroPage from '../pageComponents/HeroPage'
import HowItWorks from '../pageComponents/HowItWorks'
import HostBookCards from '../pageComponents/HostBookCards'
const Dashboard = () => {
  return (
    <div>
    <HeroPage />
    <HowItWorks />
    <HostBookCards />
    </div>
  )
}

export default Dashboard