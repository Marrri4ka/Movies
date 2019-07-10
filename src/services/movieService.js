import http from './httpService';

const apiEndPoint = 'http://localhost:3900/api/movies';
export function getMovies(apiEndPoint){
   return  http.get();
}

export function deleteMovie(movieId){
    return http.delete(apiEndPoint+ '/' + movieId);
}