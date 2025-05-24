import { trpc } from "../../utils/api";
import { DashboardCard } from "./dashboard.card";

export const BandwidthChart = () => {
  const networkMonitorQuery = trpc.networkMonitor.getStats.useQuery(undefined, {
    refetchInterval: 5000,
  });
  const maxDownloadBytes = networkMonitorQuery.data?.info.maxDownstream || 0;
  const maxUploadBytes = networkMonitorQuery.data?.info.maxUpstream || 0;
  const networkTraffic = networkMonitorQuery.data?.currentNetworkTraffic;

  const bandwidthChart: React.ComponentProps<typeof DashboardCard> = {
    title: "Bandbreite",
    loading: networkMonitorQuery.isLoading,
    categories: ["Downstream", "Upstream"],
    index: "date",
    data: (networkTraffic || []).map(
      ({
        downBytes,
        uploadDefaultBytes,
        uploadImportantBytes,
        uploadRealtimeBytes,
        date,
      }) => {
        const dateToShow = `-${(
          (new Date().getTime() - date.getTime()) /
          1000
        ).toFixed(0)}s`;
        const Downstream = Math.min(maxDownloadBytes, downBytes / 100) / 1000;
        const Upstream =
          Math.min(
            maxUploadBytes,
            (uploadDefaultBytes + uploadImportantBytes + uploadRealtimeBytes) /
              100
          ) / 1000;
        return {
          date: dateToShow,
          Downstream: Downstream.toFixed(2),
          Upstream: Upstream.toFixed(2),
        };
      }
    ),
    valueFormatter: (value) => `${value} Mbit/s`,
    maxValue: Math.max(maxDownloadBytes / 1000, maxUploadBytes / 1000),
    colors: ["yellow", "green"],
  };
  return <DashboardCard {...bandwidthChart} />;
};
