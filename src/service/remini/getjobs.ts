import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function getJobs(jobId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/remini/jobs/${jobId}`);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengambil job");
    return;
  }
}
