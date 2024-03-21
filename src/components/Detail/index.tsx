import { extraDetail } from "@/data/exercise";
import { Exercise } from "@/types/exercise";
import { Stack, Button, Typography } from "@mui/material";
import Image from "next/image";

type DetailProps = {
  exerciseDetails: Exercise;
};

const Detail: React.FC<DetailProps> = ({ exerciseDetails }) => {
  const { bodyPart, gifUrl, name, target, equipment, instructions } =
    exerciseDetails;

  const additionalDetail = [bodyPart, target, equipment];
  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: {
          lg: "row",
        },
        p: "20px",
        alignItems: "center",
      }}
    >
      <Image width={729} height={742} src={gifUrl} alt={name} />
      <Stack
        sx={{
          gap: {
            lg: "35px",
            xs: "20px",
          },
        }}
      >
        <Typography textTransform="capitalize" variant="h3">
          {name}
        </Typography>
        <Typography
          sx={{
            width: {
              lg: "80%",
              sm: "100%",
            },
            textAlign: "justify",
          }}
          variant="h6"
        >
          {instructions.join("")}
        </Typography>
        {extraDetail.map((detail, index) => (
          <Stack key={detail.id} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: "50%",
                width: 100,
                height: 100,
              }}
            >
              <Image width={50} height={50} src={detail.image} alt={bodyPart} />
            </Button>
            <Typography textTransform="capitalize" variant="h5">
              {additionalDetail[index]}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default Detail;
