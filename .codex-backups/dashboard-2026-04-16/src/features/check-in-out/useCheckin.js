import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCheckin } from "../../services/apiBookings";

export default function useCheckin() {
  const { bookingId } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkinMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCheckin,
    onSuccess: () => {
      toast.success("Booking checked in successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkinMutation, isPending, error };
}
