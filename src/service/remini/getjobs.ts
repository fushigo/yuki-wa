import axios from "axios";

export default async function getJobs(jobId: string) {
  try {
    const response = await axios.request({
      method: "GET",
      url: `https://api.prodia.com/v1/job/${jobId}`,
      headers: {
        accept: "application/json",
        "X-Prodia-Key": "36df1530-9110-4229-b9ed-8a7c04ed18ee",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Terjadi kesalahan saat mengambil job");
    return;
  }
}
