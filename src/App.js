import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import Home from "./Components/Home/Home"
import Register from './Components/Login/Register';
import Navbar from './Components/Navbar/Navbar';
import Upload from './Components/Upload/Upload';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mypost from './Components/MyPost/Mypost';
import EditPost from "./Components/EditPost/EditPost"


function App() {
  const [token,setToken] = useState(localStorage.getItem("token") || '');
  // console.log(token);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  },[token,localStorage])
  return (
    <Router>
  <Navbar/>
    <Routes>
      <Route path="/Register" exact element={<Register/>}/>
      <Route path="/" exact element={<HomePage token={token} />}/>
      {/* <Route path="/mypost" element={<Create />} /> */}
      <Route path="/register" element={<Register/> } />
      <Route path="/addpost" element={token?<Upload/>:<Register/> } />
      <Route path="/mypost" element={token?<Mypost/>:<Register/> } />
      <Route path="editpost/:id" element={token?<EditPost/>:<Register/>} />
    </Routes>
    {/* <Footer/> */}
  </Router>
  );
}

const HomePage = (props) => {
  if(props.token){
      return <Home itemsPerPage={15}/>;
    }
   else {
    return <Register/>;
  }
}
export default App;