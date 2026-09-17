// AI-assisted modification by Luftballon, 2026-09-17.
import React from 'react';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../shared/PageHeader';
import SEO from '../shared/SEO';

const TeachingScreen = (): React.ReactElement => {
  return (
    <PageLayout>
      <SEO title="Teaching" description="Teaching and thesis supervision" />
      <PageHeader>Teaching</PageHeader>

      <div className="mt-6">
        <section>
          <h3 className="text-lg font-semibold">Teaching Assistant, Tilburg University</h3>
          <p className="mt-4 text-md">
            <strong>Economics 2 for International Business Administration</strong>{' '}
            <span className="italic whitespace-nowrap">(Spring 2020–2023)</span>. Lecturers:{' '}
            <span className="whitespace-nowrap">Louis B.D. Raes and Malik Çürük.</span>
          </p>
          <p className="mt-4 text-md">
            <strong>Methods: Experiments and Surveys</strong>{' '}
            <span className="italic whitespace-nowrap">(Fall 2019–2023)</span>. Lecturer: Stefan Trautmann.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Thesis Supervision, Tilburg University</h3>
          <p className="mt-4 text-md">
            Supervised more than 30 undergraduate theses in economics and management{' '}
            <span className="italic whitespace-nowrap">(2020–2024)</span>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default TeachingScreen;
