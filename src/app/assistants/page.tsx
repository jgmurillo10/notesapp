import PocketBase from 'pocketbase'
import Link from "next/link";

async function getAssistants() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_POCKET_BASE_PROD}/api/collections/assistants/records`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data?.items as any[];
}

export default async function NotesPage () {
  const assistants = await getAssistants();
  return (
    <div>
      <h1 className="my-2">Assistants</h1>
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

  return (
    <Link href={`/assistants/${id}`}>
      <div className="bg-slate-900 m-2 p-2 h-48">
        <h2>{name}</h2>
        <div>{description}</div>
        <p>{created}</p>
      </div>
    </Link>
  )
}
