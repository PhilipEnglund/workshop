import { useQueryClient } from "@tanstack/react-query";
import { keys } from "./api/client.ts";

export default function Header() {
  const client = useQueryClient();
  const isLoading =
    client.getQueryState([keys.films])?.fetchStatus === "fetching";
  return (
    <div>
      <h4>Header</h4>

      {isLoading && <p>Loading...</p>}
    </div>
  );
}
