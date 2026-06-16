import ReduxProvider from '@/components/providers/ReduxProvider';
import BlueprintProvider from '@/components/providers/BlueprintProvider';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EditModeToggle from '@/components/shared/EditModeToggle';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <ReduxProvider>
      <BlueprintProvider context="public">
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <EditModeToggle />
      </BlueprintProvider>
    </ReduxProvider>
  );
}
