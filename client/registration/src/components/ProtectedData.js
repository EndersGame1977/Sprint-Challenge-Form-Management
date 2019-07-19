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
      {recipes.map(recipe => {
        return <div>{recipe.name}</div>;
      })}
    </div>
  );
};
export default ProtectedData;
