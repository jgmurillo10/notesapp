import { render, screen, fireEvent } from '@testing-library/react';
import { SubscribeForm } from './SubscribeForm';
import { SubscriptionStatus, useSubscribe } from './useSubscribe';
import React from 'react';

jest.mock('./useSubscribe');
const mockUseSubscribe = useSubscribe as jest.MockedFunction<
  typeof useSubscribe
>;

describe('SubscribeForm', () => {
  const mockProps = {
    label: 'Email',
    placeholder: 'Enter your email',
    submitLabel: 'Subscribe',
  };

  it('renders form inputs correctly', () => {
    const useSubscribeMock = jest.fn(({ url }) => ({
      isLoading: false,
      message: '',
      url,
      status: 'INITIAL' as SubscriptionStatus,
      handleSubscription: jest.fn(),
    }));
    mockUseSubscribe.mockImplementation(useSubscribeMock);
    render(<SubscribeForm {...mockProps} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('updates email state on input change', () => {
    const useSubscribeMock = jest.fn(({ url }) => ({
      isLoading: false,
      message: '',
      url,
      status: 'INITIAL' as SubscriptionStatus,
      handleSubscription: jest.fn(),
    }));
    mockUseSubscribe.mockImplementation(useSubscribeMock);
    render(<SubscribeForm {...mockProps} />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('calls handleSubscription on form submission', () => {
    const handleSubscription = jest.fn(async (e: React.SyntheticEvent) =>
      e.preventDefault(),
    );
    const useSubscribeMock = jest.fn(({ url }) => ({
      isLoading: false,
      message: '',
      url,
      status: 'INITIAL' as SubscriptionStatus,
      handleSubscription: handleSubscription,
    }));
    mockUseSubscribe.mockImplementation(useSubscribeMock);

    render(<SubscribeForm {...mockProps} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(handleSubscription).toHaveBeenCalledTimes(1);
    expect(handleSubscription).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
    );
  });

  it('displays loading message when isLoading is true', () => {
    const handleSubscription = jest.fn();
    const useSubscribeMock = jest.fn(({ url }) => ({
      isLoading: true,
      message: '',
      url,
      status: 'INITIAL' as SubscriptionStatus,
      handleSubscription: handleSubscription,
    }));
    mockUseSubscribe.mockImplementation(useSubscribeMock);

    render(<SubscribeForm {...mockProps} />);

    const loadingMessage = screen.getByText('Loading...');

    expect(loadingMessage).toBeInTheDocument();
  });

  it('displays message when message is not empty', () => {
    const handleSubscription = jest.fn();
    const useSubscribeMock = jest.fn(({ url }) => ({
      isLoading: true,
      message: 'Subscription successful',
      url,
      status: 'INITIAL' as SubscriptionStatus,
      handleSubscription: handleSubscription,
    }));
    mockUseSubscribe.mockImplementation(useSubscribeMock);

    render(<SubscribeForm {...mockProps} />);

    const successMessage = screen.getByText('Subscription successful');
    expect(successMessage).toBeInTheDocument();
  });
});
