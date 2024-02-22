import { Header } from "@/lib/ui/Header";

export default function BlogLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header/>
        {children}
      </div>
    </div>
  )
}