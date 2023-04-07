import { DownloadIcon, NetworkIcon, UploadIcon } from "lucide-react";
import colors from "tailwindcss/colors";
import { api } from "../../utils/api";
import { HomeWifiIcon } from "../icons/home-wifi";
import { InfoCard } from "./infocard";

export const NetworkInfoCards = () => {
  const networkDevicesSize = api.networkDevices.size.useQuery();
  const smartHomeDevicesSize = api.smartHome.size.useQuery();
  const networkMonitorQuery = api.networkMonitor.getStats.useQuery(undefined, {
    refetchInterval: 5000,
  });
  const networkTraffic = networkMonitorQuery.data?.currentNetworkTraffic;
  const maxDownloadBytes = networkMonitorQuery.data?.info.maxDownstream || 0;
  const maxUploadBytes = networkMonitorQuery.data?.info.maxUpstream || 0;

  const latestNetworkTraffic = networkTraffic?.at(-1);
  const downBytes =
    (latestNetworkTraffic && latestNetworkTraffic?.downBytes) || 0;
  const currentDownstream = (
    Math.min(maxDownloadBytes, downBytes / 100) / 1000
  ).toFixed(2);

  const Upstream = (
    Math.min(
      maxUploadBytes,
      latestNetworkTraffic
        ? (latestNetworkTraffic.uploadDefaultBytes +
            latestNetworkTraffic.uploadImportantBytes +
            latestNetworkTraffic.uploadRealtimeBytes) /
            100
        : 0
    ) / 1000
  ).toFixed(2);
  return (
    <>
      <div className="col-span-1 flex flex-col space-y-4">
        <InfoCard
          title="Download"
          loading={networkMonitorQuery.isLoading}
          icon={
            <div className="rounded-lg bg-yellow-500/20 p-1.5">
              <DownloadIcon className="h-6 w-6 text-yellow-400" />
            </div>
          }
          value={`${currentDownstream} Mbit/s`}
        />
        <InfoCard
          title="Netzwerkgeräte"
          loading={networkDevicesSize.isLoading}
          icon={
            <div className="rounded-lg bg-purple-500/20 p-1.5">
              <NetworkIcon className="h-6 w-6 text-purple-400" />
            </div>
          }
          value={networkDevicesSize?.data || 0}
        />
      </div>
      <div className="col-span-1 flex flex-col space-y-4">
        <InfoCard
          title="Upload"
          icon={
            <div className="rounded-lg bg-green-500/20 p-1.5">
              <UploadIcon className="h-6 w-6 text-green-400" />
            </div>
          }
          loading={networkMonitorQuery.isLoading}
          value={`${Upstream} Mbit/s`}
        />
        <InfoCard
          title="Smart-Home Geräte"
          icon={
            <div className="rounded-lg bg-sky-500/20 p-1.5">
              <HomeWifiIcon className="h-6 w-6" color={colors.sky[500]} />
            </div>
          }
          loading={smartHomeDevicesSize.isLoading}
          value={smartHomeDevicesSize?.data || 0}
        />
      </div>
    </>
  );
};
