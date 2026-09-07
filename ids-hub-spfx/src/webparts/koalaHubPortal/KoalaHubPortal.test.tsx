import React from 'react';
import { render, screen } from '@testing-library/react';
import KoalaHubPortal from './KoalaHubPortal';

describe('KoalaHubPortal', () => {
  it('renders portal header', () => {
    render(<KoalaHubPortal description="Test portal" />);
    expect(screen.getByText('iDS Hub Portal')).toBeInTheDocument();
  });

  it('displays description prop', () => {
    const testDescription = 'This is a test description';
    render(<KoalaHubPortal description={testDescription} />);
    expect(screen.getByText(testDescription)).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<KoalaHubPortal description="Test" />);
    expect(screen.getByText(/Welcome to the iDS Hub/i)).toBeInTheDocument();
  });
});
