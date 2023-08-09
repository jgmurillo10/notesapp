import PocketBase from 'pocketbase'
import Link from "next/link";
import CreateNote from './[id]/CreateNote';

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto';

async function getNotes() {
  const db = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_PROD);
  const data = await db.collection('notes').getList();

  return data?.items as any[];
}
export default async function NotesPage () {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className="flex flex-row">
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div className="bg-slate-900 m-2 p-2 h-48">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <p>{created}</p>
      </div>
    </Link>
  )
}