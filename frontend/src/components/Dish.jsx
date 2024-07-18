import React from "react";
import "../styles/Dish.css"
import "../App.css"



function Dish({dish, onDelete}){
    const formattedDate = new Date(dish.created_at).toLocaleDateString("en-US")

    return <div className="card border-primary mb-3 mx-5">
    <div className="card-header">{dish.title}</div>
    <div className="row">
        <div className ="col-xl-4 col-lg-5 col-md-6">
            <img className="img-fluid" src={dish.photo} alt="Food photo not found" width="430" height="350" />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
            <div className="card-body">
                <p className="card-text">Course: {dish.course}</p>
                <p className="card-text">{dish.prep} min to prepare</p>
                <p className="card-text">Details: {dish.details}</p>
                <p className="dish-date card-text">Date created: {formattedDate}</p>
                <button className="delete-button" onClick={() => onDelete(dish.id)}>Delete</button>

            </div>
        </div>
    </div>
  </div>
}

export default Dish