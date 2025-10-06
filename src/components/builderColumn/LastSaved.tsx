import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LastSaved() {
  const { data, resumeMetaData } = useSelector((s: RootState) => s.resume);
  const [updated, setUpdated] = useState(new Date());

  useEffect(() => {
    setUpdated(new Date());
  }, [data, resumeMetaData]);

  let timeString = updated.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="bg-neutral-700 text-sm sm:text-base">
      Last Saved: {timeString}
    </div>
  );
}

export default LastSaved;
