import { render, screen } from '@testing-library/react';
import { Newsletter } from './newsletter';

describe('Newsletter', () => {
  it('renders heading and description', async () => {
    render(await Newsletter({ lang: 'en' }));
    const heading = await screen.findByText('Subscribe to our newsletter.');
    const description = await screen.findByText(
      'Keep up to date with our latest releases and more.',
    );

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('renders subscribe form with correct labels and placeholder', async () => {
    render(await Newsletter({ lang: 'en' }));

    const emailLabel = await screen.findByLabelText('Email address');
    const submitLabel = await screen.findByText('Subscribe');
    const placeholder = await screen.findByPlaceholderText('Enter your email');

    expect(emailLabel).toBeInTheDocument();
    expect(submitLabel).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });

  it('renders weekly articles section with correct text', async () => {
    render(await Newsletter({ lang: 'en' }));

    const weeklyArticles = await screen.findByText('Weekly articles');
    const weeklyArticlesDescription = await screen.findByText(
      'We post weekly articles with all the stack and implementation details for this tool.',
    );

    expect(weeklyArticles).toBeInTheDocument();
    expect(weeklyArticlesDescription).toBeInTheDocument();
  });

  it('renders full access section with correct text', async () => {
    render(await Newsletter({ lang: 'en' }));

    const fullAccess = await screen.findByText('Full access');
    const fullAccessDescription = await screen.findByText(
      'Get access to the alpha version and latest features released.',
    );

    expect(fullAccess).toBeInTheDocument();
    expect(fullAccessDescription).toBeInTheDocument();
  });
});
