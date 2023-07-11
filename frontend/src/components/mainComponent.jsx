import React, {Component} from "react";
import {Route, Switch , Redirect} from "react-router-dom"
import authService from "../services/authService";
import Dashboard from "./dashboard";
import Login from "./login";
import Logout from "./logout";
import NavBar from "./navbar";



class MainComponent extends Component{

    render(){
        let user=authService.getUser();
        return(
            <div className="">
                <NavBar user={user}/>
                <Switch>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Redirect from="/" to='/login'/>
                </Switch>
            </div>
        )
    }
}
export default MainComponent;