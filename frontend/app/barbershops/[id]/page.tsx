import Header from "@/app/_components/header"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarButton from "@/app/_components/sidebar"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //chamar o banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="lg:pt-6">
        <div className="lg:px-28">
          {/* IMAGEM */}
          <div className="relative h-[250px] w-full lg:h-[575px]">
            <Image
              className="object-cover lg:rounded-lg"
              src={barbershop?.imageUrl}
              alt={barbershop?.name}
              fill
            />
            {/* BOTÕES FLUTUANTES NA IMAGEM */}
            <Button
              className="absolute left-4 top-4"
              size="icon"
              variant="secondary"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute right-4 top-4"
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>

                <SidebarButton />
              </Sheet>
            </div>
          </div>

          {/* Título */}
          <div className="border-b border-solid p-5 lg:px-0">
            <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm text-gray-400">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm text-gray-400">4.9 (899 avaliações)</p>
            </div>
          </div>

          {/* Descrição */}
          <div className="border-b border-solid p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-400 lg:text-center">
              SOBRE NÓS
            </h3>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>
        </div>

        {/* SERVIÇOS */}
        <div className="mx-auto border-b border-solid p-5">
          <h3 className="mb-4 text-sm font-bold text-gray-400 lg:text-center">
            SERVIÇOS
          </h3>

          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                service={JSON.parse(JSON.stringify(service))}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                key={service.id}
              />
            ))}
          </div>

          {/* Contato */}
          <div className="space-y-3 p-5">
            <h3 className="text-sm font-bold text-gray-400">CONTATO</h3>

            {barbershop.phones.map((phone) => (
              <PhoneItem phone={phone} key={phone} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
