import { CustomButton } from '@/components/custom-button.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

// Mock SvgLoader component
vi.mock('@/components', () => ({
  SvgLoader: ({ name }: { name: string }) => (
    <span data-testid={`icon-${name}`}>{name}</span>
  ),
}));

describe('CustomButton Component', () => {
  it('renders button with text', () => {
    render(<CustomButton>Click me</CustomButton>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<CustomButton onClick={handleClick}>Click</CustomButton>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('disables button when disabled prop is true', () => {
    render(<CustomButton disabled>Disabled</CustomButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<CustomButton loading>Submit</CustomButton>);
    expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('renders with prepend icon', () => {
    render(<CustomButton prependIcon="user">Profile</CustomButton>);
    expect(screen.getByTestId('icon-user')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(
      <CustomButton variant="primary">Primary</CustomButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('bg-indigo-600');

    rerender(<CustomButton variant="secondary">Secondary</CustomButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600');
  });
});
