const collectModelVideos = require("../model/collectVideos")

// sort: "mv" | "mr" | "tr" | "lg" | undefined  (default: mr)
// pageIndex: number | undefined (default) (default: 1)
async function collectPornstarVideos

(page, url, sort, pageIndex) {
    let fullUrl = `https://www.pornhub.com${url}`
    let addedSort = false
    switch (sort) {
        case "mv":
        case "lg":
        case "tr":
            fullUrl += `?o=${sort}`
            addedSort = true
            break
        case undefined:
        case "mr":
            break
        default:
            throw "Unsupported sort!"
    }

    if (pageIndex > 1) {
        if (addedSort) {
            fullUrl += `&page=${pageIndex}`
        } else {
            fullUrl += `?page=${pageIndex}`
        }
    }

    await page.goto(fullUrl, {
        waitUntil: "domcontentloaded"
    });

    const data = await page.evaluate(() => {
        let videosElements;
        try {
            videosElements = document.querySelector("#pornstarsVideoSection").children
        } catch {
            return null
        }

        const videos = []

        for (let i = 0; i < videosElements.length; i++) {
            try {
                const video = videosElements.item(i)

                const url = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > span > a").attributes.getNamedItem("href").value
                const title = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > span > a").textContent.trim()
                const views = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div.videoDetailsBlock > div > span > var").textContent.trim()
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

    if (data === null) {
        return await collectModelVideos(page, url, sort, pageIndex)
    }
}

module.exports = collectPornstarVideos