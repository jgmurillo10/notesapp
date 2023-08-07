import PocketBase from 'pocketbase'

async function getNote(noteId: string) {
  const db = new PocketBase('http://127.0.0.1:8090');
  const data = await db.collection('notes').getOne(noteId);

  return data;
}
export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div>
        <h3>{note.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: note.content }} />
        <p>{note.created}</p>
      </div>
    </div>
  )
}