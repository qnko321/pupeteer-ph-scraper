const puppeteer = require('puppeteer') ;

async function searchVideos(url) {
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

    let resolveJson;
    let json_promise = new Promise((re, _) => {
        resolveJson = re
    })

    let resolveHtml;
    let html_promise = new Promise((re, _) => {
        resolveHtml = re
    })

    page.on("requestfinished", async (request) => {
        if (request.resourceType() !== "document") { return }

        let text = await request.response().text()

        const start = text.indexOf("{", text.indexOf("var flashvars_"))
        const end = text.indexOf("};", start) + 1

        const json = JSON.parse(text.slice(start, end))

        const duration = json.video_duration
        const actionTags = json.actionTags
        const relatedVideosUrl = json.related_url
        const thumbnailUrl = json.image_url
        const title = json.video_title
        const mediaDefinitions = json.mediaDefinitions

        for (let i = 0; i < mediaDefinitions.length; i++) {
            if (typeof mediaDefinitions[i].quality !== "string") {
                mediaDefinitions.splice(i, 1)
                i--
            }
        }

        let bestIndex = 0
        let bestQuality = 0
        for (let i = 0; i < mediaDefinitions.length; i++) {
            const mediaDefinition = mediaDefinitions[i]
            const quality = Number(mediaDefinition.quality)

            if (quality > bestQuality) {
                bestQuality = quality
                bestIndex = i
            }
        }

        const bestQualityMediaDefinition = mediaDefinitions[bestIndex]

        const nextVideo = {
            thumbnailUrl: json.nextVideo.thumb,
            duration: json.nextVideo.duration,
            url: json.nextVideo.nextUrl,
            views: json.nextVideo.views,
            rating: json.nextVideo.rating
        }
        const start2 = text.indexOf("window.dataLayer.push(") + "window.dataLayer.push(".length
        const end2 = text.indexOf("});", start2) + 1

        const json2 = JSON.parse(text.slice(start2, end2).replaceAll("'", '"'))

        const orientation = json2.videodata.video_orientation
        const production = json2.videodata.video_production
        const pornstarNames = json2.videodata.pornstars_in_video.split(',')

        const pornstars = []

        if (pornstarNames.length !== 1 && pornstarNames[0] !== "no") {
            for (let i = 0; i < pornstarNames.length; i++) {
                const pornstarName = pornstarNames[i]
                const url = `/pornstar/${pornstarName.toLowerCase().replaceAll(' ', '-')}`
                pornstars.push({
                    name: pornstarName,
                    url
                })
            }
        }

        const categories = json2.videodata.categories_in_video.split(",")
        const published = {
            year: json2.videodata.video_date_published.slice(0, 4),
            month: json2.videodata.video_date_published.slice(4, 6),
            day: json2.videodata.video_date_published.slice(6, 8)
        }

        resolveJson({
            orientation,
            production,
            pornstars,
            categories,
            published,
            duration,
            actionTags,
            relatedVideosUrl,
            thumbnailUrl,
            title,
            mediaDefinitions,
            bestQualityMediaDefinition,
            nextVideo,
        })
    })

    await page.setViewport({width: 1920, height: 900});

    let fullUrl = `https://www.pornhub.com${url}`

    await page.goto(fullUrl, {
        waitUntil: "domcontentloaded"
    });

    page.evaluate(() => {
        let author
        let authorUrl
        try {
            author = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > div > span > a").textContent.trim()
            authorUrl = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > div > span > a").attributes.getNamedItem("href").value
        } catch {
            author = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > div > a").textContent.trim()
            authorUrl = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > div > a").attributes.getNamedItem("href").value
        }

        const tagsElements = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div:nth-child(4) > div.tagsWrapper").children;
        const tags = []
        for (let i = 0; i < tagsElements.length; i++) {
            const tagElement = tagsElements.item(i)

            try {
                if (tagElement.tagName !== "A") { continue }
                const tag = tagElement.textContent.trim()
                const words = tag.split(' ')
                const newWords = words.map((word, _) => {
                    return word[0].toUpperCase() + word.slice(1, word.length)
                })
                tags.push(newWords.join(' '))
            } catch {}
        }

        const views = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-menu > div.ratingInfo > div.views > span").textContent
        const rating = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-menu > div.ratingInfo > div.ratingPercent > span").textContent
        const likes = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-menu > div.allActionsContainer > div.votes-fav-wrap > div.gtm-event-link.js-voteUp.icon-wrapper.tooltipTrig > span").attributes.getNamedItem("data-rating").value
        const dislikes = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-menu > div.allActionsContainer > div.votes-fav-wrap > div.gtm-event-link.js-voteDown.icon-wrapper.tooltipTrig > span").attributes.getNamedItem("data-rating").value
        const favouritesCount = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-menu > div.allActionsContainer > div.votes-fav-wrap > div.gtm-event-link.js-favoriteBtn.icon-wrapper.favorite-wrapper.tooltipTrig > span").textContent.trim()
        const authorSubscribers = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > span:nth-child(4)").textContent.trim().replaceAll(" Subscribers", "")
        const authorVideosCount = document.querySelector("#hd-leftColVideoPage > div:nth-child(1) > div.video-actions-container > div.video-actions-tabs > div.video-action-tab.about-tab.active > div.video-detailed-info > div.video-info-row.userRow > div.userInfo > span:nth-child(2)").textContent.trim().replaceAll(" Videos", "")

        return {
            author: {
                name: author,
                url: authorUrl,
                subscribers: authorSubscribers,
                videoCount: authorVideosCount
            },
            tags,
            views,
            rating,
            likes,
            dislikes,
            favouritesCount
        }
    }).then(result => {
        resolveHtml(result)
    })

    const jsonData = await json_promise
    const htmlData = await html_promise

    browser.close()
    return Object.assign({}, jsonData, htmlData)
}

module.exports = searchVideos