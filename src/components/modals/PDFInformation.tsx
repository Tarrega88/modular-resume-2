import ModalWindow from "../builderColumn/ModalWindow";

function PDFInformation({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="View PDF vs Cloud PDF"
    >
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Short Version:</h2>
          <div>If you're on a computer, use View PDF.</div>
          <div>If you're on a mobile device, use Cloud PDF</div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">What is View PDF doing?</h2>
          <p>
            View PDF just uses your machine's print feature to render the site
            content into a PDF.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">What is Cloud PDF doing?</h2>
          <p>
            Cloud PDF sends the resume content out to a server that runs a
            desktop version of Chrome in order to render the PDF correctly for
            mobile devices.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Why?</h2>
          <p>
            Mobile devices like iPhones really like to force things that are
            hard to work around in their print menus. If you try out View PDF on
            a mobile device, you'll probably notice there will be extra margins
            added and maybe even a footer added to each page. Using a server to
            render the PDF for mobile was the best workaround I've found that
            still keeps the "What you see is what you get" point of this site.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">
            Can I use Cloud PDF even if I'm on a computer?
          </h2>
          <p>
            Yes, go for it. If you're having trouble with the normal View PDF
            option then try the Cloud PDF option.
          </p>
        </div>
      </div>
    </ModalWindow>
  );
}

export default PDFInformation;
