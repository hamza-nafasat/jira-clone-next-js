import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.logout)["$post"]>;

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if (!response.ok) throw new Error("Failed to logout");
      return await response.json();
    },
    onSuccess: ({ message }) => {
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: ["current", "workspaces"] });
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
  return mutation;
};

export default useLogout;
