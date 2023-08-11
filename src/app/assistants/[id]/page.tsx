import PocketBase from 'pocketbase'
import { Chat } from './chat';

async function getAssistant(assistantId: string) {
  const db = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_PROD);
  const data = await db.collection('assistants').getOne(assistantId);

  return data;
}

export default async function AssistantPage({ params }: any) {
  const assistant = await getAssistant(params.id);

  return (
    <div>
      <h1>assistants/{assistant.id}</h1>
      <div>
        <h3>{assistant.name}</h3>
        <p>{assistant.description}</p>
        <p>{assistant.created}</p>
      </div>
      <Chat />
    </div>
  )
}
