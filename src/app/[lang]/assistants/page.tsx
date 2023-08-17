import PocketBase from 'pocketbase'
import Link from "next/link";
import { Locale } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';

async function getAssistants() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_POCKET_BASE_PROD}/api/collections/assistants/records`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data?.items as any[];
}

export default async function NotesPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const assistants = await getAssistants();
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <h1 className="my-2 text-4xl">{dictionary['assistants'].assistants}</h1>
      <div className="flex flex-row flex-wrap">
        {assistants?.map((assistant) => {
          return <Assistant key={assistant.id} assistant={assistant} />
        })}
      </div>
    </div>
  );
}

function Assistant({ assistant }: any) {
  const { id, name, description, created } = assistant || {};
  const createdDate = new Date(created);

  return (
    <Link href={`/assistants/${id}`} className="basis-full bg-slate-900 p-6 mt-2 relative">
      <h2 className="text-xl">{name}</h2>
      <div className="my-2">{description}</div>
      <p className="text-xs absolute bottom-2">{createdDate.toDateString()}</p>
    </Link>
  );
}
