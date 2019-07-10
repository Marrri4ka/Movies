import React, {Component} from 'react';
import Pagination from './common/pagination';
import { getMovies, deleteMovie} from '../services/movieService';
import {getGenres} from '../services/genreService';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {toast} from 'react-toastify';
import SearchBox from './searchBox';

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery:'',
        selectedGenre: null,
        genres: [],
        sortColumn: {path:'title', order: 'asc'}
      };

      async componentDidMount() {
          const{data} = await getGenres();
          const genres=[{_id:'',name:"All Gennres"},...data];
          const {data: movies} = await getMovies();
        this.setState({movies, genres});
      }

      handleDelete= async movie => {
          const originalMovies = this.state.movies;
          const movies = originalMovies.movies.filter(m=> m._id !== movie._id);
          this.setState({movies});
          try{

          await deleteMovie(movie._id);
          }
          catch(ex){
              if(ex.response && ex.response.status === 404)
              toast.error('This movie was already deleted!');

              this.setState ({movies: originalMovies});
          }

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
          this.setState({selectedGenre: genre, searchQuery:"", currentPage:1});
      };

      handleSort = sortColumn => {
        this.setState({ sortColumn });
      };

      getPageData = () => {
        const {pageSize, currentPage,movies: allMovies,selectedGenre,sortColumn,searchQuery} = this.state;
       let filtered = allMovies;
       if(searchQuery)
       filtered=allMovies.filter(m=>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        else if(selectedGenre && selectedGenre._id)
        filtered = allMovies.filter (m=> m.genre._id===selectedGenre._id);
     
       const sorted=  _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
       const movies =paginate(sorted,currentPage,pageSize);
       return {totalCount: filtered.length, data: movies};
      };

      handleSearch= query => {
          this.setState({searchQuery: query , selectedGenre: null,currentPage:1});
      }
    
     render() { 
        const { length: count }= this.state.movies;
        const {pageSize, currentPage,sortColumn,searchQuery} = this.state;
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
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
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