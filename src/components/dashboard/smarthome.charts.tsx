import { DeviceType } from "@lukesthl/fritzbox/homeautomation/smarthome";
import { trpc } from "../../lib/api";
import { SmartHomeChart } from "./smarthome.chart";

export const SmartHomeCharts = () => {
  const smartHomeDevices = trpc.smartHome.getAll.useQuery();
  return (
    <>
      {smartHomeDevices.data?.devices.map((device) => (
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
      {smartHomeDevices.data?.deviceGroups.map((group) => (
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
