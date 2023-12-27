"use client";

import isEmpty from "lodash/isEmpty";
type Props = {
  changeContent: (newText: string) => void;
  icon?: JSX.Element;
  link?: string;
  className?: string;
  textClassName?: string;
};

const DataDisplay: React.FC<React.PropsWithChildren<Props>> = ({
  changeContent,
  icon,
  link,
  className,
  textClassName,
  children,
}) => {
  const handleContentChange = (e: React.SyntheticEvent) => {
    const content = (e.currentTarget as HTMLElement).innerText;
    changeContent(content); // Call the onChange prop with the new content
  };

  if (isEmpty(children)) return null;

  if (link && !isEmpty(link)) {
    return (
      <div
        className={`inline-flex items-center gap-1 ${className}`}
        contentEditable="true"
        suppressContentEditableWarning={true}
        onInput={handleContentChange} // Attach the onChange handler here
      >
        {icon}
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className={textClassName}
        >
          {children}
        </a>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      contentEditable="true"
      suppressContentEditableWarning={true}
      onInput={handleContentChange} // Attach the onChange handler here
    >
      {icon}
      <span className={textClassName}>{children}</span>
    </div>
  );
};
export default DataDisplay;
