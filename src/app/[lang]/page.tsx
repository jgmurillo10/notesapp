import { Locale } from '../../../i18n-config';
import { Hero } from '@/components/hero';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <Hero lang={lang} />
    </>
  );
}
