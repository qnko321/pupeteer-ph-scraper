import {createBrowser} from "./index";

class BrowserStore {
    constructor() {
        this.browsers = {}
    }

    async create(name) {
        this.browsers[name] = await createBrowser()
    }

    get(name) {
        return this.browsers[name]
    }

    destroy(name) {
        delete this.browsers[name]
    }
}

module.exports = BrowserStore