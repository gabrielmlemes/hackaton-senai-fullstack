"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { QuickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarButton = () => {

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* User Infos */}
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage />
            </Avatar>

            <div className="ml-3">
              <p className="font-bold">Hackaton SENAI</p>
              <p className="text-xs text-gray-300">Bem-vindos!</p>
            </div>
          </div>
        
      </div>

      {/* Menu Header */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      {/* Menu serviços */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {QuickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={18}
                  height={18}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
    </SheetContent>
  )
}

export default SidebarButton
