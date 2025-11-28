"use client"

import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Button } from "./ui/button"
import Image from "next/image"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"


interface BookingItemProps {
  booking: any
}

function handleCancelBooking() {
  // Lógica para cancelar o agendamento
  console.log("Agendamento cancelado")
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Criar um Date real com data + hora
  const bookingDate = new Date(`${booking.data}T${booking.hora}:00`)
  const isConfirmed = isFuture(bookingDate)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5 text-start">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              {/* Nome do serviço */}
              <h3 className="font-semibold">{booking.servico_nome}</h3>

              {/* Nome da barbearia */}
              <p className="text-sm">{booking.barbearia_nome}</p>
            </div>

            {/* DIREITA - data */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(bookingDate, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(bookingDate, "dd", { locale: ptBR })}</p>
              <p className="text-sm">
                {format(bookingDate, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      {/* DETALHES DO AGENDAMENTO */}
      <SheetContent className="w-[90%] flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <SheetHeader className="border-b pb-5">
            <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
          </SheetHeader>

          {/* MAPA FAKE */}
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              src="/map.png"
              fill
              className="rounded-lg object-cover"
              alt="mapa"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="px-5 py-3">
                <h3 className="font-bold">{booking.barbearia_nome}</h3>
                <p className="text-xs">{booking.barbearia_address}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <div className="mb-3 mt-6 space-y-2">
              <p><strong>Serviço:</strong> {booking.servico_nome}</p>
              <p>
                <strong>Data:</strong> {format(bookingDate, "dd/MM/yyyy")}
              </p>
              <p>
                <strong>Horário:</strong> {format(bookingDate, "HH:mm")}
              </p>
              <p>
                <strong>Barbearia:</strong> {booking.barbearia_nome}
              </p>
            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Voltar
            </Button>
          </SheetClose>

          {/* BOTÃO CANCELAR RESERVA */}
            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="w-full" variant="destructive">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>
                      Você deseja cancelar seu agendamento?
                    </DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá
                      recupera-lá. Essa ação é irreversível!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <Button
                        variant="destructive"
                        onClick={handleCancelBooking}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
