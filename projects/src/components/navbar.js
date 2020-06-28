import React,{useContext,useReducer} from "react";
import {Link,useHistory} from "react-router-dom";
import { initialState, reducer } from "../reducers/Userreducer";
import { userContext } from "../App";


const Navbar = ()=>{
  const {state,dispatch} = useContext(userContext);
  const history = useHistory();

  const List = ()=> {
    if(state){
      // console.log(state.user);
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/createpost">
            Create post
              </Link>
        </li>,
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/profile">
            Profile
              </Link>
        </li>,
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/getsubpost">
            Followings
              </Link>
        </li>,
        <li className="nav-item">
          <button className="btn btn-danger" onClick={() =>{
            localStorage.clear();
            dispatch({type:"CLEAR"});
            history.push("/login");

          }}>
          Logout
          </button>
        </li>
      ]
    }else{
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
              </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            signup
              </Link>
        </li>
      ]
    }
  }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-2 avi">
        <Link className="navbar-brand blogo mr-5 ml-2" to={state?"/":"/login"}>
          Instagram
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mr-5" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-2">
            
           {List()}
            
          </ul>
        </div>
      </nav>

    );
}

export default Navbar;