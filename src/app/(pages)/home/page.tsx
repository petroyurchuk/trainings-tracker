import { HeroBanner, Navbar } from "@/components";

type Props = {};
const HomePage = async (props: Props) => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
    </div>
  );
};
export default HomePage;
