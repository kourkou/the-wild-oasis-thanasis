import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateCheckout } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: checkoutMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateCheckout,
    onSuccess: (_, bookingId) => {
      toast.success("Booking checked out successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkoutMutation, isLoading };
}
