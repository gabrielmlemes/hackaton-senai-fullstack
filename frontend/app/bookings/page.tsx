import Header from "../_components/header"
import BookingItem from "../_components/booking-item"

// usuário mockado
const MOCK_USER_ID = 1

async function getMyBookings() {
  const res = await fetch(`http://127.0.0.1:5000/meus-agendamentos/${MOCK_USER_ID}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar agendamentos")
  }

  return res.json()
}

const Bookings = async () => {
  const bookings = await getMyBookings()
  const now = new Date()

  const confirmedBookings = bookings.filter((booking: any) => {
    return new Date(booking.data) >= now
  })

  const concludedBookings = bookings.filter((booking: any) => {
    return new Date(booking.data) < now
  })

  return (
    <>
      <Header />

      <div className="mx-auto max-w-[500px] space-y-3 p-5 sm:pt-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-500">Você não tem nenhum agendamento.</p>
        )}

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking: any) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking: any) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
