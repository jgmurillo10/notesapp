'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const create = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_POCKET_BASE_PROD}/api/collections/notes/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle('');
    setContent('');
    router.refresh();
  }
  return (
    <form onSubmit={create} className="flex flex-wrap">
      <h3 className="basis-full">Create a new note</h3>
      <input className="basis-full my-2" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="basis-full my-2" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button className="basis-auto p-2 my-2 bg-slate-700" type="submit">
        Create note
      </button>
    </form>
  )
}