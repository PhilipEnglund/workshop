import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createApiClient, EndpointParameters, Method } from "./ghibli.ts";

const GHIBLI_BASE = "https://ghibliapi.vercel.app";

const ghibliApi = createApiClient(
  (method: Method, url: string, params?: EndpointParameters) =>
    fetch(url, {
      method,
      ...(["post", "put"].includes(method)
        ? { body: JSON.stringify(params) }
        : {}),
    }).then((res) => res.json()),
  GHIBLI_BASE,
);
export const keys = {
  films: "GET_FILMS",
};

export const useGetFilmsQuery = () => {
  return useQuery({
    queryKey: [keys.films],
    queryFn: async () => {
      const data = await ghibliApi.get("/films", { query: {} });
      return data;
    },
  });
};

export const useGetFilmByIdQuery = (id: string) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: [keys.films, id],
    queryFn: async () => {
      const data = await ghibliApi.get(`/films/${id}`, { query: {} });
      return data;
    },
    initialData: () => {
      return client.getQueryData([keys.films])?.find((film) => film.id === id);
    },
  });
};
