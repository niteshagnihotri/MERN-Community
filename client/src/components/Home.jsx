import React, { useContext } from "react";
import Main from "./Main";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { UserContext } from '../App';


export default function Home() {

    const { state }  = useContext(UserContext);
    const history = useNavigate();

    return (
        <div className="home  before:bg-no-repeat before:bg-center">
            {
                state ?
                    <div className="h-[80vh] flex justify-center items-center font-mono">
                        <div className="text-center space-y-8 text-slate-300 z-50">
                            <h1 className="text-5xl md:text-6xl tracking-widest leading-relaxed">User Logged iN</h1>
                            <button onClick={()=>history('/about')} className="hover:bg-blue-800 border border-gray-400 py-1 px-3 md:py-1 md:px-4 text-xl md:text-2xl">Go Now</button>
            </div>
                    </div>
                    : 
                    <Main />

            }

        </div>
    )
}