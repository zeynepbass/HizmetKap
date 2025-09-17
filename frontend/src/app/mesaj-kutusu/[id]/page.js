
import ChatRoom from "../../components/ChatRoom";

export default async function Page({ params }) {
  const { id } = params;

  return <ChatRoom id={id} />;
}
