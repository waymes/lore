import React from 'react';
import { IntlProvider } from 'react-intl';

import Header from './header';
import MeditateModal from './meditate-modal';
import RelaxModal from './relax-modal';
import Home from './home';
import { languages } from '../constants';

type Locale = 'en' | 'es' | 'ua';

function App() {
  const [showMeditateModal, setShowMeditateModal] = React.useState(false);
  const [showRelaxModal, setShowRelaxModal] = React.useState(false);
  const [locale, setLocale] = React.useState<Locale>('en');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const storedLocale = localStorage.getItem('lang') as Locale;
    if (storedLocale && !!languages[storedLocale]) {
      setLocale(storedLocale);
    }
    setLoading(false);
  }, []);

  const handleSetLocal = (locale: Locale) => {
    setLocale(locale);
    localStorage.setItem('lang', locale);
  };
  if (loading) {
    return null;
  }
  return (
    <IntlProvider
      messages={languages[locale].messages}
      locale={locale}
      defaultLocale="en"
    >
      <div className="home">
        <Header
          onMeditateClick={() => setShowMeditateModal(true)}
          onRelaxClick={() => setShowRelaxModal(true)}
          onLocaleChange={handleSetLocal}
          locale={locale}
        />
        <Home />
        <MeditateModal
          onClose={() => setShowMeditateModal(false)}
          open={showMeditateModal}
        />
        <RelaxModal
          open={showRelaxModal}
          onClose={() => setShowRelaxModal(false)}
        />
      </div>
    </IntlProvider>
  );
}

export default App;
