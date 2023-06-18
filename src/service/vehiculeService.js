import http from "./axiosContext";

const createVehicule=(data) => { 
    return http.post("/vehicule",data )
}
const getAll=() => { 
    return http.get("/vehicule") 
}
const updatevehicule=(id , data ) => { 
    return http.put(`/vehicule/${id}`, data ) 
}
const getVehicule=(id ) => { 
    return http.get(`/vehicule/${id}`) 
}
const getBynumMatr=(numMatr ) => { 
    return http.get(`/vehicule/numMatr?numMatr=${numMatr}`) 

}
const getAllMod=() => { 
    return http.get("/vehicule/modele") 
}
const getAllmarq=() => { 
    return http.get("/vehicule/marque") 
}
const deleteVeh=(id ) => { 
    return http.delete(`/vehicule/${id}`) 
}
const updateDisponibVeh=(id ) => { 
    return http.put(`/vehicule/disponible/${id}` ) 
}

const getVehNonDispo=() => { 
    return http.get(`/vehicule/nondisponible`) 
}


export default { 
    createVehicule , getAll ,updatevehicule ,getVehicule , getBynumMatr,getAllMod,getAllmarq,deleteVeh,updateDisponibVeh,
    getVehNonDispo
}