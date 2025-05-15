import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={2000} 
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          // Add specific styles for different toast types
          success: "group-[.toast]:bg-green-500 group-[.toast]:text-white group-[.toast]:border-green-600",
          error: "group-[.toast]:bg-red-500 group-[.toast]:text-white group-[.toast]:border-red-600",
          warning: "group-[.toast]:bg-yellow-500 group-[.toast]:text-white group-[.toast]:border-yellow-600",
          info: "group-[.toast]:bg-blue-500 group-[.toast]:text-white group-[.toast]:border-blue-600",
        },
      }}
      position="top-right"
      {...props}
    />
  )
}

export { Toaster, toast }