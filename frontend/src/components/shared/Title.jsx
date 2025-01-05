import React from 'react'
import { Helmet } from 'react-helmet-async'

 export const Title = ({
     title="Friend App",
     description="this is Friend app",
}) => {
  return (
      <Helmet>
        <title>{title}</title>
        <meta name="description " content={description} />
      
      </Helmet>
  )
}

export default Title;