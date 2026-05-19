import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const fetchPersons = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createPerson = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

const updatePerson = async (id, newPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, newPerson);
  return response.data;
};



export default {
  fetchPersons,
  createPerson,
  deletePerson,
  updatePerson,
};
