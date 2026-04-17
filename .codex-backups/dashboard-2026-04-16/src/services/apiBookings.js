import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" },
    );

  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("Bookings could not be loaded");

  const bookings = data.map((booking) => ({
    id: booking.id,
    startDate: booking.startDate,
    endDate: booking.endDate,
    numNights: booking.numNights,
    numGuests: booking.numGuests,
    status: booking.status,
    totalPrice: booking.totalPrice,
    cabinName: booking.cabins?.name ?? "",
    guestName: booking.guests?.fullName ?? "",
    guestEmail: booking.guests?.email ?? "",
  }));

  return { data: bookings, count };
}

export async function getBooking(bookingId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, observations, hasBreakfast,cabinPrice,extrasPrice, isPaid, cabins(name), guests(fullName, email, nationalID, countryFlag)",
    )
    .eq("id", bookingId)
    .single();

  if (error) throw new Error("Booking could not be loaded");

  return data;
}

export async function updateCheckin({ bookingId, breakfast = {} }) {
  const updateData = {
    status: "checked-in",
    isPaid: true,
    ...breakfast,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be checked in");
  }

  return data;
}

export async function updateCheckout(bookingId) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "checked-out" })
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be checked out");
  }

  return data;
}

export async function deleteBooking(bookingId) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) throw new Error("Bookings could not get loaded");

  return data;
}
