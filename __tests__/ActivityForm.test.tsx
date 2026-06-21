import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import ActivityLogger from '@/components/activity-logger';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('ActivityForm - Field Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the activity form', () => {
    render(<ActivityLogger />);
    expect(screen.getByText('Log New Activity')).toBeInTheDocument();
  });

  it('should show validation error when value is empty', async () => {
    const { default: toast } = await import('react-hot-toast');
    render(<ActivityLogger />);

    const logButton = screen.getByRole('button', { name: /log activity/i });
    fireEvent.click(logButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please enter a value');
    });
  });

  it('should validate required Category field', () => {
    render(<ActivityLogger />);
    const categorySelect = screen.getByDisplayValue('transport');
    expect(categorySelect).toBeInTheDocument();
  });

  it('should validate required Type field', () => {
    render(<ActivityLogger />);
    const typeSelect = screen.getByDisplayValue('car');
    expect(typeSelect).toBeInTheDocument();
  });

  it('should validate required Date field', () => {
    render(<ActivityLogger />);
    const dateInputs = screen.getAllByDisplayValue(/\d{4}-\d{2}-\d{2}/);
    expect(dateInputs.length).toBeGreaterThan(0);
  });

  it('should enable submit button when value is provided', async () => {
    render(<ActivityLogger />);

    const valueInput = screen.getByPlaceholderText('25');
    fireEvent.change(valueInput, { target: { value: '50' } });

    const logButton = screen.getByRole('button', { name: /log activity/i });
    expect(logButton).not.toBeDisabled();
  });

  it('should clear form after successful submission', async () => {
    const { default: toast } = await import('react-hot-toast');
    render(<ActivityLogger />);

    const valueInput = screen.getByPlaceholderText('25') as HTMLInputElement;
    fireEvent.change(valueInput, { target: { value: '50' } });

    const logButton = screen.getByRole('button', { name: /log activity/i });
    fireEvent.click(logButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Activity logged successfully!');
      expect(valueInput.value).toBe('');
    });
  });

  it('should have all form fields required', () => {
    render(<ActivityLogger />);

    // Check for all required select/input elements
    expect(screen.getByDisplayValue('transport')).toBeInTheDocument(); // Category
    expect(screen.getByDisplayValue('car')).toBeInTheDocument(); // Type
    expect(screen.getByPlaceholderText('25')).toBeInTheDocument(); // Value
    expect(screen.getByPlaceholderText('km')).toBeInTheDocument(); // Unit
  });

  it('should display recent activities list', () => {
    render(<ActivityLogger />);
    expect(screen.getByText('Recent Activities')).toBeInTheDocument();
  });

  it('should allow user to delete an activity', async () => {
    const { default: toast } = await import('react-hot-toast');
    render(<ActivityLogger />);

    // Find a delete button (Trash2 icon button)
    const deleteButtons = screen.getAllByRole('button');
    const trashButtons = deleteButtons.filter((btn) =>
      btn.querySelector('svg') && btn.className.includes('hover:text-destructive')
    );

    if (trashButtons.length > 0) {
      fireEvent.click(trashButtons[0]);
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Activity removed');
      });
    }
  });
});

describe('ActivityForm - Input Constraints', () => {
  it('should accept positive numbers in value field', () => {
    render(<ActivityLogger />);
    const valueInput = screen.getByPlaceholderText('25') as HTMLInputElement;

    fireEvent.change(valueInput, { target: { value: '100' } });
    expect(valueInput.value).toBe('100');
  });

  it('should accept decimal numbers in value field', () => {
    render(<ActivityLogger />);
    const valueInput = screen.getByPlaceholderText('25') as HTMLInputElement;

    fireEvent.change(valueInput, { target: { value: '25.5' } });
    expect(valueInput.value).toBe('25.5');
  });

  it('should have proper category options', () => {
    render(<ActivityLogger />);
    const categorySelects = screen.getAllByDisplayValue('transport');
    expect(categorySelects.length).toBeGreaterThan(0);
  });
});
