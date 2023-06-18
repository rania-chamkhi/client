import http from "./axiosContext";

const createAss=(data) => { 
    return http.post("/assurance",data )
}
const getAll=() => { 
    return http.get("/assurance") 
}
const updateass=(id , data ) => { 
    return http.put(`/assurance/${id}`, data ) 
}
const getAssurance=(id ) => { 
    return http.get(`/assurance/${id}`) 
}
const GetAssByname=(name)=>{
    return http.get(`/assurance/name?name=${name}}`)
}
const deleteAss=(id ) => { 
    return http.delete(`/assurance/${id}`) 
}
 
export default { 
    createAss , getAll ,updateass ,getAssurance , GetAssByname,deleteAss
}