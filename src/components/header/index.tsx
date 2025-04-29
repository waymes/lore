import './header.sass';

function Header() {
  return (
    <header className="header">
      <nav className="header__nav container">
        <a className="header__logo">L</a>
        <a className="header__link">Calm down</a>
        <a className="header__link">Meditate</a>
      </nav>
    </header>
  );
}

export default Header;
