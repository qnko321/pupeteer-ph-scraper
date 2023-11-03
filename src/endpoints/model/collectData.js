const puppeteer = require('puppeteer') ;

async function collectModelData(url) {
    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage()
    await page.setRequestInterception(true)

    page.on('request', (request) => {
        if (request.resourceType() !== "document") {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.setViewport({width: 1920, height: 900});

    await page.goto(`https://www.pornhub.com${url}`, {
        waitUntil: "domcontentloaded"
    });

    const data = await page.evaluate(() => {
        const infoPieces =  document.querySelector("body > div.wrapper > div.container > div.\\31 23.amateurModel.noBio > div > section > div.model-details.js-headerContent > div.bottomDescription.bio.display-grid.auto-columns > div.detailedInfo.column.text.js-infoText.last-column > div").children

        const info = {}
        for (let i = 0; i < infoPieces.length; i++) {
            const infoPiece = infoPieces.item(i)
            const name = infoPiece.children.item(0).textContent.trim().replaceAll(":", "")
            info[name] = infoPiece.children.item(1).textContent.trim()
        }

        const about = document.querySelector("body > div.wrapper > div.container > div.\\31 23.amateurModel.noBio > div > section > div.model-details.js-headerContent > div.bottomDescription.bio.display-grid.auto-columns > div.biographyAbout.column.text.js-bioAbout > div > section > div:nth-child(2)").textContent.trim()

        const ranksElements = document.querySelector("body > div.wrapper > div.container > div.\\31 23.amateurModel.noBio > div > section > div.coverImage > div.infoBoxes > div.rankingInfo").children
        const modelRank = ranksElements.item(0).children.item(0).textContent.trim()
        const weeklyRank = ranksElements.item(1).children.item(0).textContent.trim()
        const monthlyRank = ranksElements.item(2).children.item(0).textContent.trim()
        const lastMonthRank = ranksElements.item(3).children.item(0).textContent.trim()
        const yearlyRank = ranksElements.item(4).children.item(0).textContent.trim()

        return {
            info,
            about,
            ranks: {
                model: modelRank,
                weekly: weeklyRank,
                monthly: monthlyRank,
                lastMonth: lastMonthRank,
                yearly: yearlyRank
            },
        }
    })

    browser.close();
    return data
}

module.exports = collectModelData