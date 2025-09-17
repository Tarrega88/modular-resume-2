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

  function editData(id: string, text: string) {
    dispatch(editBulletPoint({ id, text }));
  }

  return (
    <BPDisplayAndInput
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
