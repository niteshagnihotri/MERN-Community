import React, { useState, useEffect, useContext } from "react";
import img from '../images/img1.png';
import { UserContext } from "../App";
import { Link } from "react-router-dom"

export default function About() {

    const { state } = useContext(UserContext);
    const [page, setPage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const callPage = async () => {
            try {
                setPage(false);
                setLoading(true);
                const res = await fetch('/about', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const data = await res.json();
                setUserData(data);
                setLoading(false);
            }
            catch (err) {
                console.log("Page not found", err);
                setLoading(false);
                setPage(true);
            }
        }

        callPage();

    }, [state]);


    return (

        (!loading) ?

            page ?

                <div className="h-[80vh] flex items-center justify-center flex-col text-xl space-y-10">
                    <h1>Oops ! Data Not Found</h1>
                    <h1>Please <Link className="text-blue-700 hover:underline" to="/login">Relogin</Link> </h1>
                </div>
                :

                <div className="md:w-7/12 md:mx-auto py-10 font-QuickSand font-semibold">

                    <h1 className="text-center text-3xl">Hi {userData.name}</h1>
                    <div className='flex flex-col md:flex-row py-8 md:py-20 md:w-10/12 md:mx-auto space-x-0 md:space-x-14 space-y-10 md:space-y-0'>
                        <div className='mx-auto md:mx-0 '>
                            <img src={img} alt="" width="200em" height="200em" loading="lazy" />
                        </div>
                        <div className='md:w-7/12 text-center md:text-left text-lg'>
                            <h4 className="underline">{userData.name}</h4>
                            <h6>{userData.profession}</h6>

                            <div className='mt-8 md:mt-10 md:text-left md:w-full mx-auto'>
                                <ul className='space-y-6 px-10'>
                                    <li className='md:space-y-4'>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">User Id</h1>
                                            <h1 className="md:w-auto">{userData.userId}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">Name</h1>
                                            <h1 className="md:w-auto">{userData.name}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">Profession</h1>
                                            <h1 className="md:w-auto">{userData.profession}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">Email</h1>
                                            <h1 className="md:w-auto">{userData.email}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">Phone</h1>
                                            <h1 className="md:w-auto">{userData.phone}</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex  justify-between md:justify-between '>
                                            <h1 className="md:w-fit text-left">City</h1>
                                            <h1 className="md:w-auto">{userData.city}</h1>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            :
            <div className="h-[80vh] flex justify-center items-center">Loading...</div>


    );
}