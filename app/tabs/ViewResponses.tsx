import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { router } from "expo-router";
import { Icon } from "react-native-elements";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { get_reports } from "@/js/apis";
import { AmericanizeDateString } from "@/js/utilities";

export default function ViewResponses() {
    const [topic, setTopic] = useState("");
    const [reports, setReports] = useState([]);

    async function handleGetReports() {
        const new_reports = await get_reports(topic);
        setReports(new_reports);
    }

    useEffect(() => {
        handleGetReports();
    }, [topic]);

    const renderItem = ({ item }) => {
        const { Question_Text, Question_Topic, User_Position, Report_Date } =
            item;

        const topicColorMap = {
            Utilitarianism: "#00F",
            Kantianism: "#F00",
            "Virtue Ethics": "#0F0",
        };

        const positionColorMap = {
            Agree: "green",
            Neutral: "gray",
            Disagree: "red",
        };

        const topicColor =
            topicColorMap[Question_Topic as keyof typeof topicColorMap];
        const positionColor =
            positionColorMap[User_Position as keyof typeof positionColorMap];

        return (
            <ThemedView style={styles.card}>
                <ThemedView
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "transparent",
                    }}
                >
                    <ThemedText style={styles.card_title}>
                        <Text>Topic: </Text>
                        <Text style={{ color: topicColor }}>
                            {Question_Topic}
                        </Text>
                        <Text>, Position: </Text>
                        <Text style={{ color: positionColor }}>
                            {User_Position}
                        </Text>
                    </ThemedText>
                    <ThemedText style={styles.card_date}>
                        {AmericanizeDateString(Report_Date)}
                    </ThemedText>
                </ThemedView>
                <ThemedText style={styles.card_text}>
                    {Question_Text}
                </ThemedText>
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <Icon
                    name="arrow-back"
                    type="material"
                    onPress={() => router.back()}
                    containerStyle={{ margin: 10 }}
                    color="white"
                />

                <ThemedText style={styles.title}>View Responses</ThemedText>
            </ThemedView>

            <FlatList
                data={reports}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        marginVertical: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFF",
        alignContent: "center",
    },
    name: {
        flex: 1,
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 30,
        textAlign: "justify",
        color: "#FFF",
    },
    card: {
        backgroundColor: "#FFF",
        marginBottom: 5,
        marginHorizontal: 16,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 3,
        borderColor: "#70F",
        borderRadius: 25,
        borderWidth: 8,
    },
    card_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    card_text: {
        color: "#000",
        textAlign: "left",
        padding: 5,
    },
    card_date: {
        color: "#000",
        fontWeight: "bold",
        padding: 5,
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
