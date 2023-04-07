import { createTRPCRouter, protectedProcedure } from "../trpc";

export const NetworkDevicesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.fritzBox.lanDeviceHosts.getHosts();
  }),
  size: protectedProcedure.query(async ({ ctx }) => {
    return (await ctx.fritzBox.lanDeviceHosts.getHosts()).length;
  }),
});
