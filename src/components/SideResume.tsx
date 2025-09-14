// SideResume.tsx
import { useDispatch, useSelector } from "react-redux";
import SideResumeInner from "./SideResumeInner";
import { RootState } from "../state/store";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // ← React Router
import { setCurrentResume } from "../state/resumeSlice";
import { useReactToPrint } from "react-to-print";

export default function SideResume() {
  const state = useSelector((s: RootState) => s.resume);
  const { scale, currentResumeId } = state;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const dispatch = useDispatch();
  const { resumeId } = useParams<{ resumeId: string }>(); // value is string | undefined

  useEffect(() => {
    if (resumeId && resumeId !== currentResumeId) {
      dispatch(setCurrentResume(resumeId));
    }
  }, [resumeId, currentResumeId, dispatch]);

  const decimalScale = scale / 100;

  return (
    <div
      style={{
        transform: `scale(${decimalScale})`,
        transformOrigin: "top left",
        width: `${850 * decimalScale}px`,
        height: `${1100 * decimalScale}px`,
      }}
    >
      <button onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef}>
        <SideResumeInner />
      </div>
    </div>
  );
}
