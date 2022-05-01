import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { GrClose } from 'react-icons/gr';
import { UserContext } from '../App';

export default function Header() {

  const { state } = useContext(UserContext);
  const [showNav, setshowNav] = useState(false);
  const [navstyle, setNavStyle] = useState(true);

  const RenderMenu = () => {
    if (!state) {
      return (
        <>
          <li><Link onClick={() => { setshowNav(false); }} className={navstyle ? "no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 "} to="/" >HOME</Link></li>
          <li><Link onClick={() => { setshowNav(false); }} className={navstyle ? "no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 "} to="/login">LOGIN</Link></li>
          <li><Link onClick={() => { setshowNav(false); }} className={navstyle ? "no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 "} to="/register">REGISTER</Link></li>
        </>
      );
    }
    else {
      return (
        <>
          <li><Link onClick={() => { setshowNav(false) }} className={(navstyle ? "no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 ") + " cursor-pointer"} to="/" >HOME</Link></li>
          <li><Link onClick={() => { setshowNav(false) }} className={(navstyle ? " no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 ") + " cursor-pointer"} to="/about" >ABOUT</Link></li>
          <li><Link onClick={() => { setshowNav(false) }} className={(navstyle ? " no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 ") + " cursor-pointer"} to="/contact" >CONTACT</Link></li>
          <li><Link onClick={() => { setshowNav(false) }} className={(navstyle ? " no-underline text-gray-800 md:text-gray-300 md:px-1 font-semibold hover:text-gray-400" : "text-gray-600 ") + " cursor-pointer"} to="/logout" >LOGOUT</Link></li>
        </>
      );
    }
  }

  var url = useLocation();

  useEffect(() => {
    let pathName = url.pathname.toString();
    if (pathName === "/") {
      setNavStyle(true)
    }
    else {
      setNavStyle(false)
    }
  }, [url.pathname]);


  return (

    <div className={navstyle ? "w-100  z-50 absolute bg-transparent top-0 left-0 right-0 bottom-0 text-white" : "border-b-2"} >
      <div className="w-100 px-3 ">
        <div className="md:w-11/12  md:mx-auto  space-y-4 md:space-y-0 items-center align-middle py-2 md:py-0">
          <div className=" md:flex items-center justify-between font-Raleway mx-3">
            <div className="flex items-center justify-between py-2">
              <Link to="/" className="text-xl font-bold italic font-Raleway"> MERN COMMUNITY </Link>
              {
                showNav ?
                  <GrClose onClick={() => { setshowNav(!showNav) }} className='md:hidden block w-10 h-auto p-2 cursor-pointer transition-all ease-in-out delay-150' />
                  :
                  <HiOutlineMenuAlt3 onClick={() => { setshowNav(!showNav) }} className='md:hidden block w-10 h-auto p-2 cursor-pointer' />
              }
            </div>
            <ul className={(showNav ? "right-0" : "-right-full") + " fixed md:static md:flex flex md:flex-row flex-col    xl:space-x-8 lg:space-x-6 md:space-y-0 md:space-x-5 space-y-10    md:w-auto w-fit md:my-auto  md:bg-transparent bg-gray-300 bg-opacity-90    py-4 px-10 pl-4 sm:pl-10 lg:mr-3 mb-0 mt-2 md:mt-0  bottom-0 top-16    md:text-md text-md font-bold   transition-right z-30"}>
              <RenderMenu />
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}