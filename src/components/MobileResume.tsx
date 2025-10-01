// import { RootState } from "@/state/store";
// import { useSelector } from "react-redux";

// function MobileResume({ PAGE_W, PAGE_H, zeroHorizontal, zeroVertical }) {
//   const resumeState = useSelector((s: RootState) => s.resume);
//   const currentResume = resumeState.currentResumeId;
//   const renderOrder = resumeState.resumes[currentResume] ?? [];
//   const MARGIN = resumeState.resumeMetaData[currentResume].margin;

//   return (
//     <div
//       id="resume-root"
//       className="resume-root text-base"
//       //   ref={ref}
//       style={{
//         position: "relative",
//         backgroundColor: "white",
//         width: `${PAGE_W}px`,
//         minHeight: `${PAGE_H}px`,
//         lineHeight: 1.4,
//         paddingLeft: `${MARGIN}px`,
//         paddingRight: `${MARGIN}px`,
//         paddingBottom: `${replaceIsOpen ? MARGIN * 10 : 0}px`,
//         overflow: "hidden",
//       }}
//     >
//       {renderOrder.map((e: any, i: number) => (
//         <Draggable
//           key={e.id}
//           renderIndex={i}
//           kind={e.kind}
//           setReplaceIsOpen={setReplaceIsOpen}
//         >
//           <ResumeItemRenderer
//             id={e.id}
//             kind={e.kind}
//             elementId={e.elementId}
//             renderUI={true}
//           />
//         </Draggable>
//       ))}
//     </div>
//   );
// }

// export default MobileResume;
