import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { updatepassword } from "../interaction"

export const Password = ({history})=>{
    const {user} = useContext(WrapperContext)
    const [password,setPassword]=useState({newpassword:"",confirmpassword:""})
    const [custommessage,setcustomMessage]=useState("");
    const [message,setmessage]=useState("");
    const token=localStorage.getItem('auth_token');
    const changepassword=()=>{

        const {newpassword,confirmpassword}=password;
        if(newpassword==="")
        {
            setcustomMessage("enter new password")
        }else if(confirmpassword==="")
        {
            setcustomMessage("re enter new password")
        }else if(newpassword!==confirmpassword)
        {
            setcustomMessage("check your confirm password (does not match)")
        }
        else{

            updatepassword(token,newpassword)
            .then((data)=>{
                const {message}=data;
                alert(message);
                localStorage.removeItem('auth_token')
               history.push(`/login`)
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    return(
        <div className="container p-5  center"  style={{backgroundColor: "lightblue"}}>
        <form >
        <div className="row">
            <div offset="col-2">
        <div className="row">
        <div  className="col-12">
            <label htmlFor="newpwd">New Password</label>
            <input 
                type="password" 
                name="newpwd" 
                id="newpwd"
                className="form-control" 
                placeholder="Enter new password"
                value = {password.newpassword}
                required
                onChange={(e)=>{
                    setPassword((usr)=>({...usr, newpassword:e.target.value}))
                }}
                />
            </div>
            <div  className="col-12">
            <label htmlFor="cnfmpwd">Confirm New Password</label>
            <input 
                type="password" 
                name="cnfmpwd" 
                id="cnfmpwd"
                className="form-control" 
                placeholder="Re enter the password"
                value = {password.confirmpassword}
                required
                onChange={(e)=>{
                    setPassword((usr)=>({...usr, confirmpassword:e.target.value}))
                }}
                />
            </div>
            </div>
            <p style={{color: "red"}}>{custommessage}</p>
            <button 
            type="button"
            className="btn btn-primary"
            onClick={changepassword}
            > change password</button>
            <p style={{color: "green"}}>{message}</p>
        
    </div>
    </div>
    </form>
    </div>
    )
}