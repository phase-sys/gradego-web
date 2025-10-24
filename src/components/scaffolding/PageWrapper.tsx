// components/layout-wrapper.tsx
interface PageWrapperProps {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}
