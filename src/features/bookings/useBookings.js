import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("checked") || "all";

  const filter =
    filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "date-desc";
  const [sortField, direction] = sortByRaw.split("-");

  const sortBy =
    sortField === "date"
      ? { field: "startDate", direction }
      : { field: "totalPrice", direction };

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings = [], count = 0 } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  useEffect(() => {
    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      });
  }, [queryClient, filter, sortBy, page, pageCount]);

  return { bookings, count, isLoading, error };
}
