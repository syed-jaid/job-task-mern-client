import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import NavBar from './Components/NavBar';
import AddProduct from './Components/AddProduct';
import AllProduct from './Components/AllProduct';
import Update from './Components/Update';

function App() {
  return (
    <div >
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/add' element={<AddProduct></AddProduct>}></Route>
        <Route path='/all' element={<AllProduct></AllProduct>}></Route>
        <Route path='/update/:id' element={<Update></Update>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
