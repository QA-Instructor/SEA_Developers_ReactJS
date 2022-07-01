import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const DateCreated = ({ updateDateCreated, dateCreated }) => {
  const [date, setDate] = useState(dateCreated);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    updateDateCreated(date);
  }, [updateDateCreated, date]);

  return (
    <span data-testid="dateCreated">
      &nbsp;{`${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`}
    </span>
  );
};

DateCreated.defaultProps = {
  updateDateCreated: () => null,
  dateCreated: new Date()
}

DateCreated.propTypes = {
  updateDateCreated: PropTypes.func.isRequired,
  dateCreated: PropTypes.instanceOf(Date)
}

export default DateCreated;
