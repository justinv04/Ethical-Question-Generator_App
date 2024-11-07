import React, { ForwardedRef, forwardRef, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";

const themeStyles = {
  primary: {
    backgroundColor: "#7576EF",
    fontColor: "#fff",
    borderColor: "transparent",
    loadingColor: "#fff",
  },
  control: {
    backgroundColor: "#fff",
    fontColor: Colors.light.tint,
    borderColor: Colors.light.tint,
    loadingColor: "#888",
  },
  danger: {
    backgroundColor: "#FF565EFF",
    fontColor: "#fff",
    borderColor: "#FF565EFF",
    loadingColor: "#fff",
  },
  success: {
    backgroundColor: "#21C06DFF",
    fontColor: "#fff",
    borderColor: "#21C06DFF",
    loadingColor: "#fff",
  },
  disabled: {
    backgroundColor: "#D5D5F7",
    fontColor: "#FFF",
    borderColor: "#D5D5F7",
    loadingColor: "#888",
  },
};

export type UseButtonReturn = {
  startCountdown?: () => void;
  resetCountdown?: () => void;
};

export const Button = forwardRef(
  (
    props: {
      title: string;
      titleStyle?: StyleProp<TextStyle>;
      btnContainerStyle?: ViewStyle;
      loading?: boolean;
      status?: "primary" | "control" | "danger" | "success" | "disabled";
      onPress?: (e: GestureResponderEvent) => void | Promise<boolean | void>;
    } & TouchableOpacityProps,
    ref: ForwardedRef<UseButtonReturn>
  ) => {
    const {
      title = "",
      titleStyle,
      style,
      loading,
      onPress,
      disabled,
      btnContainerStyle,
      status = "primary",
      ...touchableOpacityProps
    } = props;

    const { backgroundColor, fontColor, borderColor, loadingColor } =
      themeStyles[status];

    const textStyle = useMemo(() => {
      return StyleSheet.flatten([
        styles.text,
        { color: fontColor },
        titleStyle,
      ]);
    }, [status, titleStyle]);

    const disabledValue = useMemo(() => {
      return disabled || loading;
    }, [disabled, loading]);

    const onPressAction = async (e: GestureResponderEvent) => {
      if (status === "disabled") {
        return;
      }
      onPress?.(e);
    };

    const containerStyle = useMemo(() => {
      const opacity = disabledValue ? 0.6 : 1;
      return StyleSheet.flatten([
        styles.button,
        { opacity: opacity, borderColor, borderWidth: 1, backgroundColor },
        btnContainerStyle,
        style,
      ]);
    }, [disabledValue, status]);

    return (
      <TouchableOpacity
        style={containerStyle}
        activeOpacity={0.8}
        onPress={onPressAction}
        disabled={disabledValue}
        {...touchableOpacityProps}
      >
        {loading ? (
          <ActivityIndicator color={loadingColor} size={16} />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
    minHeight: 38,
    minWidth: 90,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
