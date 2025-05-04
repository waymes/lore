import { IntlShape } from 'react-intl';
import commonMessages from './messages';

import englishMessages from './lang/en.json';
import spanishMessages from './lang/es.json';
import ukrainianMessages from './lang/ua.json';

import birdSound from './assets/audio/main-birds.mp4';
import cricketSound from './assets/audio/main-crickets.mp4';
import fireSound from './assets/audio/main-fire.mp4';
import peopleSound from './assets/audio/main-people.mp4';
import rainSound from './assets/audio/main-rain.mp4';
import sbowlSound from './assets/audio/main-sbowl.mp4';
import thunderSound from './assets/audio/main-thunder.mp4';
import wavesSound from './assets/audio/main-waves.mp4';
import whitenoiseSound from './assets/audio/main-whitenoise.mp4';
import windSound from './assets/audio/main-wind.mp4';

import birdIcon from './assets/icons/bird.png';
import cricketIcon from './assets/icons/cricket.png';
import fireIcon from './assets/icons/fire.png';
import coffeeIcon from './assets/icons/coffee.png';
import rainIcon from './assets/icons/rain.png';
import bowlIcon from './assets/icons/bowl.png';
import thunderIcon from './assets/icons/thunderstorm.png';
import waveIcon from './assets/icons/wave.png';
import tvIcon from './assets/icons/tv.png';
import windIcon from './assets/icons/wind.png';

import englishIcon from './assets/icons/united-kingdom.png';
import spanishIcon from './assets/icons/colombia.png';
import ukraineIcon from './assets/icons/ukraine.png';

type FormatMessage = IntlShape['formatMessage'];

export function getAudioTracks(formatMessage: FormatMessage) {
  return [
    {
      title: formatMessage(commonMessages.rain),
      icon: rainIcon,
      url: rainSound,
    },
    {
      title: formatMessage(commonMessages.thunder),
      icon: thunderIcon,
      url: thunderSound,
    },
    {
      title: formatMessage(commonMessages.waves),
      icon: waveIcon,
      url: wavesSound,
    },
    {
      title: formatMessage(commonMessages.wind),
      icon: windIcon,
      url: windSound,
    },
    {
      title: formatMessage(commonMessages.fire),
      icon: fireIcon,
      url: fireSound,
    },
    {
      title: formatMessage(commonMessages.birds),
      icon: birdIcon,
      url: birdSound,
    },
    {
      title: formatMessage(commonMessages.crickets),
      icon: cricketIcon,
      url: cricketSound,
    },
    {
      title: formatMessage(commonMessages.coffee),
      icon: coffeeIcon,
      url: peopleSound,
    },
    {
      title: formatMessage(commonMessages.bowl),
      icon: bowlIcon,
      url: sbowlSound,
    },
    {
      title: formatMessage(commonMessages.whiteNoise),
      icon: tvIcon,
      url: whitenoiseSound,
    },
  ];
}

export function getRelaxPhrases(formatMessage: FormatMessage) {
  return [
    formatMessage(commonMessages.phrase1),
    formatMessage(commonMessages.phrase2),
    formatMessage(commonMessages.phrase3),
    formatMessage(commonMessages.phrase4),
    formatMessage(commonMessages.phrase5),
    formatMessage(commonMessages.phrase6),
    formatMessage(commonMessages.phrase7),
    formatMessage(commonMessages.phrase8),
    formatMessage(commonMessages.phrase9),
    formatMessage(commonMessages.phrase10),
    formatMessage(commonMessages.phrase11),
    formatMessage(commonMessages.phrase12),
    formatMessage(commonMessages.phrase13),
    formatMessage(commonMessages.phrase14),
    formatMessage(commonMessages.phrase15),
    formatMessage(commonMessages.phrase16),
    formatMessage(commonMessages.phrase17),
  ];
}

export const languages = {
  en: { icon: englishIcon, label: 'English', messages: englishMessages },
  es: { icon: spanishIcon, label: 'Español', messages: spanishMessages },
  ua: { icon: ukraineIcon, label: 'Українська', messages: ukrainianMessages },
};
