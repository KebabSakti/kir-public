import { Kir } from "./kir";

export abstract class KirApi {
  abstract find(certificateNumber: string): Promise<Kir | undefined>;
}
