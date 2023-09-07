import TodoList from "./features/todo/component/todo-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="dark:text-white">Hello</span>
      <TodoList />
    </main>
  )
}
