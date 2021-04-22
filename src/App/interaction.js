import axios from 'axios';

const BASE_URL = 'https://urlshortner-servers.herokuapp.com';



export const login = (email,password)=>{
    return axios
    .post(`${BASE_URL}/login`,{email,password})
    .then((res)=>res.data).catch((error)=>(error.response.data))
}

export const signup=(email,firstname,lastname,password)=>{
    return axios
    .post(`${BASE_URL}/register`,{email,firstname,lastname,password})
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const forgetpassword=(email)=>{
    return axios
    .post(`${BASE_URL}/forgetpassword`,{email})
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const updatepassword=(token,password)=>{
    return axios
    .post(`${BASE_URL}/updatepassword`,
    {password},
    {
        headers:{
            authorization:token
        }
    }
    )
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const visitUrl =(token,shorturl,email)=>{
    return axios
    .get(`${BASE_URL}/short-url/`+shorturl,{ 
        headers:{
            authorization:token
        }
    },{email}
    ) 
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const addurl=(token, shorturl,originalurl)=>{
    return axios
    .post(`${BASE_URL}/url`,
    {shorturl,originalurl},
    {
        headers:{
            authorization:token
        }
    }
    )
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const geturl=(email)=>{
    
    return axios
    .get(`${BASE_URL}/all-url`,{
        params: {
        email:email
        }
      }).then((res)=>res.data).catch((error)=>error.response.data);
}

export const getreport=()=>{
    return axios
    .get(`${BASE_URL}/view-url`).then((res)=>res.data).catch((error)=>error.response);
}