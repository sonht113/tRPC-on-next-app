import { publicProcedure, router } from "../trpc/trpc";

export const todoRouter = router({
  get: publicProcedure.query(async () => {
    return [3,3,4]
  })
})