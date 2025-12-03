"use server"

import { revalidatePath } from "next/cache"

interface DeleteBookingParams {
  bookingId: string
}
export const deleteBooking = async (params: DeleteBookingParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos/${params.bookingId}`, {
    method: "DELETE",
  })
  revalidatePath("/bookings")
  const result = await response.json()
  return result}