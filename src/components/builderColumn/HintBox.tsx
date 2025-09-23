import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";

const hints = [
  {
    topic: "Dragging",
    text: "Did you know that you can drag anything on the resume that's outlined in blue when you hover over it?",
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

function HintBox() {
  const [i, setI] = useState(0);
  const [running, setRunning] = useState(true);
  const interval = 15000;

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (!running || !isExpanded) return;
    const id = setInterval(() => setI((n) => (n + 1) % hints.length), interval);
    return () => clearInterval(id);
  }, [running, isExpanded]);

  if (!hints.length) return null;

  const hint = hints[i];

  return (
    <div className="bg-blue-50 border-b">
      <div
        className="flex justify-center items-center gap-2 font-semibold py-2 px-2 hover:bg-blue-100 transition-all duration-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>Hints</div>
        <IoMdArrowDropdown
          className={`${
            isExpanded ? "rotate-360" : "rotate-270"
          } transition-all duration-200`}
        />
      </div>
      {isExpanded ? (
        <>
          <div className="relative">
            <div className="flex justify-center items-center gap-2">
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => setI(i === 0 ? hints.length - 1 : i - 1)}
              />
              <div className="">{i + 1}</div>
              <IoIosArrowForward
                className="cursor-pointer"
                onClick={() => setI(i === hints.length - 1 ? 0 : i + 1)}
              />
            </div>

            <div className="absolute right-2 top-1 cursor-pointer">
              {running ? (
                <FaPause onClick={() => setRunning(false)} />
              ) : (
                <FaPlay onClick={() => setRunning(true)} />
              )}
            </div>
          </div>
          <div className="px-3 font-semibold underline py-2">{hint.topic}</div>
          <div className="px-3 pb-6">{hint.text}</div>
        </>
      ) : null}
    </div>
  );
}

export default HintBox;
