import '../styles/App.css';
import React, { Component } from 'react';


import Youtube from '../apis/Youtube';
import ApiService from '../apis/ApiService'; //SpringBoot서버 연결 API

//화면 component
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import SaveList from './SaveList';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { //setState메서드로 값 변경가능!
      videos : [],//검색된 결과가 저장되는 배열
      slectedVideo: null,
      favoriteVideos : [] //즐겨찾기용 배열
    }       
  }

  handleSubmit = async(term) => {
    const res = await Youtube.get('/search', {
      params: { q : term }
    });
    //debugger;
    this.setState({
      videos: res.data.items
    });
  }
  //videoItem에서 전달된 비디오 객체를 SelectedVideo로 할당. 
  //SeletedVideo는 VideoDetail로 전달
  handleVideoSelect = (video) => {
    //debugger;
    this.setState({ slectedVideo: video}); // 값 넣음
    console.log('⭐',this.state.slectedVideo);//로고로 콘솔구별

  }
  handleFavoriteSelect = (video) => {
 //   debugger; 클릭핼 때 값이 넘어오는가
    console.log('🎈',video);
    this.setState({ slectedVideo: video });

  }

  handleFavoriteDelete = async(id) => {
    await ApiService.removeMovie(id)
    .then(res =>
        console.info('삭제성공')

      )
    .catch(err => {
      console.error("ApiService.removeMovie() 에러", err);
      alert("즐겨찾기 삭제 오류🤦‍♀️\n 관리자에게 문의하세요");
    });
  }

  //VideoItem -> VideoList -> App처리
  handleVideoSave = async(video) => {
//  alert('동영상 저장!');
    var temp = {
      video_id_videoId : video.id.videoId, 
      video_snippet_title : video.snippet.title, 
      video_snippet_description : video.snippet.description};

      console.log(temp); //저장을 눌렀을 때 데이터 표시
      //DB저장
      await ApiService.addMovie(temp)
      .then(res => {
        this.reloadFavoriteMovies();
      })
      .catch(err => {
        console.error("ApiService.addMovie() 에러", err);
        alert("즐겨찾기 목록 추가 오류🤦‍♀️\n 관리자에게 문의하세요");
      });

  }

  componentDidMount() {//라이프 사이클 이벤트, render후 실행
    console.info("componentDidMount");
    this.reloadFavoriteMovies(); //메서드 실행
  }

  reloadFavoriteMovies = async() => {//비동기
    await ApiService.fetchMovies()
      .then(res => {
//      debugger;
        let temps = res.data;
        var i = 0;
        var fvl = [];
        while ( i < temps.length ) {
          //TODO : 
          fvl.push({
            idx: temps[i].id,
            id: { 
              kind: "youtube#video", 
              videoId: temps[i].video_id_videoId},
            snippet: 
              {title: temps[i].video_snippet_title, 
              description: temps[i].video_snippet_description }
            });
          i += 1;
        }
        console.log(fvl);
        this.setState({favoriteVideos: fvl })
      })
      .catch(err => {
        console.error("ApiService.fetchMovies() 에러", err);
        alert("즐겨찾기 목록 불러오기 오류🤦‍♀️\n 관리자에게 문의하세요");
      });
  }

  render() {
    console.info('App render()');
    return (
      <div className='App container show-grid'>
        <div className='row'>
          <div className='col'>
            {/* 검색바 js주석 */}
            <SearchBar
              handleFormSubmit={this.handleSubmit}></SearchBar>
            <div className='row pt-3'>
              {/* pt :1~5 넓이 조절 */}
              <div className='col-8' style={{backgroundColor:'whitesmoke'}}>
                {/* 유튜브 플레이어 */}
                <VideoDetail
                  video={this.state.slectedVideo} />
                {/* 저장 리스트  */}
                <SaveList 
                  videos={this.state.favoriteVideos} 
                  handleFavoriteSelect={this.handleFavoriteSelect}
                  handleFavoriteDelete={this.handleFavoriteDelete}/>
                
              </div>
              <div className='col-4'>
                {/* 검색결과 */}
                <VideoList 
                  videos={this.state.videos}
                  handleVideoSelect = {this.handleVideoSelect}
                  handleVideoSave= {this.handleVideoSave}>  
                </VideoList>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

export default App;
