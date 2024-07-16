import React, { useContext,useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { test } from './App';
import {toast} from 'react-toastify'
const EditMovies = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, setmovie} = useContext(test);

  const [formData, setFormData] = useState({
    id: '',
    movie: '',
    rating: '',
    imdb_url: ''
  });
  const isEdit = !!location.state && !!location.state.movie;

  useEffect(() => {
    if (isEdit) {
      const { movie } = location.state;
      setFormData({
        id: movie.id,
        movie: movie.movie,
        rating: movie.rating,
        imdb_url: movie.imdb_url
      });
    } }, [location.state, navigate]);
console.log(formData)
  
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
  const notif=()=>
  {
    toast.success(" Details edited successfully!",{position: "top-right",theme:"light"});
    
  }
  
const handleSubmit = (e) => {
  e.preventDefault();
  if (isEdit) {
    setmovie((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === formData.id ? formData : movie))
  }

  notif();

    navigate('/');
 
};
  return (
<div>    <h1 className="text-center">Edit </h1>
 <Form className="w-50 m-auto"  onSubmit={handleSubmit}>
 {isEdit && (

 <Form.Group controlId="formMovieId">
          <Form.Label>Movie ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            readOnly
          />
    </Form.Group>
  )}
 <Form.Group className="mb-3" controlId="formMovie">
     <Form.Label>Movie Name</Form.Label>
     <Form.Control type="Name"  name='movie'  value={formData.movie}
            onChange={handleChange}/>
     </Form.Group>

     <Form.Group className="mb-3" controlId="formRating">
     <Form.Label>Rating</Form.Label>
     <Form.Control type="Name"  name='rating' value={formData.rating}
            onChange={handleChange}/>
     </Form.Group>
    
     <Form.Group className="mb-3" controlId="formImdb">
     <Form.Label>IMDB URL</Form.Label>
     <Form.Control type="Name"  name='imdb_url'  value={formData.imdb_url}
            onChange={handleChange}/>
     </Form.Group>

   
   <Button variant="primary" type="submit" >
     Submit
   </Button>
 </Form>
 </div>  )
}

export default EditMovies