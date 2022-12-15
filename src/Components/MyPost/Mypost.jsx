import React, { useEffect, useState } from "react";
import MyCard from "./MyCard";
import axios from "axios";
import { Buffer } from 'buffer';

function Mypost()
{
  const [foodArr, setFoodArr] = useState([]);
  var user = localStorage.getItem("userName");
  user=(user===null?localStorage.getItem("name"):user);
  console.log(user);
  useEffect(() => {
    axios.get("http://localhost:5000/getrecipe").then((response) => {
            response.data.FoodRecipe.forEach((recipeData) => {
                // console.log(recipeData);
                let imgUrl = new Buffer.from(recipeData.img.data).toString("base64");
                setFoodArr(prevState => [...prevState,
                {
                    name: recipeData.name,
                    img: "data:image/png;base64,"+imgUrl,
                    ingredients : recipeData.ingredients,
                    recipe: recipeData.recipe,
                    type: recipeData.type,
                    chef: recipeData.userid,
                    id: recipeData._id
                }]);
            });
    }).catch((err) => {
      console.log(err);
    })
  },[]);
    return <div>
            {foodArr.length>0 && foodArr.map((food)=>{
             return user===food.chef?<MyCard key={food.id} id={food.id} name={food.name} type={food.type} recipe={food.recipe} chef={food.chef} ingredients={food.ingredients} img={food.img}/>:null;
            })}
    </div>;

}

export default Mypost;

// {foods.map((food)=>{
//     return <Post recipe={food.recipe} type={food.type} about={food.about} chef={food.chef} img={food.img}/>
// })}