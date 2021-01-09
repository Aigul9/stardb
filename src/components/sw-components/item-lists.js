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

const renderPerson = ({ name, birthYear }) => <span>{name} ({ birthYear })</span>;

const renderName = ({ name }) => <span>{name}</span>;

// const ListWithChildren = withChildFunction(
//     ItemList,
//     ({ name }) => <span>{name}</span> // render-function
// );

const PersonList = withData(
                    withChildFunction(ItemList, renderPerson),
                    getAllPeople);

const PlanetList = withData(
                    withChildFunction(ItemList, renderName),
                    getAllPlanets);

const StarshipList = withData(
                    withChildFunction(ItemList, renderName),
                    getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
}