import React, { Component } from "react";

import { Msf } from "./components/Msf";
import { Switch, Link, Route } from "react-router-dom";
import { Home } from "./components/Home";

const Header = () => <div>this is the header</div>;

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/msf" component={Msf} />
    </Switch>
  </div>
);

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
