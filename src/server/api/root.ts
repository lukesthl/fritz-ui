import { createTRPCRouter } from "./trpc";
import { NetworkDevicesRouter } from "./routers/networkdevices.router";
import { DeviceInfoRouter } from "./routers/deviceinfo.router";
import { SmartHomeRouter } from "./routers/smarthome.router";
import { NetworkMonitorRouter } from "./routers/networkmonitor.router";

export const appRouter = createTRPCRouter({
  networkDevices: NetworkDevicesRouter,
  deviceInfo: DeviceInfoRouter,
  smartHome: SmartHomeRouter,
  networkMonitor: NetworkMonitorRouter,
});

export type AppRouter = typeof appRouter;
