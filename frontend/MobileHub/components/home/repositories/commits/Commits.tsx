import { Avatar, Text } from "react-native-paper";

interface Commit {
  message: string;
  author: string;
  createdAt: string;
  avatarUrl: string;
}

export default function Commit({ commit }: { commit: Commit }) {
  console.log(commit);
  console.log("createdAt = " + commit.createdAt);
  return (
    <>
      <Text>{commit.message}</Text>
      <Avatar.Image
        size={24}
        source={{ uri: commit.avatarUrl }}
        style={{ backgroundColor: "transparent" }}
      />
      <Text>{commit.author}</Text>
      <Text>commited: {commit.createdAt}</Text>
    </>
  );
}
