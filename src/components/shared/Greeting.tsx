import React from 'react';
import HyperLink from './HyperLink';

// Importing the PDF links
import pdfLinks from '../../data/pdfLinks.json';

const Greeting = (): React.ReactElement => {
  const cvLinkElement = (
    <span className="inline-block">
      <HyperLink link={{ url: pdfLinks.CV.url }} className="underline font-semibold">
        here
      </HyperLink>
    </span>
  );

  return (
    <div className="text-l max-w-3xl font-light leading-relaxed">
      <p>
        I am a behavioral and experimental economist with a research focus on trust, technology
        adoption, and the future of work. My recent projects investigate how people interact with
        artificial intelligence and how digital technologies reshape incentives, beliefs, and
        productivity.
      </p>
      <p className="mt-4">
        I am currently a Postdoctoral Associate at the MIT Sloan School of Management&apos;s
        Initiative on the Digital Economy.
      </p>
      <p className="mt-4">
        My CV is available {cvLinkElement}.
      </p>
    </div>
  );
};

export default Greeting;
