"use client";
import React from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Client } from "@/types/client";
import { Workout } from "@/types/workout";
import { Typography } from "@mui/material";
import { CreateWorkout, Workouts } from "@/components";

type response = {
  data: {
    client: Client;
    clientWorkouts: Workout[];
  };
};

type Props = {};
const WorkoutsPage = (props: Props) => {
  const router = usePathname();
  const [dataPage, setDataPage] = React.useState<response>();
  const fetchClientAndWorkouts = async () => {
    try {
      const { data } = await axios.get<response>(
        `/api/client/${router.split("/")[2]}`
      );
      console.log(data);
      setDataPage(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchClientAndWorkouts();
  }, []);
  if (!dataPage?.data.client) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">
        Workouts of client {dataPage?.data.client?.name}
        <Workouts
          workouts={dataPage.data.clientWorkouts}
          startUrl={`clients/${dataPage.data.client.id}`}
        />
        <CreateWorkout
          urlApi={`client/${dataPage.data.client.id}/workout`}
          urlClient={`clients/${dataPage.data.client.id}/workouts`}
        />
      </Typography>
    </div>
  );
};
export default WorkoutsPage;
