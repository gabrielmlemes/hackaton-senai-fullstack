"use server"

import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  serviceId: string
  barbershopId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const iso = params.date.toISOString()
  const data = iso.split("T")[0]
  const hora = iso.split("T")[1].slice(0, 5)

  const payload = {
    barbearia_id: Number(params.barbershopId),
    servico_id: Number(params.serviceId),
    data,
    hora
  }

  const response = await fetch("http://localhost:5000/agendamentos", {
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
