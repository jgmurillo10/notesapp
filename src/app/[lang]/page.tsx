import { LoginComponent } from '@/components/auth/auth';
import { getDictionary } from '../../../get-dictionary';
import { Locale } from '../../../i18n-config';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1 className="my-2 text-4xl">{dictionary['home'].hello}</h1>
      <p>{dictionary['home'].hero}</p>
      <LoginComponent />
    </>
  );
}
