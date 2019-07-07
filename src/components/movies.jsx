import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import {Link} from 'react-router-dom';
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

      handleSort = sortColumn => {
        this.setState({ sortColumn });
      };

      getPageData = () => {
        const {pageSize, currentPage,movies: allMovies,selectedGenre,sortColumn} = this.state;
        const filtered = selectedGenre && selectedGenre._id
        ? allMovies.filter (m=> m.genre._id===selectedGenre._id) 
        : allMovies;

       const sorted=  _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
       const movies =paginate(sorted,currentPage,pageSize);
       return {totalCount: filtered.length, data: movies};
      };
    
     render() { 
        const { length: count }= this.state.movies;
        const {pageSize, currentPage,sortColumn} = this.state;
        if (count ===0) return <p>There are no movies in database!</p>

        const {totalCount, data: movies} = this.getPageData();
  
        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                    selectedItem={this.state.selectedGenre}
                    items={this.state.genres}
                     onItemSelect= {this.handleGenreSelect}/></div>
                <div className="col"><p>Showimg {totalCount} movies in database</p>
                <Link to='/movies/new' className="btn-primary" style={{marginBottom:20}}>New Movie</Link>
       <MoviesTable
        movies={movies}
        sortColumn={sortColumn} // Here!!
         onLike={this.handleLike} 
         onDelete={this.handleDelete}
         onSort = {this.handleSort}/>
        <Pagination 
        itemsCount = {totalCount}
         pageSize = {pageSize} 
         onPageChange = {this.handlePageChange}
         currentPage = {currentPage}/></div>
                
            </div>
        
        );
    }
}
 
export default Movies;