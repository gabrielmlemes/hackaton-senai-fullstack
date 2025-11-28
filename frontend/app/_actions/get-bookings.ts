"use server"

export const getBookings = async () => {
  const response = await fetch("http://localhost:5000/meus-agendamentos", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar agendamentos")
  }

  return response.json()
}
