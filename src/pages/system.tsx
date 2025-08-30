import { type NextPage } from "next";
import { PageContent } from "../components/pagecontent";
import { trpc } from "../lib/api";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../components/card";
import { List } from "../components/list";
import { Button } from "../components/button";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { ErrorBoundary } from "react-error-boundary";
import {
  CpuLoadageChart,
  CpuLoadageChartFallback,
} from "../components/system/cpu.loadage";
import {
  CpuTemperatureChartFallback,
  CpuTemperatureChart,
} from "../components/system/cpu.temperature";

const System: NextPage = () => {
  const deviceInfoQuery = trpc.deviceInfo.getInfo.useQuery();
  const rebootMutation = trpc.deviceInfo.reboot.useMutation();
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
                loading={rebootMutation.isPending}
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
                      0,
                    )} Tagen`
                  : 0}
              </List.Item>
            </List.Wrapper>
          </Card.Content>
        </Card.Wrapper>
        <ErrorBoundary fallback={<CpuLoadageChartFallback />}>
          <CpuLoadageChart />
        </ErrorBoundary>
        <ErrorBoundary fallback={<CpuTemperatureChartFallback />}>
          <CpuTemperatureChart />
        </ErrorBoundary>
        <Card.Wrapper>
          <Card.Header>Logs</Card.Header>
          <Card.Content className="max-h-[500px] overflow-y-auto">
            <dl>
              <div className="border-y border-white/20 px-4 py-5 font-mono text-sm whitespace-pre-wrap text-white/70 sm:gap-4 sm:px-6">
                <table className="table-auto">
                  <tbody>
                    {!deviceInfoQuery.isLoading
                      ? deviceInfoQuery.data?.NewDeviceLog.match(
                          /[^\r\n]+/g,
                        )?.map((logPerLine) => {
                          const date = logPerLine.slice(0, 17);
                          const logEntry = logPerLine.slice(18, -1);
                          return (
                            <tr key={uuidv4()}>
                              <td className="align-baseline font-semibold whitespace-nowrap text-white/80">
                                <span className="mr-2">{date}</span>
                              </td>
                              <td>{logEntry}</td>
                            </tr>
                          );
                        })
                      : [...Array<unknown>(20)].map(() => (
                          <tr key={uuidv4()} className="my-3 flex w-full">
                            <td className="mr-4 h-4 w-32 animate-pulse rounded-sm bg-gray-300/30" />
                            <td className="h-4 w-[400px] animate-pulse rounded-sm bg-gray-300/30" />
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
