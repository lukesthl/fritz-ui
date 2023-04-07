import { api } from "../../utils/api";
import { DashboardCard } from "./dashboard.card";
import { DashboardHelper } from "./dashboard.helper";

const title = "CPU-Temperatur";

export const CpuTempChart = () => {
  const query = api.deviceInfo.getEcoStats.useQuery();

  const cpuTempChart: React.ComponentProps<typeof DashboardCard> = {
    title: title,
    loading: query.isLoading,
    categories: [title],
    dataKey: "date",
    data: (query.data?.data.cputemp.series[0] || [])
      .filter((cpuTemp) => parseInt(cpuTemp) > 40)
      .map((cpuTemp, index) => {
        const date = DashboardHelper.getDateByTooComplicatedFritzboxFormat(
          query.data!.data,
          index,
          "cputemp"
        );
        const dateToShow = Intl.DateTimeFormat("de", {
          timeStyle: "short",
        }).format(date);
        return {
          date: dateToShow,
          [title]: cpuTemp,
        };
      }),
    valueFormatter: (value) => `${value}°C`,
    maxValue: 140,
    minValue: 40,
    colors: ["cyan"],
  };
  return <DashboardCard {...cpuTempChart} />;
};
