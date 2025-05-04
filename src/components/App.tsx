import React from 'react';
import { IntlProvider } from 'react-intl';

import Header from './header';
import MeditateModal from './meditate-modal';
import RelaxModal from './relax-modal';
import Home from './home';
import { languages } from '../constants';

function App() {
  const [showMeditateModal, setShowMeditateModal] = React.useState(false);
  const [showRelaxModal, setShowRelaxModal] = React.useState(false);
  const [locale, setLocale] = React.useState<'en' | 'es' | 'ua'>('en');
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
          onLocaleChange={setLocale}
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
