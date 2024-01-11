import { useParams } from "react-router-dom";

export default function Movie() {
  const { id } = useParams();

  // TODO: Implement RQ hook to fetch movie by id

  return (
    <>
      <h1>Movie</h1>

      <h2>title</h2>

      <p>{id}</p>
    </>
  );
}
