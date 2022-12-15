import React, { useState, useEffect } from "react";
import "../Post/Post.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Buffer } from 'buffer';
function Mypost(props) {
  const ingredients = props.ingredients;
  const recipe = props.recipe;
  const [isReadMore1, setIsReadMore1] = useState(true);
  const toggleReadMore1 = () => {
    setIsReadMore1(!isReadMore1);
  };
  const [isReadMore2, setIsReadMore2] = useState(true);
  const toggleReadMore2 = () => {
    setIsReadMore2(!isReadMore2);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/getrecipe").then((response) => {
          
            console.log(response.data.FoodRecipe[0]._id);
    }).catch((err) => {
      console.log(err);
    })
  },[]);

  function handleDelete()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/deleterecipe",{data: {
      id: props.id
    },body:{id:props.id}}).then((response)=>{
      console.log(response);
      // alert to give
    }).catch((err)=>{
      console.log(err);
    })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location="/mypost";
      }
      else{
        Swal.fire(
          'Oops!',
          'Your file is safe.',
          'success'
        )
      }
    })
    // axios.delete("http://localhost:5000/deleterecipe",{data: {
    //   id: props.id
    // },body:{id:props.id}}).then((response)=>{
    //   console.log(response);
    //   // alert to give
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }

  const editPath="/editpost/"+props.id;

  return (
    <div className="post">
      <div class="dropdown">
        <button class="dropbtn"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
        <div class="dropdown-content">
          <a href={editPath}>Edit</a>
          <a onClick={handleDelete}>Delete</a>
        </div>
      </div>
      <h3>{props.name}</h3>
      <h5>{props.type}</h5>
      <p>
        Posted By <strong> {props.chef}</strong>
      </p>
      <p>
        {" "}
        <strong>Ingredients :</strong>
        {isReadMore1 ? ingredients.slice(0, 150) : ingredients}
        <span onClick={toggleReadMore1} className="read-or-hide">
          {isReadMore1 ? "...read more" : " show less"}
        </span>
      </p>
      <p>
        {" "}
        <strong>Recipe :</strong>
        {isReadMore2 ? recipe.slice(0, 150) : recipe}
        <span onClick={toggleReadMore2} className="read-or-hide">
          {isReadMore2 ? "...read more" : " show less"}
        </span>
      </p>
      <img src={props.img} alt={props.recipe} />
      <br />
      <i class="far fa-heart like">
        <span>15</span>
      </i>
    </div>
  );
}

export default Mypost;
