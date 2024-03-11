import { HeroBanner, Navbar, SearchExercises } from "@/components";

type Props = {};
const HomePage = async (props: Props) => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <SearchExercises />
    </div>
  );
};
export default HomePage;
