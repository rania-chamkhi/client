import React ,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import reservationService from "../../service/reservationService";
import Swal from "sweetalert2";
import vehiculeService from "../../service/vehiculeService";
import assuranceService from "../../service/assuranceService";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";

const UpdateReserv = () => {
  const { id } = useParams(); // get the reservation ID from the URL
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [vehicule, setVehicule] = useState();
  const [assurance, setAssurance] = useState([]);

  const [data, setData] = useState({
    vehiculeId: id,
    userId: user?.user?._id,
    dateReserv: "",
    heureResrv: "",
    dateFinloc: "",
    heureRet: "",
    numPermis: "",
    prixTotal: 0,
  });

  const [selectedAssurance, setSelectedAssurance] = useState(null);

  useEffect(() => {
    // Obtenez les détails de la réservation
    reservationService
      .getReservation(id)
      .then((res) => {
        setData(res.data.data);
        
        setVehicule(res.data.data.vehiculeId); // Obtenez l'ID du véhicule réservé
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (vehicule) {
      // Obtenez les détails du véhicule réservé
      vehiculeService
        .getVehicule(vehicule)
        .then((res) => {
          setVehicule(res.data.data);
        })
        .catch((err) => {
          console.log(err);//*/+
        });
    }
  }, [vehicule] );
  

  const DateDifference = (dateFrom, dateTo) => {
    const date1 = new Date(dateFrom);
    const date2 = new Date(dateTo);

    const differenceInTime = date2.getTime() - date1.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > -1 ? differenceInDays : 0;
  };

  const onChangeHandler = (e) => {
    if (e.target.name == "assuranceId") {
      const selectedOption = assurance.find(
        (option) => option?.name === e.target.value
      );
      const selectedOptionId = selectedOption?._id ?? "";

      setData({
        ...data,
        [e.target.name]: selectedOptionId,
      });
      setSelectedAssurance(selectedOption);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save updated data!",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("update",data)
        reservationService
          .updaterservation(id, data)
          
          .then((res) => {
            console.log(res);
            navigate("/profil");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  useEffect(() => {
    reservationService.getReservation(id)
      .then((res) => {
        
        console.log("dataofcat", res);
        
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  const getAll = () => {
    assuranceService
      .getAll()
      .then((res) => {
        console.log("eee", res);
        let assurances = [
          { id: -1, name: "Select assurance", prix: 0 }, 
          ...res.data.data,
        ];
        setAssurance(assurances);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  
  useEffect(() => {
    let dateFinloc = data.dateFinloc;
    let dateReserv = data.dateReserv;
    let assuranceId = data.assuranceId;
    if (data.dateReserv && dateFinloc) {
      let dayBeetwen = DateDifference(data.dateReserv, dateFinloc);
      var selectedAssurancePrice = 0;
      if (assuranceId) {
        const selectedAssurance = assurance.find(
          (option) => option._id === assuranceId
        );
        selectedAssurancePrice = selectedAssurance?.prix ?? 0;
      }
  
      let totalPrice = dayBeetwen * vehicule.prix + selectedAssurancePrice;
      console.log(totalPrice)
      setData({
        ...data,
        ["prixTotal"]: totalPrice,
      });
    }
  }, [data.dateFinloc, data.dateReserv, data.assuranceId]);

  const onBlurHandler = (e) => {
    const heureResrv = e.target.value;

    console.log("data", data.heureResrv);
    setData({
      ...data,
      heureResrv,
      heureRet: (parseFloat(e.target.value) + 1).toFixed(2).toString(),
    });
  };
      
    return (


  <div>

<div className="row">
        <div className="col-sm-12">
          <div
            style={{ width: "90%", margin: "auto", marginTop: "45px",backgroundColor:"#e3e3ed"}}
            className="card"
          >
            <div className="card-header"></div>
            <div className="card-block">
            <h1 className="title">
    <span style={{ color: "#88291f", fontWeight: "bold", fontSize: "32px" }}>
      Réserver un véhicule
    </span>
  </h1>
              <br />
              <form className="form-cat" onSubmit={onSubmitHandler}>
            
                <div className="row">
  <div className="col">
    <div className="form-group">
      <label
        style={{ textAlign: "right", color: "#c80719" }}
        className="col-form-label"
      >
        <b>Pris le</b>
      </label>
      <div>
        <input
          type="date"
          value={data.dateReserv ? format(new Date(data.dateReserv), 'yyyy-MM-dd') : ''}

          className="form-control-1 form-control-round"
          name="dateReserv"
          required
          onChange={onChangeHandler}
        />
      </div>
    </div>

    <div className="form-group">
      <label
        style={{ textAlign: "right", color: "#c80719" }}
        className="col-form-label"
      >
        <b>Remis le</b>
      </label>
      <div>
        <input
          type="date"
          required
          value={data.dateFinloc ? format(new Date(data.dateFinloc), 'yyyy-MM-dd') : ''}
          className="form-control-1 form-control-round"
          name="dateFinloc"
          onChange={onChangeHandler}
        />
      </div>
    </div>

    <div className="form-group">
      <label
        style={{ textAlign: "right", color: "#c80719" }}
        className="col-form-label"
      >
        <b>Heure</b>
      </label>
      <div>
        <input
          required
          disabled
          className="form-control-1 form-control-round" style={{backgroundColor:"#d0d1e1"}}
          name="heureRet"
          value={data.heureRet}
          readOnly
          
        />
      </div>
    </div>
    <div className="form-group">
      <label
        style={{ textAlign: "right", color: "#c80719" }}
        className="col-form-label" 
      >
        <b>Prix total</b>
                  </label>
                  <div>
                    <input
                      required
                      disabled
                      type="number"
                      className="form-control-1 form-control-round"
                      style={{ backgroundColor: "#d0d1e1" }}
                      name="prixTotal"
                      value={data?.prixTotal}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

              </div>

              <div className="col">
                <div className="form-group">
                  <label
                    style={{ textAlign: "right", color: "#c80719" }}
                    className="col-form-label"
                  >
                    <b>Heure </b>
                  </label>
                  <div>
                    <select
                      className="form-control-1 form-control-round"
                      name="heureResrv"
                      onChange={onBlurHandler}
                      value={data.heureResrv}
                      onBlur={onBlurHandler}
                      required
                    >
                      <option value="">- Veuillez choisir l'heure de réservation -</option>
                      <option>8.30</option>
                      <option>9.30</option>
                      <option>10.30</option>
                      <option>11.30</option>
                      <option>12.30</option>
                      <option>13.30</option>
                      <option>14.30</option>
                      <option>15.30</option>
                      <option>16.30</option>
                      <option>17.30</option>
                      <option>18.30</option>
                    </select>
                  </div>
                </div>


                <div className="form-group">
                  <label style={{ textAlign: "right", color: "#c80719" }} className="col-form-label">
                    <b>Assurance</b>
                  </label>
                  <div>
                    <select className="form-control-1 form-control-round" name="assuranceId" onChange={onChangeHandler}>
                      {assurance?.map((option) => (
                        <option key={option._id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedAssurance && (
                  <>
                    <div className="form-group ">
                      <label style={{ textAlign: "right", color: "#c80719" }} className="col-form-label">
                        <b>Prix de l'assurance</b>
                      </label>
                      <div className="col-sm-5">
                        <input
                          required
                          className="form-control-1 form-control-round" style={{width:"231%" ,height:"100%",marginLeft:"10%",backgroundColor: "#d0d1e1" }}
                          name="heureRet"
                          value={selectedAssurance?.prix}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label style={{ textAlign: "center", color: "#c80719" }} className="col-sm-2 col-form-label">
                        <b >Description</b>
                      </label>
                      <div className="col-sm-5">
                        <textarea
                          required
                          className="form-control-1 form-control-round" style={{width:"231%" ,height:"100%",marginLeft:"10%",backgroundColor: "#d0d1e1" }}
                          name="heureRet"
                          value={selectedAssurance?.description}
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                )}
    {/* Ajoutez ici les autres form-group */}

    <div className="form-group">
      <label
        style={{ textAlign: "right", color: "#c80719" }}
        className="col-form-label"
      >
        <b>Numéro de permis</b>
      </label>
      <div>
        <input
          required
          type="number"
          className="form-control-1 form-control-round"
          name="numPermis"
          value={data.numPermis}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  </div>
</div><br></br>
                
<span>
<span>
  <img
    style={{ width: "50%" }}
    src={"http://localhost:3000/file/UploadVehicule/" 
    + vehicule?.file}
    alt="Profile"
  />
</span>
                </span>
                <button style={{ marginLeft: "70%" }} type="submit" class="btn1 btn-primary1 px-3">
                  Devis et Reservation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default UpdateReserv;
