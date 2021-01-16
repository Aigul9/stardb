import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helper';

const withChildFunction = (Wrapped, fn) => { // HOC
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

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

const mapSharshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllSharships
    };
};

const PersonList = withSwapiService(
    withData(withChildFunction(ItemList, renderPerson)),
    mapPersonMethodsToProps);

const PlanetList = withSwapiService(
    withData(withChildFunction(ItemList, renderName)),
    mapPlanetMethodsToProps);

const StarshipList = withSwapiService(
    withData(withChildFunction(ItemList, renderName)),
    mapSharshipMethodsToProps);

export {
    PersonList,
    PlanetList,
    StarshipList
}