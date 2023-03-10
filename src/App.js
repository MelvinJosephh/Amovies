
import React, {useState, useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Button, Form, FormControl } from 'react-bootstrap';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=350d51e49e1f4c752c4d5bed658a8732";
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=350d51e49e1f4c752c4d5bed658a8732&query";
function App() {

const [movies, setMovies]=useState([]);
const [query, setQuery]=useState('');


useEffect(()=>{
  fetch(API_URL)
  .then((res)=>res.json())
  .then(data=>{
    console.log(data)
    setMovies(data.results);
  })
}, [])

const searchMovie = async(e)=>{
        e.preventDefault();
        console.log("Searching");
      try{
        const url=`https://api.themoviedb.org/3/search/movie?api_key=350d51e49e1f4c752c4d5bed658a8732&query=${query}`;
        const res= await fetch(url);
        const data= await res.json();
        console.log(data);
        setMovies(data.results);
      }
      catch(e){
      console.log(e);
      }
}
const changeHandler=(e)=>{
  setQuery(e.target.value);
}
  return (
   <>
   <Navbar bg="dark" expand="lg" variant="dark">
    <Container fluid>
      <Navbar.Brand href="/home">MovieDB App</Navbar.Brand>
      <Navbar.Brand href="/home">Trending</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
      
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-3" style={{maxHeight:'100px'}} navbarScroll> </Nav>

      <Form className="d-flex" onSubmit={searchMovie}>
        <FormControl type="search" 
        placeholder="Movie Search" 
        className="me-2" 
        aria-label="search" 
        name="query" value={query} 
        onChange={changeHandler}>
        </FormControl>
        
        <Button variant="secondary" type="submit">Search</Button>
      </Form>



      </Navbar.Collapse>
   
    </Container>
   </Navbar>
    <div className="container">
      <div className="grid">
        {movies.map((movieReq)=>
        <MovieBox key={movieReq.id}{...movieReq}/>)}
      </div>
    </div>
   </>
  );
}

export default App;
