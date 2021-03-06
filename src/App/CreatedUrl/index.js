import React, { useContext, useEffect, useState } from "react"

import { WrapperContext } from "../index"
import { geturl} from "../interaction";

export const CreatedUrl=({history})=>{
    const {user,token} = useContext(WrapperContext)
    const [urls,setUrls]=useState([]);

    const view=()=>{
        const {email}=user
        {
            geturl(email).then((data)=>{
                const {message}=data;
               setUrls(message);
                console.log(message);
                console.log(data);
    
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    }
    const create=()=>{
        history.push(`/Shorturl`)
    }
    const view_current_month=()=>{
        history.push(`/Dashboard`)
    }
    view();
    return(
        <div className="container p-1">
            <div className="row">
                <div className="col-4">
                <ul className="nav flex-column">
                <li className="nav-item">
                    <button type="button" className="btn btn-link" style={{color: "green",fontSize:"24px"}} onClick={view_current_month}>Report</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-link" style={{color: "green",fontSize:"24px"}} onClick={create}> Create Short Url </button>
                </li>
                <li className="nav-item">
                <button type="button" className="btn btn-link" style={{color: "green",fontSize:"24px"}} onClick={view}> Availabel ShortUrl's </button>
                </li>
                </ul>
                </div>

        
       <div className="col-6  center" >
       <table className="table table-hover table-dark">
       <thead>
       <tr>
           <th scope="col">Short Url</th>
           <th scope="col">No.of Time Used</th>
        </tr>
       </thead>
        <tbody>
  
       {
           urls.map((elem,index)=>{
               return(
                   <tr key={index}>
                   <td key={index}><a href={"https://urlshortner-servers.herokuapp.com/short-url/"+elem.shorturl} target="_blank">{elem.shorturl}</a></td>
                   <td>{elem.clicked}</td>
                 </tr>
               )
           })
       }
       </tbody>
       </table>
       </div>
            </div>
          
       </div>
    )
}