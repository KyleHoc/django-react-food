import { useState, useEffect } from "react"
import api from "../api"
import Dish from "../components/Dish"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom"

function Home() {
    const [dishes, setDishes] = useState([]);
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("");
    const [prep, setPrep] = useState("");
    const [photo, setPhoto] = useState("");
    const [details, setDetails] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate()


    useEffect(() => {
        getDishes();
    }, [])

    const logout = () => {
        navigate("/logout")
    }

    const getDishes = () => {
        api.get("/api/dishes/")
         .then((res) => res.data)
         .then((data) => { setDishes(data); console.log(data)})
         .catch((err) => alert(err));
    }

    const deleteDish = (id) => {
        api.delete(`/api/dishes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Dish deleted");
                else alert("Failed to delete dish");
                getDishes();
            }).catch((error) => alert(error));

    };

    const createDish = (e) => {
        e.preventDefault();

        api.post("/api/dishes/", {course, title, prep, photo, details}).then((res) => {
            if (res.status === 201) alert("Dish created")
            else alert("Failed to add dish")
            getDishes();
        }).catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Dishes</h2>
            {dishes.map((dish) => (
                <Dish dish={dish} onDelete={deleteDish} key={dish.id} />
            ))}
        </div>

        <h2>Create a Dish</h2>
        <form onSubmit={createDish}>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <br />

            <label htmlFor="course">Course:</label>
            <br />
            <input type="text" id="course" name="course" required onChange={(e) => setCourse(e.target.value)} value={course} />
            <br />

            <label htmlFor="prep">Preparation Time &#40;minutes&#41;:</label>
            <br />
            <input type="number" id="prep" name="prep" required onChange={(e) => setPrep(e.target.value)} value={prep} />
            <br />

            <label htmlFor="details">Details:</label>
            <br />
            <textarea type="text" id="details" name="details" required onChange={(e) => setDetails(e.target.value)} value={details} cols={65} rows={10} />
            <br />

            <label htmlFor="photo">Photo URL:</label>
            <br />
            <input type="text" id="photo" name="photo" required onChange={(e) => setPhoto(e.target.value)} value={photo}/>
            <br />

            <input type="submit" value="Submit"></input>
        </form>
        <p onClick={logout}>Logout</p>
    </div>
}

export default Home