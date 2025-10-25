export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>Teacher Header</header>
      <main>{children}</main>
    </div>
  )
}
