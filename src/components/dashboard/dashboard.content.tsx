import { BandwidthChart } from "./bandwidth.chart";
import { CpuChart } from "./cpu.chart";
import { CpuTempChart } from "./cputemp.chart";
import { NetworkInfoCards } from "./network.infocards";
import { SmartHomeCharts } from "./smarthome.charts";

export const DashboardContent = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      <div className="col-span-2">
        <CpuChart />
      </div>
      <div className="col-span-2 md:col-span-4">
        <BandwidthChart />
      </div>
      <NetworkInfoCards />
      <div className="col-span-2 md:col-span-2">
        <CpuChart />
      </div>
      <div className="col-span-2 md:col-span-2">
        <CpuTempChart />
      </div>
      <SmartHomeCharts />
    </div>
  );
};
