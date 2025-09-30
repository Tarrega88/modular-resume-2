import { SummaryProps } from "../../state/types";
import DynamicTextArea from "../DynamicTextArea";
import { useDispatch } from "react-redux";
import { editSummary } from "../../state/resumeSlice";

function Summary({ id, text, renderUI }: SummaryProps & { renderUI: boolean }) {
  const dispatch = useDispatch();
  function handleOnSubmit(e: string) {
    dispatch(editSummary({ id, text: e }));
  }

  return (
    <div className="mb-6" inert={!renderUI}>
      <DynamicTextArea
        text={text}
        handleOnSubmit={handleOnSubmit}
        inputWidth="full"
        placeholderText="Enter text..."
      />
    </div>
  );
}

export default Summary;
