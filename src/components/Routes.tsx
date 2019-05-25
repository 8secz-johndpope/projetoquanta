import * as React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "../SignIn";


import {isAuthenticated} from "../services/auth";

import {RedocStandalone} from "./RedocStandalone";
import {Redoc} from "./Redoc/Redoc";


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component/>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />

);
export default class Routes extends React.Component<any,any> {
  render(): React.ReactNode {
    console.log(this.props);


    return  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => isAuthenticated() ? (
          <Redirect to={{pathname: "/redoc", state: {from: this.props.location}}}/>) : <SignIn/>}/>
        <PrivateRoute exact path="/redoc" component={() => this.props.dev ? <Redoc store={this.props.store}/> :
          <RedocStandalone postmanUrl={this.props.postmanUrl} specUrl={this.props.specUrl}/>}/>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>;

  }
}

