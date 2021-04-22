import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { getreport } from "../interaction"
import { Chart } from "react-google-charts"
export const Dashboard=({history})=>{
    
    const [count,setCounts]=useState([])
    const [counts,setCounts]=useState({})

    const view_current_month=()=>{
        getreport().then((data)=>{
            console.log(data);
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
            <div className="container p-5  center" >
            <Chart
  width={'500px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
  ]}
  options={{
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
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
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
            </div>

        </div>
    )
}