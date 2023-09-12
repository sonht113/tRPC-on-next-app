"use client"

import { FC } from "react"
import { TASK_LIST_HEADER } from "../task-constant"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import TaskForm from "./task-form/task-form"

type Props = {
  typeTask: keyof typeof TASK_LIST_HEADER
  submit: () => void
  isLoading: boolean
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const TaskListHeader: FC<Props> = ({ typeTask, submit, isLoading, isOpen, onOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add new task</ModalHeader>
              <ModalBody>
                <TaskForm isDisabled={isLoading} />
              </ModalBody>
              <ModalFooter>
                <Button color='warning' variant='solid' onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={isLoading} color='primary' onClick={submit}>
                  {isLoading ? "Loading" : "Submit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className='flex justify-between items-center px-3 py-5'>
        <section className='w-[70%] flex items-center justify-start gap-2'>
          <div
            className={`w-[40px] h-[40px] ${TASK_LIST_HEADER[typeTask].color} flex justify-center items-center rounded-full`}
          >
            {TASK_LIST_HEADER[typeTask].icon}
          </div>
          <span className={`font-bold text-xl ${TASK_LIST_HEADER[typeTask].textColor}`}>
            {TASK_LIST_HEADER[typeTask].label}
          </span>
        </section>
        {TASK_LIST_HEADER[typeTask].action(onOpen)}
      </div>
    </>
  )
}

export default TaskListHeader
