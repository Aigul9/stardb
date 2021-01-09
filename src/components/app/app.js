import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import PeoplePage from '../people-page';
import ErrorBoundary from '../error-boundary';
import SwapiService from "../../services/swapi-service";

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

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    const {
      getPerson,
      getPlanet,
      getStarship,
      getPersonImage,
      getPlanetImage,
      getStarshipImage
    } = this.swapiService;

    return (
        <ErrorBoundary>
          <SwapiServiceProvider value={this.swapiService}>
            <div className="stardb-app">
            <Header />
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