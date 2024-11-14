import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Icon } from "react-native-elements";
import { Button } from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native-gesture-handler";

import { get_question, generate_report } from "@/js/apis.js";

export default function PromptAQuestion() {
    const topicOptionsArray = [
        "",
        "Utilitarianism",
        "Kantianism",
        "Virtue Ethics",
    ];

    const [question_id, setQuestionID] = useState("");
    const [question_text, setQuestionText] = useState("");
    const [question_topic, setQuestionTopic] = useState("");

    async function handleGetQuestion() {
        try {
            const new_question = (await get_question(question_topic))
                .Questions[0];
            if (new_question != null) {
                setQuestionID(new_question.Question_ID);
                setQuestionText(new_question.Question_Text);
                setQuestionTopic(new_question.Question_Topic);
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function handleGenerateReport(user_position: string) {
        try {
            const response = await generate_report(question_id, user_position);
            if (response) {
                setQuestionID("");
                setQuestionTopic("");
                setQuestionText("");
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }

    const Dropdown = ({ options }) => {
        const [selectedOption, setSelectedOption] = useState("");
        const [isOpen, setIsOpen] = useState(false);

        function handleOptionSelect(option) {
            setQuestionTopic(option);
            setSelectedOption(option);
            setIsOpen(false);
        }

        return (
            <ThemedView style={styles.default_element}>
                <Button
                    title={"Choose A Topic"}
                    onPress={() => setIsOpen(!isOpen)}
                ></Button>

                {isOpen && (
                    <ThemedView style={{ backgroundColor: "transparent" }}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <ThemedView style={styles.dropdown_option}>
                                    <Button
                                        title={item !== "" ? item : "(None)"}
                                        onPress={() => handleOptionSelect(item)}
                                    />
                                </ThemedView>
                            )}
                        />
                    </ThemedView>
                )}
            </ThemedView>
        );
    };

    return (
        <ThemedView style={{ flex: 1, padding: 16 }}>
            <ThemedView style={styles.header}>
                <Icon
                    name="arrow-back"
                    type="material"
                    onPress={() => router.back()}
                    containerStyle={{ margin: 10 }}
                    color="white"
                />

                <ThemedText style={styles.title}>Prompt A Question</ThemedText>
            </ThemedView>

            <ScrollView style={styles.container}>
                <ThemedText style={styles.topic}>
                    Current Topic:{" "}
                    {question_topic ||
                        "Select A Topic To Generate A Question (No Selection Is Random)"}
                </ThemedText>

                <ThemedText
                    style={[
                        styles.question_text,
                        { textAlign: question_text ? "justify" : "center" },
                    ]}
                >
                    {question_text || "Click 'Generate' to Prompt a Question!"}
                </ThemedText>

                <ThemedView>
                    <ThemedView style={styles.buttons}>
                        <Button
                            style={{ flex: 1, backgroundColor: "green" }}
                            title="Agree"
                            onPress={() => handleGenerateReport("Agree")}
                        />
                        <Button
                            style={{ flex: 1, backgroundColor: "gray" }}
                            title="Neutal"
                            onPress={() => handleGenerateReport("Neutral")}
                        />
                        <Button
                            style={{ flex: 1, backgroundColor: "red" }}
                            title="Disagree"
                            onPress={() => handleGenerateReport("Disagree")}
                        />
                    </ThemedView>
                    <Dropdown options={topicOptionsArray} />

                    <ThemedView style={styles.default_element}>
                        <Button title="Generate" onPress={handleGetQuestion} />
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        marginVertical: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFF",
        alignContent: "center",
    },

    topic: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#70F",
        marginTop: 20,
    },

    question_text: {
        height: 200,
        color: "#FFF",
        fontSize: 18,
        textAlign: "justify",
        backgroundColor: "transparent",
        margin: 30,
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        margin: 10,
        gap: 10,
        backgroundColor: "transparent",
    },

    default_element: {
        backgroundColor: "transparent",
        margin: 10,
    },

    dropdown_option: {
        backgroundColor: "transparent",
    },
});
