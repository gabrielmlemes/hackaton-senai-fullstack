"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, CalendarIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarButton from "./sidebar"
import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"
const Header = () => {


  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 lg:px-14">
        <Link href="/">
          <Image
            src="/logoSenai.png"
            height={18}
            width={120}
            className="lg:w-30"
            alt="SENAI Barber Shop Logo"
          />
        </Link>

        {/* Menu para telas menores */}
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SidebarButton />
          </Sheet>
        </div>

        {/* Itens do menu para telas maiores */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/bookings">
            <Button variant="ghost" className="gap-2">
              <CalendarIcon size={20} />
              <p className="text-base">Agendamentos</p>
            </Button>
          </Link>

          
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage/>
              </Avatar>

              <div className="flex items-center gap-5">
                <p className="font-bold">Hackaton SENAI</p>
                <Button
                  variant="ghost"
                  className="gap-2"
                >
                  <LogOutIcon size={18} />
                </Button>
              </div>
            </div>
          
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
