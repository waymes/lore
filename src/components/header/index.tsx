import React from 'react';
import { FormattedMessage } from 'react-intl';
import './header.sass';
import { languages } from '../../constants';
import messages from './messages';
import BirthdayHat from '../../assets/icons/party-hat.png';

type Locale = 'en' | 'es' | 'ua';

interface HeaderProps {
  onMeditateClick: () => void;
  onRelaxClick: () => void;
  onLocaleChange: (locale: Locale) => void;
  locale: Locale;
}

function Header({
  onMeditateClick,
  onRelaxClick,
  onLocaleChange,
  locale,
}: HeaderProps) {
  const [showLangPopup, setShowLangPopup] = React.useState(false);
  const dropdownRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangPopup(false);
      }
      return;
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLangChange = (locale: Locale) => {
    onLocaleChange(locale);
    setShowLangPopup(false);
  };

  const langIcon = languages[locale].icon;
  return (
    <header className="header">
      <nav className="header__nav container">
        <a className="header__logo">
          L <img src={BirthdayHat} />
        </a>
        <a className="header__link" href="#" onClick={onRelaxClick}>
          <FormattedMessage {...messages.relax} />
        </a>
        <a className="header__link" href="#" onClick={onMeditateClick}>
          <FormattedMessage {...messages.meditate} />
        </a>
        <div className="header__lang" ref={dropdownRef}>
          <button
            className="header__lang__btn"
            onClick={() => setShowLangPopup(!showLangPopup)}
          >
            <span
              className="header__lang__icon"
              style={{ backgroundImage: `url(${langIcon})` }}
            />
          </button>
          <div
            className={`header__lang__dropdown ${
              showLangPopup ? 'header__lang__dropdown_active' : ''
            }`}
          >
            {Object.entries(languages).map(([key, value]) => (
              <button
                key={key}
                className="header__lang__dropdownBtn"
                onClick={() => handleLangChange(key as Locale)}
              >
                <span className="header__lang__label">{value.label}</span>
                <span
                  className="header__lang__icon"
                  style={{ backgroundImage: `url(${value.icon})` }}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
