import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.auth.current)["$get"]> | null;
type RequestType = InferRequestType<(typeof client.api.auth.current)["$get"]>;

const useGetCurrentUser = () => {
  const query = useQuery<ResponseType, Error, RequestType>({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current["$get"]();
      if (!response.ok) return null;
      const { data } = await response.json();
      return { data };
    },
  });
  return query;
};

export default useGetCurrentUser;
