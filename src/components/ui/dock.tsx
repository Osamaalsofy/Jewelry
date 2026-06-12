"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip"
import { motion } from "framer-motion"

interface DockProps {
  className?: string
  items: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void;
    active?: boolean;
  }[]
}

export default function Dock({ items, className }: DockProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div className={cn("flex items-center justify-center w-full py-6", className)}>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex items-end gap-3 px-4 py-2.5 rounded-3xl",
          "border border-white/10 bg-black/60 backdrop-blur-2xl shadow-xl z-50 pointer-events-auto"
        )}
        style={{
          transform: "perspective(600px) rotateX(8deg)", // subtle arc layout illusion
        }}
      >
        <TooltipProvider delayDuration={100}>
          {items.map((item, i) => {
            const isActive = item.active
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.15 : 1,
                      rotate: isHovered ? -3 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-2xl relative w-12 h-12 flex items-center justify-center transition-all bg-white/[0.02] hover:bg-white/[0.08] border border-white/5",
                        isActive && "border-amber-400/40 bg-white/[0.06] shadow-md shadow-amber-400/10",
                        isHovered && "shadow-lg shadow-amber-400/20"
                      )}
                      onClick={() => {
                        item.onClick?.()
                      }}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          isActive ? "text-[#FFE071]" : "text-white/70 hover:text-white"
                        )}
                      />
                      {/* Glowing ring effect */}
                      {isHovered && (
                        <motion.span
                          layoutId="glow"
                          className="absolute inset-0 rounded-2xl border border-amber-300/40"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Button>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="dot"
                        className="w-1.5 h-1.5 rounded-full bg-[#FFE071] mt-1 shadow-sm shadow-[#FFE071]"
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px] uppercase font-mono tracking-wider font-extrabold bg-neutral-950/90 text-white border border-white/10 px-2 py-1">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
