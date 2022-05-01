import React, { useState } from 'react';
import register from '../images/register.jpg';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiBriefcase2Fill } from 'react-icons/ri';
import { MdPhoneCallback } from 'react-icons/md';
import { FaCity } from 'react-icons/fa';
import { AiTwotoneLock } from 'react-icons/ai';

export default function Register() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        profession: "",
        phone: "",
        city: "",
        password: "",
        cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const SendData = async (e) => {
        e.preventDefault();
        const { name, email, profession, phone, city, password, cpassword } = user;

        const data = await fetch('/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, profession, phone, city, password, cpassword
            })
        })

        if (data.status === 401) {
            setError("Please Enter All The Fields");

        }
        else if (data.status === 422) {
            setError("User Account Already Exits");

        }
        else if (data.status === 423) {
            setError("Password Should Be Same");

        }
        else if (data.status >= 400) {
            setError("Registration Failed");
        }

        else {
            window.alert("Registration Successfull");
            navigate("/login");
        }
    }

    return (
        <div className="w-100 font-Karla">
            <div className="flex h-auto md:h-[90vh] flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-12 md:w-9/12 md:mx-auto py-10 md:py-0">
                <div className='md:w-2/4 -translate-y-8'>
                    <img src={register} alt="" className='' />
                </div>
                <div className='md:w-1/2 space-y-4 '>
                    <h1 className='text-3xl'>Join the Community</h1>
                    <form className="py-8  space-y-8 md:w-2/3 text-lg">
                        <div className='border-b-2 flex items-center space-x-3'>
                            <BsFillPersonFill className=' text-xl' />
                            <input type="text" name="name" onChange={handleInputs} placeholder="Name: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <MdEmail className=' text-xl ' />
                            <input type="text" name="email" onChange={handleInputs} placeholder="Email ID : " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <RiBriefcase2Fill className=' text-xl' />
                            <input type="text" name="profession" onChange={handleInputs} placeholder="Profession: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <MdPhoneCallback className=' text-xl ' />
                            <input type="text" name="phone" onChange={handleInputs} placeholder="Phone: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <FaCity className=' text-xl' />
                            <input type="text" name="city" onChange={handleInputs} placeholder="City: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <AiTwotoneLock className=' text-xl ' />
                            <input type="password" name="password" onChange={handleInputs} placeholder="Password: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <AiTwotoneLock className=' text-xl ' />
                            <input type="password" name="cpassword" onChange={handleInputs} placeholder="Confirm Password: " />
                        </div>
                        <div>
                            <button onClick={SendData} type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2 text-center mr-2">Register </button>
                        </div>
                        
                        <h5 className='text-red-600'>{error}</h5>
                    </form>
                </div>
            </div>
        </div>
    )
}