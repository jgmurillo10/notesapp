/**
 * TODO: Remove dummy test to implement a real one.
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
 
describe('Chat', () => {
  it('renders a Chat', () => {
    render(<div><h1>hello</h1></div>)
 
    const heading = screen.getByRole('heading', {
        name: /hello/i,
    });
 
    expect(heading).toBeInTheDocument()
  })
});
