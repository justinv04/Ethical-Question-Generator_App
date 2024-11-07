import { useMemo, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export default () => {
  const testData = useRef([
    {
      text: "Add as much as you like. React Native can be seamlessly integrated into your existing Android or iOS projects at any time, or completely rewritten from scratch.",
      agree: false,
    },
    {
      text: "React Native combines the best parts of native development with React, committed to becoming the top JavaScript framework for building user interfaces.",
      agree: true,
    },
    {
      text: "React Native allows you to create truly native applications without compromising on user experience. It provides some platform independent abstract core components, such as View, Text, and Image, which can be directly mapped and rendered as native UI components for the corresponding platform.",
      agree: false,
    },
    {
      text: "Through React's declarative component mechanism and JavaScript code, existing native code and APIs can be perfectly encapsulated and integrated into React components. This not only empowers more new development teams with native application development capabilities, but also greatly improves the development efficiency of existing native teams.",
      agree: true,
    },
    {
      text: "In 2018, React Native ranked second among all GitHub projects in terms of the number of contributors. Nowadays, companies and individuals around the world continue to contribute code to React Native, including but not limited to Callstack, Expo, Infinite Red, Microsoft, and Software Mansion.",
      agree: false,
    },
    {
      text: "This project expects all participants to adhere to Meta's OSS Code of Conduct. Please read the full text so that you can understand what actions will and will not be tolerated.",
      agree: true,
    },
    {
      text: "To help you get you familiar with the contribution process, there is a list of good first issues that contain bugs which have a relatively limited scope. This is a great place to get started.",
      agree: false,
    },
  ]);

  const renderItem = ({ item }: { item: any }) => {
    const { text, agree } = item || {};
    return (
      <View
        style={[
          styles.card,
          { backgroundColor: agree ? "#d9f7be" : "#ffccc7" },
        ]}
      >
        <Text style={styles.name}>{text || ""}</Text>
        <Image
          style={styles.img}
          source={
            agree
              ? require("@/assets/images/about/agree.png")
              : require("@/assets/images/about/disagree.png")
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
        data={testData.current}
        renderItem={renderItem}
        keyExtractor={(item) => item.text}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: "#F4F4F4",
    flex: 1,
    // paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 30,
    textAlign: "justify",
    color: "#666",
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    // overflow: "hidden",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  img: {
    position: "absolute",
    bottom: 12,
    right: 10,
    height: 50,
    width: 50,
    opacity: 0.8,
  },
});
