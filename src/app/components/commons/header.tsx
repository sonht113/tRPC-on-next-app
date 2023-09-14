"use client"
import React from "react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react"
import Link from "next/link"
import { useTheme } from "next-themes"
import ButtonTheme from "./button/button-theme"

const NAVBAR_ITEM = [
  {
    label: "Home",
    link: "/"
  },
  {
    label: "Task",
    link: "/task"
  }
]

const Header = () => {
  const { theme } = useTheme()
  return (
    <Navbar className='w-full bg-gray-500 dark:bg-black border-b-[1px] border-gray-600 shadow-lg'>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit dark:text-white'>TRPC</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='start'>
        {NAVBAR_ITEM.map((nav, index) => (
          <NavbarItem key={index}>
            <Link href={nav.link} color='foreground'>
              {nav.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ButtonTheme />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

const AcmeLogo = () => (
  <svg fill='none' height='36' viewBox='0 0 32 32' width='36' className='stroke-black dark:stroke-white'>
    <path
      clipRule='evenodd'
      d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
)

export default Header
