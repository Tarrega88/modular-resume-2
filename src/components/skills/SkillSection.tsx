import { SkillProps } from "../../state/types";
import DynamicInput from "../DynamicInput";
import SkillDynamicInput from "./SkillDynamicInput";
import { useDispatch } from "react-redux";
import {
  editSkillCategory,
  editSkills,
  setShowCategory,
} from "../../state/resumeSlice";
import { MdLabel } from "react-icons/md";
import RelativeAbsRight from "../wrappers/RelativeAbsRight";

//Also, I think I want to allow for creation of categories, like:
//Technologies, Software, etc.

//I don't know if there should be any special consideration for grouping those with skills in the data or not

function SkillSection({
  id,
  category,
  showCategory,
  // kind,
  list,
  renderUI,
}: // renderIndex,
SkillProps & { renderIndex: number; renderUI: boolean }) {
  const dispatch = useDispatch();
  function handleOnSubmit(text: string) {
    dispatch(editSkills({ id, text }));
  }

  const text = list.join(", ");

  const labelColor = showCategory
    ? "text-sky-500 hover:text-sky-400"
    : "text-gray-300 hover:text-sky-300";

  function handleCategorySubmit(catText: string) {
    dispatch(editSkillCategory({ id, text: catText }));
  }

  return (
    <div className="group w-full">
      {renderUI ? (
        <RelativeAbsRight hPosition="over">
          <div className="text-lg">
            <button
              className={`cursor-pointer ${labelColor} transition-all duration-150`}
              onClick={() =>
                dispatch(setShowCategory({ id, showCategory: !showCategory }))
              }
            >
              <MdLabel />
            </button>
          </div>
        </RelativeAbsRight>
      ) : null}
      <div className="flex mb-1">
        {/* <span className="mx-2">•</span> */}
        {showCategory ? (
          <div className="flex font-semibold mr-1">
            <DynamicInput
              text={category + ":"}
              handleOnSubmit={handleCategorySubmit}
              inputWidth="char"
              divWidth="max"
            />
          </div>
        ) : null}
        <SkillDynamicInput
          text={text}
          list={list}
          handleOnSubmit={handleOnSubmit}
          inputWidth="full"
          id={id}
          key={text}
        />
      </div>
    </div>
  );
}

export default SkillSection;
