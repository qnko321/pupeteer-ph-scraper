# PornHub Scraper

This package heavily relies on Puppeteer

### Available functions:

#### **collectModelData(url: string)**

Example: 
```js
    collectModelData("/model/diana-rider").then(data => {
        console.log(data)
    })
```
This logs to the console:
```js
{
    info: {
        'Relationship status': 'Open',
        'Interested in': 'Guys and Girls',
        'City and Country': 'Tallin, Estonia',
        Gender: 'Couple',
        Measurements: '32-24-32',
        Height: `5' 7" (170cm)`,
        Ethnicity: 'White',
        'Hair Color': 'Red',
        'Fake Boobs': 'No',
        Piercings: 'No',
        Hometown: 'Tallinn',
        'Video Views': '90,459,877',
        'Profile Views': '20,713,202',
        'Videos Watched': '2,297'
    },
    about: 'Hi everyone, my name is Diana! \n' +
        "I am a nice girl who loves to fuck and show it to everyone.My young and resilient body craves your gaze!) Subscribe and follow me, you won't regret it )\n" +
        'And if you want something unique - subscribe to me at OnlyFans -> 💖 https://onlyfans.com/dianarider 💖\n' +
        '\n' +
        '💌 For cooperation 💌 piar@dianarider.com',
    ranks: {
        model: '183',
        weekly: '126',
        monthly: '183',
        lastMonth: '197',
        yearly: '282'
    }
}
```


#### **collectModelVideos(url: string, sort: string | undefined, pageIndex: number | undefined)**

##### Parameters:
###### sort: "mv" | "mr" | "tr" | "lg" | undefined (default: mr)
###### pageIndex: should be >= 1

Example:
```js
    collectModelVideos("/model/diana-rider", "mv", 2).then(data => {
        console.log(data)
    })
