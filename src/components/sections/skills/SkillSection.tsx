import { SkillProps } from "@/state/types";
import DynamicInput from "@/components/sections/misc/DynamicInput";
import SkillDynamicInput from "./SkillDynamicInput";
import { useDispatch } from "react-redux";
import {
  editSkillCategory,
  editSkills,
  setShowCategory,
} from "@/state/resumeSlice";
import { MdLabel } from "react-icons/md";
import RelativeAbsRight from "@/components/wrappers/RelativeAbsRight";

function SkillSection({
  id,
  category,
  showCategory,
  list,
  renderUI,
}: SkillProps & { renderUI: boolean }) {
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
    <div className="group w-full" inert={!renderUI}>
      {renderUI ? (
        <RelativeAbsRight hPosition="over">
          <div className="text-lg">
            <button
              tabIndex={-1}
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
