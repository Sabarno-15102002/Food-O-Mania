import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Upload/Upload.css";
import { useSearchParams } from "react-router-dom";
function Upload() {
  const [newImage, setnewImage] = useState({
    name: "",
    type: "",
    image: "",
    ingredients: "",
    recipe: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newImage.name);
    formData.append("type", newImage.type);
    formData.append("image", newImage.image);
    formData.append("ingredients", newImage.ingredients);
    formData.append("recipe", newImage.recipe);

    // const params=useSearchParams();
    // console.log(params);

    const url="http://localhost:5000/getrecipeinfo/63999ab0175a581a298d7984";
    useEffect(()=>{
        axios.get(url).then((response)=>{
          console.log(response)
        }).catch((err)=>{
          console.log(err);
        })
    },[])
    axios
      .post("http://localhost:5000/uploadrecipe", formData)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          name: "Upload Successful",
          showConfirmButton: true,
          confirmButtonColor: "#db334f",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          name: "Oops...",
          text: "Something went wrong!",
        });
      });
    setnewImage({
      name: "",
      type: "",
      image: "",
      ingredients: "",
      recipe: "",
    });
  };

  const handleChange = (e) => {
    setnewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setnewImage({ ...newImage, image: e.target.files[0] });
    console.log(newImage.image);
    var image = document.getElementById("image");
    var blah = document.getElementById("blah");
    const [file] = image.files;
    if (file) {
      blah.src = URL.createObjectURL(file);
      image.style.display = "none";
    }
  };
  return (
    <div class="upload-form">
      <h1 class="upload-heading">Edit Your Recipe</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div class="input-div">
          <input
            type="text"
            id="name"
            placeholder="Name of Your Menu"
            name="name"
            value={newImage.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div class="input-div">
          <input
            type="text"
            id="name"
            placeholder="Type of Your Menu"
            name="type"
            value={newImage.type}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div class="input-div">
          <textarea
            id="ingredients"
            name="ingredients"
            placeholder="Share Ingredients"
            onChange={handleChange}
            value={newImage.ingredients}
            rows={2}
            cols={40}
            required
          />
        </div>
        <div class="input-div">
          <textarea
            id="recipe"
            name="recipe"
            placeholder="Share Recipe"
            onChange={handleChange}
            value={newImage.recipe}
            rows={2}
            cols={40}
            required
          />
        </div>
        <div class="input-div">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
            required
          />
          <img id="blah" src="#" />
        </div>
        <div>
          <button
            type="submit"
            class=" btn btn-lg btn-danger button-none mobilebutton"
          >
            Share
          </button>
          <button
            type="reset"
            class=" btn btn-lg btn-danger button-none mobilebutton"
            onClick={() => {
              window.location = "/editpost";
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
export default Upload;
