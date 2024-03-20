import { HeroBanner, Navbar, SearchExercises } from "@/components";

const HomePage = async () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <SearchExercises />
    </div>
  );
};
export default HomePage;
