import { createCoverLetterSettings } from "@/store/coverLetter/settings";

const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const useSettings = createCoverLetterSettings("1");
  const { bgColor, fontColor } = useSettings();
  return (
    <h3
      className="relative -left-4 mb-2 w-[95%] rounded-r py-1.5 pl-4 font-bold uppercase"
      style={{ color: fontColor, backgroundColor: bgColor }}
    >
      {children}
    </h3>
  );
};

export default Heading;
