import { ErrorBoundary } from "react-error-boundary";
import { BandwidthChart, BandwidthChartFallback } from "./bandwidth.chart";
import { CpuChart, CpuChartFallback } from "./cpu.chart";
import { CpuTempChart, CpuTempChartFallback } from "./cputemp.chart";
import {
  NetworkInfoCards,
  NetworkInfoCardsFallback,
} from "./network.infocards";
import { SmartHomeCharts } from "./smarthome.charts";

export const DashboardContent = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      <div className="col-span-2">
        <ErrorBoundary fallback={<CpuChartFallback />}>
          <CpuChart />
        </ErrorBoundary>
      </div>
      <div className="col-span-2 md:col-span-4">
        <ErrorBoundary fallback={<BandwidthChartFallback />}>
          <BandwidthChart />
        </ErrorBoundary>
      </div>
      <ErrorBoundary fallback={<NetworkInfoCardsFallback />}>
        <NetworkInfoCards />
      </ErrorBoundary>
      <div className="col-span-2 md:col-span-2">
        <ErrorBoundary fallback={<CpuTempChartFallback />}>
          <CpuTempChart />
        </ErrorBoundary>
      </div>
      <SmartHomeCharts />
    </div>
  );
};
