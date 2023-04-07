import { FritzBox, IOptions } from "@lukesthl/fritzbox";

class FritzBoxServiceSingleton {
  private fritzbox: FritzBox | null = null;

  public init(options: Partial<IOptions>): void {
    if (!this.fritzbox) {
      this.fritzbox = new FritzBox(options);
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
