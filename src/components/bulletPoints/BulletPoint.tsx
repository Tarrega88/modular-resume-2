import { useDispatch, useSelector } from "react-redux";
import { editBulletPoint } from "../../state/resumeSlice";
import { RootState } from "../../state/store";
import BPDisplayAndInput from "./BPDisplayAndInput";
import { BulletPointProps } from "../../state/types";

function BulletPoint({
  id,
  text,
  kind,
  renderIndex,
}: BulletPointProps & { renderIndex: number }) {
  const dispatch = useDispatch();

  //todo 9/14/2025: switch the text check to a value grabbed from a placeholder variable instead of hardcoded.
  //also, add filtering options in BuilderColumn
  const options = Object.values(
    useSelector((state: RootState) => state.resume.data.bulletPoints)
  ).filter((e) => e.text.length > 0 && e.text !== "Enter bullet point...");

  function editData(id: string, text: string) {
    dispatch(editBulletPoint({ id, text }));
  }

  return (
    <BPDisplayAndInput
      options={options}
      kind={kind}
      id={id}
      renderIndex={renderIndex}
      text={text}
      editData={editData}
      placeholderText="Enter bullet point"
    />
  );
}

export default BulletPoint;
