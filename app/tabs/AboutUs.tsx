import { StyleSheet, Image, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Icon } from "react-native-elements";

export default function AboutUs() {
    const teamMembers = [
        {
            name: "Nicko Lomelin",
            bio: [
                "Junior pursuing a BA in Computer Science with a specialization in Cyber Security",
                "I enjoy coding in different Software's as well as hanging out with friends and playing videogames",
            ],
            avatar: require("@/assets/images/about/p1.png"),
        },
        {
            name: "Justin Vincent",
            bio: [
                "Junior pursuing BS in computer science",
                "Originally from Santa Barbara, CA",
                "Interned at Austin –based startup Atmosphere last summer",
            ],
            avatar: require("@/assets/images/about/p2.png"),
        },
        {
            name: "Jiahao Yan",
            bio: [
                "Undergraduate student in Computer Science",
                "From Xi'an, the oldest city in China",
                "Enjoy video games and traveling",
            ],
            avatar: require("@/assets/images/about/p3.png"),
        },
    ];

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
                <ThemedText style={styles.title}>About The Team</ThemedText>
            </ThemedView>

            <ScrollView>
                {teamMembers.map((member, index) => (
                    <ThemedView key={index} style={styles.card}>
                        <ThemedView style={styles.cardLeft}>
                            <ThemedText style={styles.card_name}>
                                {member.name}
                            </ThemedText>
                            {member.bio.map((line, index) => (
                                <ThemedView
                                    style={{ flexDirection: "row" }}
                                    key={`${index}-bio`}
                                >
                                    <ThemedView
                                        style={{
                                            width: 6,
                                            height: 6,
                                            backgroundColor: "#FFF",
                                            marginTop: 8,
                                            borderRadius: 4,
                                            marginRight: 8,
                                        }}
                                    />
                                    <ThemedText key={line} style={styles.bio}>
                                        {line}
                                    </ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>
                        <Image
                            source={member.avatar}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </ThemedView>
                ))}
            </ScrollView>
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
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 10,
    },
    card: {
        flexDirection: "row",
        overflow: "hidden",
        color: "#FFFFFF",
        backgroundColor: "#FFF",
        borderColor: "#70F",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
    },
    cardLeft: {
        flex: 1,
        padding: 16,
    },

    card_name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#70F",
    },
    bio: {
        fontSize: 14,
        color: "#FFF",
        marginBottom: 8,
        flex: 1,
        textAlign: "left",
        lineHeight: 18,
    },
    avatar: {
        height: "100%",
        width: 140,
    },
});
