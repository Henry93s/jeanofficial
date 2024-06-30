import axios from 'axios';
import config from './config.json';

// Youtube api
// react app 에서 env 사용할 때는 REACT_APP_ 추가하여야 함
const API_KEY = config.YOUTUBE_API_KEY;
const CHANNEL_ID = config.CHANNEL_ID;
const youtube_data = [];
const youtubeFetch = async () => {
    

    await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
        // 최신 동영상 top 10 동영상 fetch
        params: {
            key: API_KEY,
            channelId: CHANNEL_ID,
            part: 'snippet,id',
            order: 'date',
            maxResults: 10,
            type: 'video'
        }
    })
    .then(res => {
        res.data.items.forEach(v => {
            const videoId = v.id.videoId;
            const videoTitle = v.snippet.title;
            const thumbnailUrl = v.snippet.thumbnails.high.url;
            
            console.log(`Video Title: ${videoTitle}`);
            console.log(`Thumbnail URL: ${thumbnailUrl}`);
            console.log(`Video ID: ${videoId}`);
            youtube_data.push(v);
        })
    })
    .catch((e) => {
        console.log(e);
    })
}
youtubeFetch();

export default youtube_data;