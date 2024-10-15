import { Profile } from '../types/Profile';
import { socialLinks } from './socialLinks';

export const profile: Profile = {
  firstName: 'Quang-Phuc',
  lastName: 'Phung',
  position: 'PhD Student in Economics',
  avatar: {
    // srcPath: 'profile/avatar_500x500.jpg',
    srcPath: 'profile/avatar_500x500_v2.jpg',
    caption: 'Oleksii Trekhleb',
  },
  location: {
    name: 'Tilburg, The Netherlands',
  },
  socialLinks,
};
