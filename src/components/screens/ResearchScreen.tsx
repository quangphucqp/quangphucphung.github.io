import React from 'react';
import pdfLinks from '../../data/pdfLinks.json';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../shared/PageHeader';
import SEO from '../shared/SEO';

type PdfLinks = {
  jobMarketPaper: {
    url: string,
  },
};

const ResearchScreen = (): React.ReactElement => {
  const links = pdfLinks as PdfLinks;

  return (
    <PageLayout>
      <SEO title="Research" description="List of my research papers" />

      {/* Working Papers Section */}
      <PageHeader>Working Papers</PageHeader>

      {/* Chatbot Paper */}
      <section className="mt-6">
        <h2 className="text-xl font-bold">
          Asking a Chatbot: The Effect of Conversational versus Static AI
          Interfaces on Belief Updating
        </h2>
        <p className="mt-2">
          <strong>Abstract:</strong> This study investigates the effect of a
          conversational versus static interface for generative AI on belief updating.
          In a controlled laboratory experiment, participants reported incentivized
          beliefs about the correct answers to a series of multiple-choice reasoning
          questions both before and after receiving recommendations from the same AI
          model. For each question, in the conversational treatment, participants
          submitted a single query to a chatbot, which generated a recommendation
          consisting of an answer option and a brief justification in real time. In
          the static treatment, participants received a pre-generated recommendation
          presented in a fixed format. The informational content of AI-generated
          recommendations was distributionally matched across treatments. Belief
          updating was measured as the change in the belief that participants assigned
          to the AI-recommended option. On average, participants using the
          conversational interface increased their belief in the AI-recommended option
          by 31.75 percentage points, compared to 26.31 percentage points in the
          static treatment (p = 0.068). Exploratory analysis reveals that this average
          effect conceals a systematic heterogeneity: the effect is most pronounced
          when initial beliefs in the AI-recommended option conflict with the
          recommendation; it diminishes to near zero when initial beliefs and
          recommendations are aligned.
        </p>
        <p className="mt-4 italic">
          <a
            href={links.jobMarketPaper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Working Paper (SSRN)
          </a>
        </p>
      </section>

      {/* Monitoring as a Service */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Monitoring as a Service</h2>
        <p className="mt-2">
          <strong>Abstract:</strong> This study explores whether a monitoring service can
          help mitigate procrastination and improve commitment. In a real-effort
          experiment, participants needed to complete 80 tasks across three sessions
          over three weeks. In the first week, after making a non-binding plan for how
          many tasks to complete during the final two weeks, they were randomly
          assigned to either a <em>Control</em> or a <em>Monitored</em> group. In the
          Monitored group, participants were connected with a <em>Monitor</em> via
          WhatsApp, who would observe their progress and send out reminders if they
          delayed their work. Monitoring improved adherence to the initial plan by
          12.75 percentage points (p &lt; 0.05) and completing all the required tasks by
          19.47 percentage points (p &lt; 0.001), mainly by reducing dropout rate. The
          findings suggest that combining external oversight with performance-related
          reminders can be an effective method to combat procrastination.
        </p>
        <p className="mt-4 italic">Manuscript being updated</p>
      </section>

      <br />
      <br />

      {/* Work in Progress Section */}
      <PageHeader>Work in Progress</PageHeader>

      {/* Emotional Discrimination */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Emotional Discrimination</h2>
        <p className="italic">(with Sigrid Suetens and Boris van Leeuwen)</p>
      </section>
    </PageLayout>
  );
};

export default ResearchScreen;
