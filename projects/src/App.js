import React,{Component,useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom";
import Home from "./components/screens/home";
import Signup from "./components/screens/signup";
import Login from "./components/screens/login";
import Profile from "./components/screens/profile";
import CreatePost from "./components/screens/createpost";
import UserProfile from "./components/screens/userprofile";
import SubPost from "./components/screens/subpost";
import {initialState , reducer} from "./reducers/Userreducer";

export const userContext = createContext();

const Routing = () =>{
  const history = useHistory();
  const {state,dispatch} = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user});
      // history.push('/');
    }else{
      history.push('/login');
    }
  },[]);

  return (
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/getsubpost">
        <SubPost />
      </Route>
      <Footer />

    </Switch>
  );
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState);
  
    return (
      <userContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <hr />
        <Routing />
      </BrowserRouter>
      </userContext.Provider >
    );
  
}

export default App;
