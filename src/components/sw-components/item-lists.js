import React from 'react';
import ItemList from '../item-list';
import {
    withData,
    withSwapiService,
    withChildFunction,
    compose
} from '../hoc-helper';


const renderPerson = ({ name, birthYear }) => <span>{name} ({ birthYear })</span>;

const renderName = ({ name }) => <span>{name}</span>;

// const ListWithChildren = withChildFunction(
//     ItemList,
//     ({ name }) => <span>{name}</span> // render-function
// );
const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderPerson))
    (ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName))
    (ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodsToProps),
    withData,
    withChildFunction(renderName))
    (ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
};