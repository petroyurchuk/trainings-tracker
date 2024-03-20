import axios from "axios";
const options = {
  method: "GET",
  params: { limit: "100" },
  headers: {
    "X-RapidAPI-Key": `be0223e01dmsh7109def8e9a5700p1d343djsn2a532846d41a`,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async <T>(url: string): Promise<T[] | undefined> => {
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
