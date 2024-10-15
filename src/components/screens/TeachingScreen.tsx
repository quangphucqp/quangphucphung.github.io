import React from 'react';
import PageLayout from '../layouts/PageLayout';
import PageHeader from '../shared/PageHeader';
import SEO from '../shared/SEO';

const TeachingScreen = (): React.ReactElement => {
  return (
    <PageLayout>
      <SEO title="Teaching" description="Teaching materials and courses" />
      <PageHeader>Teaching</PageHeader>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Teaching assistant @Tilburg University:</h3>

        {/* Teaching section */}
        <div className="mt-4">
          <p className="text-md">
            Economics 2 for IBA <span className="italic">(Spring 2020/2021/2022)</span> Lecturers: Louis B.D. Raes, Malik Çürükk
          </p>
          <p className="text-md">
            Method: Experiments and Surveys <span className="italic">(Fall 2023)</span> Lecturer: Stefan Trautmann
          </p>
        </div>

        {/* Supervision section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Supervision @Tilburg University</h3>
          <p className="text-md">
            Bachelor Thesis Supervision <span className="italic">(2020 - 2024)</span> Supervised over 30 undergraduate theses in the field of economics and management.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default TeachingScreen;
