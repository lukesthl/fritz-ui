import { type NextPage } from "next";
import { BandwidthChart } from "../components/dashboard/bandwidth.chart";
import { CpuChart } from "../components/dashboard/cpu.chart";
import { CpuTempChart } from "../components/dashboard/cputemp.chart";
import { NetworkInfoCards } from "../components/dashboard/network.infocards";
import { SmartHomeCharts } from "../components/dashboard/smarthome.charts";
import { PageContent } from "../components/pagecontent";

const Dashboard: NextPage = () => {
  return (
    <PageContent
      title="Dashboard"
      description="Das Dashboard bietet Ihnen in Infos über die CPU-Auslastung und die Internet-Bandbreite Ihres Routers. Darüber hinaus erhalten Sie eine Übersicht über Statistiken Ihrer Smart Home Geräte."
    >
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
    </PageContent>
  );
};

export default Dashboard;
