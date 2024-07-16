import logo from './logo.svg';
import './App.css';
import TableApi from './TableApi';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './Create';
import { createContext, useState,useEffect } from 'react';
import axios from "axios";
import EditMovies from './EditMovies';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



const test=createContext()
function App() {
    const api="https://dummyapi.online/api/movies";
    useEffect(() => {
      axios.get(api).then((res)=>setmovie(res.data))  
    },[])
    const [movie, setmovie] = useState([])
    const [show,setshow]=useState(true)
   
   
  return (
    <div className="App">
      <test.Provider value={{movie, setmovie,show,setshow,api}}>
      <BrowserRouter>
      <ToastContainer autoClose={2000} />

      <Routes>
      <Route path="/" element={<TableApi />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit" element={<EditMovies />} />

        <Route></Route></Routes></BrowserRouter>
        </test.Provider>
    </div>
  );
}

export default App;
export {test}
