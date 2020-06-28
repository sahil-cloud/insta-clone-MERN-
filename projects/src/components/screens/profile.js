import React,{useEffect,useState,useContext} from "react";
import {userContext} from "../../App";

const Profile = () => {

  const {state ,dispatch} = useContext(userContext);
  // console.log(state);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const [post,setpost] = useState([]);

  useEffect(()=>{
    fetch("/mypost",{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result.mypost);
      setpost(result.mypost);

    })
  });

  const delPost = (postID) => {
    fetch(`/deletepost/${postID}`, {
      method: "delete",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = post.filter(item=>{
          return item._id !== result._id
        })
        setpost(newData);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(()=>{
    if(image){
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

          fetch("/updatepic",{
            method:"put",
            headers:{
              "Content-Type":"application/json",
              "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
            ,
            body:JSON.stringify({
              pic:data.url,
            })
          }).then(res=>res.json())
          .then(result=>{
            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.url }));
            dispatch({ type: "UPLOADPIC", payload: result.url });
            window.location.reload()
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[image])

  const uploadpic =(file) =>{
    setImage(file);
    
  }

  return (
    <>
    <div className="container">
      <div className="flex flex-wrap -m-4 mt-3">
        <div className="p-4 lg:w-1/2 ">
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 " src={state?state.pic:"Loading..!"} />
              
              <div className="flex-grow sm:pl-8">
  <h2 className="title-font font-medium text-lg text-gray-900"></h2>
                <h1 className="title-font font-medium text-lg text-gray-900 mb-3">{state?state.name:"Loading.."}</h1>
                <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                  <h6>{post.length} Posts</h6>
                  <h6>{state?state.followers.length:"Loading..!"} Followers</h6>
                  <h6>{state?state.following.length:"Loading..!"} Following</h6>

                </div>
                
              </div>
            </div>
        <div className="file-field input-field mb-5 mt-0">
          <div className="btn #64b5f6 blue darken-1">
            <span>Update Pic</span>
            <input type="file" onChange={(e) => uploadpic(e.target.files[0])} />
          </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
        </div>
        </div>
      </div>
      {/* <hr /> */}
      <br />
      {/* <br /> */}
      {/* <br /> */}
      <div className="mt-5">
        <hr />
      </div>
        <div class="flex flex-wrap -m-4 mt-5">
          { 
            post.map(item=>{
              // console.log(state.name)
              return (
                
                <div class="p-4 md:w-1/3" key={item._id}>
                 
                  <div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                    <h4 className="card-title" style={{fontWeight:"bold",fontSize:20}}>{state.name}
                      <i className="material-icons" style={{ float: "right" }}
                        onClick={() => { delPost(item._id) }}
                      > delete</i>
                    </h4>
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={item.photo} alt="Post" />
                    <div class="p-6">
              {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"></h2> */}
                      <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{item.title}</h1>
                      <p class="leading-relaxed mb-3">{item.body}</p>
                      <div class="flex items-center flex-wrap ">
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
          
        </div>
    </div>
      
    </>
  );
};

export default Profile;
