import { Navbar } from "@/components";

type Props = {};
const HomePage = async (props: Props) => {
  return (
    <div className="min-h-[50px] h-[60px] bg-gradient-to-b from-cyan-900 to-cyan-950 text-white ">
      <Navbar />
    </div>
  );
};
export default HomePage;
