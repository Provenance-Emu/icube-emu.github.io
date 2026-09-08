'use client';

import React, { useState } from 'react';

export type AccordionItemData = { q: string; a: React.ReactNode };

export default function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `accordion-button-${i}`;
        const panelId = `accordion-panel-${i}`;
        return (
          <div key={i} className="bg-white dark:bg-gray-800">
            <button
              type="button"
              id={buttonId}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-semibold text-gray-900 dark:text-white">{item.q}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={`h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
