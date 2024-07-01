import axios from 'axios';
import config from './config.json';
import Local_youtube from './Local_youtube';

// Youtube api
// 하루 무료 api 할당량이 끝나면 local datas 에서 가져옴(* Local_youtube.js)
const API_KEY = config.YOUTUBE_API_KEY;
const CHANNEL_ID = config.CHANNEL_ID;

const youtubeFetch = async () => {
    const youtube_data = [];
    try{
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            // 최신 동영상 top 10 동영상 fetch
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: 'snippet,id',
                order: 'date',
                maxResults: 10,
                type: 'video'
            }
        });
        console.log("api")
        res.data.items.forEach(v => {
            const videoId = v.id.videoId;
            const videoTitle = v.snippet.title;
            const thumbnailUrl = v.snippet.thumbnails.high.url;
            
            // &#39; 문자를 ' 문자로, &amp; 문자를 & 문자로 replace
            let newVideo_title = videoTitle.replace(/&#39;/g, '\'');
            newVideo_title = newVideo_title.replace(/&amp;/g, '&');
    
    
            const videoData = {
                title: newVideo_title,
                image_url: thumbnailUrl,
                video_url: `https://www.youtube.com/watch?v=${videoId}`
            };
            youtube_data.push(videoData);
        })
        return youtube_data;
    }
    catch (e) {
        // 유튜브 v3 하루 할당량이 끝났을 때 local datas 에서 가져옴(* Local_youtube.js)
        console.log("local")
        Local_youtube.forEach(v => {
            youtube_data.push(v);
        });
        return youtube_data;
    }
}

export default youtubeFetch;