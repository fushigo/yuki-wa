import axios from "axios";
import { DALLE } from "../../common/api/endpoint";

export default async function dalle(promp: string) {
  try {
    const response = await axios.get(`${DALLE}/${promp}`);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengirim request dalle", error);
    return;
  }
}
