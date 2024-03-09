import { authOptions } from "@/auth";
import { UserInfo } from "@/components";
import { getServerSession } from "next-auth";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <UserInfo
        user={{
          email: session?.user?.email,
          name: session?.user?.name,
        }}
      />
    </div>
  );
};
export default Profile;
