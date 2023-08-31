import { useState } from 'react';
import jsonp from 'jsonp';

export type SubscriptionStatus = 'INITIAL' | 'ERROR' | 'SUCCESS' | 'LOADING';
export const useSubscribe = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<SubscriptionStatus>('INITIAL');
  const [message, setMessage] = useState<string>('');

  const handleInternalSubscription = (
    error: Error | null,
    data: { msg: string; result: string },
  ) => {
    if (error) {
      setStatus('ERROR');
      setMessage(data.msg);
    } else if (data.result !== 'success') {
      setStatus('ERROR');
      setMessage(data.msg);
    } else {
      setStatus('SUCCESS');
      setMessage(data.msg);
    }
    setIsLoading(false);
  };

  const handleSubscription = async (e: React.SyntheticEvent, email: string) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('LOADING');
    setMessage('');

    const finalUrl = url.replace('/post?', '/post-json?') + `&EMAIL=${email}`;
    jsonp(finalUrl, { param: 'c' }, handleInternalSubscription);
  };

  return {
    url,
    handleSubscription,
    isLoading,
    status,
    message,
  };
};
