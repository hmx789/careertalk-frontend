import React from 'react';
import styled from 'styled-components';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import withRouteComponent from '../withRouteComponent';
import { Container, LoadingLogo } from '../../Components/commons';
import EmployerCard from '../../Components/EmployerCard';
import EmployerModal from '../../Components/EmployerModal';
import { ErrorBox } from '../ErrorFallback';

const FavoritesListPresenter = ({
  loading,
  selectedCompany,
  selectedFair,
  showModal,
  toggleModal,
  toggleLike,
  employerList,
  applyFilter,
  error
}) => {
  return (
    <Container>
      {error && <ErrorBox message={error.message} />}
      {loading && (
        <LoadingWrapper>
          <LoadingLogo />
        </LoadingWrapper>
      )}
      {!loading && !error && employerList
        && employerList.map((employer, index) => (
          <FavoritesListContent
            key={index}
            fair={employer.careerfair}
            toggleModal={toggleModal}
            toggleLike={toggleLike}
            applyFilter={applyFilter}
            employers={employer.liked_employers}
          />
        ))}
      {showModal && (
        <EmployerModal
          selectedCompany={selectedCompany}
          selectedFair={selectedFair}
          modal={showModal}
          toggleModal={toggleModal}
        />
      )}
    </Container>
  );
};

const FavoritesListContent = ({ fair, employers, toggleModal, toggleLike }) => {
  return (
    <>
      <PageTitle>
        Favorites
      </PageTitle>
      <Accordion allowMultipleExpanded allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton><FairTitle>{fair.name}</FairTitle></AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FavoritesListGrid>
              {employers.map((employer, index) => (
                <EmployerCard
                  key={index}
                  toggleModal={toggleModal}
                  toggleLike={toggleLike}
                  careerfair={fair}
                  {...employer}
                />
              ))}
            </FavoritesListGrid>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

const LoadingWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const FairTitle = styled.h1`
  display:inline;
  font-size: 22px;
  font-weight: 600;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 10px;
  margin: 10px;
`;
const FavoritesListGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export default withRouteComponent(FavoritesListPresenter);
