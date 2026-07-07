"use client";

import React from "react";

type NavItem = {
  id: string;
  label: string;
};

export default function SubNavTabs({
  items,
  activeId,
  onChange,
}: {
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <nav className="flex min-w-[calc(100vw-3rem)] gap-3 whitespace-nowrap text-xs font-medium lg:min-w-0 lg:gap-6 sm:text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`relative rounded-full px-3 py-2 transition ${isActive ? "text-[var(--brand-yellow)]" : "text-white hover:text-[var(--brand-yellow)] hover:bg-white/10"}`}
            >
              {item.label}
              {isActive ? (
                <span className="absolute left-1/2 bottom-0 h-[1px] w-[calc(100%-0.75rem)] -translate-x-1/2 rounded-full" style={{ background: 'linear-gradient(90deg, var(--brand-yellow), var(--brand-accent))' }} />
              ) : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
