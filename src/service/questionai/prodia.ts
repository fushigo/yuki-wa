import axios from "axios";
import { PRODIA } from "../../common/api/endpoint";

export default async function prodia(promp: string) {
  try {
    const response = await axios.get(`${PRODIA}/${promp}`);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengirim request prodia", error);
    return;
  }
}
