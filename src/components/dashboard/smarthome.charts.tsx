import { DeviceType } from "@lukesthl/fritzbox/homeautomation/smarthome";
import { api } from "../../utils/api";
import { SmartHomeChart } from "./smarthome.chart";

export const SmartHomeCharts = () => {
  const smartHomeDevicesQuery = api.smartHome.getAll.useQuery();
  let smartHomeDevices = smartHomeDevicesQuery.data;
  if (
    process.env.NEXT_PUBLIC_DEMOMODE === "1" &&
    smartHomeDevices?.deviceGroups &&
    smartHomeDevices?.devices
  ) {
    smartHomeDevices = {
      devices: smartHomeDevices.devices.map((device, index) => ({
        ...device,
        name: "Mein Gerät " + (index + 1),
      })),
      deviceGroups: smartHomeDevices.deviceGroups.map((group, index) => ({
        ...group,
        name: "Meine Gruppe " + (index + 1),
      })),
    };
  }
  return (
    <>
      {smartHomeDevices?.devices.map((device) => (
        <>
          {device.type === DeviceType.Thermostat ? (
            <div className="col-span-2" key={device.ain}>
              <SmartHomeChart
                ains={[device.ain]}
                title={device.name}
                type="temperature"
              />
            </div>
          ) : device.type === DeviceType.Powermeter ? (
            <>
              <div className="col-span-2" key={device.ain}>
                <SmartHomeChart
                  ains={[device.ain]}
                  title={device.name}
                  type="power"
                />
              </div>
              <div className="col-span-2" key={device.ain}>
                <SmartHomeChart
                  ains={[device.ain]}
                  title={device.name}
                  type="voltage"
                />
              </div>
              <div className="col-span-2" key={device.ain}>
                <SmartHomeChart
                  ains={[device.ain]}
                  title={device.name}
                  type="energy"
                />
              </div>
              <div className="col-span-2" key={device.ain}>
                <SmartHomeChart
                  ains={[device.ain]}
                  title={device.name}
                  type="temperature"
                />
              </div>
            </>
          ) : null}
        </>
      ))}
      {smartHomeDevices?.deviceGroups.map((group) => (
        <>
          {group.associated?.[0]?.type === DeviceType.Thermostat ? (
            <div className="col-span-2" key={group.ain}>
              <SmartHomeChart
                ains={group.associated.map((device) => device.ain)}
                title={group.name}
                type="temperature"
              />
            </div>
          ) : group.associated?.[0]?.type === DeviceType.Powermeter ? (
            <>
              <div className="col-span-2" key={group.ain}>
                <SmartHomeChart
                  ains={group.associated.map((device) => device.ain)}
                  title={group.name}
                  type="power"
                />
              </div>
              <div className="col-span-2" key={group.ain}>
                <SmartHomeChart
                  ains={group.associated.map((device) => device.ain)}
                  title={group.name}
                  type="voltage"
                />
              </div>
              <div className="col-span-2" key={group.ain}>
                <SmartHomeChart
                  ains={group.associated.map((device) => device.ain)}
                  title={group.name}
                  type="energy"
                />
              </div>
              <div className="col-span-2" key={group.ain}>
                <SmartHomeChart
                  ains={group.associated.map((device) => device.ain)}
                  title={group.name}
                  type="temperature"
                />
              </div>
            </>
          ) : null}
        </>
      ))}
    </>
  );
};
