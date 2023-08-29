import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';

export default function AssistantsLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div className="px-5 pt-5">
      <Breadcrumb />
      {children}
    </div>
  );
}
