import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"


//Check if the user has an access token before they can view content
function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    //Set it so auth is called when a protected route is loaded
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    //Refresh the user's token if it has expired
    const refreshToken = async () => {
        //Get the refresh token from local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        //Attempt to refresh the token
        try {
            //Post the refresh token to the refresh api to get a response
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });

            //If the response status is 200
            if (res.status === 200) {
                //Get a new access token from the response
                localStorage.setItem(ACCESS_TOKEN, res.data.access)

                //Set the authorization to true
                setIsAuthorized(true)
            } else {
                //Otherwise, the user is not authorized
                setIsAuthorized(false)
            }
        } catch (error) {
            //If an error occurs, log it and set authorization to false
            console.log(error)
            setIsAuthorized(false)
        }
    }


    const auth = async () => {
        //Determine if an access token exists, if not, the user is not authorized, call return
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return
        }

        //Decode access token
        const decoded = jwtDecode(token)

        //Create variables for when the token expires and the current time
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        //Determine if the token is expired at the current time
        if(tokenExpiration < now){
            //Refresh the token if it is expired
            await refreshToken()
        } else {
            //Otherwise, the user authorized
            setIsAuthorized(true)
        }
    }; 

    //If isAuthorized is null, pass in HTML for a loading screen
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    //If the user is authorized, return the passed in children. Otherwise, navigate them to the login page
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute