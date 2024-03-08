import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInfo } from "@/components";
import { getServerSession } from "next-auth";

type Props = {};
const HomePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-[60px] bg-slate-600 text-white ">
      <UserInfo
        user={{
          email: session?.user?.email,
          name: session?.user?.name,
        }}
      />
    </div>
  );
};
export default HomePage;
