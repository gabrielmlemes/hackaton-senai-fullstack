"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, CalendarIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarButton from "./sidebar"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

const Header = () => {
  const { data } = useSession()

  const handleLogoutClick = () => signOut()

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 lg:px-14">
        <Link href="/">
          <Image
            src="/logo.png"
            height={18}
            width={120}
            className="lg:w-40"
            alt="FSW BARBER"
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

          {data?.user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user.image ?? ""} />
              </Avatar>

              <div className="flex items-center gap-5">
                <p className="font-bold">{data.user.name}</p>
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon size={18} />
                </Button>
              </div>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                  <LogInIcon size={20} />
                  <p className="text-base">Login</p>
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
