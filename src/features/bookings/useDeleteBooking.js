import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutation, isLoading } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (_, bookingId) => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBookingMutation, isLoading };
}
