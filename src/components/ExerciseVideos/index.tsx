import { Box, Stack, Typography } from "@mui/material";
import { VideoT } from "@/types/video";
import Image from "next/image";

type ExerciseVideosProps = {
  exerciseVideos: VideoT;
  name: string;
};
const ExerciseVideos: React.FC<ExerciseVideosProps> = ({
  exerciseVideos,
  name,
}) => {
  return (
    <Box
      sx={{
        marginTop: {
          lg: "200px",
          xs: "20px",
        },
        padding: "20px",
      }}
    >
      <Typography variant="h3" mb="33px">
        Watch <span className="text-[#ff2625] capitalize">{name} </span>
        exercise videos
      </Typography>
      <Stack
        sx={{
          display: "grid",
          placeItems: "center",
          gridTemplateColumns: {
            lg: "repeat(3,1fr)",
            md: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          },
          gap: {
            lg: "110px",
            xs: "0",
          },
        }}
      >
        {exerciseVideos.contents.slice(0, 6).map(({ video }) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noreferrer"
            className="duration-150 shadow-sm p-2 hover:scale-105 hover:shadow-md"
          >
            <Image
              width={400}
              height={300}
              className="rounded-md"
              src={video.thumbnails[0].url}
              alt={video.title}
            />
            <Box mt="10px">
              <Typography variant="h5" textAlign="center">
                {video.title}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};
export default ExerciseVideos;
