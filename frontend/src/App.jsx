import React, { Suspense, useState } from 'react'
import { lazy } from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import  ProtectRoute  from './components/auth/ProtectRoute';


const Login =lazy(()=>import("./pages/Login"))
let user=true;
function App() {
  

  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* <Route  path="/login" element={
          <ProtectRoute user={!user} redirect='/'>
            <Login />
          </ProtectRoute>
        } /> */}
        <Route path="/login" element={<Login />} />
        </Routes>
        </Suspense>
     </BrowserRouter>

  )
}

export default App
