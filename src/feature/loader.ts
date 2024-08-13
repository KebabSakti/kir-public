import { KirApi } from "./kir/kir_api";
import { KirMock } from "./kir/kir_mock";

export const kirApi: KirApi = new KirMock(10);
