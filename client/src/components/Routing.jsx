import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Logout = lazy(() => import('./Logout'));

const Routing = () => {
    return (
      <>
        <Suspense fallback={<div className="h-[80vh] flex justify-center items-center">Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </>
    )
  }
  
  export default Routing;

