import React from "react";

import '../styles/VideoItem.css'

//상위에서 넘어오면 props(객체나 메서드 상관없음)
const VideoItem = ({video, handleVideoSelect, handleVideoSave }) => {
    return (
        <div className='container card'>
            <div className='row'>
                <div className ='col-7'>
                    <img 
                        width='120' height='90'
                        src={video.snippet.thumbnails.default.url}
                        alt={video.snippet.title}
                        onClick={() => handleVideoSelect(video)} /> 
                        {/* 익명함수 파라미터 값 video */}
                </div>
                <div className ='col-5'>
                    {video.snippet.title.slice(0,20) + '...' }
                </div>
            </div>
            <div className='row'>
                    <div className='col rightAlign'>
                        <input
                            type='button' 
                            value='Save' 
                            className='btn btn-sm btn-primary'
                            onClick={() => handleVideoSave(video)} />
                    </div>
                </div>
        </div>
    );
}

export default VideoItem;