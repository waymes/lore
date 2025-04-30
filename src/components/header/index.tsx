import './header.sass';

interface HeaderProps {
  onMeditateClick: () => void;
}

function Header({ onMeditateClick }: HeaderProps) {
  return (
    <header className="header">
      <nav className="header__nav container">
        <a className="header__logo">L</a>
        <a className="header__link">Calm down</a>
        <a className="header__link" onClick={onMeditateClick}>
          Meditate
        </a>
      </nav>
    </header>
  );
}

export default Header;
