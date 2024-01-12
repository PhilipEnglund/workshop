import { useParams } from "react-router-dom";
import { keys, useGetFilmByIdQuery } from "./api/client.ts";
import { useQueryClient } from "@tanstack/react-query";

export default function Movie() {
  const { id } = useParams();
  const { data, isLoading } = useGetFilmByIdQuery(id!);
  const client = useQueryClient();
  // TODO: Implement RQ hook to fetch movie by id

  client.invalidateQueries([keys.films]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Movie</h1>

      <h2>{data.title}</h2>

      <p>{id}</p>
    </>
  );
}
