import React, { Suspense, useState } from 'react';
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import Header from './components/layout/Header';

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [user, setUser] = useState(true); // Example user state
  console.log(user);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
              
            {/* <Route path="/" element={<Header />} /> */}
            <Route path="/" element={<Home />} />
            
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
