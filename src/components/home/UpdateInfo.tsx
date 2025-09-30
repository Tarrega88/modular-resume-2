import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Info = {
  title: string;
  date: string;
  textArr: string[];
  url?: string;
  urlText?: string;
};

const updates: Info[] = [
  {
    title: "",
    date: "9/30/2025",
    textArr: [
      "Brought Add Sections into Lower Ribbon",
      "Brought Visible Divider and Margin Guide toggle into lower ribbon",
      "Prepping for eventual removal of left column to allow for more space on both desktop and the eventual mobile design",
    ],
  },
  {
    title: "App Layout Upgrades",
    date: "9/28/2025",
    textArr: [
      "Brought Zoom, Font Scaling, and Last Saved into lower sticky bar",
      "Decluttered the left column, allowing it to stay more focused in its intent as a main function container",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/1606bb267f76ef8e3dfeb0e830e06da29063f525",
    urlText: "GitHub",
  },
  {
    title: "Top Menu & Side Column Declutter",
    date: "9/28/2025",
    textArr: [
      "Traditional top menu bar introduced",
      "Left column is in the process of being decluttered and cleaned up",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/0532e7c1a1f99579de9bdd4ca38877c27207fb28",
    urlText: "GitHub",
  },
  {
    title: "A4 & Metric",
    date: "9/28/2025",
    textArr: [
      "Added a choice between A4 & Letter page sizes under Document Formatting",
      "Added a choice  between Metric & Imperial measurements under Document Formatting",
      "Changed original margins to be their exact measurements (they were ~4% off the first time)",
      "If any strangeness occurs on this update then adjust your margins and measurement choice once and you'll be good to go.",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/9ec90501cddf59fd046da40ed9817202220c4029",
    urlText: "GitHub",
  },
  {
    title: "Notification Toasts",
    date: "9/26/2025",
    textArr: ["Added notification toasts to the Add Section buttons"],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/fe69e2852ee0f10a0e6a861f6d9e74842ea0b9ba",
    urlText: "GitHub",
  },
  {
    title: "Font Persistence",
    date: "9/26/2025",
    textArr: [
      "Resumes will now store their font choice (instead of the font being globally applied to each of your resumes.)",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/522971303a37a6a2de7ec89dc65607d440e77fe7",
    urlText: "GitHub",
  },
  {
    title: "ATS Friendly Fonts",
    date: "9/25/2025",
    textArr: [
      "Removed fonts that were failing to be read properly when converted to PDF",
      "Added fonts that are guaranteed to be readable by resume parsers & ATS (Applicant Tracking Systems)",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/cf9e344ddeb6cb7d63f53c5ccb6724979f2660eb",
    urlText: "GitHub",
  },
  {
    title: "Margin Choices",
    date: "9/25/2025",
    textArr: [
      "Users can now choose between 0.5, 0.75, and 1 inch margins.",
      "Styling tweaks to bullet points",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/f132909d4d9d8c589355690591743e6a33e25355",
    urlText: "GitHub",
  },
  {
    title: "Hint Box",
    date: "9/23/2025",
    textArr: [
      "Added a hint box in the bottom left of the builder page to help new users.",
    ],
    url: "https://github.com/Tarrega88/modular-resume-2/commit/4401fe0e78ac3bf46fd3ed9793007ea6ef89c425",
    urlText: "GitHub",
  },
];

function UpdateInfo() {
  const [infoSelection, setInfoSelection] = useState(0);

  const currentInfo = updates[infoSelection];

  return (
    <div className="text-slate-50 bg-slate-500 rounded-sm p-3 h-4/5">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setInfoSelection(infoSelection > 0 ? infoSelection - 1 : 0)
            }
          >
            <IoIosArrowBack className="cursor-pointer" />
          </button>
          <div>
            {infoSelection + 1} / {updates.length}
          </div>
          <button
            onClick={() =>
              setInfoSelection(
                infoSelection < updates.length - 1
                  ? infoSelection + 1
                  : updates.length - 1
              )
            }
          >
            <IoIosArrowForward className="cursor-pointer" />
          </button>
        </div>
        <div>{currentInfo.date}</div>
      </div>
      <div>
        <div className="flex justify-between p-1">
          <div>{currentInfo.title}</div>
          {/* <div>{currentInfo.date}</div> */}
        </div>
        {currentInfo.url ? (
          <a
            className="underline flex pl-1"
            target="_blank"
            rel="noopener noreferrer"
            href={currentInfo.url}
          >
            {currentInfo?.urlText || "GitHub"}
          </a>
        ) : null}
        <ul className="list-disc bg-slate-700 rounded-sm p-2 pl-6 mt-3">
          {currentInfo.textArr.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UpdateInfo;
