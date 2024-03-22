import axios, { AxiosRequestConfig } from "axios";
import { Exercise } from "@/types/exercise";
import { VideoT } from "@/types/video";
import { EXERCISES_API_URL, YOUTUBE_VIDEOS_API_URL } from "@/constants";
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
): Promise<T[] | T | undefined> => {
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

export const fetchBodyParts = async (): Promise<string[]> => {
  if (!localStorage.getItem("bodyParts")) {
    const data = await fetchData<string>(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      optionsExercise
    );
    localStorage.setItem("bodyParts", JSON.stringify(data));

    return data as string[];
  }
  const data: string[] = JSON.parse(localStorage.getItem("bodyParts")!);
  return data;
};

export const fetchExercises = async (): Promise<Exercise[]> => {
  if (!localStorage.getItem("exercises")) {
    const data = await fetchData<Exercise>(EXERCISES_API_URL, optionsExercise);
    localStorage.setItem("exercises", JSON.stringify(data));

    return data as Exercise[];
  }
  const data: Exercise[] = JSON.parse(localStorage.getItem("exercises")!);
  return data;
};

export const fetchYoutubeVideos = async (name: string): Promise<VideoT> => {
  if (!localStorage.getItem(`exerciseVideos${name}`)) {
    const data = await fetchData<VideoT>(
      `${YOUTUBE_VIDEOS_API_URL}/search?query=${name}`,
      optionsYoutube
    );
    localStorage.setItem(`exerciseVideos${name}`, JSON.stringify(data));
    return data as VideoT;
  }
  const data: VideoT = JSON.parse(
    localStorage.getItem(`exerciseVideos${name}`)!
  );
  return data;
};

export const fetchSimilarExercisesByTarget = async (
  target: string
): Promise<Exercise[]> => {
  const targetMuscleExercises = await fetchData<Exercise>(
    `${EXERCISES_API_URL}/target/${target}`,
    optionsExercise
  );
  return targetMuscleExercises as Exercise[];
};
export const fetchSimilarExercisesByEquipment = async (
  equipment: string
): Promise<Exercise[]> => {
  const equipmentExercises = await fetchData<Exercise>(
    `${EXERCISES_API_URL}/equipment/${equipment}`,
    optionsExercise
  );
  return equipmentExercises as Exercise[];
};
