import React,{useContext,useReducer} from "react";
import {Link,useHistory} from "react-router-dom";
import { initialState, reducer } from "../reducers/Userreducer";
import { userContext } from "../App";
import { listenerCount } from "nodemailer/lib/mailer";


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
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        <div
          id="modal1"
          class="modal"
          ref={searchModal}
          style={{ color: "black" }}
        >
          <div className="modal-content">
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map((item) => {
                return (
                  <Link
                    to={
                      item._id !== state._id
                        ? "/profile/" + item._id
                        : "/profile"
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch("");
                    }}
                  >
                    <li className="collection-item">{item.email}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => setSearch("")}
            >
              close
            </button>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;


{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        
      </ul>
      
    </div>
  </div>
</nav> */}