export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}: ${res.status}`);
        }

        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}`);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results;
    }

    getPelanet(id) {
        return this.getResource(`/planets/${id}`);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results;
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}`);
    }
}

// const swapi = new SwapiService();
// swapi.getAllPeople().
//     then(body => console.log(body));