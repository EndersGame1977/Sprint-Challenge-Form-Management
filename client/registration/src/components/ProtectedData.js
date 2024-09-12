import React, { useEffect, useState } from "react";
import axios from "axios";

const ProtectedData = props => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log(props.token);
    if (props.token) {
      const instance = axios.create({
        baseURL: "http://localhost:5000/api/",
        timeout: 1000,
        headers: { Authorization: props.token }
      });

      instance
        .get("restricted/data")
        .then(res => {
          setRecipes(res.data);
          console.log(res.data); // Data was created successfully and logs to console
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
        });
    }
  }, [props.token]);

  return (
    <div>
      {recipes.map((recipe, index) => {
        return (
          <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1 ">
                <div className="card-content white-text">
                  <span className="card-title">{recipe.name}</span>
                  <p>Course: {recipe.course}</p>
                  <p>Technique: {recipe.technique}</p>
                  <p>Ingredients: {recipe.ingredients}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProtectedData;

// {recipes.map((recipe, index) => {
//     return (
//       <div className="row" key={index}>
//         <div className="col s12 m6">
//           <div className="card-content white-text">
//             <span className="card-title">{recipe.name}</span>
//             <p>{recipe.course}</p>
//             <p>{recipe.technique}</p>
//             <p>{recipe.ingredients}</p>
//           </div>
//         </div>
//       </div>
//     );
//   })}
