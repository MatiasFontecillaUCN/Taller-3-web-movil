import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

interface Commit {
  message: string;
  author: string;
  createdAt: string;
  avatarUrl: string;
}

const style = StyleSheet.create({
  inline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text:{
    color: "rgb(101, 109, 118)"
  },
  noBorderRadius:{
    borderRadius:0,
  }
});

export default function Commit({ commit }: { commit: Commit }) {
  const formatedCreatedAt = new Date(commit.createdAt).toLocaleString("es-CL", {
    timeZone: "America/Santiago",
  });
  return (
    <Card mode="outlined" style={style.noBorderRadius}>
      <Card.Title title={commit.message} />
      <Card.Content>
        <View style={style.inline}>
          <Avatar.Image
            size={24}
            source={{ uri: commit.avatarUrl }}
            style={{ backgroundColor: "white" }}
          />

          <Text style={style.text}>{commit.author} {formatedCreatedAt}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
