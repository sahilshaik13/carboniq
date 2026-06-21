import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import EmissionsChart from '@/components/emissions-chart';

// Mock recharts to avoid DOM rendering issues in tests
vi.mock('recharts', () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: ({ dataKey }: any) => <div data-testid="line" data-key={dataKey} />,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: ({ dataKey }: any) => <div data-testid="bar" data-key={dataKey} />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ dataKey }: any) => <div data-testid="pie" data-key={dataKey} />,
  Cell: () => <div data-testid="cell" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

import { vi } from 'vitest';

describe('FootprintChart - Rendering', () => {
  it('should render without crashing', () => {
    const { container } = render(<EmissionsChart />);
    expect(container).toBeInTheDocument();
  });

  it('should display emissions trend section', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Emissions Trend')).toBeInTheDocument();
  });

  it('should display emissions by category section', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Emissions by Category')).toBeInTheDocument();
  });

  it('should display top contributors section', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Top Contributors')).toBeInTheDocument();
  });

  it('should render line chart for trend', () => {
    render(<EmissionsChart />);
    const lineChart = screen.getByTestId('line-chart');
    expect(lineChart).toBeInTheDocument();
  });

  it('should render pie chart for categories', () => {
    render(<EmissionsChart />);
    const pieChart = screen.getByTestId('pie-chart');
    expect(pieChart).toBeInTheDocument();
  });

  it('should display all category names', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('should display percentage values for categories', () => {
    render(<EmissionsChart />);
    // Check for percentage display in the contributor section
    const percentageElements = screen.getAllByText(/\d+%/);
    expect(percentageElements.length).toBeGreaterThan(0);
  });

  it('should render responsive containers', () => {
    render(<EmissionsChart />);
    const containers = screen.getAllByTestId('responsive-container');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('should have proper grid layout for charts', () => {
    const { container } = render(<EmissionsChart />);
    // Check for grid structure
    const gridElements = container.querySelectorAll('[class*="grid"]');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  it('should display chart data with mock data', () => {
    render(<EmissionsChart />);

    // Verify line chart has data
    const lineChart = screen.getByTestId('line-chart');
    expect(lineChart).toBeInTheDocument();

    // Verify pie chart has data
    const pieChart = screen.getByTestId('pie-chart');
    expect(pieChart).toBeInTheDocument();
  });

  it('should have proper accessibility structure', () => {
    const { container } = render(<EmissionsChart />);

    // Check for headings
    const headings = container.querySelectorAll('h3');
    expect(headings.length).toBeGreaterThanOrEqual(3);
  });
});

describe('FootprintChart - Data Display', () => {
  it('should display transport category correctly', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText(/65%/)).toBeInTheDocument();
  });

  it('should display energy category correctly', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText(/35%/)).toBeInTheDocument();
  });

  it('should display food category correctly', () => {
    render(<EmissionsChart />);
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('should display progress bars for categories', () => {
    const { container } = render(<EmissionsChart />);
    const progressBars = container.querySelectorAll('[style*="backgroundColor"]');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should render all chart components without errors', () => {
    expect(() => {
      render(<EmissionsChart />);
    }).not.toThrow();
  });
});
