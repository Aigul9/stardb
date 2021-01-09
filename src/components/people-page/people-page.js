import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundary from '../error-boundary';

import './people-page.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null
    };

    onPersonSelected = (id) => {
        this.setState({
          selectedPerson: id
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                // renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
                >
                {(i) => `${i.name} (${i.birthYear})`}
            </ItemList>
        );

        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson}/>
        );

        return (
            <ErrorBoundary>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundary>
        );
    }
}