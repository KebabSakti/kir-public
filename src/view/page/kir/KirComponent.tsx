export function KirSection({ ...props }) {
  return (
    <div className="px-4 flex flex-col gap-2 lg:gap-6 lg:flex-row">
      {props.children}
    </div>
  );
}

export function KirCard({ ...props }) {
  return (
    <div className="space-y-2 w-full">
      <div className="font-semibold text-[14px] lg:text-[16px]">
        {props.title}
      </div>
      <div className="bg-white divide-y">{props.children}</div>
    </div>
  );
}

export function KirCardItem({ ...props }) {
  return (
    <div className="flex gap-2 items-center p-4 text-[12px] lg:text-[14px]">
      <div className="w-40 shrink-0 lg:w-80">{props.title}</div>
      <div>: {props.value}</div>
    </div>
  );
}

export function KirCardImage({ ...props }) {
  return (
    <div className="bg-white p-4 space-y-4 grow flex flex-col items-center">
      <div className="text-[14px] lg:text-[16px]">{props.title}</div>
      <img src={props.value} className="w-full rounded lg:w-40" />
    </div>
  );
}

export function KirCardItemHeading({ ...props }) {
  return (
    <div className="p-4">
      <div className="font-semibold text-[14px] lg:text-[16px]">
        {props.title}
      </div>
    </div>
  );
}
