import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './footer';

jest.mock('next/navigation', () => ({
  usePathname() {
    return '';
  },
}));

jest.mock('../../../get-dictionary', () => ({
  getDictionary: jest.fn().mockResolvedValue({
    footer: {
      made: 'Made by Juan Murillo',
    },
  }),
}));

describe('Footer', () => {
  it('renders the footer component', async () => {
    render(await Footer({ lang: 'en' }));

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders the made by link', async () => {
    render(await Footer({ lang: 'en' }));

    const madeByLink = screen.getByRole('link', {
      name: /made by juan murillo/i,
    });
    expect(madeByLink).toBeInTheDocument();
    expect(madeByLink).toHaveAttribute('href', 'https://juanmurillo.co/');
  });

  it('renders the theme switcher component', async () => {
    render(await Footer({ lang: 'en' }));

    const themeSwitcher = screen.getByRole('switch');
    expect(themeSwitcher).toBeInTheDocument();
  });

  it('renders the locale switcher component', async () => {
    render(await Footer({ lang: 'en' }));

    const localeSwitcher = screen.getByText(/Language/i);
    expect(localeSwitcher).toBeInTheDocument();
  });
});
