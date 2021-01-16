import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  // static is only for classes
  // null wouldn't count as default props
  static defaultProps = {
    updateInterval: 10000
  };

  // after default props validation
  static propTypes = {
    updateInterval: PropTypes.number
    // isRequired - without default value
    // updateInterval: PropTypes.number.isRequired
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 18) + 3;
    this.swapiService.getPlanet(id)
      .then(planet => this.onPlanetLoaded(planet))
      .catch(this.onError);
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    });
  }

  render() {
    const { planet, loading, error } = this.state;

    const content = error ? <ErrorIndicator/> : loading ? <Spinner/> : <PlanetView planet={planet}/>;

    return (
      <div className="random-planet jumbotron rounded">
        {content}
      </div>
    );
  }
}

// for functions or classes
// RandomPlanet.defaultProps = {
//   updateInterval: 10000
// };

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt="random planet"/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
}