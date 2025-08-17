import { trpc } from "../../lib/api";
import { DashboardCard } from "./dashboard.card";
import { DashboardHelper } from "./dashboard.helper";

const title = "CPU-Auslastung";

export const CpuChart = () => {
  const query = trpc.deviceInfo.getEcoStats.useQuery();

  const cpuPercentageChart: React.ComponentProps<typeof DashboardCard> = {
    title: title,
    loading: query.isLoading,
    categories: [title],
    index: "date",
    data: (query.data?.data?.cpuutil?.series?.at(0) || []).map(
      (cpuUsage, index) => {
        if (!query.data) {
          return {
            date: "",
            [title]: 0,
          };
        }
        const date = DashboardHelper.getDateByTooComplicatedFritzboxFormat(
          query.data.data,
          index,
          "cpuutil",
        );
        const dateToShow = Intl.DateTimeFormat("de", {
          timeStyle: "short",
        }).format(date);
        return {
          date: dateToShow,
          [title]: cpuUsage,
        };
      },
    ),
    error:
      !query.data?.data.cpuutil && !query.isLoading
        ? new Error(
            "CPU-Auslastung ist seit Fritz-OS 8.0 nicht mehr verfügbar.",
          )
        : undefined,
  };
  return <DashboardCard {...cpuPercentageChart} />;
};

export const CpuChartFallback = () => {
  return (
    <DashboardCard
      title={title}
      error={new Error("Es ist ein Fehler aufgetreten.")}
      data={[]}
      categories={[]}
      index="date"
    />
  );
};
