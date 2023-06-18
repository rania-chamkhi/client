import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.css";
import { Table, Pagination, Form, FormControl, Button } from "react-bootstrap";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import reservationService from "../../service/reservationService";
import loginService from "../../service/loginService";
import Swal from "sweetalert2";
import vehiculeService from "../../service/vehiculeService";
import UpdateReserv from "../reservation/updateReserv";

function Profil() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, settotalItems] = useState();
  const [totalPages, settotalPages] = useState();
  const [user, setUser] = useState({ user: null });
  const [startIndex, setstartIndex] = useState();
  const [endIndex, setendIndex] = useState();
  const [paginatedData, setpaginatedData] = useState();
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [vehicule, setVehicule] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false;

    if (user) {
      setUser(user);

      reservationService
        .getReservationByUserID(user?.user?._id)
        .then((res) => {
          setData(res.data.data);
          const totalItems = res.data.data?.length;
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedData = res.data.data?.slice(startIndex, endIndex);
    
          settotalItems(totalItems);
          settotalPages(totalPages);
          setstartIndex(startIndex);
          setendIndex(endIndex);
          setpaginatedData(paginatedData);
        })
        .catch((err) => { });
    }
  }, []);



  const deleteReserv = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        reservationService.deleteReserv(id).then((res) => {
          reservationService.getReservationByUserID(user?.user?._id).then((res) => {
            setData(res.data.data);
            const totalItems = res.data.data?.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = res.data.data?.slice(startIndex, endIndex);
      
            settotalItems(totalItems);
            settotalPages(totalPages);
            setstartIndex(startIndex);
            setendIndex(endIndex);
            setpaginatedData(paginatedData);
          });
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };




  const handleInputChange = (e) => {
    console.log("+++", user, e.target.name, e.target.value);

    setUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };
  const updateProfilAction = () => {
    console.log("user?.user?._Fid, user?.user", user?.user?._id, user?.user);
    loginService
      .updateProfil(user?.user?._id, user?.user)
      .then((res) => {
        Swal.fire({
          title: "Votre compte est mis a jour",
          showDenyButton: false,
          confirmButtonText: "D'accord",
        });
        let user = JSON.parse(localStorage.getItem("user"));
        user.user = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(...user.user, res.data.data);
      })
      .catch((err) => { });
  };
  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
  
    setCurrentPage(pageNumber);
  
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);
  
    setstartIndex(startIndex);
    setendIndex(endIndex);
    setpaginatedData(paginatedData);
  };

  
  const getPrix = (data) => {
    if (data.assuranceId) {
      return Math.abs(data.prixTotal) + data.assuranceId.prix

    } else {
      return Math.abs(data.prixTotal)
    }
  }
  return (
    <>
      <Header hideSlider={true} />
      <div className="body1">
      <div className="container">
      
              <div className="card-body">
          
                  <div className="profile-image-container">
                   
                  </div>
                
              </div>
          
        </div>
        <div className="card-header-new" style={{ marginLeft: "auto", marginLeft: "10%" }}>
          <h2 >
            <i>
              <u>Mes réservations</u>
            </i>
          </h2>
        </div>
      <div className="container">
 
        <div className="row">
       
          <div className="col-md-10 offset-md-1 mt-5" style={{marginLeft:"-35%"}}>
         
          
            <div className="card">
            
              <div className="card-body">
              <img
                      src={
                        "http://localhost:3000/file/uploadUser/" +
                        user?.user?.file
                      }
                      alt="Profile"
                      className="profile-image"
                    /><br></br><br></br><br></br><br></br>
                <h5 className="card-title" style={{marginbottom:"40"}}>Profile Information</h5>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    votre nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    value={user?.user?.username}
                    className="form-control"
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={user?.user?.nom}
                    className="form-control"
                    name="nom"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="prenom" className="form-label">
                    Votre prenom
                  </label>
                  <input
                    type="text"
                    value={user?.user?.prenom}
                    className="form-control"
                    name="prenom"
                    onChange={handleInputChange}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Votre email
                  </label>
                  <input
                    type="email"
                    value={user?.user?.email}
                    className="form-control"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label htmlFor="ville" className="form-label">
                    Votre ville
                  </label>
                  <input
                    type="text"
                    value={user?.user?.ville}
                    className="form-control"
                    name="ville"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">
                    Votre numéro de telephone
                  </label>
                  <input
                    type="number"
                    value={user?.user?.telephone}
                    className="form-control"
                    onChange={handleInputChange}
                    name="telephone"
                  />
                </div>
                <button
                  type="submit"
                  onClick={updateProfilAction}
                  className="btn btn-primary"
                >
                  Mettre a jour
                </button>
              </div>
            </div>
          </div>
          <div  style={{marginRight:"-68%"}}>
            <div className="container">
              <div className="mt-5">
                <Form inline className="mb-3"></Form>
                <Table  striped bordered hover className="custom-table">
                  <thead>
                    <tr>
                      <th>Identifiant</th>
                      <th >Details vehicule</th>
                      <th>Prix total</th>
                      <th>Date Reservation</th>
                      <th>Date Fin location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((item,index) => (
                      <tr key={item._id}>
                      <td className="text-center">{startIndex + index + 1}</td>

                        <td>
                          <Link
                            to={`/DetailsVehicule/${item.vehiculeId}#view_content`}
                          >
                            {" "}
                            Détails véhicule
                          </Link>
                        </td>
                        <td>{getPrix(item)}</td>
                        <td> {new Date(item.dateReserv).toLocaleDateString()}</td>
                        <td>{new Date(item.dateFinloc).toLocaleDateString()}</td>
                        <td>
                          <div className="button-container">
                            <Button
                              variant="secondary"
                              onClick={() => navigate(`/contact/${item._id}/contact`)}
                              className="ml-2"
                            >
                              Contacter
                            </Button>
                           
                            <Link to={`/UpdateReserv/${item._id}`}>
                            <Button
                              variant="secondary"
                             
                              className="ml-2"
                            >
                              Modifier
                            </Button></Link>
                            <Button
                              variant="secondary"
                              onClick={(e) => deleteReserv(item._id)}
                              className="ml-2"
                            >
                              Annuler
                            </Button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
  <Pagination.Prev
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  />
  {Array.from({ length: totalPages }, (_, index) => (
    index + 1 !== currentPage && (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    )
  ))}
  <Pagination.Next
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  />
</Pagination>
              </div>
            </div>
          </div>
        </div>
      </div></div>
      <Footer />
    </>
  );
}

export default Profil;
