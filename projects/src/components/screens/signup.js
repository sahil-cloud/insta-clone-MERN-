import React,{useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";


const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(()=>{
    if(url){
      uploadfields();
    }
  },[url])


  const uploadpic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "sahiljasuja666");
    fetch("	https://api.cloudinary.com/v1_1/sahiljasuja666/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadfields = ()=>{
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }

    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const SignIn = () =>{
    if(image){
      uploadpic();
    }else{
      uploadfields();
    }

  
  }

  return (
    <div className="col-md-5 mx-auto mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Instagram</h2>
          <div>
            <div className="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputname"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                {/* <input className="file-path validate" type="text" /> */}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={() => SignIn()}
            >
              Submit
            </button>
            <hr />
            <Link to="/login" className="linkcol">
              <button type="submit" className="btn btn-primary">
                Have an account? Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
