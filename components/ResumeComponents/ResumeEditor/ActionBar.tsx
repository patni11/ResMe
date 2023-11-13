const ActionBar = () => {
  return (
    <div className="w-full flex justify-right space-x-4 mb-2 items-center">
      <Button
        className="w-24 flex space-x-2"
        onClick={() => {
          setIsSaving(true);
          handleSave();
        }}
        disabled={isSaving}
      >
        <span className="hidden md:block">Save</span>
        <SaveIcon className="w-5 h-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "default",
            className: "w-24 flex space-x-2",
          })}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <LoadingSpinner />
          ) : (
            <span className="hidden md:block">Download</span>
          )}

          <Download className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            asChild
            onClick={() => {
              gtag.event({
                clientWindow: window,
                action: "Download Docx",
                category: "Download",
                label: "Download Docx",
              });
            }}
          >
            {/* <button onClick={downloadDocx} className="">
        Docx
      </button> */}

            <ComingSoon>
              <span>Docx</span>
            </ComingSoon>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={downloadPDF} className="font-bold">
              PDF
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            {/* <PremiumDialog>
        <button className="">Share Link</button>
      </PremiumDialog> */}

            <ComingSoon>
              <span
                onClick={() => {
                  gtag.event({
                    clientWindow: window,
                    action: "Share Link",
                    category: "Download",
                    label: "Share Link",
                  });
                }}
              >
                Share Link
              </span>
            </ComingSoon>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionBar;
