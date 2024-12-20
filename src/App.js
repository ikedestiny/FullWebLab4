import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/navbar';
import Register from './login/register';
import Home from './main/home';
import Login from './login/login';
import { Provider } from "react-redux";
import ProtectedRoutes from './login/ProtectedRoute';


function App() {
  return (

    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path='/home' element={<Home />} />

          </Route>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/' element={<Login />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
