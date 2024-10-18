// const BASE_URL = "http://localhost:5019";
const BASE_URL = "https://yuki-api.vercel.app";

const OPTIONS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Yuki/1.0.0",
    "x-api-key": process.env.API_PUBLIC_KEY,
  },
};

const GPT = `${BASE_URL}/questionai/gpt/quest`;
const PRODIA = `${BASE_URL}/questionai/prodia/image`;
const DALLE = `${BASE_URL}/questionai/dalle/image`;
const GET_JOBS = `${BASE_URL}/remini/jobs`;
const REMINI = `${BASE_URL}/remini`;
const USERS = `${BASE_URL}/users`;
const ACTIVITIES = `${BASE_URL}/activities`;

export { OPTIONS, GPT, PRODIA, DALLE, GET_JOBS, REMINI, USERS, ACTIVITIES };
