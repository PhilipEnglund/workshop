import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetFilmsQuery } from "./api/client.ts";
import { Link } from "react-router-dom";
import Header from "./Header.tsx";

function Home() {
  const { isLoading, data } = useGetFilmsQuery();

  return (
    <>
      <div>
        <Header />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {data?.map((data) => (
        <div key={data.id} className="card">
          <Link to={`/movies/${data.id}`}>
            <p>{data.title}</p>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Home;
