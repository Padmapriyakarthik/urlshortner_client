import React, { useContext, useEffect, useState } from "react"

import { WrapperContext } from "../index"
import { addurl,geturl,visitUrl} from "../interaction";

export const Shorturl = ()=>{
    const {user,token} = useContext(WrapperContext)
    const [url,setUrl]=useState({shorturl:"",originalurl:""});
    const [page,setPage]=useState(0);
    const [urls,setUrls]=useState([]);
    const [custommessage,setcustomMessage]=useState("");
    const [message,setMessage]=useState("");

    const view=()=>{
        setPage(!page);
        const {email}=user
        console.log(email);
        if(!page)
        {
            geturl(email).then((res)=>{

                //const {message}=res.data;
                //setUrls(message);
                //console.log(urls);
                console.log(res);
    
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    }
   
    const handleCreate=()=>{
        const {shorturl,originalurl} =url
      
        if(shorturl==="")
        {
            setcustomMessage("Enter your custom url")
        }
        else if(originalurl==="")
        {
            setcustomMessage("Enter valid url")
        }
        else
       {
           
        setcustomMessage(" ")
        addurl(token, shorturl,originalurl)
       .then((data)=>{
            const {message,url}=data;
            if(url)
            {
                setMessage(url);
                alert(url);  
               // setUrl({shorturl:"",originalurl:""}); 
            }
            else
            {
                setcustomMessage(message);
                alert(message);
            }
            console.log(data)
        })
        .catch((error)=>{
           console.log(error);
        })
        }
    
    }

    const openUrl=()=>{

        const {email}=user
        console.log(email);
        const {shorturl}=url ;
        visitUrl(token,shorturl,email)
        .then((data)=>{
            const {message}=data;
           
           // setUrl({shorturl:"",originalurl:""}); 
            alert(message);
            //window.location.href = message;
            window.open(message, "_blank")
        }).catch((error)=>{
            console.log(error);
        });

    }
    useEffect(()=>{
        console.log("user::::",user)
    },[])

    if(!page){
    return(
        <div className="container p-1">
        <nav className="nav "><button type="button" className="btn btn-link" style={{color: "green"}} onClick={view}> Availabel ShortUrl's </button></nav>
        <div className="container center" >
        
            <form >
                <h1>Create Url</h1>
                <div className="row">
                    <div offset="col-2">
                <div className="row">
                <div  className="col-12">
                    <label htmlFor="oUrl">Original Url</label>
                <input 
                type="text"
                name="url"
                id="oUrl"
                className="form-control"
                placeholder="Original Url"
                required
                value={url.originalurl}
                onChange={(e)=>{
                    setUrl((newurl)=>({...newurl,originalurl:e.target.value}))
                }}
                />
                </div>
                <div className="col-12">
                    <label htmlFor="surl">ShortUrl</label> 
                <input 
                type="text"
                name="name"
                id="surl"
                className="form-control"
                required
                value={url.shorturl}
                placeholder="Your own short url"
                onChange={(e)=>{
                    setUrl((newurl)=>({...newurl,shorturl:e.target.value}))
                }}
                />
            </div>
            </div>
                <p style={{color: "red"}}>{custommessage}</p>
                <button 
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
                >create url</button>
                  <span>visit the site with your url</span> 

                <button type="button" className="btn btn-link" onClick={openUrl}>https://urlshortner-servers.herokuapp.com/short-url/{message}</button>
           </div>
           </div>
            </form>
        </div>
        </div>
        )
 }
 else{
     return(
         <div className="container p-1">
             <ul className="nav">
             <li className="nav-item">
                 <button type="button" className="btn btn-link" style={{color: "green"}} onClick={view}> Create Short Url </button>
                 </li></ul>
         
        <div className="container p-5  center" >
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
     )
 }
    

}
