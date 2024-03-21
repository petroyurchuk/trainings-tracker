import axios, { AxiosRequestConfig } from "axios";
export const optionsExercise = {
  method: "GET",
  params: { limit: "100" },
  headers: {
    "X-RapidAPI-Key": `be0223e01dmsh7109def8e9a5700p1d343djsn2a532846d41a`,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const optionsYoutube = {
  method: "GET",
  url: "https://youtube-search-and-download.p.rapidapi.com/channel/about",
  params: {
    id: "UCE_M8A5yxnLfW0KghEeajjw",
  },
  headers: {
    "X-RapidAPI-Key": "be0223e01dmsh7109def8e9a5700p1d343djsn2a532846d41a",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig
): Promise<T[] | undefined> => {
  try {
    const { data } = await axios.request<T[]>({
      ...options,
      url,
    });

    return data;
  } catch (error) {
    console.log("Error while fetching data: ", error);
  }
};
