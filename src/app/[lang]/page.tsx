import { LoginComponent } from '@/components/login';
import { getDictionary } from '../../../get-dictionary';
import { Locale } from '../../../i18n-config';

export default async function Home({ params: { lang } }: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{dictionary['home'].hello}</h1>
        <p>{dictionary['home'].hero}</p>
        <LoginComponent />
      </div>
    </main>
  );
}
