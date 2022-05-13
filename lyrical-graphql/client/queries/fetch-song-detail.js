import { gql } from '@apollo/client';

export default gql`
    query FetchSongDetail($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;
