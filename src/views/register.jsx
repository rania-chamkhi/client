
import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../service/loginService"
import "./style1.css"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header";



const Register=()=>{


  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [Image, setImage] = useState({})
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }
  const formData = new FormData();
  const onSubmitHandler = (e) => {
    e.preventDefault()
      ;  if (!validateForm()) {
        return; // Si le formulaire n'est pas valide, arrêter la soumission
      }
    formData.append('username',data.username);
    formData.append('nom', data.nom);
    formData.append('prenom', data.prenom);
    formData.append('ville', data.ville);
   
    formData.append('telephone', data.telephone);

    formData.append('email', data.email);
    formData.append('password', data.password);

    ;
    for (let i = 0; i < Image.length; i++) {
      formData.append('file', Image[i])
    }
    Swal.fire({
      title: 'Vous étes sur',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        loginService.register(formData).then((res) => {
          console.log(res)
          navigate('/login');
       
          // Afficher le message "Successful" sur la page de connexion
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Vous êtes inscrit avec succés',
            icon: 'success',
          });
        }).catch((err) => {
         

        })
      } else if (result.isDenied) {
        Swal.fire('')
      }
    })
  }
  const onChangeHandlerImage = (e) => {
    e.preventDefault()
    setImage(e.target.files)
  }

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!data.username) {
      errors.username = "Le nom d'utilisateur est obligatoire";
      isValid = false;
    }

    if (!data.nom) {
      errors.nom = "Le nom est obligatoire";
      isValid = false;
    }

    if (!data.prenom) {
      errors.prenom = "Le prénom est obligatoire";
      isValid = false;
    }

    if (!data.email) {
      errors.email = "L'adresse email est obligatoire";
      isValid = false;
    }

    if (!data.ville) {
      errors.ville = "La ville est obligatoire";
      isValid = false;
    }

    if (!data.telephone) {
      errors.telephone = "Le numéro de téléphone est obligatoire";
      isValid = false;
    }

    if (!data.password) {
      errors.password = "Le mot de passe est obligatoire";
      isValid = false;
    }

    if (!Image.length) {
      errors.file = "votre photo est obligatoire";
      isValid = false;
    }
  
    setErrors(errors);
    return isValid;
  };


    return(

        

        <div>
<Header hideSlider={true} />
<div style={{top:"-18%"}} className="form-box">
  <form onSubmit={onSubmitHandler}>
    <div className="header-text">
      Créer un compte
    </div>
   <input placeholder="votre nom d'utilisateur" type="text" name="username" onChange={onChangeHandler}/>
   {errors.username && (
            <div style={{ color: "red" }}>{errors.username}</div>
          )}

    <input placeholder="Votre nom" type="text" id="nom" name="nom" onChange={onChangeHandler}/> 
    {errors.nom && <div style={{ color: "red" }}>{errors.nom}</div>}

    <input placeholder="Votre prenom " type="text" id="prenom" name="prenom" onChange={onChangeHandler}/> 
    {errors.prenom && <div style={{ color: "red" }}>{errors.prenom}</div>}

    <input placeholder="Votre email " type="email" id="email" name="email" onChange={onChangeHandler}/> 
    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}


    <input placeholder="Votre ville" type="text" id="ville" name="ville" onChange={onChangeHandler}/> 
    {errors.ville && <div style={{ color: "red" }}>{errors.ville}</div>}

    <input placeholder="Votre numéro de telephone" type="text" id="telephone" name="telephone" onChange={onChangeHandler}/> 
    {errors.telephone && (
            <div style={{ color: "red" }}>{errors.telephone}</div>
          )}

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
    style={{ cursor: "pointer", zIndex: "1", marginLeft: "-100px", marginTop: "-67px", marginLeft: "40%" }}
    onClick={() => setShowPassword(!showPassword)}
  />
</div>
{errors.password && (
  <div style={{ color: "red", marginTop: "-8%" }}>{errors.password}</div>
)}

<label htmlFor="file" className="custom-file-upload">
  <FontAwesomeIcon icon={faCamera} className="camera-icon fa-3x" />
  <span>Ajouter votre photo</span>
  <input
    style={{ display: 'none' }}
    type="file"
    id="file"
    name="file"
    onChange={onChangeHandlerImage}
  />
</label>

   {errors.file && <div style={{ color: "red",marginTop:"-5%" }}>{errors.file}</div>}


    <input  id="terms" type="checkbox" /> 
    <label style={{color:"#fff"}} htmlFor="terms" /><span style={{color:"#fff"}}>Accepter  <a href="#" >les conditions &amp; générales</a></span>
   
    <button type="submit">Register</button>
    <p style={{color:"#fff"}}>
    Si vous avez un compte, <Link to ="/Login">connectez-vous.</Link>
</p>
  </form>
</div>

        </div>
    )
}
export default Register