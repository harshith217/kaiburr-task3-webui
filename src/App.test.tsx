import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders header links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Task 3 Web UI/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Records/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Commands/i })).toBeInTheDocument();
  });
});
