type Props = {
  length: "1/12" | "1/6" | "1/5" | "1/4" | "1/3" | "1/2" | "3/4" | "4/4";
};

function Divider({ length }: Props) {
  const lengths = {
    "1/12": "w-1/12",
    "1/6": "w-1/6",
    "1/5": "w-1/5",
    "1/4": "w-1/4",
    "1/3": "w-1/3",
    "1/2": "w-1/2",
    "3/4": "w-3/4",
    "4/4": "w-[754px]",
  };

  const width = lengths[length];

  return <div className={`${width} border-b`}></div>;
}

export default Divider;
