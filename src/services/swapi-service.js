export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';
    _imgBase = 'https://starwars-visualguide.com/assets/img';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}: ${res.status}`);
        }

        return await res.json();
    }

    getAllPeople = async () => {
        const people = await this.getResource(`/people/`);
        return people.results.map(this._transformPerson);
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    getAllPlanets = async () => {
        const planets = await this.getResource(`/planets/`);
        return planets.results.map(this._transformPlanet);
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    getAllStarships = async () => {
        const starships = await this.getResource(`/starships/`);
        return starships.results.map(this._transformStarship);
    }

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _extractId = (item) => {
        const idRegEx = /\/(\d*)\/$/;
        return item.url.match(idRegEx)[1];
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }

    getPersonImage = ({ id }) => {
        return `${this._imgBase}/characters/${id}.jpg`;
    }

    getStarshipImage = ({ id }) => {
        return `${this._imgBase}/starships/${id}.jpg`;
    }

    getPlanetImage = ({ id }) => {
        return `${this._imgBase}/planets/${id}.jpg`;
    }
}

// const swapi = new SwapiService();
// swapi.getAllPeople().
//     then(body => console.log(body));