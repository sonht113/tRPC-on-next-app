import dynamic from "next/dynamic"

export * from "./hooks/use-task-store"
export * from "./services/enums"
export * from "./services/types"

const TaskTimeStatus = dynamic(() => import("./components/tag-time-status"))
const Task = dynamic(() => import("./components/task"))
const TaskList = dynamic(() => import("./components/task-list"))
const TaskListHeader = dynamic(() => import("./components/task-list-header"))
const TaskForm = dynamic(() => import("./components/task-form/task-form"))

export { Task, TaskForm, TaskList, TaskListHeader, TaskTimeStatus }
