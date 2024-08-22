import { server } from "../../common/config";
import { Failure } from "../../common/error";
import { Axios } from "../../common/instance";
import { Kir } from "./kir";
import { KirApi } from "./kir_api";

export class KirRemote implements KirApi {
  async find(certificateNumber: string): Promise<Kir | undefined> {
    try {
      const response = await Axios({
        url: `${server}/certificate/${certificateNumber}/find`,
        method: "get",
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }
}
