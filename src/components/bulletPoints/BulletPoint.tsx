import { useDispatch, useSelector } from "react-redux";
import { editBulletPoint } from "../../state/resumeSlice";
import BPDisplayAndInput from "./BPDisplayAndInput";
import { BulletPointProps } from "../../state/types";

function BulletPoint({ id, text }: BulletPointProps) {
  const dispatch = useDispatch();

  function editData(id: string, text: string) {
    dispatch(editBulletPoint({ id, text }));
  }

  return (
    <BPDisplayAndInput
      id={id}
      text={text}
      editData={editData}
      placeholderText="Enter bullet point"
    />
  );
}

export default BulletPoint;
