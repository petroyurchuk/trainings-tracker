import { getAllUsers } from "@/actions/getAllUsers";

const Community = async () => {
  const users = await getAllUsers();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 items-center bg-black min-h-screen p-5">
      {users.map((user) => (
        <div
          className="bg-slate-700 text-white shadow-md shadow-[#fff]  text-center rounded-md py-8"
          key={user.id}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};
export default Community;
