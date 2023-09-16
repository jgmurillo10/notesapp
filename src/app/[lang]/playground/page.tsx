import { LinkIcon } from '@heroicons/react/20/solid';
import { getDictionary } from '../../../../get-dictionary';
import { Locale } from '../../../../i18n-config';
import { Clipboard } from '../assistants/[id]/Clipboard';
import { Playground } from './playground';

export default async function AssistantsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <div className="border-b border-slate-300 dark:border-gray-200 py-8">
        <div className="max-w-7xl mx-auto sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {dictionary['playground'].playground}
            </h1>
          </div>
          <div className="flex justify-end mb-3">
            <Clipboard>
              <LinkIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {dictionary['assistant'].share}
            </Clipboard>
          </div>
        </div>
      </div>
      <Playground />
    </div>
  );
}
