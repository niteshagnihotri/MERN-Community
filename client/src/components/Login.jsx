import React, {useState, useContext} from 'react';
import login from '../images/login.jpg';
import { useNavigate } from "react-router-dom";
import {BsPersonCircle} from 'react-icons/bs';
import {RiLockPasswordFill} from 'react-icons/ri';
import { UserContext } from '../App';
import Cookies from 'js-cookie';

export default function Login() {

    const { dispatch } = useContext(UserContext);
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const Login = async (e) => {
        e.preventDefault();
        await fetch('/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email, password
            })
        }).then((res) => {
            if (res.status === 400) {
                setError("Please Enter ID or Password");
            }
            else if (res.status === 201) {
                dispatch({type : "USER", payload: true})
                window.alert("Login Successfull");
                setError("Login Successfull");
                history("/");
                setTimeout(()=>{
                    var usertoken = Cookies.get('usertoken');
                    if(usertoken){
                        dispatch({type : "USER", payload: false});
                        Cookies.remove('name', { path: '' });
                        window.alert("User Logged Out");
                        history('/login');
                        window.location.reload();
                    }
                    else{
                        Cookies.remove('name', { path: '' });
                        console.log("user already logged out");
                    }
                }, 43000);

            }
            else if (res.status === 403) {
                setError("Enter Correct Details");
            }
            else if (res.status === 401) {
                setError("Account not Exist");
            }
        }).catch((error) => {
            console.log(error);
            setError("Invalid Login");
        });

    }

    return (
        <div className="w-100 font-mono">
            <div className="flex flex-col  h-auto md:h-[80vh] md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10 md:w-9/12 md:mx-auto ">
                <div className='w-auto'>
                    <img src={login} alt="" width="600em" height="600em" loading='lazy' />
                </div>
                <div className='md:w-1/2 md:space-y-8'>
                        <h1 className='text-3xl'>Developer Login</h1>
                    <form className="py-8  space-y-8 md:w-2/3 text-lg">
                        <div className='border-b-2 flex items-center space-x-3'>
                            <BsPersonCircle className=' text-xl text-gray-700'/>
                            <input className='focus:outline-none'  type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter username: " />
                        </div>
                        <div className='border-b-2 flex items-center space-x-3'>
                            <RiLockPasswordFill className=' text-xl text-gray-700'/>
                            <input className='focus:outline-none' type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password: " />
                        </div>
                        <div>
                        <button onClick={Login} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2 text-center mr-2 mb-2">Login </button>
                        </div>
                            <h5 className='text-red-600'>{error}</h5>
                    </form>
                </div>
            </div>
        </div>
    )
}