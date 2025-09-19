import { Kinds } from "@/state/types";

//  kind="bulletPoint"
//     renderIndex={0}
//     isExpanded={true}
//     setIsExpanded={testSet}

// type Params = {
//   kind: Kinds;
//   renderIndex: number;
//   isExpanded: boolean;
//   setIsExpanded(e: boolean): void;
// };

function getDataForDropdown(
  kind: Kinds,
  renderIndex: number,
  isExpanded: boolean,
  setIsExpanded: any
) {
  return { kind, renderIndex, isExpanded, setIsExpanded }
}

export default getDataForDropdown;
