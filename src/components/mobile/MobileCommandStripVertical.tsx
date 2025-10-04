import { useState } from "react";

function MobileCommandStripVertical() {
  const [position, setPosition] = useState(0);

  return (
    <div className="bg-blue-500 absolute w-[96px] h-full -left-24">
      <div className="relative h-full w-full">
        <div className="absolute size-24 bg-gray-800"></div>
      </div>
    </div>
  );
}

export default MobileCommandStripVertical;
