import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as ReactDOM from 'react-dom/client';

const mockRender = vi.fn();
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: mockRender,
  })),
}));

const mockGetElementById = vi.spyOn(document, 'getElementById');

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('renders App component in StrictMode when root element is found', async () => {
    const mockRootElement = document.createElement('div');
    mockGetElementById.mockReturnValue(mockRootElement);

    await import('./main.tsx');

    expect(document.getElementById).toHaveBeenCalledWith('root');
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(mockRootElement);
    expect(mockRender).toHaveBeenCalled();
    console.log('Render call arguments:', mockRender.mock.calls);

    expect(mockRender).toHaveBeenCalledWith(expect.anything());
  });

  it('throws error when root element is not found', async () => {
    mockGetElementById.mockReturnValue(null);

    await expect(import('./main.tsx')).rejects.toThrow(
      'Failed to find the root element'
    );
    expect(document.getElementById).toHaveBeenCalledWith('root');
    expect(ReactDOM.createRoot).not.toHaveBeenCalled();
  });
});
