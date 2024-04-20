import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import { getAllWorkouts } from "@/actions/getAllWorkouts";
import getCurrentUser from "@/actions/getCurrentUser";
import { CreateWorkout, Workouts } from "@/components";

const WorkoutsPage = async () => {
  const currentUser = await getCurrentUser();
  const workouts = await getAllWorkouts();

  return (
    <Stack>
      <Link
        href={"/"}
        className="max-w-[300px] rounded-lg text-center font-semibold text-xl p-3 border-2 border-sky-900 m-3 transition-all duration-150 hover:bg-slate-950 hover:text-white hover:border-slate-800"
      >
        Back
      </Link>
      <Stack direction="row" alignItems="center" spacing={10}>
        <Typography variant="h2">Your Workouts</Typography>
        {currentUser?.role === "TRAINER" ? (
          <Link href={"/clients"}>Your clients</Link>
        ) : (
          <div>Some shit</div>
        )}
      </Stack>
      <Workouts workouts={workouts} startUrl="workouts" />
      <CreateWorkout urlApi="workout" urlClient="workouts" />
    </Stack>
  );
};
export default WorkoutsPage;
