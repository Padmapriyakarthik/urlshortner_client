import React, { useContext, useEffect } from "react"
import { WrapperContext } from "../index"

export const Viewurl= ()=>{
    const {user} = useContext(WrapperContext)

    useEffect(()=>{
        console.log("user::::",user)
    },[])


    return(
       <React.Fragment>
           {user.email?(

               <ul className="nav justify-content-end">
               <li className="nav-item">
               <button type="button" className="btn btn-link" style={{color: "green"}} > Availabel ShortUrl's </button>
               <button type="button" className="btn btn-link" style={{color: "red"}} >Logout</button>

               </li>
               </ul>
              
           ):(<></>)}
       </React.Fragment>
    )
}