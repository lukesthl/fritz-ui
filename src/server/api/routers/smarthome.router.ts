import { z } from "zod";
import {
  IDeviceStats,
  Stats,
} from "@lukesthl/fritzbox/homeautomation/devicestats";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const SmartHomeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.fritzBox.smartHome.getDevices();
  }),
  size: protectedProcedure.query(async ({ ctx }) => {
    return (await ctx.fritzBox.smartHome.getDevices()).devices.length;
  }),
  deviceStats: protectedProcedure
    .input(z.object({ ains: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const { ains } = input;
      const groupStats = await Promise.all(
        ains.map((ain) =>
          ctx.fritzBox.homeautomation.deviceStats.getBasicDeviceStats(ain)
        )
      );
      const data = groupStats.map((deviceStat) => generateStatData(deviceStat));
      const average: {
        date: number;
        Temperatur?: number | undefined;
        Energie?: number | undefined;
        Leistung?: number | undefined;
        Volt?: number | undefined;
        ains: string[];
      }[] = [];

      data.forEach((deviceStats) => {
        for (const [date] of deviceStats) {
          const statsWithSameDate: {
            date: number;
            Temperatur?: string | undefined;
            Energie?: string | undefined;
            Leistung?: string | undefined;
            Volt?: string | undefined;
          }[] = [];
          for (const tmp of data) {
            const statTmp = tmp.get(date);
            if (statTmp) {
              statsWithSameDate.push({ ...statTmp, ...tmp, date });
            }
          }
          const averageTemperature =
            statsWithSameDate
              .map((stat) => parseFloat(stat.Temperatur || ""))
              .reduce((acc, curr) => acc + curr, 0) / statsWithSameDate.length;
          const averageEnergy =
            statsWithSameDate
              .map((stat) => parseFloat(stat.Energie || ""))
              .reduce((acc, curr) => acc + curr, 0) / statsWithSameDate.length;
          const averagePower =
            statsWithSameDate
              .map((stat) => parseFloat(stat.Leistung || ""))
              .reduce((acc, curr) => acc + curr, 0) / statsWithSameDate.length;
          const averageVoltage =
            statsWithSameDate
              .map((stat) => parseFloat(stat.Volt || ""))
              .reduce((acc, curr) => acc + curr, 0) / statsWithSameDate.length;
          const newAverage = {
            date,
            Temperatur: !isNaN(averageTemperature)
              ? +averageTemperature.toFixed(2)
              : undefined,
            Energie: !isNaN(averageEnergy)
              ? +averageEnergy.toFixed(2)
              : undefined,
            Leistung: !isNaN(averagePower)
              ? +averagePower.toFixed(2)
              : undefined,
            Volt: !isNaN(averageVoltage)
              ? +averageVoltage.toFixed(2)
              : undefined,
            ains,
          };
          average.push(newAverage);
        }
      });
      return average;
    }),
});

const getStatByType = (
  deviceStat: IDeviceStats,
  type: keyof IDeviceStats,
  onTransform: (value: string) => string
) => {
  let date = new Date();
  const stat = deviceStat[type];
  const stats: Stats | undefined = Array.isArray(stat?.stats)
    ? stat?.stats[1]
    : stat?.stats;
  if (stats) {
    const data = stats["#text"]
      .split(",")
      .reverse()
      .map((dataValue) => {
        const secondsBetweenCollection = stats["@_grid"];
        let timestamp = date.getTime();
        timestamp =
          timestamp + parseFloat(secondsBetweenCollection || "") * 1000;
        date = new Date();
        date.setTime(timestamp);
        const key =
          type === "temperature"
            ? "Temperatur"
            : type === "power"
            ? "Leistung"
            : type === "voltage"
            ? "Volt"
            : "Energie";
        return {
          date: date.valueOf(),
          [key]: onTransform(dataValue),
        };
      });
    return data;
  }
  return [];
};

const generateStatData = (
  deviceStat: IDeviceStats
): Map<
  number,
  {
    Temperatur?: string;
    Energie?: string;
    Leistung?: string;
    Volt?: string;
  }
> => {
  const temperatureStats = getStatByType(deviceStat, "temperature", (temp) =>
    (parseFloat(temp) / 10).toFixed(2)
  );
  const energyStats = getStatByType(deviceStat, "energy", (energy) =>
    (parseFloat(energy) / 1000).toFixed(2)
  );
  const powerStats = getStatByType(deviceStat, "power", (power) =>
    (parseFloat(power) / 100).toFixed(2)
  );
  const voltageStats = getStatByType(deviceStat, "voltage", (volt) =>
    (parseFloat(volt) / 1000).toFixed(2)
  );
  const stats = temperatureStats
    .concat(powerStats)
    .concat(powerStats)
    .concat(voltageStats)
    .concat(energyStats);

  const map = new Map<
    number,
    {
      Temperatur?: string;
      Energie?: string;
      Leistung?: string;
      Volt?: string;
    }
  >();
  stats.forEach(({ date, ...stat }) => {
    if (map.has(date)) {
      const oldStat = map.get(date);
      if (oldStat) {
        map.set(date, {
          Energie: (stat.Energie as unknown as string) || oldStat.Energie,
          Leistung: (stat.Leistung as unknown as string) || oldStat.Leistung,
          Temperatur:
            (stat.Temperatur as unknown as string) || oldStat.Temperatur,
          Volt: (stat.Volt as unknown as string) || oldStat.Volt,
        });
      }
    } else {
      map.set(date, stat);
    }
  });
  return map;
};
