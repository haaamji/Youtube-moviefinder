import React from 'react';

import '../styles/VideoDetail.css';

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div className='container centerAlign'>
        <div className='row'>
          <div className='col'>LOADING...💿</div>
        </div>
      </div>
    );
  }
  const youtubeSrc = `https:www.youtube.com/embed/${video.id.videoId}`; //변수 값을 안에 넣음 홑따옴표는 문자열로 그대로 넘어감
  return (
    <div className='videoContainer'>
      <div className='row'>
        <div className='col videoContainer centerAlign'>
          <iframe title='Youtube Video Player' 
          className='vdideo'
          allowFullScreen
          src={youtubeSrc}/>
        </div>
        <div className='row'>
          <div className='col'>
            <h5>{video.snippet.title}</h5>
            <p>{video.snippet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
