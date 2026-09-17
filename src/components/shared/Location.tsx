import React from 'react';

import type { Location as LocationType } from '../../types/Location';

type LocationProps = {
  location: LocationType,
};

const Location = (props: LocationProps): React.ReactElement => {
  const { location } = props;

  return (
    <div className="flex flex-row items-center font-light">
      <div>{location.name}</div>
    </div>
  );
};

export default Location;
