const puppeteer = require('puppeteer') ;

// query: string | undefined (default) (default: "")
// pageIndex: number | undefined (default) (default: 1)
async function searchVideos(query, pageIndex) {
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

    let fullUrl = `https://www.pornhub.com/video/search?search=${query.replaceAll(' ', '+')}`

    if (pageIndex > 1) {
        fullUrl += `&page=${pageIndex}`
    }

    await page.goto(fullUrl, {
        waitUntil: "domcontentloaded"
    });

    const data = await page.evaluate(() => {
        const videosElements = document.querySelector("#videoSearchResult").children

        const videos = []

        for (let i = 0; i < videosElements.length; i++) {
            const video = videosElements.item(i)

            try {
                const url = video.querySelector("span > a").attributes.getNamedItem("href").value
                const title = video.querySelector("span > a").textContent.trim()
                const views = video.querySelector("div.thumbnail-info-wrapper.clearfix > div > div > span > var").textContent.trim()
                const rating = video.querySelector("div.thumbnail-info-wrapper.clearfix > div > div > div > div").textContent.trim()
                const duration = video.querySelector("div > div.phimage > a > div > var").textContent.trim()
                const thumbnailUrl = video.querySelector("div > div.phimage > a > img").attributes.getNamedItem("src").value

                videos.push({
                    url,
                    title,
                    views,
                    rating,
                    duration,
                    thumbnailUrl
                })
            } catch {}
        }

        return videos
    })

    browser.close();
    return data
}

module.exports = searchVideos