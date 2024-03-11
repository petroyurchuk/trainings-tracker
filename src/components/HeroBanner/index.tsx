import { Box, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";

type HeroBannerProps = {};
const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (
    <Box
      sx={{
        mt: {
          lg: "100px",
          xs: "17px",
        },
        ml: {
          sm: "50px",
        },
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="26px">
        Fitness Club
      </Typography>
      <Typography
        fontWeight="700"
        sx={{
          fontSize: {
            lg: "44px",
            xs: "40px",
          },
        }}
      >
        Sweat, Smile <br /> and Repeat
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={3}>
        Check out the most effective exercises
      </Typography>
      <Button
        variant="contained"
        color="error"
        href="#exercises"
        sx={{ padding: "10px" }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color="#FF2625"
        fontSize="200px"
        sx={{
          opacity: 0.1,
          display: {
            lg: "block",
            xs: "none",
          },
        }}
      >
        Exercise
      </Typography>
      <Image
        width={600}
        height={750}
        className="hero-banner-img"
        src={"/images/banner.png"}
        alt="banner"
      />
    </Box>
  );
};
export default HeroBanner;
