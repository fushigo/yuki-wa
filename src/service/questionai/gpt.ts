import axios from "axios";
import { GPT } from "../../common/api/endpoint";

export default async function gpt(promp: string) {
  try {
    const response = await axios.get(`${GPT}/${promp}`);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengirim request gpt", error);
    return;
  }
}
