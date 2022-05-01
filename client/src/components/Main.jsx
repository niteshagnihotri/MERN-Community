import '../App.css';
import { useNavigate } from "react-router-dom";

export default function Main(){
    const history = useNavigate();
    return (
        <div className="h-[80vh] flex justify-center items-center font-mono">
            <div className="text-center space-y-8 text-slate-300 z-50">
                <h1 className="text-5xl md:text-6xl tracking-widest leading-relaxed">JOIN THE COMMUNITY</h1>
                <button onClick={()=>history('/login')} className="border border-gray-400 py-1 px-3 md:py-1 md:px-4 text-xl md:text-2xl hover:bg-blue-800">Join Now</button>
            </div>
        </div>
    )
}