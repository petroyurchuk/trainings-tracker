import { Workout } from "@/types/workout";
import Link from "next/link";
import React from "react";

type WorkoutsProps = {
  workouts: Workout[];
};
const Workouts: React.FC<WorkoutsProps> = ({ workouts }) => {
  return (
    <div>
      {workouts.map((workout, idx) => (
        <Link
          href={`/workouts/${workout.id}`}
          className="p-2 border-2 border-slate-600 my-2 ml-10 w-[300px] block"
          key={workout.id}
        >
          <span>{idx + 1}.</span> {workout.name}
        </Link>
      ))}
    </div>
  );
};
export default Workouts;
