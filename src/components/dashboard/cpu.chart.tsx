import { api } from "../../utils/api";
import { DashboardCard } from "./dashboard.card";
import { DashboardHelper } from "./dashboard.helper";

const title = "CPU-Auslastung";

export const CpuChart = () => {
  const query = api.deviceInfo.getEcoStats.useQuery();

  const cpuPercentageChart: React.ComponentProps<typeof DashboardCard> = {
    title: title,
    loading: query.isLoading,
    categories: [title],
    index: "date",
    data: (query.data?.data.cpuutil.series.at(0) || []).map(
      (cpuUsage, index) => {
        const date = DashboardHelper.getDateByTooComplicatedFritzboxFormat(
          query.data!.data,
          index,
          "cpuutil"
        );
        const dateToShow = Intl.DateTimeFormat("de", {
          timeStyle: "short",
        }).format(date);
        return {
          date: dateToShow,
          [title]: cpuUsage,
        };
      }
    ),
  };
  return <DashboardCard {...cpuPercentageChart} />;
};
