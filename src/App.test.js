import { render, screen } from '@testing-library/react';
import App from './App';

test('renders To-Do List view button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /to-do list/i });
  expect(button).toBeInTheDocument();
});
