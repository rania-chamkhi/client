import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import vehiculeService from "../../service/vehiculeService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./style2.css";
import contactService from "../../service/contactService";



const DetailsVeh = () => {
  const { id } = useParams(); // get the reservation ID from the URL

  const [FeedBack, setFeedBack] = useState();
  const [vehicule, setVehicule] = useState();
  const [isDisponible, setIsDisponible] = useState(true); // initialize to true
  const [buttonDisabled, setButtonDisabled] = useState(false); // initialize to false
  const [showFullMessages, setShowFullMessages] = useState([]);
 



  const handleSeeMore = (index) => {
    setShowFullMessages((prev) => [...prev, index]);
  };

  const handleSeeLess = (index) => {
    setShowFullMessages((prev) => prev.filter((item) => item !== index));
  };


  const navigate = useNavigate();
  const user = localStorage?.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  useEffect(() => {
    const getVehicule = async () => {
      try {
        const res = await vehiculeService.getVehicule(id);
        setVehicule(res.data.data);

        setIsDisponible(res.data.data.disponible);
      } catch (err) {
        console.log(err);
      }
    };
    getVehicule();
    contactService
      .getFeedBackByCar(id)
      .then((res) => {
        setFeedBack(res.data.data);
      })
      .catch((err) => {
        Swal.fire("un erreur est servenue", "", "info");
      });
  }, [id]);

  const voirDetails = (event) => {
    event.preventDefault();

    if (!user) {
      Swal.fire({
        title: "pour faire une reservation merci d'abord de se connecter !",
        showDenyButton: false,
        confirmButtonText: "Se connecter",
        denyButtonText: null,
      }).then((result) => {
        navigate("/Login/DetailsVehicule");
      });
      return;
    }

    if (!isDisponible) {
      setButtonDisabled(true);
      Swal.fire({
        icon: "error",
        text: "Véhicule déjà réservé, choisir un autre.",
      });
    } else {
      navigate(`/Pagereserv/${vehicule._id}`);
    }
  };


  useEffect(() => {
    // Ici, vous devrez récupérer les données du véhicule et des avis clients à partir de votre source de données
    // et les assigner aux variables 'vehicule' et 'feedBack'

    // Exemple de code pour illustrer la mise à jour de l'état
    const mockVehicule = {
      marque: 'Marque du véhicule',
      modele: 'Modèle du véhicule',
      // Autres propriétés du véhicule
    };
    const mockFeedBack = [
      {
        id: 1,
        message: 'Avis client 1',
        // Autres propriétés de l'avis client
      },
      {
        id: 2,
        message: 'Avis client 2',
        // Autres propriétés de l'avis client
      },
    ];

    setVehicule(mockVehicule);
    setFeedBack(mockFeedBack);
  }, []);

 
 



  

  if (!vehicule) {
    return <div>Chargement...</div>;
  }

  return (


    
    <div className="body1">
      <div className="container mt-0" >
        <div className="row" >
          <div className="col-md-6 mt-5" >
            <div className="card" style={{width:"220%",marginLeft:"-70%" }}>
              <div className="card-header">
                <h2 className="text-center">
                  <u style={{ color: "red" }}>{vehicule.marque}</u>
                </h2>
              </div>
              <div className="card-body" style={{color:"#4f526f"}}>
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="img-fluid"
                      src={
                        "http://localhost:3000/file/UploadVehicule/" +
                        vehicule.file
                      }
                      alt="vehicule"
                    />
                  </div>
                  <div
                    id="view_content"
                    className="col-md-6"
                    style={{ marginTop: "30px" }}
                  >
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Modele: </strong>
                        {vehicule.modele}
                      </li>
                      <li className="list-group-item">
                        <strong>Kilométrage: </strong>
                        {vehicule.kilometrage}
                      </li>
                      <li className="list-group-item">
                        <strong>Type de carburant: </strong>
                        {vehicule.typeCarburant}
                      </li>
                      <li className="list-group-item">
                        <strong>Nombre de portes: </strong>
                        {vehicule.ports}
                      </li>
                      <li className="list-group-item">
                        <strong>Boîte de vitesse: </strong>
                        {vehicule.boiteVit}
                      </li>
                      <li className="list-group-item">
                        <strong>GPS : </strong>
                        {vehicule.gps ? "Oui" : "Non"}
                      </li>
                      <li className="list-group-item">
                        <strong>Climatiseur: </strong>
                        {vehicule.clima ? "Oui" : "Non"}
                      </li>
                      <li className="list-group-item">
                        <strong>Prix: </strong>
                        {vehicule.prix}/j
                      </li>
                    </ul>
                  </div>
                </div><br></br><br></br><br></br><br></br>
                <div className="row mt-3">
    <div className="col">
        <h4 style={{ fontWeight: "bold" }}>Description</h4>
        <p style={{ fontSize: "16px" }}>{vehicule.description}</p>
    </div>
</div>

                <div className="row mt-3">
                <div className="col">
    <div className="text-white" style={{ width: "30%", marginTop: "-30%", marginLeft: "8%", backgroundColor: "#f51929", fontWeight: "bold" }}>
      <div className="card-body">
        <h4 style={{color:"a0b378 !important"}}>Agence</h4>
        <p>{vehicule.agenceId?.name}</p>
        <p>{vehicule.agenceId?.adresseAg}</p>
        <p>{vehicule.agenceId?.email}</p>
      </div>
    </div>
</div>
</div>


                <Link to={`/Pagereserv/${vehicule._id}`}>
                  <button
                    type="submit"
                    class="btn1 btn-primary1 px-3"
                    onClick={voirDetails}
                    disabled={buttonDisabled}
                  >
                    Devis et Reservation
                  </button>
                </Link>
              </div>
            </div>
          </div>

          
          <div className="col-md-6 mt-5">
  <div className="card" style={{ width: "130%", marginLeft: "50%" }}>
  <div className="card-header" >
  <h2 className="text-center">
    <u style={{ color: "red", fontStyle: "italic" }}>Avis clients</u>
  </h2>
</div>
    <div className="card-body">
      <div className="row">
        <div className="col-md-11">
          <ul className="list-group list-group-flush">
            {FeedBack?.slice(0, 5).map((item, index) => {
              const message = item.message;
              const shouldTruncate = message.length > 20;
              const showFullMessage = showFullMessages.includes(index);

              return (
                <div
                  className="row justify-content-around" 
                  style={{ height: showFullMessage ? "auto" : "50px !important" }}
                  key={item._id}
                >
                <div className="col-2">
  <img
    className="profile-image-1"
    src={"http://localhost:3000/file/uploadUser/" + item?.reservationId?.userId?.file}
    alt="Profile"
  />
</div>

                  <div className="col-5" style={{ marginLeft: "-13%" }}>
                    <b>{item.reservationId?.userId?.username}</b>
                    <br />
                   
                    {shouldTruncate ? (
                      <>
                        {showFullMessage ? (
                          <>
                            {message}
                            <a
                              onClick={() => handleSeeLess(index)}
                              style={{ color: "#ff7f00", textDecoration: "underline", cursor: "pointer" }}
                            >
                              voir plus
                            </a>
                          </>
                        ) : (
                          <>
                            {message.slice(0, 50)}...
                            <a
                              onClick={() => handleSeeMore(index)}
                              style={{
                                color: "#ff7f00",
                                marginLeft: "5px",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              voir moins
                            </a>
                          </>
                        )}
                      </>
                    ) : (
                      message
                    )}
                  </div><br></br><br></br><br></br>
                  <div className="col-3" style={{ marginTop: "2%" }}>
                    {new Date(item?.createdAt).toDateString()}
                  </div>
                </div>
              );
            })}
          </ul>
                  </div>
                </div>
               
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>



  );
};

export default DetailsVeh;