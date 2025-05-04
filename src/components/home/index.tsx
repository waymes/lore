import { useIntl } from 'react-intl';
import './home.sass';
import messages from './messages';

function Home() {
  const intl = useIntl();
  return (
    <div className="home__banner">
      <div className="container">
        <h1
          className="home__message"
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(messages.title),
          }}
        ></h1>
      </div>
    </div>
  );
}

export default Home;
