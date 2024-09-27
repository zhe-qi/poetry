import MainAside from "./_components/aside";
import MainHeader from "./_components/header"
import { AppStoreProvider } from "@/providers/app-store-provider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppStoreProvider>
        <div className="flex flex-1 pt-16">
          <MainAside />
          <main className="flex-1 pl-16 xl:pl-64">
            {children}
          </main>
        </div>
      </AppStoreProvider>
      <MainHeader />
    </div>
  );
}
