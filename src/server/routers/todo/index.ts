import { router, baseProcedure } from "../../trpc"

export const todoRouter = router({
  get: baseProcedure.query(() => {
    return [3, 3, 4]
  })
})
