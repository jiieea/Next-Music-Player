"use client"

import { Box } from 'lucide-react'
import React from 'react'
import {BounceLoader} from 'react-spinners'
const loading = () => {
  return (
  <Box className='flex justify-center items-center h-full'>
    <BounceLoader  color='#22c55e' size={45}/>
  </Box>
  )
}

export default loading
