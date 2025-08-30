import { trpc } from "../../lib/api";
import { SystemCard } from "./system.card";

const title = "CPU-Auslastung";

export const CpuLoadageChart = () => {
  const ecoStatsQuery = trpc.deviceInfo.getEcoStats.useQuery();

  const cpuLoadageChart: React.ComponentProps<typeof SystemCard> = {
    title: title,
    loading: ecoStatsQuery.isLoading,
    categories: [title],
    index: "date",
    data: (ecoStatsQuery.data?.data?.cpuutil?.series[0] || []).map(
      (cpuUsage, index) => {
        const date = new Date();
        let nextHour: number | undefined = undefined;
        if (!nextHour && ecoStatsQuery.data?.data) {
          let newIndex = index;
          while (newIndex < ecoStatsQuery.data?.data.cputemp.labels.length) {
            const newHour = ecoStatsQuery.data?.data.cputemp.labels[newIndex];
            if (newHour && typeof newHour === "number") {
              nextHour = newHour;
              break;
            }
            newIndex += 1;
          }
        }
        if (nextHour) {
          date.setHours(nextHour);
        }
        date.setMinutes(0);
        const dateToShow = Intl.DateTimeFormat("de", {
          timeStyle: "short",
        }).format(date);
        return {
          date: dateToShow,
          [title]: cpuUsage,
        };
      },
    ),
    maxValue: 100,
    colors: ["indigo"],
    valueFormatter: (value) => `${value}%`,
    error:
      !ecoStatsQuery.data?.data?.cpuutil && !ecoStatsQuery.isLoading
        ? new Error(
            "CPU-Auslastung ist seit Fritz-OS 8.0 nicht mehr verfügbar.",
          )
        : undefined,
  };
  console.log(cpuLoadageChart.error);
  return <SystemCard {...cpuLoadageChart} />;
};

export const CpuLoadageChartFallback = () => {
  return (
    <SystemCard
      title={title}
      error={new Error("Es ist ein Fehler aufgetreten.")}
      data={[]}
      categories={[]}
      index="date"
    />
  );
};
