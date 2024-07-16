import React,{useState,useEffect,useContext}from 'react'
import { Table,Modal,Button } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { test } from './App';
import { toast } from 'react-toastify';

const TableApi = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [search, setsearch] = useState("")
    const [filteredData, setFilteredData] = useState([]);

    const navigate=useNavigate();
    const {setshow,setinput,movie,setmovie,api}=useContext(test);
    // console.log(test);
    console.log(movie);
    
     
  useEffect(() => {
    setshow(true);
    setFilteredData(movie); // Initialize filtered data with all movies
  }, [movie]);
    const handleShowModal = (movie) => {
      setSelectedMovie(movie);
      setShowModal(true);
      console.log(selectedMovie);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    
    const handleShowDeleteModal = (movie) => {
      setSelectedMovie(movie);
      setShowDeleteModal(true);
      console.log()
    };
  
    const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
      // setSelectedMovie(null);
    };
    const handleDelete = () => {
      const aftDelete=movie.filter(movie => movie.id !== selectedMovie.id)
      setmovie(aftDelete)
      notifyDelete();
      handleCloseDeleteModal();
    };
    const notifyDelete =()=>
      {
        toast.warn("Movie Deleted !", {
          position: "top-left",theme:"dark"
        });
      }
    const create =() =>
      {
       navigate(`/create`)
      };
      useEffect(() => {
      
        console.log(setinput);
         
        }, [setinput])
            const handleSearch = () => {

        const filtered= movie.filter(movie =>
          (movie.movie && movie.movie.toLowerCase().includes(search?.toLowerCase() ?? '')));
          setFilteredData(filtered);

        };
        const editMovies =(movie) =>
          {
           navigate(`/edit`,{ state: { movie } })
          };
          
  return (
    <div>
      
          
     Search <input
      type="text"
      style={{margin:'20px 10px 10px 10px'}}
      value={search}
      onChange={(e) => setsearch(e.target.value)}
/>
<button  style={{
        backgroundColor: 'green', color: 'white'}} onClick={handleSearch}>Search</button>

    <div><Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>Id</th>
        <th>Movie</th>
        <th>Rating</th>
        <th>imdb url</th>
      </tr>
    </thead>
    <tbody>
    {  filteredData.map((movie) =>
         {
          return (
          <tr>
            <td>{movie.id}</td>
          <td>{movie.movie}</td>
          <td>{movie.rating}</td>
          <td>{movie.imdb_url}</td>
          <td><FaEye  style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleShowModal(movie)}/>
          <CiEdit style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => editMovies(movie)}   />
          <MdDeleteOutline style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleShowDeleteModal(movie)} />
              </td>
          </tr>
          ) }
          )
  }
</tbody>
</Table>
<button      
 style={{ marginTop: '20px', backgroundColor: '#146F1E', color: 'white' ,padding: '8px 25px',}}
 onClick={create}>Create</button>
{
  <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {selectedMovie && (
            <>
              <p><strong>Movie:</strong> {selectedMovie.movie}</p>
              <p><strong>Rating:</strong> {selectedMovie.rating}</p>
            </>
          )}
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
     
               {/* Delete Modal */}
               <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the movie: {selectedMovie.movie}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

      </>
}
</div>
</div>
)
}
export default TableApi