import React, { useState } from "react";
import "./Post.css";
function Post(props) {
  const ingredients = props.ingredients;
  const recipe=props.recipe;
  const [isReadMore1, setIsReadMore1] = useState(true);
  const toggleReadMore1 = () => {
    setIsReadMore1(!isReadMore1);
  };
  const [isReadMore2, setIsReadMore2] = useState(true);
  const toggleReadMore2 = () => {
    setIsReadMore2(!isReadMore2);
  };
  return (
    <div className="post">
      <h3>{props.name}</h3>
      <h5>{props.type}</h5>
      <p>Posted By <strong> {props.chef}</strong></p>
      <p> <strong>Ingredients :</strong>
      {isReadMore1 ? ingredients.slice(0, 150) : ingredients}
      <span onClick={toggleReadMore1} className="read-or-hide">
        {isReadMore1 ? "...read more" : " show less"}
      </span>
      </p>
      <p> <strong>Recipe :</strong>
      {isReadMore2 ? recipe.slice(0, 150) : recipe}
      <span onClick={toggleReadMore2} className="read-or-hide">
        {isReadMore2 ? "...read more" : " show less"}
      </span>
      </p>
      <img
        src={props.img}
        alt={props.recipe}
      />
      <br/><i class="far fa-heart like"><span>15</span></i>
    </div>
  );
}

export default Post;