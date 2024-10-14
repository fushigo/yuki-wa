import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function gpt(promp: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/questionai/hercai/quest/${promp}`
    );

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengirim request gpt", error);
    return;
  }
}
