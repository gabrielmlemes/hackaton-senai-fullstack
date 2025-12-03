import Header from "../_components/header"
import BookingItem from "../_components/booking-item"
import { getBookings } from "../_actions/get-bookings"

// usuário mockado
const MOCK_USER_ID = 1

const Bookings = async () => {
  const bookings = await getBookings()
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
