import axios from "axios";
import { GET_JOBS } from "../../common/api/endpoint";

export default async function getJobs(jobId: string) {
  try {
    const response = await axios.get(`${GET_JOBS}/${jobId}`);

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengambil job");
    return;
  }
}
