import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import DummmySwapiService from '../../services/dummy-swapi-service';
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  SecretPage,
  LoginPage
} from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import './bootstrap.min.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onServiceChange = () => {
    console.log("change context");
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummmySwapiService : SwapiService;
      console.log(`switched to ${Service.name}`);
      return {
        swapiService: new Service()
      };
    });
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>
              { planet }

              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>

              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" component={StarshipPage} exact/>
                <Route path="/starships/:id" render={({ match }, location, history) =>{
                  console.log("m", match);
                  console.log("l", location);
                  console.log("h", history);
                  return <StarshipDetails itemId={match.params.id}/>
                }}/>
                <Route
                  path="/login"
                  render={() => <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>}/>
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn}/>}/>
                <Route render={() => <h3>404 - Page not found</h3>}/>
                {/* <Redirect to="/"/> */}
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}