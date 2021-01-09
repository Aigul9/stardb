import React from 'react';
import ItemList from '../item-list';
import { withData } from '../hoc-helper';
import SwapiService from '../../services/swapi-service';

const swapiService = new SwapiService();

const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = swapiService;

const withChildFunction = (Wrapped, fn) => { // HOC
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const ListWithChildren = withChildFunction(
    ItemList,
    ({ name }) => <span>{name}</span> // render-function
);

const PersonList = withData(ListWithChildren, getAllPeople);

const PlanetList = withData(ListWithChildren, getAllPlanets);

const StarshipList = withData(ListWithChildren, getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
}