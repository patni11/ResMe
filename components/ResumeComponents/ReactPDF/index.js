import React from "react";
import {
  Text,
  Font,
  Page,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import Header from "./Header";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: "Lato Bold",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
});

Font.register({
  family: "Open Sans",
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Italic",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: "Lato Bold",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
const Resume = (props) => {
  const resumeHeaderID = "resumeHeader-shubhpatni2002@gmail.com-default";

  const useResumeHeaderInfo = createResumeHeaderInfo(resumeHeaderID);
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
    useResumeHeaderInfo();

  return (
    <Page {...props} style={styles.page}>
      <Header resumeHeaderID={resumeHeaderID} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Education />
          <Skills />
        </View>
        <Experience />
      </View>
      <Text style={styles.footer}>
        This IS the candidate you are looking for
      </Text>
    </Page>
  );
};

export default () => (
  <Document
    author="Luke Skywalker"
    keywords="awesome, resume, start wars"
    subject="The resume of Luke Skywalker"
    title="Resume"
    pageLayout="singlePage"
  >
    <Resume size="A4" />
    <Resume size="A4" />
  </Document>
);