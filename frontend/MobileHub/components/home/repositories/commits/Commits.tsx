import { Avatar, Text } from "react-native-paper";

interface Commit {
  message: string;
  author: string;
  creted_at: string;
  avatarURL: string;
}

export default function Commit({ commit }: { commit: Commit }) {
  console.log(commit);
  console.log("avatarURL = " + commit.avatarURL);
  return (
    <>
      <Text>{commit.message}</Text>
      <Avatar.Image
        size={24}
        source={{ uri: commit.avatarURL }}
        style={{ backgroundColor: "transparent" }}
      />
      <Text>{commit.author}</Text>
      <Text>commited: {commit.creted_at}</Text>
    </>
  );
}
