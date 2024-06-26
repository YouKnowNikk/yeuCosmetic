import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../main/Home'
import PageNotFound from '../main/PageNotFound'
// import VirtualMakeup from '../VirtuallArConfig.js/VirtualConfig'
import Makeup from '../VirtuallArConfig.js/Makeup'
import VirtualMakeup from '../VirtuallArConfig.js/VirtualConfig'

function PortalConfig() {
  return (
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path ="/shop" element ={<p>This Is shop Page</p>}/>
    <Route path ="/blogs" element ={<p>This Is blog Page</p>}/>
    <Route path ="/our-story" element ={<p>This Is our story Page</p>}/>
    <Route path ="/membership" element ={<p>This Is membership Page</p>}/>
    <Route path='/virtual-config' element = {<VirtualMakeup/>}/>
    <Route path='*' element={<PageNotFound/>}/>

   </Routes>
  )
}

export default PortalConfig