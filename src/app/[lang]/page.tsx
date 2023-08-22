import { Newsletter } from '@/components/newsletter';
import { Hero } from '@/components/hero';
import { Locale } from '../../../i18n-config';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <Hero lang={lang} />
      {/* TODO: Implement with Mailchimp */}
      <Newsletter lang={lang} />
    </>
  );
}
