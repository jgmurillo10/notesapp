'use client';

import { Playground } from "../../playground/playground";

export default function CreateAssistant() {
  const handleSave = (assistant: string) => {
    console.log('>>>', {assistant});
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="my-4 text-4xl">Create a new assistant</h1>
      <p>Define the assistant in the system field, test id adding user messages and getting reponses.</p>
      <p>Finally, save it!</p>
      <Playground creationMode={true} onSave={handleSave} />
    </div>
  );
}
