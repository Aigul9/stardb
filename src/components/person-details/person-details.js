import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();
  state = {
    person: null,
    loading: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) { // or endless loop
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    
    if (personId) {
      this.setState({
        loading: true
      });

      this.swapiService
        .getPerson(personId)
        .then(person => {
          this.setState({
            person,
            loading: false 
          });
        });
    }
  }

  render() {
    if (!this.state.person) {
      return <span>Select a person from the list</span>
    }

    const { person, loading } = this.state;

    const content = loading ? <Spinner/> : <PersonView person={person}/>

    return (
      <div className="person-details card">
        {content}
      </div>
    );
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
        alt="person details"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </>
  );
}