import React, { useContext, useEffect } from "react"
import { WrapperContext } from "../index"

export const Header = ({logout})=>{
    const {user} = useContext(WrapperContext)

    useEffect(()=>{
        console.log("user::::",user)
    },[])
    return(
       <React.Fragment>
           {user.email?(
               

               <ul className="nav ">
               <li className="nav-item">
               <button type="button" className="btn btn-link" style={{color: "red"}} onClick={logout}>Logout</button>
               </li>
               </ul>
              
           ):(<></>)}
       </React.Fragment>
    )
}