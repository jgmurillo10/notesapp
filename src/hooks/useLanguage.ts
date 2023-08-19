import { usePathname } from "next/navigation";
import { Locale } from "../../i18n-config";

export const useLanguage = (): { lang: Locale } => {
  const pathName = usePathname();
  const segments = pathName.split('/');

  return {
    lang: segments[1] as Locale,
  }
}
