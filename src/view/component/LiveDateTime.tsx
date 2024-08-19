import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function LiveDateTime({ ...props }) {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div {...props}>{currentTime.format("DD/MM/YYYY HH:mm:ss")}</div>;
}
