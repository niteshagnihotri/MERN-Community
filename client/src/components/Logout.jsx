import {React, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from '../App';

const Logout = () =>{

    const { dispatch } = useContext(UserContext);
    const history = useNavigate();
    useEffect(()=>{
            fetch("/logout", {
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            }).then((res)=>{
                dispatch({type : "USER", payload: false});
                history("/login", {replace:true});
                if(res.status!==200){
                    res.send({message:"Error in logout"});
                }
            }).catch((err)=>{
                console.log(err);
            })
    })
    return <></> ;
}

export default Logout;