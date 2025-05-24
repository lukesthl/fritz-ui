import type { Device } from "@lukesthl/fritzbox/homeautomation/smarthome";
import { DeviceType } from "@lukesthl/fritzbox/homeautomation/smarthome";
import clsx from "clsx";
import Fuse from "fuse.js";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { BatteryIcon } from "../components/icons/battery";
import { PageContent } from "../components/pagecontent";
import { SearchInput } from "../components/search.input";
import { Table } from "../components/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { trpc } from "../utils/api";

const columns: React.ComponentProps<
  typeof Table<Device, keyof Device>
>["columns"] = [
  {
    title: "Aktiv",
    key: "active",
    render: (active) => (
      <div
        className={clsx("h-2 w-2 rounded-full", {
          "bg-green-300": active,
          "bg-red-300": !active,
        })}
      />
    ),
    sortable: true,
    defaultSort: "desc",
  },
  { title: "Name", key: "name", sortable: true },
  {
    title: "Typ",
    key: uuidv4(),
    render: (device) => ("type" in device ? readableType(device.type) : null),
    sortable: true,
  },
  {
    title: "Status",
    key: uuidv4(),
    render: (device) =>
      "battery" in device && device.battery ? (
        <div className="flex items-center space-x-1">
          <BatteryIcon
            level={device.battery.percentage}
            color={device.battery.low ? colors.red[500] : undefined}
          />
          <p className="text-xs">{device.battery.percentage}%</p>
        </div>
      ) : device.active ? (
        "OK"
      ) : (
        "Offline"
      ),
    sortable: true,
  },
  {
    title: "Aktivität",
    key: uuidv4(),
    render: (device) => {
      const celsius =
        ("temperature" in device &&
          device.temperature &&
          (device.temperature.celsius / 10).toFixed(1)) ||
        null;
      const power =
        (device.type === DeviceType.Powermeter &&
          (device.power / 1000).toFixed(2)) ||
        null;
      return (
        <div className="flex items-center space-x-1">
          {power && <p>{power} W</p>}
          {power && celsius && <p className="text-xs ">/</p>}
          {celsius && <p>{celsius} °C</p>}
        </div>
      );
    },
  },
];

