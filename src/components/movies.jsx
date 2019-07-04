import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: {path:'title', order: 'asc'}
      };

      componentDidMount() {
          const genres=[{_id:'',name:"All Gennres"},...getGenres()]
        this.setState({movies: getMovies(), genres});
      }

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

      };

      handleGenreSelect = genre => {
          this.setState({selectedGenre: genre, currentPage:1});
      };
    
     render() { 
        const { length: count }= this.state.movies;
        const {pageSize, currentPage,movies: allMovies,selectedGenre,sortColumn} = this.state;
        if (count ===0) return <p>There are no movies in database!</p>
        const filtered = selectedGenre && selectedGenre._id
         ? allMovies.filter (m=> m.genre._id===selectedGenre._id) 
         : allMovies;

        const sorted=  _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies =paginate(sorted,currentPage,pageSize);
        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                    selectedItem={this.state.selectedGenre}
                    items={this.state.genres}
                     onItemSelect= {this.handleGenreSelect}/></div>
                <div className="col"><p>Showimg {filtered.length} movies in database</p>
       <MoviesTable
        movies={movies}
         onLike={this.handleLike} 
         onDelete={this.handleDelete}
         onSort = {this.handleSort}/>
        <Pagination 
        itemsCount = {filtered.length}
         pageSize = {pageSize} 
         onPageChange = {this.handlePageChange}
         currentPage = {currentPage}/></div>
                
            </div>
        
        );
    }
}
 
export default Movies;