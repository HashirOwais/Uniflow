export function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4">
          {/* Copyright */}
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} UniFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

