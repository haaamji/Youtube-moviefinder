import React, { Component } from 'react';

class SaveList extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      video: null
    }
  }
  

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <ul className='list-group'>
              {this.props.videos.map(video =>
                <li key={1} className='list-group-item'>
                <div className='row'>
              <div className='col'>{video.snippet.title}</div>
                  <div className='col-auto'>
                    <input
                      type='button'
                      value='View'
                      className='btn btn-sm btn-outline-info disabled'
                      //function 사용 : 오류해결
                      onClick={function(e){
                        this.props.handleFavoriteSelect(video);
                      }.bind(this)}
                    />
                    <input
                      type='button'
                      value='Delete'
                      className='btn btn-sm btn-outline-danger'
                      onClick={function(e){
                        this.props.handleFavoriteDelete(video);
                      }.bind(this)}
                    />
                  </div>
                </div>
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SaveList;
