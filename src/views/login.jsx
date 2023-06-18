import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import loginService from "../service/loginService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header";

const Login = () => {
  const navigate = useNavigate();
  const { callback } = useParams();
  console.log("params", callback);
  const [data, setData] = useState({});

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    loginService
      .LoginAuth(data)

      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        // navigate('/')
        callback && callback == "DetailsVehicule"
          ? navigate(-1)
          : (window.location.href = "/");
      })
      .catch((err) => {
        console.log(err);
        setError("Le nom d'utilisateur ou mot de passe est incorrect.");
      });
  };

  return (
    <div>
        <Header hideSlider={true} />
      <div className="form-box">
        <form onSubmit={onSubmitHandler}>
          <div className="header-text">me connecter</div>
          <input
            placeholder="Votre nom d'utilisateur"
            type="text"
            id="username"
            name="username"
            onChange={onChangeHandler}
          />
   <input
  type={showPassword ? "text" : "password"}
  className="form-control form-control-user"
  placeholder="mot de passe"
  name="password"
  style={{ height: "50px", marginBottom: "35px" }}
  onChange={onChangeHandler}
/>
<div style={{ position: "relative" }}>
  <FontAwesomeIcon
    icon={showPassword ? faEyeSlash : faEye}
    className="position-absolute top-50 start-2 translate-middle-y"
    style={{ cursor: "pointer", zIndex: "1", marginLeft: "-100px", marginTop: "-67px", marginLeft: "42%" }}
    onClick={() => setShowPassword(!showPassword)}
  />
</div>
{error && <div style={{ color: "red", marginTop: "-5%" }}>{error}</div>}
         
          <button type="submit">login</button>
          <p>
          Vous n'avez pas encore de compte? <Link to="/Register"> S'inscrire</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
