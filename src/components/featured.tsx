import {
  CodeBracketIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Locale } from '../../i18n-config';
import { getDictionary } from '../../get-dictionary';

const icons = [
  CloudArrowUpIcon,
  LockClosedIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
];

export const Featured = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang);
  return (
    <div className="bg-white dark:bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {dictionary['featured'].eyebrow}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {dictionary['featured'].heading}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            {dictionary['featured'].description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {dictionary['featured'].features
              .map((feature, index) => ({ ...feature, icon: icons[index] }))
              .map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-white">
                    {feature.description}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
