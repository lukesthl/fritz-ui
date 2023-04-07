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
      title="Willkommen bei Fritz-UI"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequuntur ipsam enim odio facere asperiores voluptatibus quas repellat, odit laudantium voluptate corrupti eligendi possimus, autem qui iusto repellendus aliquid animi."
    >
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <CpuChart />
        </div>
        <div className="col-span-4">
          <BandwidthChart />
        </div>
        <NetworkInfoCards />
        <div className="col-span-2">
          <CpuChart />
        </div>
        <div className="col-span-2">
          <CpuTempChart />
        </div>
        <SmartHomeCharts />
      </div>
    </PageContent>
  );
};

export default Dashboard;
