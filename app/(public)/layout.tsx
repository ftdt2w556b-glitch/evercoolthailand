import TopBar from "@/components/public/TopBar";
import BottomNav from "@/components/public/BottomNav";
import InstallPrompt from "@/components/public/InstallPrompt";
import Footer from "@/components/public/Footer";
import CookieConsent from "@/components/public/CookieConsent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <TopBar />
      <div className="mx-auto w-full max-w-[480px] flex-1 pb-nav">
        {children}
      </div>
      <div className="mx-auto w-full max-w-[480px]">
        <Footer />
      </div>
      <BottomNav />
      <InstallPrompt />
      <CookieConsent />
    </div>
  );
}
