import { css } from "@emotion/css";
import clsx from "clsx";
import Markdown from "../../shared/templateShared/Markdown";
import { Activity } from "lucide-react";
import DataDisplay from "../../shared/DataDisplay";
import { createSettings } from "@/store/coverLetter/settings";

export const MastheadSidebar: React.FC = () => {
  const useSettings = createSettings("1");
  const { bgColor, fontColor, fontFamily, fontSize, headerSize } =
    useSettings();

  const color = bgColor;
  const name = "Name";
  const headline = "headline";
  const location = "Location";
  const email = "email";
  const phone = "+18572063268";
  const website = "shubhpatni.com";

  return (
    <div
      className={clsx(
        "col-span-2 grid justify-items-start gap-3 p-4",
        css(`a{ color: ${fontColor}!important }`),
        css(`--text-color: ${fontColor}!important`)
      )}
    >
      <div>
        <h1 className="mb-1">{name}</h1>
        <p className="opacity-75">{headline}</p>
      </div>

      <div
        className={clsx(
          "flex flex-col gap-2.5",
          css(`svg { color: ${color} }`)
        )}
      >
        <DataDisplay
          icon={<Activity className="h-5 w-5" />}
          className="!gap-2 text-xs"
        >
          {location}
        </DataDisplay>

        {/* <DataDisplay icon={<Activity className="h-5 w-5" />} className="!gap-2 text-xs">
          {formatDateString(birthdate, dateFormat)}
        </DataDisplay> */}

        <DataDisplay
          icon={<Activity className="h-5 w-5" />}
          className="!gap-2 text-xs"
          link={`mailto:${email}`}
        >
          {email}
        </DataDisplay>

        <DataDisplay
          icon={<Activity className="h-5 w-5" />}
          className="!gap-2 text-xs"
          link={`tel:${phone}`}
        >
          {phone}
        </DataDisplay>

        <DataDisplay
          icon={<Activity className="h-5 w-5" />}
          link={website}
          className="!gap-2 text-xs"
        >
          {website}
        </DataDisplay>
        {/* 
        {profiles.map(({ id, username, network, url }) => (
          <DataDisplay
            key={id}
            icon={getProfileIcon(network)}
            link={url && addHttp(url)}
            className="!gap-2 text-xs"
          >
            {username}
          </DataDisplay>
        ))} */}
      </div>
    </div>
  );
};

export const MastheadMain: React.FC = () => {
  const summary = "Hi This is a summary";

  return (
    <>
      {summary && (
        <div className="px-4 pt-4">
          <Markdown>{summary}</Markdown>
        </div>
      )}
    </>
  );
};
