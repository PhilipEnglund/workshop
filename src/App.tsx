import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGetFilmsQuery } from "./api/client.ts";

function App() {
  const { isLoading, data } = useGetFilmsQuery();

  return (
    <>
      <div>
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
        <div className="card">
          <p>{data.title}</p>
        </div>
      ))}
    </>
  );
}

export default App;
