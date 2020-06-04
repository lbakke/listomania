import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./components/about";
import Home from "./components/home";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/About" component={About} />
                </Switch>
            </Router>
        )
    }
}