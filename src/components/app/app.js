import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import PeoplePage from '../people-page';
import ErrorBoundary from '../error-boundary';
import SwapiService from "../../services/swapi-service";
import DummmySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

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
            <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>
              { planet }

              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                Toggle Random Planet
              </button>
        
              {/* <PeoplePage/> */}

              <PersonDetails itemId={11} />

              <PlanetDetails itemId={5} />

              <StarshipDetails itemId={9} />

              <PersonList />

              <StarshipList />

              <PlanetList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}