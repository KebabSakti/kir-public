import { useState } from "react";
import { State, Status } from "../../../common/type";
import { Kir } from "../../../feature/kir/kir";
import { kirApi } from "../../../feature/loader";

export type KirApiType = {
  find(certificateNumber: string): Promise<void>;
  state: State<Kir>;
};

export function useKirApi(): KirApiType {
  const [state, setState] = useState<State<Kir>>({
    action: "idle",
    status: Status.idle,
  });

  async function find(certificateNumber: string): Promise<void> {
    setState({ status: Status.loading, action: "find" });

    await kirApi
      .find(certificateNumber)
      .then((result) => {
        setState({
          status: Status.complete,
          action: "find",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "find",
          error: error,
        });
      });
  }

  return { find, state };
}
