import { router, publicProcedure } from "./trpc"

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [23, 23, 23]
  })
})

export type AppRouter = typeof appRouter
