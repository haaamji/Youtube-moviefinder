import axios from 'axios';

const MYKEY ='AIzaSyCjDJxKwDGljKzqqqkikv1z6XF2hz6bn2g';

export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3/',
    params : {
        part : 'snippet' ,
        key : MYKEY,
        maxResults: 5
    }
});
