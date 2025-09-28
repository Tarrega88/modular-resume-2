import { RootState } from "@/state/store";
import { formatDate } from "@/utils/formatDate";
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

  return <div className="w-full pl-6 pr-4">Last Saved: {timeString}</div>;
}

export default LastSaved;
