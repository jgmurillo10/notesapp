import { renderHook, act } from '@testing-library/react';
import jsonp from 'jsonp';
import { useSubscribe, SubscriptionStatus } from './useSubscribe';
import React from 'react';

jest.mock('jsonp');

describe('useSubscribe', () => {
  const mockUrl = 'https://example.com/subscribe/post?u=ID';

  it('should initialize with correct initial state', () => {
    const { result } = renderHook(() => useSubscribe({ url: mockUrl }));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('INITIAL');
    expect(result.current.message).toBe('');
  });

  it('should handle successful subscription', async () => {
    const { result } = renderHook(() => useSubscribe({ url: mockUrl }));
    const mockData = {
      msg: 'Subscription successful',
      result: 'success',
    };

    (jsonp as jest.Mock).mockImplementation((_, __, callback) => {
      callback(null, mockData);
    });

    await act(async () => {
      return await result.current.handleSubscription(
        {
          preventDefault: () => undefined,
        } as React.SyntheticEvent,
        'test@example.com',
      );
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('SUCCESS');
    expect(result.current.message).toBe(mockData.msg);
  });

  it('should handle subscription error', async () => {
    const { result } = renderHook(() => useSubscribe({ url: mockUrl }));
    const mockData = {
      msg: 'Subscription failed',
      result: 'error',
    };

    (jsonp as jest.Mock).mockImplementation((_, __, callback) => {
      callback(null, mockData);
    });

    await act(async () => {
      return await result.current.handleSubscription(
        {
          preventDefault: () => undefined,
        } as React.SyntheticEvent,
        'test@example.com',
      );
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('ERROR');
    expect(result.current.message).toBe(mockData.msg);
  });

  it('should handle subscription loading state', async () => {
    const { result } = renderHook(() => useSubscribe({ url: mockUrl }));
    const mockData = {
      msg: 'Subscription successful',
      result: 'success',
    };

    (jsonp as jest.Mock).mockImplementation((_, __, callback) => {
      setTimeout(() => {
        callback(null, mockData);
      }, 1000);
    });

    await act(async () => {
      return await result.current.handleSubscription(
        {
          preventDefault: () => undefined,
        } as React.SyntheticEvent,
        'test@example.com',
      );
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.status).toBe('LOADING');
    expect(result.current.message).toBe('');
  });
});
