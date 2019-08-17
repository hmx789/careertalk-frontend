import { gql } from 'apollo-boost';

export const FAVORITE_EMPLOYERS = gql`
  query getFavoriteEmployers {
    getFavoriteList {
      careerfair {
        id
        name
        date
        start_time
        end_time
      }
      liked_employers {
        careerfair_id
        degree_requirements
        hiring_majors
        hiring_types
        visa_support
        tables
        is_liked
        is_noted
        employer {
          id
          company_url
          name
        }
      }
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($fairId: String, $employerId: String) {
    likeEmployer(fairId: $fairId, employerId: $employerId) {
      message
      status
    }
  }
`;
