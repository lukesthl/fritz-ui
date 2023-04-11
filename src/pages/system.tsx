import { type NextPage } from "next";
import { PageContent } from "../components/pagecontent";
import { api } from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import { AreaChart } from "@tremor/react";
import { Card } from "../components/card";
import { List } from "../components/list";
import { Button } from "../components/button";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { cn } from "../components/utils/class.helper";

const System: NextPage = () => {
  const deviceInfoQuery = api.deviceInfo.getInfo.useQuery();
  const ecoStatsQuery = api.deviceInfo.getEcoStats.useQuery();
  const rebootMutation = api.deviceInfo.reboot.useMutation();
  return (
    <PageContent
      title="Einstellungen"
      description="Hier sehen Sie, wie Ihre Geräte aktuell mit Ihrer FRITZ!Box verbunden sind. Hier können Sie auch sehen, ob für Ihre FRITZ!-Produkte Software-Updates vorhanden sind und für welche FRITZ!-Produkte Sie Mesh aktivieren können"
    >
      <div className="space-y-8">
        <Card.Wrapper>
          <Card.Header>
            <div className="flex items-center justify-between">
              <p>Fritz!Box Info</p>
              <Button
                type="secondary"
                onClick={() => {
                  rebootMutation.mutate();
                }}
                loading={rebootMutation.isLoading}
              >
                <span>Neu starten</span>
                <ArrowPathIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <List.Wrapper loading={deviceInfoQuery.isLoading}>
              <List.Item className="border-y border-white/20">
                Modell
                {deviceInfoQuery.data?.NewHardwareVersion}
              </List.Item>
              <List.Item>
                Seriennummer
                {deviceInfoQuery.data?.NewSerialNumber}
              </List.Item>
              <List.Item className="border-y border-white/20">
                Software Version
                {deviceInfoQuery.data?.NewSoftwareVersion}
              </List.Item>
              <List.Item>
                Online seit
                {deviceInfoQuery.data?.NewUpTime
                  ? `${(deviceInfoQuery.data.NewUpTime / 60 / 60 / 24).toFixed(
                      0
                    )} Tagen`
                  : 0}
              </List.Item>
            </List.Wrapper>
          </Card.Content>
        </Card.Wrapper>
        <Card.Wrapper>
          <Card.Header>CPU-Auslastung</Card.Header>
          <Card.Content>
            <dl>
              <div className="max-w-full whitespace-pre-wrap border-y border-white/20 px-4 py-5 font-mono text-sm text-white/70 sm:gap-4 sm:px-6">
                {ecoStatsQuery.isLoading ? (
                  <>
                    <span className="hidden">
                      {"only to show animation when loaded"}
                    </span>
                    <AreaChart
                      data={[]}
                      categories={["CPU-Auslastung"]}
                      index="date"
                      maxValue={100}
                      colors={["indigo"]}
                      valueFormatter={(value) => `${value}%`}
                      className={cn("mt-1 h-72")}
                    />
                  </>
                ) : (
                  <AreaChart
                    data={(
                      ecoStatsQuery.data?.data.cpuutil.series[0] || []
                    ).map((cpuUsage, index) => {
                      const date = new Date();
                      let nextHour: number | undefined = undefined;
                      if (!nextHour && ecoStatsQuery.data?.data) {
                        let newIndex = index;
                        while (
                          newIndex <
                          ecoStatsQuery.data?.data.cputemp.labels.length
                        ) {
                          const newHour =
                            ecoStatsQuery.data?.data.cputemp.labels[newIndex];
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
                      console.log(dateToShow);
                      return {
                        date: dateToShow,
                        "CPU-Auslastung": cpuUsage,
                      };
                    })}
                    categories={["CPU-Auslastung"]}
                    index="date"
                    maxValue={100}
                    colors={["indigo"]}
                    valueFormatter={(value) => `${value}%`}
                    className="mt-1 h-72"
                  />
                )}
              </div>
            </dl>
          </Card.Content>
        </Card.Wrapper>
        <Card.Wrapper>
          <Card.Header>CPU-Temperatur</Card.Header>
          <Card.Content>
            <dl>
              <div className="max-w-full whitespace-pre-wrap border-y border-white/20 px-4 py-5 font-mono text-sm text-white/70 sm:gap-4 sm:px-6">
                {ecoStatsQuery.isLoading ? (
                  <>
                    <span className="hidden">
                      {"only to show animation when loaded"}
                    </span>
                    <AreaChart
                      data={[]}
                      categories={["CPU-Temperatur"]}
                      showTooltip
                      index="date"
                      maxValue={140}
                      minValue={40}
                      colors={["indigo"]}
                      valueFormatter={(value) => `${value}°C`}
                      className="mt-1 h-72"
                    />
                  </>
                ) : (
                  <AreaChart
                    data={(ecoStatsQuery.data?.data.cputemp.series[0] || [])
                      .filter((cpuTemp) => parseInt(cpuTemp) > 40)
                      .map((cpuTemp, index) => {
                        const date = new Date();
                        let nextHour: number | undefined = undefined;
                        if (!nextHour && ecoStatsQuery.data?.data) {
                          let newIndex = index;
                          while (
                            newIndex <
                            ecoStatsQuery.data?.data.cputemp.labels.length
                          ) {
                            const newHour =
                              ecoStatsQuery.data?.data.cputemp.labels[newIndex];
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
                          "CPU-Temperatur": cpuTemp,
                        };
                      })}
                    categories={["CPU-Temperatur"]}
                    showTooltip
                    index="date"
                    maxValue={140}
                    minValue={40}
                    colors={["indigo"]}
                    valueFormatter={(value) => `${value}°C`}
                    className="mt-1 h-72"
                  />
                )}
              </div>
            </dl>
          </Card.Content>
        </Card.Wrapper>
        <Card.Wrapper>
          <Card.Header>Logs</Card.Header>
          <Card.Content className="max-h-[500px] overflow-y-auto">
            <dl>
              <div className="whitespace-pre-wrap border-y border-white/20 px-4 py-5 font-mono text-sm text-white/70 sm:gap-4 sm:px-6">
                <table className="table-auto">
                  <tbody>
                    {!deviceInfoQuery.isLoading
                      ? deviceInfoQuery.data?.NewDeviceLog.match(
                          /[^\r\n]+/g
                        )?.map((logPerLine) => {
                          const date = logPerLine.slice(0, 17);
                          const logEntry = logPerLine.slice(18, -1);
                          return (
                            <tr key={uuidv4()}>
                              <td className="whitespace-nowrap align-baseline font-semibold text-white/80">
                                <span className="mr-2">{date}</span>
                              </td>
                              <td>{logEntry}</td>
                            </tr>
                          );
                        })
                      : [...Array<unknown>(20)].map(() => (
                          <tr key={uuidv4()} className="my-3 flex w-full">
                            <td className="mr-4 h-4 w-32 animate-pulse rounded bg-gray-300/30" />
                            <td className="h-4 w-[400px] animate-pulse rounded  bg-gray-300/30" />
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </dl>
          </Card.Content>
        </Card.Wrapper>
      </div>
    </PageContent>
  );
};

export default System;
