import React from "react";
import Link from "next/link";
import { Client } from "@/types/client";

type ClientsProps = {
  clients: Client[] | null;
};
const Clients: React.FC<ClientsProps> = ({ clients }) => {
  if (!clients) return null;
  return (
    <div>
      {clients.map((client, idx) => (
        <Link
          href={`/clients/${client.id}`}
          className="p-2 border-2 border-slate-600 my-2 ml-10 w-[300px] block"
          key={client.id}
        >
          <span>{idx + 1}.</span> {client.name}
        </Link>
      ))}
    </div>
  );
};
export default Clients;
