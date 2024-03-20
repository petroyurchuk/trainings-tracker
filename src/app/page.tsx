import { HeroBanner, Navbar, SearchExercises } from "@/components";
import Exercises from "@/components/Exercises";

const HomePage = async () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <SearchExercises />
      <Exercises />
    </div>
  );
};
export default HomePage;
