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
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/3 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
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
