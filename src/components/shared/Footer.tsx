import React from 'react';
import { FiGithub } from '@react-icons/all-files/fi/FiGithub';

import HyperLink from './HyperLink';
import { issuesURL } from '../../constants/links';
import { Link } from '../../types/Link';
import Row from './Row';
import SocialLinks from './SocialLinks';
import { profile } from '../../data/profile';

type FooterProps = {
  className?: string,
  withFeedback?: boolean,
};

const Footer = (props: FooterProps): React.ReactElement => {
  const { className = '', withFeedback = false } = props;

  const issuesLink: Link = {
    url: issuesURL,
  };

  const feedbackFooterLink = withFeedback ? (
    <HyperLink
      link={issuesLink}
      className="text-xs mr-5"
      startEnhancer={(<FiGithub size={20} />)}
    >
      Feedback
    </HyperLink>
  ) : null;

  return (
    <footer className={`${className}`}>
      <Row responsive>
        <Row style={{ flex: 1 }} className="mb-6 sm:mb-0">
          {feedbackFooterLink}
        </Row>

        <div
          style={{ flex: 1 }}
          className="flex flex-row items-center justify-center"
        >
          <SocialLinks
            links={profile?.socialLinks}
            expandable={false}
            iconClassName="w-5 h-5"
            itemClassName="mr-2 ml-2"
          />
        </div>

        <div style={{ flex: 1 }} className="hidden sm:flex">
          &nbsp;
        </div>
      </Row>
    </footer>
  );
};

export default Footer;
