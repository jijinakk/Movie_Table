import { Rating } from '@mui/material';
import React, { useContext, useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { test } from './App';
import { toast } from 'react-toastify';
function Create  () {
 
  const [movies, setmovies] = useState("")
  const [rating, setrating] = useState("");
  const [imdb, setimdb] = useState("")

//   const getmovie =(item)=>{
//     setmovies(item.target.value);
//  }
//  const getrating=(item)=>{
//   setrating(item.target.value);
//  }
 
//  const getimdb=(item)=>{
//   setimdb(item.target.value);
//  }
 
//  const obj={movies:movies,Rating:rating,IMDB:imdb}
// console.log(obj)
const [input,setinput]=useState({movie:"",rating:"",imdb_url:""})

const {setshow,movie,setmovie,api,}=useContext(test)
const [counter, setCounter] = useState(101); 
console.log(test);
console.log(movie);
useEffect(() => {
 setshow(false)
}, [])
const getinput=(item)=>
  {
    console.log(item.target.value);
    setinput({...input,[item.target.name]:item.target.value})
  }
  const nav=useNavigate()
const onsubmit=(item)=>
  {
    item.preventDefault();
    setCounter(prevCounter => prevCounter + 1);
      console.log(counter)
    const newEntry = { ...input, id: counter };

    const newlist=[...movie,newEntry]
setmovie(newlist);
notify();
console.log(input)
    nav('/');
  }
  const notify =()=>
    {
      toast.success("New Movie Created successfully ", {
        position: "top-center"},{theme:"colored"
      });
    }
return (
  <div>    <h1 className="text-center">Create New</h1>
 
  <Form className="w-50 m-auto" onSubmit={onsubmit}>

  <Form.Group className="mb-3" controlId="formMovie">
      <Form.Label>Movie Name</Form.Label>
      <Form.Control type="Name" name='movie' placeholder="Enter the movie" onChange={getinput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRating">
      <Form.Label>Rating</Form.Label>
      <Form.Control type="Name" name='rating'  placeholder="Enter your Rating" onChange={getinput}/>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formImdb">
      <Form.Label>IMDB URL</Form.Label>
      <Form.Control type="Name" name='imdb_url' placeholder="Enter IMDB URL" onChange={getinput} />
      </Form.Group>

    
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
)
}
  
export default () => <Create />;

