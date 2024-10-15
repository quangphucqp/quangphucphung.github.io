import React from 'react';
import HyperLink from './HyperLink';
import type { Link } from '../../types/Link';
import { routes } from '../../constants/routes';

// Importing the PDF links
import pdfLinks from '../../data/pdfLinks.json';

const Greeting = (): React.ReactElement => {
  const projectsLink: Link = {
    url: `${routes.projects.path}/`,
  };

  const blogLink: Link = {
    url: `${routes.blog.path}/`,
  };

// Creating the links for CV, JMP, and DeepDive
const cvLinkElement = (
  <span className="inline-block">
    <HyperLink link={{ url: pdfLinks.CV.url }} className="underline font-semibold">CV</HyperLink>
  </span>
);

const jmpLinkElement = (
  <span className="inline-block">
    <HyperLink link={{ url: pdfLinks.jobMarketPaper.url }} className="underline font-semibold">job market paper</HyperLink>
  </span>
);

const deepDiveLinkElement = (
  <span className="inline-block">
    <HyperLink link={{ url: pdfLinks.JMP_deepdive.url }} className="underline font-semibold">podcast</HyperLink>
  </span>
);

  return (
    <div className=" text-l max-w-3xl font-light leading-relaxed">
      <p>
      Welcome!<br />
      My name is Quang-Phuc Phung. I am a PhD student in Economics at Tilburg University.
      I expect to graduate in Spring 2025 and will be on the job market in the 2024-2025 academic year.<br /><br/>
      I work on behavioral economics and experimental economics. My recent work focuses on using the tools of
      experimental economics to study human-AI interaction.
      You can find more details by checking out my {cvLinkElement}, exploring my {jmpLinkElement}, or listen to a
      a relaxing and brain-teasing summary of my job market paper, courtesy of NotebookLM, in this {deepDiveLinkElement}.<br/>
      </p>
    </div>
  );
};

export default Greeting;
