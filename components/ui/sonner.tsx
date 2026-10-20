"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          background: "white",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
          fontWeight: "500",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-gray-900 group-[.toast]:font-medium group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:hover:bg-blue-700 group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md group-[.toast]:text-sm",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700 group-[.toast]:hover:bg-gray-200 group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md group-[.toast]:text-sm",
          title: "group-[.toast]:text-gray-900 group-[.toast]:font-semibold group-[.toast]:text-base",
          success: "group-[.toast]:border-green-200 group-[.toast]:bg-green-50",
          error: "group-[.toast]:border-red-200 group-[.toast]:bg-red-50",
          warning: "group-[.toast]:border-yellow-200 group-[.toast]:bg-yellow-50",
          info: "group-[.toast]:border-blue-200 group-[.toast]:bg-blue-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
