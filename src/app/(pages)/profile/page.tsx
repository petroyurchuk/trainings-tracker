import { authOptions } from "@/auth";
import { UserInfo } from "@/components";
import { getServerSession } from "next-auth";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("User isn't signed in");
  return (
    <div>
      <UserInfo
        user={{
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
        }}
      />
    </div>
  );
};
export default Profile;
