import React, { useState, useEffect } from 'react';

export default function Contact() {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const callData = async (req, res) => {
            try {
                const res = await fetch('/contact', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const userData = await res.json();
                setUser(userData.data.data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
                res.send("Error");
            }
        }

        callData();
    }, []);

    return (
        (!loading) ?

        <div className="md:w-9/12 md:mx-auto">
            <div className="mx-auto w-100 text-center ">
                <h1 className='text-red-500 py-10 text-4xl'>Our Developers</h1>
                <table className='mx-auto text-xl'>
                    <tr className='space-x-10 border-2 bg-slate-500 text-white'>
                        <td className='border-r-2'>Name</td>
                        <td>Email</td>
                    </tr>
                {
                    user.map((val, key) => {
                        return <tr key={key} className="h-10 text-left border-2" >
                            <td className='border-r-2 px-5'>{val.name}</td>
                            <td className='px-5'>{val.email}</td>
                        </tr>
                    })
                }
                </table>
            </div>
        </div>

            :

            <div className="h-[80vh] flex justify-center items-center">Loading...</div>
    )
}