import * as React from "react";
import {Route, Switch} from "react-router";
import {Redoc} from "./Redoc/Redoc";


export default class RootRouter extends React.Component {
  render(): React.ReactNode {
    return (<Switch>
      <Route exact path="/doc" component={Redoc}></Route>
      <Route exact path="/login" c/>
    </Switch>);
  }
}
