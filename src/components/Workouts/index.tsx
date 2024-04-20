import React from "react";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type WorkoutsProps = {
  startUrl: string;
  workouts: Workout[];
};
const Workouts: React.FC<WorkoutsProps> = ({ workouts, startUrl }) => {
  return (
    <div className="flex flex-wrap justify-start items-center m-4 gap-10">
      {workouts.map((workout, idx) => (
        <Link href={`/${startUrl}/${workout.id}`} key={workout.id} passHref>
          <Card className="m-2 cursor-pointer max-w-sm w-full" elevation={3}>
            <CardActionArea>
              <CardContent className="p-4">
                <Typography variant="h5" component="div">
                  {idx + 1}. {workout.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
};
export default Workouts;
