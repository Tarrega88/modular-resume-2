import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const hints = [
  {
    topic: "Toggles",
    text: "The Margin Guide and Show Divider toggles can be found in the top left Menu.",
  },
  {
    topic: "Dragging",
    text: "Did you know that you can drag anything on the resume that's outlined in blue when you hover over it? If you're on mobile, use the Move arrows in the Editing window instead.",
  },
  {
    topic: "Saving",
    text: "Changes auto-save to your device using your browser's IndexedDB. Any changes you make will remain unless you clear the site data or use your browser's Incognito Mode.",
  },
  {
    topic: "New Sections",
    text: "Add new sections to the template to make it your own. Don't be afraid to use bullet points or the skills list in other areas - for example, bullet points or the skills list may be useful to list certifications under your own Certifications header.",
  },
  {
    topic: "Margin Overlays",
    text: "The margin overlays are the purple, tape-like tabs that you might notice just outside of the resume page. They are there as suggestions for where to put your divider sections, which will provide your final PDF with proper margins.",
  },
  {
    topic: "Dividers",
    text: "The divider section can be used to create space in your margins or anywhere else. After adding a divider section, you can resize it by dragging the slider to the right or left. Don't worry, these divider sections don't show up on the PDF!",
  },
  {
    topic: "Dropdown Window",
    text: "The dropdown window, accessible by clicking the arrow to the left of every section on the resume, can be used to add or replace resume sections at exactly that position. The dropdown window also allows you to view (and use!) anything you've made in the past, including bullet points and work experience.",
  },
  {
    topic: "Questions & Comments",
    text: "Have a question or comment? Email me at michaelseedev@gmail.com",
  },
  {
    topic: "YouTube Tutorial",
    text: "If you want to see me walk through some of the features of this application, check out the YouTube link in the help section.",
  },
  {
    topic: "Icon Legend",
    text: "The Icon Legend is a handy guide in the left column that explains what the icons do!",
  },
  {
    topic: "ATS",
    text: "Applicant Tracking Systems (ATS) and resume parsers are tools that employers use to varying degrees. They are designed to help the employer filter through resumes. Having an ATS-friendly resume is a good idea, and Modular Resume is designed to produce ATS-friendly resumes.",
  },
  {
    topic: "Duplication",
    text: "You can duplicate your resume on the home page. Changing data that is shared between them will affect both resumes. New data entered in either resume will not affect the other, and layout differences don't affect the other either.",
  },
];

function LowerHints() {
  const [hintIndex, setHintIndex] = useState(0);

  const activeHint = hints[hintIndex];

  return (
    <div className="bg-neutral-200 text-neutral-950 px-4 py-2 min-h-28">
      <div className="flex justify-between">
        <div className="font-semibold">{activeHint.topic}</div>
        <div className="flex gap-1 items-center">
          <button
            onClick={() =>
              setHintIndex(hintIndex > 0 ? hintIndex - 1 : hints.length - 1)
            }
          >
            <IoIosArrowBack />
          </button>
          <span>
            {hintIndex + 1} / {hints.length}
          </span>
          <button onClick={() => setHintIndex((hintIndex + 1) % hints.length)}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div>{activeHint.text}</div>
    </div>
  );
}

export default LowerHints;
