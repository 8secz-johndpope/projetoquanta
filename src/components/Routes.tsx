import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../SignIn";


import { isAuthenticated } from "../services/auth";

import {Redoc} from "./Redoc/Redoc";
import {RedocStandalone} from "./RedocStandalone";



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} {...rest} />
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
        <Route exact path="/" component={SignIn} />
        <PrivateRoute {...this.props} path="/app" component={ this.props.dev ? Redoc : RedocStandalone }  />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>;
  }
}

