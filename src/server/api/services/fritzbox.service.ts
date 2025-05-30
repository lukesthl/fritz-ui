import type { IOptions } from "@lukesthl/fritzbox";
import { FritzBox } from "@lukesthl/fritzbox";
import process from "process";

export const createFritzBoxClient = (options: Partial<IOptions>): FritzBox => {
  return new FritzBox({
    host: process.env.FRITZBOX_HOST,
    port: process.env.FRITZBOX_PORT
      ? parseInt(process.env.FRITZBOX_PORT)
      : undefined,
    ssl: process.env.FRITZBOX_SSL === "1",
    ...options,
  });
};
