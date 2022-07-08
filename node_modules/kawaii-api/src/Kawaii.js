const axios = require('axios');

class Kawaii {
    constructor(token) {
        this.token = token;
        this.url = "https://kawaii.red/api/";
    }

    async get(type, endpoint = "gif", f = []) {
        const res = await axios.get(`${this.url}${type}/${endpoint}/token=${this.token}&filter=${f}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async text(text) {
        const res = await axios.get(`${this.url}txt/${text}/token=${this.token}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async image(image) {
        const res = await axios.get(`${this.url}png/${image}/token=${this.token}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async gif(gif) {
        const res = await axios.get(`${this.url}gif/${gif}/token=${this.token}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async random(type = "gif") {
        const endpoints = await this.endpoints(type);
        const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
        const res = await axios.get(`${this.url}${type}/${endpoint}/token=${this.token}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async endpoints(type = "gif") {
        const res = await axios.get(`${this.url}/${type}/endpoints/token=${this.token}/`).catch(() => null);
        if (res === null) return null;
        else return res.data.response;
    }

    async stats() {
        if (this.token === "anonymous") return null;

        let res = await axios.get(`${this.url}stats/endpoints/token=${this.token}/`).catch(() => null);
        if (res === null) return null;

        let stats = {
            endpoints: res.data.response,
        };

        for (let endpoint of stats.endpoints) {
            res = await axios.get(`${this.url}stats/${endpoint}/token=${this.token}/`).catch(() => null);
            if (res === null) stats[endpoint] = null;
            else stats[endpoint] = res.data.response;
        }

        return stats;
    }
}

module.exports = Kawaii