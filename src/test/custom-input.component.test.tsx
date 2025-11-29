import { CustomInput } from '@/components/custom-input.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

// Mock SvgLoader
vi.mock('@/components', () => ({
  SvgLoader: ({ name }: { name: string }) => (
    <span data-testid={`icon-${name}`}>{name}</span>
  ),
}));

describe('CustomInput Component', () => {
  it('renders input with label', () => {
    render(<CustomInput label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    render(<CustomInput placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(<CustomInput onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message when hasError is true', () => {
    render(<CustomInput hasError errorText="Invalid input" />);
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(<CustomInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with icon', () => {
    render(<CustomInput icon="search" />);
    expect(screen.getByTestId('icon-search')).toBeInTheDocument();
  });

  it('applies error styles when hasError is true', () => {
    render(<CustomInput hasError />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });
});
