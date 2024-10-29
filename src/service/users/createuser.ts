import axios from "axios";
import { OPTIONS, USERS } from "../../common/api/endpoint";

export default async function createUser(waNumber: string) {
  const payload = {
    waNumber: waNumber,
  };

  await axios.post(`${USERS}`, payload, OPTIONS);

  return;
}
