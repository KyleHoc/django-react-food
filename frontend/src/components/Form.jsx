import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

//Create form for login/registration
function Form({route, method}) {
    //Variable declaration
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //Get the page name from method
    const name = method === "login" ? "Login" : "Register"

    //Submission function
    const handleSubmit = async (e) => {
        //Set that the page is loading and prevent default
        setLoading(true);
        e.preventDefault()

        //Attempt to login or register
        try {
            //Get the response from the api
            const res = await api.post(route, {username, password})

            //If the method is login:
            if(method === "login"){
                //Set the access and refresh tokens in local storage
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

                //Navigate to home
                navigate("/")
            } else {
                //Otherwise, navigate to the login page
                navigate("/login")
            }
        } catch(error) {
            //In the event of an error, trigger an alert
            alert(error)
        } finally {
            //Either way, set loading to false
            setLoading(false)
        }
    }

    //Return a submission form with inputs for username and password
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        {loading && <LoadingIndicator />}

        <button className="form-button" type="submit">{name}</button>
    </form>
}

 export default Form