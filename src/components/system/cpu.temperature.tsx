import { trpc } from "../../lib/api";
import { SystemCard } from "./system.card";

const title = "CPU-Temperatur";

export const CpuTemperatureChart = () => {
  const ecoStatsQuery = trpc.deviceInfo.getEcoStats.useQuery();

  const cpuTemperatureChart: React.ComponentProps<typeof SystemCard> = {
    title: title,
    loading: ecoStatsQuery.isLoading,
    categories: [title],
    index: "date",
    data: (ecoStatsQuery.data?.data?.cputemp?.series[0] || [])
      .filter((cpuTemp) => parseInt(cpuTemp) > 40)
      .map((cpuTemp, index) => {
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
          [title]: cpuTemp,
        };
      }),
    maxValue: 140,
    minValue: 40,
    colors: ["indigo"],
    valueFormatter: (value) => `${value}°C`,
    showTooltip: true,
    error:
      !ecoStatsQuery.data?.data?.cputemp && !ecoStatsQuery.isLoading
        ? new Error(
            "CPU-Temperatur ist seit Fritz-OS 8.0 nicht mehr verfügbar.",
          )
        : undefined,
  };

  return <SystemCard {...cpuTemperatureChart} />;
};

export const CpuTemperatureChartFallback = () => {
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
