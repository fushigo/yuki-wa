import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function reminiUpscale(base64: string) {
  const payload = {
    base64: base64,
  };

  try {
    const response = await axios.post(`${BASE_URL}/remini`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Yuki/1.0.0",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat request API", error);
    return error;
  }
}
