import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabinMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success("Cabin has been successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCabinMutation, isLoading, error };
}
