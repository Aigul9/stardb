import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import SwapiService from "../../services/swapi-service";
import DummmySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
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

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

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

                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact/>
                <Route path="/people" component={PeoplePage}/>
                <Route path="/planets" component={PlanetPage}/>
                <Route path="/starships" component={StarshipPage}/>
                
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}