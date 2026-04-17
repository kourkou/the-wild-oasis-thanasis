import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCabinMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabinMutation, isLoading, error };
}
