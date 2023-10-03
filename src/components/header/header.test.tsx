import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Header } from './header';
import { usePathname } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe('Header', () => {
  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' },
  ];
  const lang = 'en';

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with navigation items', () => {
    render(<Header navigation={navigation} lang={lang} />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const [_icon, ...navigationLinks] = screen.getAllByRole('link');
    expect(navigationLinks).toHaveLength(navigation.length);

    navigationLinks.forEach((link, index) => {
      expect(link).toHaveTextContent(navigation[index].name);
      expect(link).toHaveAttribute('href', `/${lang}/${navigation[index].href}`);
    });
  });

  test('renders login button when session is not available', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    render(<Header navigation={navigation} lang={lang} />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  test('renders logout button when session is available', () => {
    (useSession as jest.Mock).mockReturnValue({ data: {}, status: 'authenticated' });

    render(<Header navigation={navigation} lang={lang} />);

    const logoutButton = screen.getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  function fireResize(width: number) {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  }

  
  test('open mobile menu when on click', async () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    (usePathname as jest.Mock).mockReturnValue('/about');

    render(<Header navigation={navigation} lang={lang} />);

    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(mobileMenuButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
