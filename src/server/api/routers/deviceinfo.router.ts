import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const DeviceInfoRouter = createTRPCRouter({
  getInfo: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.fritzBox.deviceInfo.getInfo();
  }),
  getDeviceLogs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.fritzBox.deviceInfo.getDeviceLog();
  }),
  getEcoStats: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.fritzBox.unofficial.ecoStat.getEcoStat();
  }),
  reboot: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.fritzBox.deviceConfig.reboot();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const timeout = 1000 * 60 * 10; // 10 minutes;
    let success = false;
    // retry until timeout
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        console.log("Rebooting...");
        const info = await ctx.fritzBox.deviceInfo.getInfo();
        if (info.NewModelName) {
          console.log("Reboot successful");
          success = true;
          break;
        }
      } catch (e) {
        console.error(e);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (!success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Reboot failed after exceeding timeout of 10 minutes",
      });
    } else {
      return "success";
    }
  }),
});
