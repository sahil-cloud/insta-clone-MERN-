import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import {Link} from "react-router-dom";
// import { put } from "../../../../express/routers/post";


const Home = () => {
    const [data, setdata] = useState([]);
    const { state, dispatch } = useContext(userContext);

    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setdata(result.posts);
                // console.log(result.posts);
            });
    }, []);

    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setdata(newData);
            }).catch(err => {
                console.log(err);
            })
    }

    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setdata(newData);
            }).catch(err => {
                console.log(err);
            })
    }

    const makeComment = (text,postId) =>{
        // console.log(text,postedBy)
        fetch("/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
            },
            body:JSON.stringify({
                postId,
                text,

            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                } else {
                    return item
                }
            })
            setdata(newData)
        }).catch(err=>{
            console.log(err);
        })
    }

    

    return (
        <>
            <div className="container">
                <div className="row mt-4">

                    {
                        data.map(item => {
                            return (
                                <div className="col-sm-4 ">
                                    <div className="card" style={{ width: "22rem" }} key={item._id}>
                                        <h5 className="card-title"><Link to={
                                            item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"
                                        }>{item.postedBy.name}</Link></h5>
                                        <img src={item.photo} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            {
                                                item.likes.includes(state._id) ?
                                                    <i className="material-icons" style={{ color: "red" }}
                                                        onClick={() => { unlikePost(item._id) }}
                                                    >favorite</i>
                                                    :
                                                    <i className="material-icons" style={{ color: "red" }}
                                                        onClick={() => { likePost(item._id) }}
                                                    >favorite_border</i>
                                            }


                                            <p className="card-text">{item.likes.length} likes</p>
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text mb-3">{item.body}</p>
                                            {/* <p className="card-text">Comments:</p> */}
                                            <hr />
                                            {
                                                item.comments.map(record=>{
                                                    return (
                                                    <h6><span style={{fontWeight:"bold"}} className="mr-2 mb-2">{record.postedBy.name}</span><span>{record.text}</span></h6>
                                                    );
                                                })
                                            }
                                            <div class="input-field">
                                                <form onSubmit={(e)=>{
                                                    e.preventDefault();
                                                    // console.log(e.target[0].value)
                                                    makeComment(e.target[0].value,item._id)
                                                    e.target[0].value = ""
                                                }}>
                                                    <input key={item._id} id="first_name2" type="text" class="validate" placeholder="Add a comment" />

                                                </form>                                                
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
}

export default Home;