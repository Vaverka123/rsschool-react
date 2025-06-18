import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      results {
        id
        name
        status
        species
        image
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;

export const CRASH_4XX = gql`
  query {
    characters {
      results {
        id
        nonExistingField
      }
    }
  }
`;
