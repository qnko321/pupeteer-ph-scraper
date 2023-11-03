const collectModelData = require("./endpoints/model/collectData")
const collectModelVideos = require("./endpoints/model/collectVideos")
const collectStartVideos = require("./endpoints/collectStartVideos")
const searchVideos = require('./endpoints/searchVideos')
const collectVideoData = require("./endpoints/collectVideoData")

collectVideoData("/view_video.php?viewkey=64dcc46fbdfe2").then(data => {
    console.log(data)
})

module.exports = {
    collectModelData,
    collectModelVideos,
    collectStartVideos,
    searchVideos,
    collectVideoData
}