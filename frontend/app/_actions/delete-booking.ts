"use server"

import { revalidatePath } from "next/cache"
// import { db } from "../_lib/prisma"

// export const deleteBooking = async (bookingId: string) => {
//   await db.booking.delete({
//     where: {
//       id: bookingId,
//     },
//   })
//   revalidatePath("/bookings")
// }

interface DeleteBookingParams {
  bookingId: string
}
export const deleteBooking = async (params: DeleteBookingParams) => {
  const response = await fetch(`http://localhost:5000/agendamentos/${params.bookingId}`, {
    method: "DELETE",
  })
  revalidatePath("/bookings")
  const result = await response.json()
  return result}