# PornHub Scraper

**This package heavily relies on Puppeteer**

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
    pornstars: [],
    categories: [
        'Big Ass',
        'Fisting',
        'Hardcore',
        'Masturbation',
        'Anal',
        'Small Tits',
        'Squirt',
        'Exclusive',
        'Verified Amateurs',
        'HD'
    ],
    published: { year: '2022', month: '04', day: '24' },
    duration: 502,
    actionTags: '',
    relatedVideosUrl: 'https://www.pornhub.com/video/player_related_datas?id=406909281',
    thumbnailUrl: 'https://ei.phncdn.com/videos/202204/24/406909281/thumbs_26/(m=eaAaGwObaaaa)(mh=6lmqGYgLKtLEVCjh)8.jpg',
    title: 'Dildo 25 cm in the ASS . ANAL Fisting . Long SQUIRT',
    mediaDefinitions: [
        {
            defaultQuality: false,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202204/24/406909281/240P_1000K_406909281.mp4/master.m3u8?validfrom=1699024556&validto=1699031756&ipa=78.83.124.60&hdl=-1&hash=dY5hSnRcYEV%2FtObv9yq2ShQ8yDU%3D',
            quality: '240'
        },
        {
            defaultQuality: false,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202204/24/406909281/480P_2000K_406909281.mp4/master.m3u8?validfrom=1699024556&validto=1699031756&ipa=78.83.124.60&hdl=-1&hash=yDM%2FzJh7vnxrbHkC3sgC7XVzrGs%3D',
            quality: '480'
        },
        {
            defaultQuality: true,
            format: 'hls',
            videoUrl: 'https://ev-h.phncdn.com/hls/videos/202204/24/406909281/720P_4000K_406909281.mp4/master.m3u8?validfrom=1699024556&validto=1699031756&ipa=78.83.124.60&hdl=-1&hash=M7GQz1PdaPhhdB4wj0RgRLdeUjg%3D',
            quality: '720'
        }
    ],
    bestQualityMediaDefinition: {
        defaultQuality: true,
        format: 'hls',
        videoUrl: 'https://ev-h.phncdn.com/hls/videos/202204/24/406909281/720P_4000K_406909281.mp4/master.m3u8?validfrom=1699024556&validto=1699031756&ipa=78.83.124.60&hdl=-1&hash=M7GQz1PdaPhhdB4wj0RgRLdeUjg%3D',
        quality: '720'
    },
    nextVideo: {
        thumbnailUrl: 'https://ei.phncdn.com/videos/202207/14/411753281/original/(m=ecuKGgaaaa)(mh=R_3HIVnUQzSdg_dt)14.jpg',
        duration: 83,
        url: '/view_video.php?viewkey=ph62d05db4ed844',
        views: '29.2K',
        rating: 99
    },
    author: {
        name: 'Alesly',
        url: '/model/alesly',
        avatarUrl: 'https://ei.phncdn.com/(m=ewILGCjadOf)(mh=Pb9Bv2-awDNvmN2_)4a5bca29-e85f-48b4-8de1-3024cdc0e503.jpg',
        subscribers: '32.2K',
        videoCount: '105'
    },
    tags: [
        'Dialoghi Italiano',   
        'Italian',
        'Gros Cul',            
        'Big Ass Squirt',
        'Squirting Orgasm',    
        'Lesbian Squirt',
        'Wet Ass Pussy',       
        'Femme Fontaine Anal',
        'Free Pornhub Videos', 
        'Pov',
        'Anal Fisting',        
        'Anal Dildo',
        'Riding Dildo',        
        'Hard Fast Fuck',
        'Self Fuck',           
        'Shaking Orgasm'
    ],
    views: '538K',
    rating: '93%',
    likes: '1771',
    dislikes: '130',
    favouritesCount: '3K'
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