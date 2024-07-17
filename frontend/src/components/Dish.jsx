import React from "react";
import "../styles/Dish.css"



function Dish({dish, onDelete}){
    const formattedDate = new Date(dish.created_at).toLocaleDateString("en-US")

    return <div className="dish-container">
        <p className="dish-title">Dish: {dish.title}</p>
        <p className="dish-course">{dish.course}</p>
        <p className="dish-date">Date created: {formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(dish.id)}>Delete</button>
    </div>
}

export default Dish