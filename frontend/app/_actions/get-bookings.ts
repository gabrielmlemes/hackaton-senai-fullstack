"use server"

export const getBookings = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meus-agendamentos`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar agendamentos")
  }

  return response.json()
}
