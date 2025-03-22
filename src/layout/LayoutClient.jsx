import { Outlet } from "react-router"
import { Header } from "@/client/components/Header"
import { Footer } from "@/client/components/Footer"

export function LayoutClient() {
  return (
    <>
      <Header />
      <main className="bg-gray-300">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}