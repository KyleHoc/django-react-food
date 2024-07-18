import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();  

  const login = () => {
    navigate("/login");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-primary mb-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid d-flex">
          <a className="navbar-brand" href="#">
            Django Eats
          </a>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <div className="d-flex logout-button px-5">
              <button
                onClick={login}
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}

export default Register;
