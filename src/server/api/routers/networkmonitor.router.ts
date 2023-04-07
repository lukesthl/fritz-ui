import type { NetworkTraffic } from "@lukesthl/fritzbox/unofficial/networkmonitor";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const NetworkMonitorRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const networkStats =
      await ctx.fritzBox.unofficial.networkMonitor.getNetworkStats();
    // TODO only one supported
    const [firstSyncGroup] = networkStats?.data.sync_groups || [];
    let currentNetworkTraffic: NetworkTraffic[] | null = null;
    if (firstSyncGroup) {
      currentNetworkTraffic =
        ctx.fritzBox.unofficial.networkMonitor.getNetworkTrafficBySyncGroup(
          firstSyncGroup
        );
    }
    return {
      info: {
        maxDownstream: networkStats?.data.connections.at(0)?.downstream || 0,
        maxUpstream: networkStats?.data.connections.at(0)?.upstream || 0,
      },
      currentNetworkTraffic,
    };
  }),
});
