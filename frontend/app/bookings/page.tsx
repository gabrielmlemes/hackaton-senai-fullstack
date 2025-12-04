import Header from "../_components/header"
import BookingItem from "../_components/booking-item"
import { getBookings } from "../_actions/get-bookings"

// ===============================
// ✅ PARSE COM GAMBIARRA (-3 HORAS)
// ===============================
function parseBookingDate(booking: any) {
  const [year, month, day] = booking.data.split("-").map(Number)
  const [hours, minutes] = booking.hora.split(":").map(Number)

  const date = new Date(year, month - 1, day, hours, minutes)

  // Força -3h
  date.setHours(date.getHours() - 3)

  return date
}

const Bookings = async () => {
  const bookings = await getBookings()
  const now = new Date()

  const confirmedBookings = bookings.filter((booking: any) => {
    return parseBookingDate(booking) >= now
  })

  const concludedBookings = bookings.filter((booking: any) => {
    return parseBookingDate(booking) < now
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
