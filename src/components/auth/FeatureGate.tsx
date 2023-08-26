import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const FeatureGate = () => (
  <div className="overflow-hidden py-4 sm:py-32 -mr-5">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Sign in if you are already subscribed.
            </h2>
            <p className="my-4 text-lg leading-8 text-black dark:text-gray-300">
              Currently we are in <span> alpha</span> version, please subscribe
              to our newsletter to use this version and unlock the latest
              features.
            </p>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:focus:ring-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 rounded p-2 my-2"
              onClick={() => signIn()}
            >
              Sign in with Google
            </button>
          </div>
        </div>
        <Image
          className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[42rem] md:w-[54rem] lg:w-[46rem] md:-ml-4 lg:-ml-0"
          src="/demo_light.png"
          alt="demo"
          width={2432}
          height={1442}
        />
      </div>
    </div>
  </div>
);
