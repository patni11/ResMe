import React from "react";

import { Link, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
  },
  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },
  linkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  name: {
    fontSize: 24,
    fontFamily: "Times-Bold",
  },
  subtitle: {
    fontSize: 10,
    justifySelf: "flex-end",
    fontFamily: "Lato",
  },
  link: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
});

const Header = ({ resumeHeaderID }) => {
  //const useResumeHeaderInfo = createResumeHeaderInfo(resumeHeaderID);
  // const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
  //   useResumeHeaderInfo();

  // const { displayName } = headerInfo;
  // const contactInfo = headerInfo.contactInfo
  //   ? headerInfo.contactInfo
  //   : [{ contact: "" }];
  // const location = headerInfo?.location ? headerInfo.location : "";
  // const links = headerInfo.links
  //   ? headerInfo.links
  //   : [{ linkName: "", link: "" }];

  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{resumeHeaderID}</Text>
        <Text style={styles.subtitle}>Jedi Master</Text>
      </View>
      <View style={styles.linkColumn}>
        <Link href="mailto:luke@theforce.com" style={styles.link}>
          luke@theforce.com
        </Link>
      </View>
    </View>
  );
};

export default Header;
