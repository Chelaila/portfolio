'use client';

import { useEffect, useId, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    background: '#000f89',
    primaryColor: '#32127a',
    primaryTextColor: '#f0f0f8',
    primaryBorderColor: '#483d8b',
    lineColor: '#766ec8',
    secondaryColor: '#191970',
    tertiaryColor: '#32127a',
    edgeLabelBackground: '#000f89',
    nodeTextColor: '#f0f0f8',
    clusterBkg: '#191970',
    titleColor: '#a09ae0',
  },
});

export default function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      if (!ref.current) return;
      ref.current.innerHTML = svg;

      const svgEl = ref.current.querySelector('svg');
      if (svgEl) {
        const w = svgEl.getAttribute('width');
        const h = svgEl.getAttribute('height');
        if (!svgEl.getAttribute('viewBox') && w && h) {
          svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
        }
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.style.width = '100%';
        svgEl.style.height = 'auto';
      }
    });
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto rounded-lg bg-indigo-ink p-4"
    />
  );
}
