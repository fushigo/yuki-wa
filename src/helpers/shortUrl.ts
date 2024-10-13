import axios from "axios";

const shortUrl = async (url: string) => {
  const shortedUrl = await axios({
    method: "GET",
    url: `https://ulvis.net/api.php?url=${url}`,
  });
  return shortedUrl.data;
};

export default shortUrl;
