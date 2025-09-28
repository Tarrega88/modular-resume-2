import { editMeasurementStyle } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

function MeasurementToggle() {
  const dispatch = useDispatch();
  const { measurementStyle } = useSelector((state: RootState) => state.resume);

  const active = "bg-emerald-600 hover:bg-emerald-400 text-white";
  const inactive = "bg-gray-500 hover:bg-emerald-600 text-gray-300 opacity-75";

  const metricStyle = measurementStyle === "metric" ? active : inactive;
  const imperialStyle = measurementStyle === "imperial" ? active : inactive;

  return (
    <div className="bg-blue-50 pt-1">
      <div className="text-center font-semibold">Measurement</div>
      <div className="bg-blue-50 flex py-2 justify-center gap-4">
        <button
          className={`${metricStyle} transition-all duration-150 cursor-pointer w-18 rounded-sm`}
          onClick={() => dispatch(editMeasurementStyle("metric"))}
        >
          Metric
        </button>
        <button
          className={`${imperialStyle} transition-all duration-150 cursor-pointer w-18 rounded-sm`}
          onClick={() => dispatch(editMeasurementStyle("imperial"))}
        >
          Imperial
        </button>
      </div>
    </div>
  );
}

export default MeasurementToggle;
