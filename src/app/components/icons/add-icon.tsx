"use client"
import React, { FC } from "react"

type Props = {
  className?: string
}

const AddIcon: FC<Props> = (props) => (
  <svg
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15'></path>
  </svg>
)

export default AddIcon
