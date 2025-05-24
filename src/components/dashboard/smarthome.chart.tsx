import type { IDeviceStats } from "@lukesthl/fritzbox/homeautomation/devicestats";
import { trpc } from "../../utils/api";
import { DashboardCard } from "./dashboard.card";

const displayDataType = (type: keyof IDeviceStats) =>
  type === "temperature"
    ? "°C"
    : type === "voltage"
    ? "V"
    : type === "power"
    ? "W"
    : type === "energy"
    ? "kWh"
    : "";

export const SmartHomeChart = ({
  title,
  ains,
  type,
  color,
}: {
  title: string;
  ains: string[];
  type: keyof IDeviceStats;
  color?: React.ComponentProps<typeof DashboardCard>["colors"];
}) => {
  const deviceStat = trpc.smartHome.deviceStats.useQuery({
    ains,
  });
  const colors = color || [
    type === "temperature"
      ? "red"
      : type === "power"
      ? "orange"
      : type === "voltage"
      ? "lime"
      : "rose",
  ];
  const data = deviceStat.data || [];
  const min = Math.min(
    ...(data || []).map(
      (d) =>
        (type === "temperature"
          ? d?.Temperatur
          : type === "power"
          ? d.Leistung
          : type === "voltage"
          ? d.Volt
          : d.Energie) || 0 - 4
    )
  );
  const categories =
    type === "temperature"
      ? ["Temperatur"]
      : type === "power"
      ? ["Leistung"]
      : type === "voltage"
      ? ["Volt"]
      : ["Energie"];
  const filteredData = data
    .map((stat) =>
      type === "temperature"
        ? {
            Temperatur: stat?.Temperatur,
            date: Intl.DateTimeFormat("de", {
              timeStyle: "short",
            }).format(stat.date),
          }
        : type === "power"
        ? {
            Leistung: stat.Leistung,
            date: Intl.DateTimeFormat("de", {
              timeStyle: "short",
            }).format(stat.date),
          }
        : type === "voltage"
        ? {
            Volt: stat.Volt,
            date: Intl.DateTimeFormat("de", {
              timeStyle: "short",
            }).format(stat.date),
          }
        : {
            Energie: stat.Energie,
            date: Intl.DateTimeFormat("de", {
              timeStyle: "short",
            }).format(stat.date),
          }
    )
    .filter((stat) =>
      type === "temperature"
        ? stat.Temperatur
        : type === "power"
        ? stat.Leistung
        : type === "voltage"
        ? stat.Volt
        : stat.Energie
    );
  const chart: React.ComponentProps<typeof DashboardCard> = {
    title,
    loading: deviceStat.isLoading,
    categories,
    index: "date",
    data: filteredData,
    valueFormatter: (value) => `${value}${displayDataType(type)}`,
    maxValue: Math.max(
      ...(data || []).map(
        (d) =>
          ((type === "temperature"
            ? d?.Temperatur
            : type === "power"
            ? d.Leistung
            : type === "voltage"
            ? d.Volt
            : d.Energie) || 0) + 4
      )
    ),
    minValue:
      (min > 0 && type !== "voltage") || type === "energy" || type === "power"
        ? 0
        : min,
    colors,
  };

  return <DashboardCard {...chart} />;
};
