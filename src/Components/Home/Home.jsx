import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Post from "../Post/Post";
import foods from "../Post/food";
import axios from "axios";
import { Buffer } from 'buffer';
import "./Home.css";

function Home({ itemsPerPage })
{
  const [foodArr, setFoodArr] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/getrecipe").then((response) => {
            response.data.FoodRecipe.forEach((recipeData) => {
                console.log(recipeData);
                let imgUrl = new Buffer.from(recipeData.img.data).toString("base64");
                setFoodArr(prevState => [...prevState,
                {
                    name: recipeData.name,
                    img: "data:image/png;base64,"+imgUrl,
                    ingredients : recipeData.ingredients,
                    recipe: recipeData.recipe,
                    type: recipeData.type,
                    chef: recipeData.userid
                }]);
            });
    }).catch((err) => {
      console.log(err);
    })
  },[]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = foodArr.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(foodArr.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % foodArr.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function Food({ foodArr }) {
    return (
      <div>
           {foodArr.length>0 && foodArr.map((food)=>{
  return <Post name={food.name} type={food.type} recipe={food.recipe} chef={food.chef} ingredients={food.ingredients} img={food.img}/>
 })} 
    </div>
    );
  }

    return <>
    <Food foodArr={currentItems} />
    <div className="pagination row">
    <ReactPaginate
      breakLabel="..."
      nextLabel={<i className='fas fa-chevron-right'></i>}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<i className='fas fa-chevron-left'></i>}
      renderOnZeroPageCount={null}
    />
    </div>
  </>;

}

export default Home;

// {foodArr.length>0 && foodArr.map((food)=>{
//   return <Post name={food.name} type={food.type} recipe={food.recipe} chef={food.chef} ingredients={food.ingredients} img={food.img}/>
//  })}
