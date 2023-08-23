import PocketBase from 'pocketbase';
import { Chat } from './chat';
import {
  BriefcaseIcon,
  CalendarIcon,
  LinkIcon,
} from '@heroicons/react/20/solid';
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
    <>
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            {assistant.name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Writer
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-white">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {new Date(assistant.created).toDateString()}
            </div>
          </div>
        </div>
        <div className="mt-5 flex md:mt-0">
          <span className="md:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <LinkIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Share
            </button>
          </span>
        </div>
      </div>
      <p className="mt-4">{assistant.description}</p>
      <Chat role={assistant.gpt_id} />
    </>
  );
}
