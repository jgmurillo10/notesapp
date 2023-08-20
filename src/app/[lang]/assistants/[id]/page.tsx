import PocketBase from 'pocketbase';
import { Chat } from './chat';
import Link from 'next/link';
import { getDictionary } from '../../../../../get-dictionary';

async function getAssistant(assistantId: string) {
  const db = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_PROD);
  const data = await db.collection('assistants').getOne(assistantId);

  return data;
}

export default async function AssistantPage({ params: { id, lang } }: any) {
  const assistant = await getAssistant(id);
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <h1 className="my-2 text-4xl truncate">
        <Link href={`/${lang}/assistants`} locale={false}>
          {dictionary['assistants'].assistants}
        </Link>
        /{assistant.id}
      </h1>
      <div className="my-2">
        <h3>🤖: {assistant.name}</h3>
        <p>💬: {assistant.description}</p>
        <p>🗓️: {new Date(assistant.created).toDateString()}</p>
      </div>
      <Chat role={assistant.gpt_id} />
    </div>
  );
}
