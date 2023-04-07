import { createTRPCRouter } from "./trpc";
import { NetworkDevicesRouter } from "./routers/networkdevices.router";
import { DeviceInfoRouter } from "./routers/deviceinfo.router";
import { SmartHomeRouter } from "./routers/smarthome.router";
import { NetworkMonitorRouter } from "./routers/networkmonitor.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  networkDevices: NetworkDevicesRouter,
  deviceInfo: DeviceInfoRouter,
  smartHome: SmartHomeRouter,
  networkMonitor: NetworkMonitorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
