export default function LandingFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} GradeGo!. All rights reserved.</p>
      </div>
    </footer>
  )
}
