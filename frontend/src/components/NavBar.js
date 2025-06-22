import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ct from './Ct';

const Navbar = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()

  let Logout=()=>{
        obj.updatestate({"token":"","email":"","name":""})
        navigate("/")
  }

  return (
    <nav>
      <Link to="/">Feed</Link>
      {obj.state.token!==""&&<Link to="/upload">Upload</Link>}
      {obj.state.token===""&&<Link to="/login">Login</Link>}
      {obj.state.token===""&&<Link to="/signup">Signup</Link>}
      {obj.state.token !== '' && (
        <div className='name'>
          <div>{obj.state.name}</div>
          <div className='logout'><button onClick={Logout}>Logout</button></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;