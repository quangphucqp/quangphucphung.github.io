import { Profile } from '../types/Profile';
import { socialLinks } from './socialLinks';

export const profile: Profile = {
  firstName: 'Quang-Phuc',
  lastName: 'Phung',
  position: 'PhD in Economics',
  avatar: {
    // srcPath: 'profile/avatar_500x500.jpg',
    srcPath: 'profile/avatar_500x500_v2.jpg',
    caption: 'Quang-Phuc Phung',
  },
  location: {
    name: 'Tilburg University',
  },
  socialLinks,
};
