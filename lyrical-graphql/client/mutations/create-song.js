import { gql } from '@apollo/client';

export default gql`
    mutation addSong($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`;
