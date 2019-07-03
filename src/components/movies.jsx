import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies} from '../services/fakeMovieService';
import Like from './common/like';
class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1 
      };

      handleDelete= movie => {
          const movies = this.state.movies.filter(m=> m._id !== movie._id);
          this.setState({movies});

      };

      handleLike=movie=> {
          const movies = [...this.state.movies];
          const index = movies.indexOf(movie);
          movie[index] = {...movies[index]};
          movies[index].liked = !movies[index].liked;
          this.setState({movies});

      }

      handlePageChange=page=> {
          this.setState({currentPage: page});

      }
    render() { 
        const { length: count }= this.state.movies;
        const {pageSize, currentPage} = this.state;
        if (count ===0) return <p>There are no movies in database!</p>
        return (
            <React.Fragment>
                <p>Showimg {count} movies in database</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.movies.map(movie=>(
                <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/></td>
                    <td><button onClick= {()=>this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        <Pagination itemsCount = {count}
         pageSize = {pageSize} 
         onPageChange = {this.handlePageChange}
         currentPage = {currentPage}/>
            </React.Fragment>
        
        );
    }
}
 
export default Movies;