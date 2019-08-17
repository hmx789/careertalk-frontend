import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import { FAVORITE_EMPLOYERS, TOGGLE_LIKE } from './FavoritesListQueries';
import FavoritesListPresenter from './FavoritesListPresenter';
import withRouteComponent from '../withRouteComponent';

const Favorites = () => {
  /** show modal state */
  const [modalS, showModal] = useState(false);
  /** selected company state */
  const [selectedCompany, setCompanySelection] = useState(null);
  /** selected fair state */
  const [selectedFair, setFairSelection] = useState(null);
  /** employer list state to be shown in the grid */
  const [employerListState, setEmployerList] = useState(null);
  /** graphql queries */
  const { data: { getFavoriteList: favoriteEmployers }, loading, error } = useQuery(
    FAVORITE_EMPLOYERS,
    {
      context: { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    }
  );
  /** update the employerList state after downloading */
  useEffect(() => {
    if (!loading && favoriteEmployers) {
      setEmployerList(favoriteEmployers);
    }
  }, [loading]);
  /**
   * Method for showing popup modal
   * @param {Object} selected - selected employer object
   */
  const toggleModal = ({ selected }) => {
    if (modalS) {
      showModal(false);
    } else {
      showModal(true);
    }
    /** set clicked company info to state */
    setCompanySelection(selected);
    if (selected) setFairSelection(selected.careerfair);
  };
  const toggleLikeMutation = useMutation(TOGGLE_LIKE);


  const toggleLike = async (props) => {
    const { fairId, employerId, name } = props;
    try {
      const {
        data: {
          likeEmployer: { message, status }
        },
      } = await toggleLikeMutation({ variables: { fairId, employerId } });
      if (status) {
        toast.success(`${message} ${name}`);
        return true;
      }
    } catch (error) {
      toast.error(`Failed to like an employer ${name}. Please try again.`);
      console.error(error.message);
      return false;
    }
    return false;
  };

  return (
    <FavoritesListPresenter
      loading={loading}
      showModal={modalS}
      toggleModal={toggleModal}
      toggleLike={toggleLike}
      employerList={employerListState}
      selectedCompany={selectedCompany}
      selectedFair={selectedFair}
      error={error}
    />
  );
};

export default withRouteComponent(Favorites);
