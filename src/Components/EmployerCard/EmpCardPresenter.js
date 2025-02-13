import React from 'react';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';

import { BaseCard, LogoImage, HeartButton, Badge } from '../commons';
import { NoteIcon } from '../Icons';

const Card = styled(BaseCard)`
  display: flex;
  position: relative;
  with: 100%;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  padding: ${props => (props.size === 'sm' ? '10px' : '15px')};
  padding-bottom: 5px;
`;

const ImageBox = styled(LogoImage)``;

const LogoAndContent = styled.div`
  flex-start: left;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  margin-left: 5px;
`;

const CompanyTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.blueColor};
  padding-bottom: 5px;
  span {
    font-size: 12px;
    color: ${props => props.theme.yellowColor};
  }
`;

const DescriptionTitle = styled.p`
  color: ${props => props.theme.greyColor};
  font-size: 12px;
  padding: 5px 0;
`;

const DescriptionTitleEllipsis = styled(LinesEllipsis)`
  color: ${props => props.theme.greyColor};
  font-size: 12px;
  padding: 5px 0;
`;

const DetailContent = styled.div`
  padding: 5px 0;
`;

const DetailInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
`;

// const DetailText = styled.p`
//   padding: 1px 0;
//   font-size: 12px;
//   font-weight: 500;
//   color: ${props => props.theme.midnightBlueColor};
// `;

const CardActions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const HeartButtonExt = styled(HeartButton)``;

export default ({
  employer,
  isLiked,
  toggleLike,
  onCardClick,
  hiringMajors,
  hiringTypes,
  visaSupport,
  size,
  featured
}) => {
  const positions = hiringTypes.join(', ');
  const majors = hiringMajors.join(', ');

  return (
    <Card size={size} onClick={onCardClick}>
      <LogoAndContent>
        <ImageBox url={employer.company_url} size="sm" />
        <Content>
          <CompanyTitle>
            {employer.name} {featured && <span>Featured</span>}
          </CompanyTitle>
          {size !== 'sm' && (
            <>
              <p>Chicago, IL</p>
              <DescriptionTitle>{employer.industry}</DescriptionTitle>
              <DescriptionTitleEllipsis
                text={employer.description}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </>
          )}
          <DetailContent>
            <DetailInfoContainer>
              <Badge value={positions} type="hiring" />
              <Badge value={majors} type="major" />
              {visaSupport === 'yes' && (
                <Badge value={size === 'sm' ? 'F1' : 'Visa Sponsored'} type="visa" />
              )}
            </DetailInfoContainer>
          </DetailContent>
        </Content>
      </LogoAndContent>
      <CardActions>
        <NoteIcon />
        <HeartButtonExt isLiked={isLiked} onClick={toggleLike} />
      </CardActions>
    </Card>
  );
};
