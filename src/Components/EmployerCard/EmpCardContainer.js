/* eslint react/no-unused-prop-types: "off" */

import React, { useState } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import EmpCardPresenter from './EmpCardPresenter';

const propTypes = exact({
  id: PropTypes.string,
  careerfair_id: PropTypes.string,
  degree_requirements: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  employer: PropTypes.shape({
    company_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  hiring_majors: PropTypes.arrayOf(PropTypes.string).isRequired,
  hiring_types: PropTypes.arrayOf(PropTypes.string).isRequired,
  tables: PropTypes.arrayOf(PropTypes.number),
  visa_support: PropTypes.string.isRequired,
  size: PropTypes.string,
  featured: PropTypes.bool,
  is_liked: PropTypes.bool,
  is_noted: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
  __typename: PropTypes.string
});

const EmpCardContainer = props => {
  const [isLikedS, setIsLiked] = useState(props.is_liked);
  const {
    employer,
    hiring_majors,
    hiring_types,
    visa_support,
    size,
    featured,
    is_noted,
    toggleModal,
    toggleLike,
  } = props;

  /** set isLiked state and call method defined in EmployerListContainer  */
  const onCardLike = () => {
    if (isLikedS) {
      setIsLiked(!isLikedS);
      toggleLike({ id: props.id, liked: false });
    } else {
      setIsLiked(!isLikedS);
      toggleLike({ id: props.id, liked: true });
    }
  };

  /** call toggleModal method defined in EmployerListContainer */
  const onCardClick = event => {
    const {
      target: { nodeName }
    } = event;

    if (nodeName !== 'svg' && nodeName !== 'path') {
      toggleModal({ selected: props });
    }
  };

  return (
    <EmpCardPresenter
      employer={employer}
      isLiked={isLikedS}
      isNoted={is_noted}
      onCardLike={onCardLike}
      onCardClick={onCardClick}
      hiringMajors={hiring_majors}
      hiringTypes={hiring_types}
      visaSupport={visa_support}
      size={size}
      featured={featured}
    />
  );
};

EmpCardContainer.propTypes = propTypes;

export default EmpCardContainer;
