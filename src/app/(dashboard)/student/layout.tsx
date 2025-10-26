export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>Student Header</header>
      <main>{children}</main>
    </div>
  )
}
