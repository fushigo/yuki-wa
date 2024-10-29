import axios from "axios";
import { OPTIONS, USERS } from "../../common/api/endpoint";

export default async function getUserId(waNumber: string) {
  const data = await axios.get(`${USERS}/${waNumber}`, OPTIONS);
  return data.data;
}
