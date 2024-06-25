import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
    <h3>Page Not Found</h3>
    <button><Link to="/">GoHome</Link></button>
    </>
  )
}

export default PageNotFound