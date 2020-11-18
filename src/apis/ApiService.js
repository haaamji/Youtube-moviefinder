import Axios from 'axios';

const SPRING_API_URL = 'http://localhost:8090/youtube';

class ApiService{
//FETCH : (⭐어디를 가서) 가져오다, 불러오다
    fetchMovies(){
        return Axios.get(SPRING_API_URL);
    }
    fetchMovieByID(id){
        return Axios.get(SPRING_API_URL +'/' +id); //OLD
    //  return Axios.get(`${SPRING_API_URL}/${id}`); 최신 방법! 
    }
    
    addMovie(video){
        return Axios.post(SPRING_API_URL, video);
    }
    removeMovie(id){
        return Axios.delete(SPRING_API_URL + '/' + id);
    }
}
//class를 바로 new 인스턴스로 생성해서 사용
export default new ApiService();