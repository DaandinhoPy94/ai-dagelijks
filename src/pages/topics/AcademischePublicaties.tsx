import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { MobileHeader } from '@/components/MobileHeader';
import { BottomTabBar } from '@/components/BottomTabBar';
import { Footer } from '@/components/Footer';
import { TabletAppShell } from '@/components/TabletAppShell';

export default function AcademischePublicaties() {
  const [viewType, setViewType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const updateViewType = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setViewType('desktop');
      } else if (width >= 768) {
        setViewType('tablet');
      } else {
        setViewType('mobile');
      }
    };

    updateViewType();
    window.addEventListener('resize', updateViewType);
    return () => window.removeEventListener('resize', updateViewType);
  }, []);

  const content = (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Academische AI Publicaties - AI Dagelijks</title>
        <meta name="description" content="Belangrijke academische publicaties en papers over AI van universiteiten en onderzoeksinstellingen." />
      </Helmet>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Academische AI Publicaties</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Blijf op de hoogte van belangrijke academische publicaties en papers 
            van universiteiten, onderzoeksinstellingen en arXiv.
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Er zijn momenteel geen artikelen beschikbaar voor dit onderwerp.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Bekijk alle AI-nieuws op onze <a href="/" className="text-primary hover:underline">homepage</a>.
          </p>
        </div>
      </div>
    </main>
  );

  if (viewType === 'tablet') {
    return <TabletAppShell viewType={viewType}>{content}</TabletAppShell>;
  }

  return (
    <>
      {viewType === 'mobile' ? <MobileHeader /> : <Header />}
      {content}
      {viewType === 'mobile' ? <BottomTabBar /> : <Footer />}
    </>
  );
}