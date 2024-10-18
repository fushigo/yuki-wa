import axios from "axios";
import { OPTIONS, REMINI } from "../../common/api/endpoint";

export default async function reminiUpscale(base64: string) {
  const payload = {
    base64: base64,
  };

  try {
    const response = await axios.post(`${REMINI}`, payload, OPTIONS);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat request API", error);
    return error;
  }
}
