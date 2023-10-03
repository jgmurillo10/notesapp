import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';
import { getDictionary } from '../../../../get-dictionary';

export default async function AssistantsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="px-5 pt-5">
      <Breadcrumb labels={dictionary['navigation']} />
      {children}
    </div>
  );
}
