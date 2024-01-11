export namespace Schemas {
  // <Schemas>
  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type get_Films = {
    method: "GET";
    path: "/films";
    parameters: {
      query: Partial<{ fields: unknown; limit: unknown }>;
    };
    response: unknown;
  };
  export type get_FilmsId = {
    method: "GET";
    path: "/films/{id}";
    parameters: {
      query: Partial<{ fields: unknown }>;
      path: { id: unknown };
    };
    response: unknown;
  };
  export type get_People = {
    method: "GET";
    path: "/people";
    parameters: {
      query: Partial<{ fields: unknown; limit: unknown }>;
    };
    response: unknown;
  };
  export type get_PeopleId = {
    method: "GET";
    path: "/people/{id}";
    parameters: {
      query: Partial<{ fields: unknown }>;
      path: { id: unknown };
    };
    response: unknown;
  };
  export type get_Locations = {
    method: "GET";
    path: "/locations";
    parameters: {
      query: Partial<{ fields: unknown; limit: unknown }>;
    };
    response: unknown;
  };
  export type get_LocationsId = {
    method: "GET";
    path: "/locations/{id}";
    parameters: {
      query: Partial<{ fields: unknown }>;
      path: { id: unknown };
    };
    response: unknown;
  };
  export type get_Species = {
    method: "GET";
    path: "/species";
    parameters: {
      query: Partial<{ fields: unknown; limit: unknown }>;
    };
    response: unknown;
  };
  export type get_SpeciesId = {
    method: "GET";
    path: "/species/{id}";
    parameters: {
      query: Partial<{ fields: unknown }>;
      path: { id: unknown };
    };
    response: unknown;
  };
  export type get_Vehicles = {
    method: "GET";
    path: "/vehicles";
    parameters: {
      query: Partial<{ fields: unknown; limit: unknown }>;
    };
    response: unknown;
  };
  export type get_VehiclesId = {
    method: "GET";
    path: "/vehicles/{id}";
    parameters: {
      query: Partial<{ fields: unknown }>;
      path: { id: unknown };
    };
    response: unknown;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  get: {
    "/films": Endpoints.get_Films;
    "/films/{id}": Endpoints.get_FilmsId;
    "/people": Endpoints.get_People;
    "/people/{id}": Endpoints.get_PeopleId;
    "/locations": Endpoints.get_Locations;
    "/locations/{id}": Endpoints.get_LocationsId;
    "/species": Endpoints.get_Species;
    "/species/{id}": Endpoints.get_SpeciesId;
    "/vehicles": Endpoints.get_Vehicles;
    "/vehicles/{id}": Endpoints.get_VehiclesId;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint["parameters"]>
  ): Promise<TEndpoint["response"]> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
