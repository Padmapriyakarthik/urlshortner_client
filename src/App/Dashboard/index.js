import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { getreport } from "../interaction"
import { Chart } from "react-google-charts"
export const Dashboard=({history})=>{
    
    const {user} = useContext(WrapperContext)
    const [Data,setData]=useState([])
    const [enable,setEnable]=useState(0);

    const view_current_month=()=>{
        const {email}=user
        console.log(email);
        getreport(email).then((data)=>{
            const {message}=data;
            setData(message);
            setEnable(!enable)
        }).catch((error)=>{
            console.log(error);
        })
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
            <div className="container center" >
              {{if(enable){
                
                   <Chart
  width={'400px'}
  height={'200px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={Data}
  options={{
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'URL Created Date',
      minValue: 0,
    },
    vAxis: {
      title: 'Number of URL Created',
    },
    legend: 'none',
     animation: {
      startup: true,
      easing: 'linear',
      duration: 1500,
    },
     enableInteractivity: false,
  }}
  chartEvents={[
    {
      eventName: 'animationfinish',
      callback: () => {
        console.log('Animation Finished')
      },
    },
  ]}
  
/>
                
              }}}
           
            </div>

        </div>
    )
}