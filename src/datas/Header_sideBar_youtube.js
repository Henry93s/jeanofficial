import axios from 'axios';
import config from './config.json';
import Local_youtube from './Local_youtube';
import Local_shorts from './Local_shorts';

// Youtube api
// 하루 무료 api 할당량이 끝나면 local datas 에서 가져옴(* Local_youtube.js)
const API_KEY = config.YOUTUBE_API_KEY;
const CHANNEL_ID = config.CHANNEL_ID;

const youtubeFetch = async () => {
    const youtube_data = [];
    const shorts_data = [];
    const youtube = {};
    try{
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            // 최신 동영상 top 10 동영상 fetch
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: 'snippet',
                order: 'date',
                maxResults: 40,
                type: 'video',
                // videoDuration: 'medium'
            }
        });
        console.log("api 1")
        res.data.items.forEach(v => {
            const videoId = v.id.videoId;
            const videoTitle = v.snippet.title;
            const thumbnailUrl = v.snippet.thumbnails.high.url;
            const publishedAt = v.snippet.publishedAt;
            // 한국 지역 날짜 시간으로 변환
            const koreanTime = new Date(publishedAt).toLocaleDateString("ko-KR", {
                year: "numeric", month: "numeric", day: "numeric", weekday: "long"
                , hour: "numeric", minute: "numeric", second: "numeric"
            });

            // &#39; 문자를 ' 문자로, &amp; 문자를 & 문자로 replace
            let newVideo_title = videoTitle.replace(/&#39;/g, '\'');
            newVideo_title = newVideo_title.replace(/&amp;/g, '&');
    
    
            const videoData = {
                title: newVideo_title,
                image_url: thumbnailUrl,
                video_url: `https://www.youtube.com/watch?v=${videoId}`,
                uploadTime: koreanTime
            };
            youtube_data.push(videoData);
        })
        // youtube.youtube_data = youtube_data;

        const res2 = await axios.get(`https://www.googleapis.com/youtube/v3/search`,{
            // 최신 쇼츠 top 10 동영상 fetch
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: 'snippet',
                order: 'date',
                maxResults: 30,
                type: 'video',
                videoDuration: 'short'
                // q: '#Shorts'
            }
        });
        console.log("api 2")
        res2.data.items.forEach(v => {
            const videoId = v.id.videoId;
            const videoTitle = v.snippet.title;
            const thumbnailUrl = v.snippet.thumbnails.high.url;
            const publishedAt = v.snippet.publishedAt;
            // 한국 지역 날짜 시간으로 변환
            const koreanTime = new Date(publishedAt).toLocaleDateString("ko-KR", {
                year: "numeric", month: "numeric", day: "numeric", weekday: "long"
                , hour: "numeric", minute: "numeric", second: "numeric"
            });
            // &#39; 문자를 ' 문자로, &amp; 문자를 & 문자로 replace
            let newVideo_title = videoTitle.replace(/&#39;/g, '\'');
            newVideo_title = newVideo_title.replace(/&amp;/g, '&');
    
            // youtube_data 에 shortsData 가 있을 경우 중복 제거 작업
            const findIndex = youtube_data.findIndex(e => e.uploadTime === koreanTime);
            if(findIndex !== -1){
                youtube_data.splice(findIndex, 1);
            }


            const shortsData = {
                title: newVideo_title,
                image_url: thumbnailUrl,
                video_url: `https://www.youtube.com/shorts/${videoId}`,
                uploadTime: koreanTime
            };
            shorts_data.push(shortsData);
        })
        // 중복 데이터 제거한 youtube_data 를 반환할 youtube 에 포함
        youtube.youtube_data = youtube_data;
        youtube.shorts_data = shorts_data;

        return youtube;
    }
    catch (e) {
        // 유튜브 v3 하루 할당량이 끝났을 때 local datas 에서 가져옴(* Local_youtube.js)
        console.log("local")
        Local_youtube.forEach(v => {
            youtube_data.push(v);
        });
        youtube.youtube_data = youtube_data;

        Local_shorts.forEach(v => {
            shorts_data.push(v);
        });
        youtube.shorts_data = shorts_data;

        return youtube;
    }
}

export default youtubeFetch;