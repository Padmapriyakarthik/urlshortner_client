import React, { useContext, useState } from "react";
import { Switch,Route, BrowserRouter as Router, Redirect} from "react-router-dom"
import './App.css';

    import { Header } from "./Header";
    import { Login} from "./Login";
    import { Shorturl} from "./Url";
    import {Password} from "./Password";
    import {Dashboard} from "./Dashboard";
   
export const WrapperContext = React.createContext(
    {
        user:null,
        token:null,
        isLoggedIn:false,
        logout:()=>{}
    }
)

const WrapperRoute = ({render,...restProps})=>{
    const { isLoggedIn,user}=useContext(WrapperContext);
    return(
        <Route
        {...restProps}
        render = {
            (props)=>{
                if(isLoggedIn){
                     return <Redirect to={`/Shorturl`} /> 
                }else{
                    return render(props)
                }
            }
        }
        />
    )
}

const ProtectRoute = ({component: Component, ...restProps})=>{
    const { isLoggedIn,logout, user}=useContext(WrapperContext);
    return(
        <Route
        {...restProps}
        render = {
            (props)=>{
                if(!isLoggedIn){
                   return <Redirect to="/login"/>
                }else{
                    return (
                        <>
                        <Header {...props} logout = {logout} user={user}/> 
                            <Component {...props} user={user}/>
                            
                        </>
                    )
                }
            }
        }
        />
    )

}

export const App = ()=>{

    const [user, setUser]=useState(null);
    const [token,setToken]=useState(null);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    const logout = ()=>{
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem("auth_token")
    }

    const handleLogin = (usr,token)=>{
        setUser(usr);
        setToken(token);
        setIsLoggedIn(true);
        localStorage.setItem("auth_token",token);
    }

    return (
        <Router>
            <WrapperContext.Provider
            value={
                {
                    user,
                    token,
                    isLoggedIn,
                    logout,
                }
            }
            >
                <Switch>
                    <Route exact path="/" render={()=><Redirect to="/login"/>}/>
                    <WrapperRoute
                    path = "/login"
                    render={(props)=><Login {...props} handleLogin={handleLogin}/>}
                     />

                    <ProtectRoute path = "/Shorturl" component={Shorturl} />
                    <ProtectRoute path = "/Dashboard" component={Dashboard} />
                    <Route exact path="/Password" component={Password}/>


                </Switch>

            </WrapperContext.Provider>

        </Router>
    )
}