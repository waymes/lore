import './header.sass';

interface HeaderProps {
  onMeditateClick: () => void;
  onRelaxClick: () => void;
}

function Header({ onMeditateClick, onRelaxClick }: HeaderProps) {
  return (
    <header className="header">
      <nav className="header__nav container">
        <a className="header__logo">L</a>
        <a className="header__link" onClick={onRelaxClick}>
          Relax
        </a>
        <a className="header__link" onClick={onMeditateClick}>
          Meditate
        </a>
      </nav>
    </header>
  );
}

export default Header;