const SmartHome: NextPage = () => {
  const smartHomeDevicesQuery = trpc.smartHome.getAll.useQuery(undefined, {
    refetchInterval: 5000,
  });
  const router = useRouter();
  let activeTab = "devices";
  const validation = z
    .object({ tab: z.literal("devices").or(z.literal("groups")) })
    .safeParse(router.query);
  if (validation.success) {
    activeTab = validation.data.tab;
  }
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const [filteredDeviceData, setFilteredDeviceData] = useState(
    smartHomeDevicesQuery.data?.devices || []
  );
  const [filteredGroupData, setFilteredGroupData] = useState(
    smartHomeDevicesQuery.data?.deviceGroups || []
  );
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    if (!searchValue) {
      setFilteredDeviceData(smartHomeDevicesQuery.data?.devices || []);
      setFilteredGroupData(smartHomeDevicesQuery.data?.deviceGroups || []);
    }
  }, [
    smartHomeDevicesQuery.data?.devices,
    smartHomeDevicesQuery.data?.deviceGroups,
    searchValue,
  ]);

  return (
    <PageContent
      title="Smart Home"
      description="Hier sehen Sie, welche Ihrer Smart Home Geräte aktuell mit Ihrer FRITZ!Box verbunden sind. Sie können die Geräte nach Name, Typ oder Status filtern."
    >
      <div className="md:max-w-3xl 2xl:max-w-5xl">
        <Tabs
          defaultValue="devices"
          value={selectedTab}
          onValueChange={(value) => {
            setSearchValue(null);
            setFilteredDeviceData(smartHomeDevicesQuery.data?.devices || []);
            setFilteredGroupData(
              smartHomeDevicesQuery.data?.deviceGroups || []
            );
            setSelectedTab(value);
          }}
          className="w-full"
        >
          <div className="space-y-2 md:flex md:justify-between md:space-y-0">
            <TabsList className="border border-white/20 dark:bg-white/10">
              <TabsTrigger
                className="text-white/80 dark:data-[state=active]:bg-white/10"
                value="devices"
              >
                <Link href={{ query: { tab: "devices" } }}>Gruppen</Link>
              </TabsTrigger>
              <TabsTrigger
                className="dark:data-[state=active]:bg-white/10"
                value="groups"
              >
                <Link href={{ query: { tab: "groups" } }}>Gruppen</Link>
              </TabsTrigger>
            </TabsList>
            <SearchInput
              placeholder="Suche nach Name, Typ, Status..."
              className="w-full md:min-w-[300px]"
              value={searchValue || ""}
              onClear={() => {
                setSearchValue(null);
                setFilteredDeviceData(
                  smartHomeDevicesQuery.data?.devices || []
                );
                setFilteredGroupData(
                  smartHomeDevicesQuery.data?.deviceGroups || []
                );
              }}
              onChange={(event) => {
                setSearchValue(event.target.value);
                if (selectedTab === "devices") {
                  if (
                    smartHomeDevicesQuery.data &&
                    smartHomeDevicesQuery.data.devices.length > 0 &&
                    event.target.value.length > 2
                  ) {
                    const fuse = new Fuse(smartHomeDevicesQuery.data.devices, {
                      keys: Object.keys(
                        smartHomeDevicesQuery.data.devices[0] || {}
                      ),
                      shouldSort: true,
                      minMatchCharLength: 2,
                    });
                    const searchResult = fuse.search(event.target.value);
                    setFilteredDeviceData(
                      searchResult.map((result) => result.item)
                    );
                  } else {
                    setFilteredDeviceData(
                      smartHomeDevicesQuery.data?.devices || []
                    );
                  }
                } else {
                  if (
                    smartHomeDevicesQuery.data &&
                    smartHomeDevicesQuery.data.deviceGroups.length > 0 &&
                    event.target.value.length > 2
                  ) {
                    const fuse = new Fuse(
                      smartHomeDevicesQuery.data.deviceGroups,
                      {
                        keys: Object.keys(
                          smartHomeDevicesQuery.data.deviceGroups[0] || {}
                        ),
                        shouldSort: true,
                        minMatchCharLength: 2,
                      }
                    );
                    const searchResult = fuse.search(event.target.value);
                    setFilteredGroupData(
                      searchResult.map((result) => result.item)
                    );
                  } else {
                    setFilteredGroupData(
                      smartHomeDevicesQuery.data?.deviceGroups || []
                    );
                  }
                }
              }}
            />
          </div>
          <TabsContent value="devices">
            <Table
              columns={columns}
              data={filteredDeviceData}
              loading={smartHomeDevicesQuery.isLoading}
              className="mt-4"
            />
          </TabsContent>

          <TabsContent value="groups">
            <Accordion type="multiple">
              {filteredGroupData.map((group) => (
                <AccordionItem value={group.id} key={group.id}>
                  <AccordionTrigger>
                    <div className="mt-2 flex h-full items-center space-x-4">
                      <h2 className="text-xl font-semibold tracking-wide text-gray-200">
                        {group.name}
                      </h2>
                      <span className="text-sm text-gray-300/90 no-underline!">
                        {group.average.temperature &&
                          ` ⌀${(
                            group.average.temperature?.celsius / 10
                          ).toFixed(1)} 
                        °C,`}{" "}
                        {group.average.thermostat?.tsoll &&
                          `Ziel: 
                        ${(group.average.thermostat.tsoll - 16) / 2 + 8} 
                        °C`}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table
                      columns={columns}
                      data={group.associated}
                      loading={smartHomeDevicesQuery.isLoading}
                      className="mt-4"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </PageContent>
  );
};

const readableType = (type: DeviceType) => {
  if (type === DeviceType.Thermostat) {
    return "Heizkörperregler";
  }
  if (type === DeviceType.Switch) {
    return "Schalter";
  }
  if (type === DeviceType.Blind) {
    return "Rollladen";
  }
  if (type === DeviceType.Button) {
    return "Button";
  }
  if (type === DeviceType.Powermeter) {
    return "Steckdose";
  }
  if (type === DeviceType.Light) {
    return "Licht";
  }
  if (type === DeviceType.ContactSensor) {
    return "Tür-/Fensterkontakt";
  }
  return "Unbekannt";
};

export default SmartHome;
