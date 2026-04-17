import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSettingsMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings have been successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { updateSettingsMutation, isLoading, error };
}
