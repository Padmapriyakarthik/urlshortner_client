import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { updatepassword } from "../interaction"
export const Dashboard=({history})=>{
    const view_current_month=()=>{
        
    }
    const create=()=>{
        history.push(`/ShortUrl`);
    }
    const view=()=>{
        history.push(`/CreatedUrl`)
    }
    return(
        <div className="container p-1">
            <ul className="nav flex-column">
            <li className="nav-item">
                <button type="button" className="btn btn-link" style={{color: "green"}} onClick={view_current_month}>Created this month</button>
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-link" style={{color: "green"}} onClick={create}> Create Short Url </button>
            </li>
            <li className="nav-item">
            <button type="button" className="btn btn-link" style={{color: "green"}} onClick={view}> Availabel ShortUrl's </button>
            </li>
            </ul>
            <div className="container p-5  center" >
                helllooooooo
            </div>
        </div>
    )
}