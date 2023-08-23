import { Breadcrumb } from '@/components/breadcrumb';

export default function AssistantsLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div className="p-5">
      <Breadcrumb />
      {children}
    </div>
  );
}
