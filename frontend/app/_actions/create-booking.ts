"use server"

import { revalidatePath } from "next/cache"

export interface CreateBookingParams {
  serviceId: number | string
  barbershopId: number | string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const d = params.date

  // ⚠️ pegando a data no horário LOCAL (sem UTC)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")

  const data = `${year}-${month}-${day}`
  const hora = `${hours}:${minutes}`

  const payload = {
    barbearia_id: Number(params.barbershopId),
    servico_id: Number(params.serviceId),
    data,
    hora
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.erro)

  revalidatePath("/bookings")
  revalidatePath(`/barbershops/${params.barbershopId}`)
}
