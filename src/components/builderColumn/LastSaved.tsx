import { RootState } from "@/state/store";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LastSaved() {
  const { data, resumeMetaData } = useSelector((s: RootState) => s.resume);
  const [updated, setUpdated] = useState(formatDate(new Date()));

  useEffect(() => {
    console.log("Saving");
    setUpdated(formatDate(new Date()));
  }, [data, resumeMetaData]);

  return (
    <div className="bg-blue-50 flex flex-col items-center py-1">
      <div>Last Saved</div>
      <div>{updated}</div>
    </div>
  );
}

export default LastSaved;
