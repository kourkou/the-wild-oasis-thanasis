import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: createCabinMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabinMutation, isLoading, error };
}
