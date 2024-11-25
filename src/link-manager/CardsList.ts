import { CardData } from './LinkManagerTypes';

const cardList: { [key: string]: CardData } = {
  main: {
    id: 'main',
    links: [
      { text: 'OPEN CALL', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdzo1lmF7smd4cPE2YneNMzwvvgpDSgeWniHdU9JLU85TNOfA/viewform' },
      { text: 'CONVERSATION - 8 Ball Underground Sessions', url: 'https://www.youtube.com/watch?v=04tTAJXzHwM' },
      { text: 'Artists', url: '#artists' }
    ]
  },
  artists: {
    id: 'artists',
    links: [
      { text: 'Nakama', url: 'https://linktr.ee/nakama.wtf' },
      { text: 'Yoh', url: 'https://www.yoh-holo.com/music' },
      { text: 'Midi Neutron', url: 'https://eryngii.art/midineutron' },
      { text: 'Austin Peete', url: 'https://rnsc.world/pages/austinpeete' }
    ],
    showBack: true
  }
};

export default cardList;