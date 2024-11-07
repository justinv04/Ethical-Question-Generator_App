import { Button } from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = [
      "Topic1",
      "Topic2",
      "Topic3",
      "Topic4",
      "Topic5",
      "Topic6",
      "Cancel",
    ];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        console.log("selectedIndex: ", options[selectedIndex || 2]);
        switch (selectedIndex) {
          case 1:
            // Save
            break;

          case destructiveButtonIndex:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Agree</Text>
      <Text style={styles.topTitle}>or</Text>
      <Text style={[styles.topTitle, { marginBottom: 20 }]}>Disagree?</Text>
      <View style={styles.card}>
        <Text style={styles.discript}>
          在 expo-router 中，initialRouteName 配置不一定会按照预期工作，因为
          expo-router 会根据文件结构和路由推断来确定默认页面。在你提供的
          _layout.tsx 代码中，initialRouteName="about" 应该是有效的，但实际上
          expo-router 主要依据文件结构来识别初始页面。
        </Text>
        <View style={styles.btnViews}>
          <Button style={{ flex: 1 }} title="Agree" status="success" />
          <View style={{ width: 20 }} />
          <Button style={{ flex: 1 }} title="Disagree" status="danger" />
        </View>
        <Button title="topic" status="control" onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F4F4F4",
    flex: 1,
  },
  topTitle: {
    fontSize: 50,
    lineHeight: 50,
    fontWeight: "bold",
    // marginBottom: 4,
    textAlign: "center",
  },
  discript: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 30,
    textAlign: "justify",
    color: "#666",
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  btnViews: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
