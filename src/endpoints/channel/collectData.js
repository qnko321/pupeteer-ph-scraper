const puppeteer = require('puppeteer') ;

async function collectChannelData(page, url) {
    await page.goto(`https://www.pornhub.com${url}`, {
        waitUntil: "domcontentloaded"
    });

    return await page.evaluate(() => {
        const name = document.querySelector("#channelsProfile > div.header.clearfix > div.bottomExtendedWrapper.clearfix > div.floatLeft.titleWrapper > div.title.floatLeft > h1").textContent.trim()
        const avatarUrl = document.querySelector("#getAvatar").attributes.getNamedItem("src").value
        const coverUrl = document.querySelector("#coverPictureDefault").attributes.getNamedItem("src").value

        const about = document.querySelector("#channelsBody > div.leftSide.floatLeft > div.rankWrapper > div > p:nth-child(1)").textContent.trim()
        const joined = document.querySelector("#channelsBody > div.leftSide.floatLeft > div.rankWrapper > div > p:nth-child(2)").textContent.trim().replaceAll("JOINED ", "")
        const websiteUrl = document.querySelector("#channelsBody > div.leftSide.floatLeft > div.rankWrapper > div > p:nth-child(3)").textContent.trim().replaceAll("WEBSITE ", "")

        const rank = document.querySelector("#stats > div:nth-child(4)").textContent.trim().replaceAll(" RANK", "")
        const videosCount = document.querySelector("#stats > div:nth-child(3)").textContent.trim().replaceAll(" VIDEOS", "")
        const subscribers = document.querySelector("#stats > div:nth-child(2)").textContent.trim().replaceAll(" SUBSCRIBERS", "")
        const videoViews = document.querySelector("#stats > div:nth-child(1)").textContent.trim().replaceAll(" VIDEO VIEWS", "")

        return {
            name,
            avatarUrl,
            coverUrl,
            about,
            joined,
            websiteUrl,
            rank,
            videosCount,
            subscribers,
            videoViews
        }
    })
}

module.exports = collectChannelData