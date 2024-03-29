import React, {Component} from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';
import './App.css';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import {ToasrContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render(){
  return (
    <React.Fragment>
      <ToasrContainer/>
    <NavBar/>
    <main className="container">
      <Switch>
      <Route path="/login" component={LoginForm}/>
      <Route path="/movies/:id" component={MovieForm}/>
     
     <Route path="/movies" component={Movies}></Route>
     <Route path="/rentals" component={Rentals}></Route>
     <Route path="/customers" component={Customers}></Route>
     <Route path='/register' component={RegisterForm}></Route>
     <Route path="/notfound" component={NotFound}></Route>
     <Redirect from='/' exact to ='/movies'/>
     <Redirect to ='/not-found'/>
     </Switch>
  
    </main>
    </React.Fragment>
  );
}
}

export default App;