```
This logs to the console the models most watched videos from the second page:
```js
[
    {
        url: '/view_video.php?viewkey=6466988f1dc64',
        title: 'Stepsister Made Me Fuck Her for OnlyFans',
        views: '585K',
        rating: '91%',
        duration: '21:10',
        thumbnailUrl: 'https://ei.phncdn.com/videos/202305/19/431829411/original/(m=q8U2UMYbeafTGgaaaa)(mh=JJyVcn6JU_yUfxCd)0.jpg'
    },
    {
        url: '/view_video.php?viewkey=ph62a4cc72b386a',
        title: 'Трахнул Соседку и Кончил ей на Лицо',
        views: '555K',
        rating: '91%',
        duration: '14:23',
        thumbnailUrl: 'https://ei.phncdn.com/videos/202206/11/409740721/thumbs_10/(m=eafTGgaaaa)(mh=9RBAoYXC_Cp9fuVT)15.jpg'
    },
    ...
]
```


#### **collectStartVideos(pageIndex: number | undefined)**

##### Parameters:
###### pageIndex: should be >= 1

Example:
```js
collectStartVideos(20).then(data => {
    console.log(data)
})
```

This logs to the console videos from pornhub's index page on page 20:

```js
[
    {
        url: '/view_video.php?viewkey=6526136404970',
        title: 'PrimeLesbian Fucking my Best Friend in the Bath Tub',
        views: '16.9K',
        rating: '84%',
        duration: '10:14',
        thumbnailUrl: 'https://ei.phncdn.com/videos/202310/11/440991741/original/(m=qKPXSYYbeafTGgaaaa)(mh=7lrWt3YvMbKgLCO3)0.jpg',
        author: { name: 'Prime Lesbian', url: '/channels/prime-lesbian' }
    },
    {
        url: '/view_video.php?viewkey=652704ed79bce',
        title: 'My Wife Woke Up While I Was Her Cheating With Her Stepsister',
        views: '760K',
        rating: '92%',
        duration: '17:43',
        thumbnailUrl: 'https://ei.phncdn.com/videos/202310/11/441038181/original/(m=qSJ7VYYbeafTGgaaaa)(mh=b6eE9fn_jv172BoH)0.jpg',
        author: { name: 'Diana Rider', url: '/model/diana-rider' }
    },
    ...
]
```


#### **collectStartVideos(pageIndex: number | undefined)**

##### Parameters:
###### pageIndex: should be >= 1

Example:
```js
collectVideoData("/view_video.php?viewkey=64dcc46fbdfe2").then(data => {
    console.log(data)
})
```

This logs data about the video which url was passed:

```js
{
    orientation: 'Straight',
    production: 'Homemade',
    pornstars: [ { name: 'No', url: '/pornstar/no' } ],
    categories: [
        'Amateur',
        'Handjob',
        'Hardcore',
        'Teen (18+)',
        'POV',
        'Red Head',
        'Russian',
        '60FPS',
        'Verified Amateurs',
        'HD'
    ],
    published: { year: '2023', month: '08', day: '16' },
    duration: 1361,
    actionTags: 'Pussy Licking:492,Fingering:595',
    relatedVideosUrl: 'https://www.pornhub.com/video/player_related_datas?id=437543131',
    thumbnailUrl: 'https://ei.phncdn.com/videos/202308/16/437543131/original/(m=q7ZV6TYbeaAaGwObaaaa)(mh=QOzNt0V7hxGdcTOk)0.jpg',
    title: 'I mistook my Stepsister for a Stranger from the Club and Fucked her Rough.',
    mediaDefinitions: [
        {
            defaultQuality: false,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202308/16/437543131/1080P_4000K_437543131.mp4/master.m3u8?validfrom=1699015805&validto=1699023005&ipa=78.83.124.60&hdl=-1&hash=69wYXC9CXdxE60acL8Q7V3UiNNM%3D',
            quality: '1080'
        },
        {
            defaultQuality: false,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202308/16/437543131/240P_1000K_437543131.mp4/master.m3u8?validfrom=1699015805&validto=1699023005&ipa=78.83.124.60&hdl=-1&hash=u5tL9FEhB9ezh9vYFVXcrYKvo4k%3D',
            quality: '240'
        },
        {
            defaultQuality: false,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202308/16/437543131/480P_2000K_437543131.mp4/master.m3u8?validfrom=1699015805&validto=1699023005&ipa=78.83.124.60&hdl=-1&hash=kZBZ8iKJ3s7IRBj7ZsIH4rC2MBU%3D',
            quality: '480'
        },
        {
            defaultQuality: true,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202308/16/437543131/720P_4000K_437543131.mp4/master.m3u8?validfrom=1699015805&validto=1699023005&ipa=78.83.124.60&hdl=-1&hash=Ixda06Gc7AeY0HJ7k1GBhHXsuF0%3D',
            quality: '720'
        }
    ],
    nextVideo: {
        thumbnailUrl: 'https://ei.phncdn.com/videos/202307/31/436512381/original/(m=qXMXVSYbecuKGgaaaa)(mh=u__2_I0EKdTgN9zY)0.jpg',
        duration: 1318,
        url: '/view_video.php?viewkey=64c7703b6ff88',
        views: '7M',
        rating: 90
    },
    author: {
        name: 'Diana Rider',
        url: '/model/diana-rider',
        subscribers: '202K',
        videoCount: '64'
    },
    tags: [
        'Point Of View',
        'Rough',
        'Step Sis',
        'Eye Contact',
        'Bj',
        'Cow Girl',
        'Real Couple Homemade',
        'Amateur',
        'Fantasy',
        'Familly Therapy',
        'Natural Tits',
        'Cum On Pussy',
        'Classic Taboo',
        'Step Sis Share Bed',
        'Pussy Licking',
        'Diana Rider'
    ],
    views: '8.3M',
    rating: '89%',
    likes: '15207',
    dislikes: '1695',
    favouritesCount: '12K'
}
```

#### **searchVideos(query: string, pageIndex: number | undefined)**

##### Parameters:
###### query: any string
###### pageIndex: should be >= 1

Example:
```js
searchVideos("no nut november", 2).then(data => {
    console.log(data)
})
```

This logs videos found when searching for "no nut november" on page 2:

```js
[
    {
        url: '/view_video.php?viewkey=ph5dd1a18ca6112',
        title: 'PAWG Let Me Fuck Her For A Popeyes Chicken Sandwich',
        views: '11.9M',
        rating: '76%',
        duration: '13:54',
        thumbnailUrl: 'https://ei.phncdn.com/videos/201911/17/262349162/thumbs_10/(m=eafTGgaaaa)(mh=gdZ1thptjcXpcgH4)11.jpg'
    },
    {
        url: '/view_video.php?viewkey=ph63610e6d964a1',
        title: 'FemDom No Nut November Challenge - Day 1 [Mutual Masturbation] [Handjob] [Fingering Wet Pussy]',
        views: '86.3K',
        rating: '81%',
        duration: '14:16',
        thumbnailUrl: 'https://ei.phncdn.com/videos/202211/01/418655421/original/(m=eafTGgaaaa)(mh=3fy-S74wY9dcTk51)1.jpg'
    },
    ...
]
```