import Loading from '@/components/loading.component';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loading Component', () => {
  it('renders default loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading data ...')).toBeInTheDocument();
  });

  it('renders custom loading text', () => {
    render(<Loading loadingText="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
});
