import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

export default useLogin;
