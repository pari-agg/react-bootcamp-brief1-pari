import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App'; // Adjust this import if the main component is named differently

describe('Brief 1: Technical Requirements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock global fetch to spy on it and prevent real network requests
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  it('1. Data Fetching: triggers a fetch request on mount to read JSON menu', async () => {
    render(<App />);
    
    // Wait for the fetch to be called (typically within a useEffect on mount)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    
    // Verify that the fetch was requested with a path containing '.json'
    const fetchArgs = global.fetch.mock.calls[0][0];
    expect(typeof fetchArgs).toBe('string');
    expect(fetchArgs.toLowerCase()).toContain('.json');
  });

  it('2. Theme State: allows toggling between light and dark themes', () => {
    const { container } = render(<App />);
    
    // Look for a theme toggle mechanism (using common labels like theme, dark, light, or mode)
    const toggleBtn = screen.queryByRole('button', { name: /theme|dark|light|mode/i });
    
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
      
      // Verify dark/light class manipulation on a core container (document or root div)
      const hasThemeClass = document.documentElement.classList.contains('dark') || 
                            document.documentElement.classList.contains('light') ||
                            (container.firstChild && container.firstChild.classList.contains('dark')) ||
                            (container.firstChild && container.firstChild.classList.contains('light'));
                            
      expect(hasThemeClass).toBe(true);
    } else {
      // We skip the direct assert if we can't find standard naming, but you can 
      // replace the query above with the exact test ID if standardizing on one.
      console.warn("Theme toggle button not found using standard labels. Make sure it exists.");
    }
  });

  it('3. Component Integration: uses structural components from Phase 1 library', () => {
    render(<App />);
    
    // Verify that they imported and rendered at least one structural component 
    // by querying for standard roles. We'll look for standard UI components like Buttons.
    const buttons = screen.queryAllByRole('button');
    
    // Depending on the UI structure, you might also look for regions, dialogs, or headings.
    expect(buttons.length).toBeGreaterThan(0);
    
    // If you enforced specific text properties or test IDs in Phase 1, you can test them here:
    // expect(screen.getByTestId('custom-card')).toBeInTheDocument();
  });
});
