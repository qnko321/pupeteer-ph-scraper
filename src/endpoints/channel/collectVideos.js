// sort: "vi" (most viewed) | "mr" (most recent) | "ra" (top rated) | undefined  (default: mr)
// pageIndex: number | undefined (default) (default: 1)
async function collectChannelVideos(page, url, sort, pageIndex) {
    let fullUrl = `https://www.pornhub.com${url}/videos`
    let addedSort = false
    switch (sort) {
        case "vi":
        case "ra":
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

    console.log(fullUrl)

    return await page.evaluate(() => {
        const videosElements = document.querySelector("#showAllChanelVideos").children

        const videos = []

        for (let i = 0; i < videosElements.length; i++) {
            const video = videosElements.item(i)

            const url = video.querySelector("div > div.phimage > a").attributes.getNamedItem("href").value
            const title = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > span > a").textContent.trim()
            const views = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div > div > span > var").textContent.trim().replaceAll(" views", "")
            const rating = video.querySelector("div > div.thumbnail-info-wrapper.clearfix > div > div > div > div").textContent.trim()
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
        }

        return videos
    })
}

module.exports = collectChannelVideos