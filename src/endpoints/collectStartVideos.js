const puppeteer = require('puppeteer') ;

// pageIndex: number | undefined  (default: 1)
async function collectStartVideos(pageIndex) {
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

    let fullUrl = `https://www.pornhub.com/videos`

    if (pageIndex > 1) {
        fullUrl += `?page=${pageIndex}`
    } else {
        fullUrl += `?page=1`
    }

    await page.goto(fullUrl, {
        waitUntil: "domcontentloaded"
    });

    const data = await page.evaluate(() => {
        const videosElements = document.querySelector("#videoCategory").children

        const videos = []
        for (let i = 0; i < videosElements.length; i++) {
            const video = videosElements.item(i)

            try {
                const url = video.querySelector("div > div.phimage > a").attributes.getNamedItem("href").value
                const title = video.querySelector("div.thumbnail-info-wrapper.clearfix > span > a").textContent.trim()
                const views = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div.videoDetailsBlock > div > span").textContent.trim().replaceAll(" views", "")
                const rating = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div.videoDetailsBlock > div > div > div").textContent.trim()
                const duration = video.querySelector("div > div.phimage > a > div > var").textContent.trim()
                const thumbnailUrl = video.querySelector("div > div.phimage > a > img").attributes.getNamedItem("src").value
                const author = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div.videoUploaderBlock.clearfix > div > a").textContent.trim()
                const authorUrl = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div.videoUploaderBlock.clearfix > div > a").attributes.getNamedItem("href").value

                videos.push({
                    url,
                    title,
                    views,
                    rating,
                    duration,
                    thumbnailUrl,
                    author: {
                        name: author,
                        url: authorUrl
                    }
                })
            } catch {}
        }

        return videos
    })

    browser.close();
    return data
}

module.exports = collectStartVideos