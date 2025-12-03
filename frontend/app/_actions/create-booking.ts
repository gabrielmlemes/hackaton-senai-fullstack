"use server"

import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  serviceId: string
  barbershopId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const data = params.date.toISOString().split("T")[0]
  const hora = params.date.toTimeString().slice(0, 5)

  const payload = {
    barbearia_id: Number(params.barbershopId),
    servico_id: Number(params.serviceId),
    data,
    hora
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.erro)
  console.log(result);
  

  revalidatePath("/bookings")
  revalidatePath(`/barbershops/${params.barbershopId}`)
}
