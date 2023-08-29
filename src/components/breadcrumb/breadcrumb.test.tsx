import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './breadcrumb';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/en/assistants/assistant1'),
}));

describe('Breadcrumb', () => {
  it('renders breadcrumb links correctly', () => {
    render(<Breadcrumb />);

    const homeLink = screen.getByText('Home');
    const assistantsLink = screen.getByText('Assistants');
    const assistantLink = screen.getByText('Assistant');

    expect(homeLink).toBeInTheDocument();
    expect(assistantsLink).toBeInTheDocument();
    expect(assistantLink).toBeInTheDocument();
  });

  it('renders correct number of breadcrumb links', () => {
    render(<Breadcrumb />);

    const links = screen.getAllByRole('link');
    const assistantLabel = screen.getByText('Assistant');

    expect(links).toHaveLength(2);
    expect(assistantLabel).toBeInTheDocument();
  });

  it('renders correct breadcrumb link hrefs', () => {
    render(<Breadcrumb />);

    const homeLink = screen.getByText('Home');
    const assistantsLink = screen.getByText('Assistants');

    expect(homeLink).toHaveAttribute('href', '/en');
    expect(assistantsLink).toHaveAttribute('href', '/en/assistants');
  });

  it('renders assistant breadcrumb when assistant is present in the URL', () => {
    render(<Breadcrumb />);

    const assistantLink = screen.getByText('Assistant');

    expect(assistantLink).toBeInTheDocument();
  });
});
