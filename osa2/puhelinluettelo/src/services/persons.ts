import axios from "axios";
import { type TypePerson } from "../App";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data as TypePerson[]);
};

const create = (newObject: TypePerson) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data as TypePerson);
};

const update = async ({
  id,
  newObject,
}: {
  id: number;
  newObject: TypePerson;
}) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data as TypePerson);
};

export default {
  getAll,
  create,
  update,
};
