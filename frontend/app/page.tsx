import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import { QuickSearchOptions } from "./_constants/search"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import SwiperComponent from "./_components/swiper-component"
import { getBarbershops } from "./_actions/get-barbers"

const Home = async () => {
  // chamando o banco de dados

  const barbershops = await getBarbershops()

  // Como ainda não temos "popular" e "most visited", por enquanto:
  const popularBarbershops = [...barbershops].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const mostVisitedBarbershops = [...barbershops].sort((a, b) =>
    b.name.localeCompare(a.name)
  )

  // const confirmedBookings = session?.user
  //   ? await db.booking.findMany({
  //       where: {
  //         userId: (session?.user as any).id,
  //         date: {
  //           gte: new Date(),
  //         },
  //       },
  //       include: {
  //         service: {
  //           include: {
  //             barbershop: true,
  //           },
  //         },
  //       },
  //       orderBy: {
  //         date: "asc",
  //       },
  //     })
  //   : []

  return (
    <div>
      {/* HEADER */}
      <Header />

      <main className="p-5">
        {/* TEXTO */}
        <div className="rounded lg:grid lg:grid-cols-2 lg:bg-[url('/barbeariabg.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:pb-8">
          <div className="lg:max-w-[85%] lg:pl-24 lg:pt-8">
            {/* User infos */}
            <div>
              <h2 className="text-xl font-bold">
                Olá, sejam bem-vindos ao <strong className="text-primary">Hackaton - SENAI!</strong>
              </h2>
              {/* Dia */}
              <p>
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span> de {format(new Date(), "MMMM", { locale: ptBR })}</span>
              </p>
            </div>

            {/* INPUT DE BUSCA */}
            {/* <div className="mt-6 lg:w-full">
              <Search />
            </div> */}

            {/* AGENDAMENTOS */}
            {/* <div className="hidden w-full lg:flex lg:flex-col">
              {confirmedBookings.length > 0 && (
                <>
                  {/* AGENDAMENTO */}
            {/* <h2 className="lg:mb-3 lg:mt-6 lg:text-xs lg:font-bold lg:uppercase">
      AGENDAMENTOS
      </h2>

      <div className="lg:flex lg:gap-3 lg:overflow-x-auto lg:[&::-webkit-scrollbar]:hidden">
    {confirmedBookings.map((booking) => (
      <BookingItem
      key={booking.id}
      booking={JSON.parse(JSON.stringify(booking))}
      />
    ))}
      </div>
      </>
    )}
      </div> */}
          </div>

          {/* MAIS VISITADOS */}
          <div className="lg:relative lg:w-11/12">
            <h2 className="hidden lg:mb-3 lg:mt-6 lg:flex lg:text-xs lg:font-bold lg:uppercase lg:text-white">
              mais visitados
            </h2>

            <div className="mt-10">
              <SwiperComponent barbershops={mostVisitedBarbershops} />
            </div>
          </div>
        </div >

        {/* BUSCA RÁPIDA */}
        {/* < div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden" >
          {
            QuickSearchOptions.map((option) => (
              <Button
                variant="secondary"
                className="gap-2"
                key={option.title}
                asChild
              >
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={16}
                    height={16}
                  />
                  {option.title}
                </Link>
              </Button>
            ))
          }
        </div > */}

        {/* IMAGEM DO BANNER*/}
        < div className="relative mt-6 h-[150px] w-full lg:hidden" >
          <Image
            src="/logoSenai.png"
            fill
            className="rounded-xl object-cover"
            alt="Imagem Banner"
          />
        </div >

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: any) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </main >
    </div >
  )
}

export default Home
