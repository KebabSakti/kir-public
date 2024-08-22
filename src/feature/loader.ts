import { KirApi } from "./kir/kir_api";
import { KirRemote } from "./kir/kir_remote";

export const kirApi: KirApi = new KirRemote();
