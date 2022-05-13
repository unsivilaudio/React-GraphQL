import { gql } from '@apollo/client';

export default gql`
    mutation AddSongLyric($id: ID!, $content: String!) {
        addLyricToSong(songId: $id, content: $content) {
            id
            lyrics {
                id
                content
            }
        }
    }
`;
