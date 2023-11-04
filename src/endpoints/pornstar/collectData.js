const puppeteer = require('puppeteer') ;

async function collectPornstarData(page, url) {
    await page.goto(`https://www.pornhub.com${url}`, {
        waitUntil: "domcontentloaded"
    });

    return await page.evaluate(() => {
        const isDefault = document.querySelector("#coverPictureDefault") === null

        if (isDefault) {
            const name = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.nameSubscribe > div.name.unclaimed > h1").textContent.trim()
            const avatarUrl = document.querySelector("body > div.wrapper > div.container > div > div > section > div.thumbImage > img").attributes.getNamedItem("src").value
            let about;
            try {
                about = document.querySelector("body > div.wrapper > div.container > div.withBio > div > section > div.infoContainer > div.bio > div.text.longBio.js-bioText").textContent.trim()
            } catch {}

            const infoPieces = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.detailedInfo.js-infoText").children

            const info = {}
            for (let i = 1; i < infoPieces.length; i++) {
                const infoPiece = infoPieces.item(i)
                const [name, value] =  infoPiece.textContent.split(':')

                if (name === "Website") {
                    info[`${name.trim()}`] = infoPiece.querySelector("a").attributes.getNamedItem("href").value
                } else {
                    info[`${name.trim()}`] = value.trim()
                }

            }

            const rank = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.rankingInfo > div:nth-child(1) > span.big").textContent.trim()
            const weeklyRank = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.rankingInfo > div:nth-child(2) > span.big").textContent.trim()
            const monthlyRank = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.rankingInfo > div:nth-child(3) > span.big").textContent.trim()
            const lastMonthRank = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.rankingInfo > div:nth-child(4) > span.big").textContent.trim()
            const yearlyRank = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.rankingInfo > div:nth-child(5) > span.big").textContent.trim()

            const videoViews = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div.infoBox.videoViews.tooltipTrig > span").textContent.trim()
            const subscribers = document.querySelector("body > div.wrapper > div.container > div > div > section > div.infoContainer > div.bottomInfo > div.infoBoxes > div:nth-child(3) > span").textContent.trim()
            const aliases = document.querySelector("body > div > div > div > div > div.aliases").textContent.trim().split(", ")

            return {
                name,
                avatarUrl,
                about,
                info,
                ranks: {
                    pornstar: rank,
                    weekly: weeklyRank,
                    monthly: monthlyRank,
                    lastMonth: lastMonthRank,
                    yearly: yearlyRank
                },
                videoViews,
                subscribers,
                aliases
            }
        } else {
            const name = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.coverImage > div.bottomGradient > div > div.name > h1").textContent.trim()
            const avatarUrl = document.querySelector("#getAvatar").attributes.getNamedItem("src").value

            const infoPieces = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.model-details.js-headerContent > div.bottomDescription.bio.display-grid.auto-columns > div.detailedInfo.column.text.js-infoText.last-column > div").children

            const info = {}
            for (let i = 0; i < infoPieces.length; i++) {
                const infoPiece = infoPieces.item(i)
                const name = infoPiece.children.item(0).textContent.trim().replaceAll(":", "")
                info[name] = infoPiece.children.item(1).textContent.trim()
            }

            const about = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.model-details.js-headerContent > div.bottomDescription.bio.display-grid.auto-columns > div.biographyAbout.column.text.js-bioAbout > div > section > div:nth-child(2)").textContent.trim()

            const ranksElements = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.coverImage > div.infoBoxes > div.rankingInfo").children
            const modelRank = ranksElements.item(0).children.item(0).textContent.trim()
            const weeklyRank = ranksElements.item(1).children.item(0).textContent.trim()
            const monthlyRank = ranksElements.item(2).children.item(0).textContent.trim()
            const lastMonthRank = ranksElements.item(3).children.item(0).textContent.trim()
            const yearlyRank = ranksElements.item(4).children.item(0).textContent.trim()

            const videoViews = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.coverImage > div.infoBoxes > div.tooltipTrig.infoBox.videoViews > span").textContent.trim()
            const subscribers = document.querySelector("body > div.wrapper > div.container > div.claimed.noBio > div > section > div.coverImage > div.infoBoxes > div.tooltipTrig.infoBox.subscribers > span").textContent.trim()
            const aliases = document.querySelector("body > div.wrapper > div.container > div > section > section > div.aliases").textContent.trim().split(", ")

            return {
                name,
                avatarUrl,
                info,
                about,
                ranks: {
                    model: modelRank,
                    weekly: weeklyRank,
                    monthly: monthlyRank,
                    lastMonth: lastMonthRank,
                    yearly: yearlyRank
                },
                videoViews,
                subscribers,
                aliases
            }
        }
    })
}

module.exports = collectPornstarData






