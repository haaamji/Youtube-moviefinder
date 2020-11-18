import React from 'react';
import VideoItem from './VideoItem';
//videos로 검색결과를 받아서 보내줌
//상위값으로 handleVideoSelecte 추가
const VideoList = ({ videos, handleVideoSelect, handleVideoSave }) => {
  console.info('videoList', videos);
  const resultVideos = videos.map(video => {
    return (
      <VideoItem 
        key={video.etag}
        video = {video}
        handleVideoSelect={handleVideoSelect}
        //save이벤트 추가
        handleVideoSave={handleVideoSave}/>
    );
    //리턴문은 값을 반환하고 끝, 콘솔 실행 안됨
    });
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>{resultVideos}</div>
      </div>
    </div>
  );
};

export default VideoList;
