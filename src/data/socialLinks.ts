// @flow
import { socialLinkTypes } from '../types/SocialLink';
import type { SocialLink } from '../types/SocialLink';


export const socialLinks: SocialLink[] = [
  {
    type: socialLinkTypes.linkedIn,
    url: 'https://www.linkedin.com/in/quang-phuc-phung-17300338/',
    secondary: false,
    caption: 'Quang-Phuc Phung on LinkedIn',
  },
  {
    type: socialLinkTypes.gitHub,
    url: 'https://github.com/quangphucqp',
    secondary: false,
    caption: 'Quang-Phuc Phung on GitHub',
  },
  {
    type: socialLinkTypes.twitter,
    url: 'https://x.com/quangphucphung',
    secondary: false,
    caption: 'Quang-Phuc Phung on X',
  },
  {
    type: socialLinkTypes.email,
    url: 'mailto:q.p.phung@tilburguniversity.edu',
    secondary: false,
    caption: 'Work email',
  }
];
