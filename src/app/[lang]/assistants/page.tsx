import Link from 'next/link';
import { Locale } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';
import {
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';

async function getAssistants() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POCKET_BASE_PROD}/api/collections/assistants/records`,
    {
      cache: 'no-store',
    },
  );
  const data = await response.json();

  return data?.items as any[];
}

export default async function AssistantsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const assistants = await getAssistants();
  const dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <h1 className="my-4 text-4xl">{dictionary['assistants'].assistants}</h1>
      {/* <Link
        href={`/${lang}/assistants/new`}
        className="my-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {dictionary['assistants'].new}
      </Link> */}
      <ul
        role="list"
        className="mt-8 divide-y divide-gray-100 dark:divide-gray-800"
      >
        {assistants?.map((assistant) => {
          return (
            <Assistant key={assistant.id} assistant={assistant} locale={lang} />
          );
        })}
      </ul>
    </div>
  );
}

function Assistant({ assistant, locale }: any) {
  const { id, name, description, created } = assistant || {};
  const createdDate = new Date(created);

  return (
    <Link
      role="listitem"
      key={id}
      href={`/${locale}/assistants/${id}`}
      locale={false}
      className="flex justify-between gap-x-6 p-5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 items-center"
    >
      <div className="flex min-w-0 gap-x-4">
        <ChatBubbleBottomCenterTextIcon className="h-12 w-12 flex-none rounded-full bg-gray-100 dark:text-black p-2" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-white">
            {description}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="flex items-center text-xs leading-5 text-gray-500 dark:text-white">
          <CalendarIcon className="h-6 w-6 mr-2" />
          <time dateTime={created}>{createdDate.toDateString()}</time>
        </p>
      </div>
    </Link>
  );
}
