import { gql } from 'apollo-boost';

export const EMPLOYERS = gql`
  query getEmployers($fairId: String, $isUser: Boolean) {
    getEmployerList(fairId: $fairId, isUser: $isUser) {
      companies {
        id
        degree_requirements
        hiring_majors
        hiring_types
        tables
        visa_support
        careerfair_id
        is_liked
        is_noted
        employer {
          id
          name
          company_url
        }
      }
      fair {
        name
        date
        start_time
        end_time
      }
    }
  }
`;
