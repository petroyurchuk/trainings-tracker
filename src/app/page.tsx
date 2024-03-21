import { HeroBanner, Navbar, SearchExercises } from "@/components";
import { Exercises } from "@/components";

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
