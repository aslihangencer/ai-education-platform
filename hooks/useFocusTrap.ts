import { useEffect, useCallback, RefObject } from 'react';

/**
 * useFocusTrap: A hook to keep keyboard TAB focus within a container.
 * Essential for WCAG AAA modals and sidebars.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, isActive: boolean) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive || !ref.current || e.key !== 'Tab') return;

      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab (Backwards)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (Forwards)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [isActive, ref]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handleKeyDown]);
}
