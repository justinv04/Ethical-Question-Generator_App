import { useMemo, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export default () => {
  const testData = useRef([
    {
      text: "酌量添加，多少随意。随时都可以把 React Native 无缝集成到你已有的 Android 或 iOS 项目，当然也可以完全从头焕然一新地重写。",
      agree: false,
    },
    {
      text: "React Native 将原生开发的最佳部分与 React 相结合， 致力于成为构建用户界面的顶尖 JavaScript 框架。",
      agree: true,
    },
    {
      text: "React Native 使你可以创建真正原生的应用，用户体验绝不拉胯。它提供了一些平台无关的抽象核心组件，像是View, Text 以及 Image等，可直接映射渲染为 对应平台的原生UI组件。",
      agree: false,
    },
    {
      text: "通过 React 的声明式组件机制和 JavaScript 代码，现有的原生代码和api可以完美地封装嵌合到 React 组件中。这样既为更多新的开发团队赋予原生应用的开发能力，也能极大地提升现有原生团队的开发效率。",
      agree: true,
    },
    {
      text: "在 2018 年, React Native 的贡献者数量在所有github的项目中 排名第二。如今，遍布世界各地的公司和个人持续地为 React Native 贡献着代码（包括但不限于）：Callstack, Expo, Infinite Red, Microsoft 以及 Software Mansion等。",
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
