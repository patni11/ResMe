import { Text, View, Link as PDFLink } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { styles, spacing } from "../../ResumeComponents/ReactPDF/styles";
import {
  DEBUG_RESUME_PDF_FLAG,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
} from "./constants";
//import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";

export const ResumePDFSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
}) => (
  <View
    style={{
      ...styles.flexCol,
      gap: spacing["0"],

      marginTop: spacing["1"],
      marginBottom: spacing["1"],
      ...style,
    }}
  >
    {heading && (
      <>
        <Text style={styles.sectionHeader} debug={DEBUG_RESUME_PDF_FLAG}>
          {heading}
        </Text>
        {themeColor && (
          <View
            style={{
              height: "1.75pt",
              width: "100%", // Set width to 100% or a specific value as needed
              backgroundColor: themeColor,
            }}
            debug={DEBUG_RESUME_PDF_FLAG}
          />
        )}
      </>
    )}
    {children}
  </View>
);

export const ResumePDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean;
  themeColor?: string;
  style?: Style;
  children: React.ReactNode;
}) => {
<<<<<<< Updated upstream
=======
  if (link) {
    return (
      <Text
        style={{
          ...style,
          fontFamily: DEFAULT_FONT_FAMILY,
          color: DEFAULT_FONT_COLOR,
          fontWeight: bold ? 700 : 400,
        }}
        debug={DEBUG_RESUME_PDF_FLAG}
      >
        <PDFLink src={link}>{children}</PDFLink>
      </Text>
    );
  }
>>>>>>> Stashed changes
  return (
    <Text
      style={{
        ...style,
        fontFamily: DEFAULT_FONT_FAMILY,
        color: DEFAULT_FONT_COLOR,
        fontWeight: bold ? 700 : 400,
      }}
      debug={DEBUG_RESUME_PDF_FLAG}
    >
      {children}
    </Text>
  );
};

export const ResumePDFBulletList = ({
  items,
  showBulletPoints = true,
}: {
  items: string[];
  showBulletPoints?: boolean;
}) => {
  return (
    <>
      {items.map((item, idx) => (
        <View style={{ ...styles.flexRow }} key={idx}>
          {showBulletPoints && (
            <ResumePDFText
              style={{
                paddingLeft: spacing["2"],
                paddingRight: spacing["2"],
                lineHeight: "1.3",
              }}
              bold={true}
            >
              {"•"}
            </ResumePDFText>
          )}
          {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFText
            style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}
          >
            {item}
          </ResumePDFText>
        </View>
      ))}
    </>
  );
};

export const ResumePDFLink = ({
  src,
  isPDF,
  children,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export const ResumeFeaturedSkill = ({
  skill,
  rating,
  themeColor,
  style = {},
}: {
  skill: string;
  rating: number;
  themeColor: string;
  style?: Style;
}) => {
  const numCircles = 5;

  return (
    <View style={{ ...styles.flexRow, alignItems: "center", ...style }}>
      <ResumePDFText style={{ marginRight: spacing[0.5] }}>
        {skill}
      </ResumePDFText>
      {[...Array(numCircles)].map((_, idx) => (
        <View
          key={idx}
          style={{
            height: "9pt",
            width: "9pt",
            marginLeft: "2.25pt",
            backgroundColor: rating >= idx ? themeColor : "#d9d9d9",
            borderRadius: "100%",
          }}
        />
      ))}
    </View>
  );
};

export const ResumePDFCard = ({
  themeColor,
  heading,
  subHeading,
  dates,
  value,
  style = {},
  children,
}: {
  themeColor?: string;
  heading: string;
  subHeading?: string | undefined;
  dates?: string | undefined;
  value?: string | undefined;
  style?: Style;
  children?: React.ReactNode;
}) => {
  return (
    <View
      style={{
        ...styles.flexCol,
        marginTop: spacing["0.5"],
      }}
    >
      <View
        style={{
          ...styles.flexRowBetween,
        }}
      >
        <View
          style={{
            ...styles.flexCol,
          }}
        >
          <ResumePDFText bold={true}>{heading}</ResumePDFText>
          <ResumePDFText style={{ fontStyle: "italic" }}>
            {subHeading}
          </ResumePDFText>
        </View>

        <View
          style={{
            ...styles.flexCol,
            alignItems: "flex-end",
          }}
        >
          <ResumePDFText bold={true}>{dates}</ResumePDFText>
          <ResumePDFText style={{ fontStyle: "italic" }}>{value}</ResumePDFText>
          {/* style={{ fontStyle: "normal" }} */}
        </View>
      </View>

      {children}
    </View>
  );
};
