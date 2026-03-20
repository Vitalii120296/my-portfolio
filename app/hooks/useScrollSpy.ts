import { useEffect } from 'react';

export const useScrollSpy = (ids: string[]) => {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            if (id) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);
};
