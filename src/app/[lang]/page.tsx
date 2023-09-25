import { Newsletter } from '@/components/newsletter/newsletter';
import { Hero } from '@/components/hero';
import { Locale } from '../../../i18n-config';
import { Featured } from '@/components/featured';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <Hero lang={lang} />
      <Featured lang={lang} />
      <Newsletter lang={lang} />
    </>
  );
}
