import { StyleSheet, Text, Image, View, ScrollView } from "react-native";

export default function About() {
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
        " Interned at Austin –based startup Atmosphere last summer",
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.name}>{member.name}</Text>
              {member.bio.map((line, index) => (
                <View style={{ flexDirection: "row" }} key={`${index}-bio`}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: "#000",
                      marginTop: 8,
                      borderRadius: 4,
                      marginRight: 8,
                    }}
                  />
                  <Text key={line} style={styles.bio}>
                    {line}
                  </Text>
                </View>
              ))}
            </View>
            <Image
              source={member.avatar}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
  contentContainer: {},
  card: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    // padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLeft: {
    flex: 1,
    padding: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: "#555",
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
