import React from 'react';
import Header from './header';
import MeditateModal from './meditate-modal';

function App() {
  const [showMeditateModal, setShowMeditateModal] = React.useState(false);
  return (
    <div className="home">
      <Header onMeditateClick={() => setShowMeditateModal(true)} />
      <div className="home__banner">
        <div className="container">
          <h1 className="home__message">
            Overcome negative thoughts, <br /> stress & life's challenges
          </h1>
        </div>
      </div>
      <MeditateModal
        onClose={() => setShowMeditateModal(false)}
        open={showMeditateModal}
      />
    </div>
  );
}

export default App;
