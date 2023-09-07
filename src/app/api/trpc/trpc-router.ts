import { todoRouter } from "../todo/route";
import { router, publicProcedure } from "./trpc";

export const appRouter = router({
  todos: todoRouter
});

export type AppRouter = typeof appRouter;

