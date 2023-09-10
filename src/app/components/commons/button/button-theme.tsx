"use client"
import { Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "../../icons"


const ButtonTheme = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Switch
      defaultSelected
      size='lg'
      color='secondary'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />
      }
      onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
    ></Switch>
  )
}

export default ButtonTheme
