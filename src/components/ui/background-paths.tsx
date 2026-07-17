"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
      189 + i * 6
    } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${
      343 - i * 6
    }C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${
      875 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
      <title>Animated background paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.025 + path.id * 0.004}
          initial={{ pathLength: 0.3, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: [0.12, 0.35, 0.12], pathOffset: [0, 1, 0] }}
          transition={{ duration: 22 + (path.id % 8), repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

export function BackgroundPaths({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden text-white", className)} aria-hidden="true">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
      </div>
      <div className="absolute inset-0 opacity-60">
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
}
