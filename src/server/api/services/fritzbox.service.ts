import { FritzBox, IOptions } from "@lukesthl/fritzbox";

class FritzBoxServiceSingleton {
  private fritzbox: FritzBox | null = null;

  public init(options: Partial<IOptions>): void {
    if (!this.fritzbox) {
      this.fritzbox = new FritzBox({
        host: process.env.FRITZBOX_HOST,
        port: process.env.FRITZBOX_PORT
          ? parseInt(process.env.FRITZBOX_PORT)
          : undefined,
        ssl: process.env.FRITZBOX_SSL === "1",
        ...options,
      });
    }
  }

  public get fritzBox(): FritzBox {
    if (!this.fritzbox) {
      throw new Error("Fritzbox not initialized");
    }
    return this.fritzbox;
  }
}

export const FritzBoxService = new FritzBoxServiceSingleton();
