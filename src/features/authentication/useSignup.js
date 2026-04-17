import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export default function useSignup() {
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading, error, isSuccess };
}
