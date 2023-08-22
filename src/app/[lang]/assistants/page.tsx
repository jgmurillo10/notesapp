import Link from 'next/link';
import { Locale } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';

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

export default async function NotesPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const assistants = await getAssistants();
  const dictionary = await getDictionary(lang);

  return (
    <div>
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
      <h1 className="my-2 text-4xl">{dictionary['assistants'].assistants}</h1>
      <div className="flex flex-row flex-wrap">
        {assistants?.map((assistant) => {
          return (
            <Assistant key={assistant.id} assistant={assistant} locale={lang} />
          );
        })}
      </div>
    </div>
  );
}

function Assistant({ assistant, locale }: any) {
  const { id, name, description, created } = assistant || {};
  const createdDate = new Date(created);

  return (
    <Link
      href={`/${locale}/assistants/${id}`}
      locale={false}
      className="basis-full rounded shadow shadow-slate-300 hover:shadow-slate-400 transition-all dark:shadow-gray-900 hover:dark:shadow-gray-700 dark:bg-gray-800 p-6 mt-4 relative"
    >
      <h2 className="text-xl">{name}</h2>
      <div className="my-2">{description}</div>
      <p className="text-xs absolute bottom-2">{createdDate.toDateString()}</p>
    </Link>
  );
}
