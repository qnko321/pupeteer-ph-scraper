const puppeteer = require("puppeteer");
const collectVideoData = require("./endpoints/collectVideoData");
const searchVideos = require("./endpoints/searchVideos");
const collectStartVideos = require("./endpoints/collectStartVideos");

const collectModelData = require("./endpoints/model/collectData")
const collectModelVideos = require("./endpoints/model/collectVideos")

const collectChannelData = require("./endpoints/channel/collectData")
const collectChannelVideos = require("./endpoints/channel/collectVideos")

const collectPornstarData = require("./endpoints/pornstar/collectData")
const collectPornstarVideos = require("./endpoints/pornstar/collectVideos")

class MyBrowser {
    constructor(browser) {
        this.browser = browser
    }

    async getPage() {
        const page = await this.browser.newPage()
        await page.setRequestInterception(true)

        page.on('request', (request) => {
            if (request.resourceType() !== "document") {
                request.abort();
            } else {
                request.continue();
            }
        });

        return page
    }

    async collectVideoData(url) {
        const page = await this.getPage()
        return collectVideoData(page, url)
    }

    async searchVideos(query, pageIndex) {
        const page = await this.getPage()
        return searchVideos(page, query, pageIndex)
    }

    async collectStartVideos(pageIndex) {
        const page = await this.getPage()
        return collectStartVideos(page, pageIndex)
    }

    async collectModelData(url) {
        const page = await this.getPage()
        return collectModelData(page, url)
    }

    async collectModelVideos(url, sort, pageIndex) {
        const page = await this.getPage()
        return collectModelVideos(page, url, sort, pageIndex)
    }

    async collectChannelData(url) {
        const page = await this.getPage()
        return collectChannelData(page, url)
    }

    async collectChannelVideos(url, sort, pageIndex) {
        const page = await this.getPage()
        return collectChannelVideos(page, url, sort, pageIndex)
    }

    async collectPornstarData(url) {
        const page = await this.getPage()
        return collectPornstarData(page, url)
    }

    async collectPornstarVideos(url, sort, pageIndex) {
        const page = await this.getPage()
        return collectPornstarVideos(page, url, sort, pageIndex)
    }

    async close() {
        await this.browser.close()
    }
}

async function createBrowser() {
    const pBrowser = await puppeteer.launch({
        headless: "new"
    })

    return new MyBrowser(pBrowser)
}

module.exports = createBrowser