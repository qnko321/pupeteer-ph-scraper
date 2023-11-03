const collectModelData = require("./endpoints/model/collectData")
const collectModelVideos = require("./endpoints/model/collectVideos")
const collectStartVideos = require("./endpoints/collectStartVideos")
const searchVideos = require('./endpoints/searchVideos')
const collectVideoData = require("./endpoints/collectVideoData")

module.exports = {
    collectModelData,
    collectModelVideos,
    collectStartVideos,
    searchVideos,
    collectVideoData
}