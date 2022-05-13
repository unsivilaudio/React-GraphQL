import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import TrashIcon from '../../assets/svg/trash-can-solid.svg';
import ThumbIcon from '../../assets/svg/thumbs-up-solid.svg';

import DELETE_LYRIC from '../../mutations/delete-lyric';
import ADD_LYRIC from '../../mutations/add-song-lyric';
import LIKE_LYRIC from '../../mutations/like-song-lyric';
import FETCH_SONG_DETAIL from '../../queries/fetch-song-detail';
import Input from '../ui/Input';
import Button from '../ui/Button';
import classes from '../../styles/SongDetail.module.scss';

const SongDetail = () => {
    const { id } = useParams();
    const [addLyric] = useMutation(ADD_LYRIC);
    const [deleteLyric] = useMutation(DELETE_LYRIC);
    const [likeLyric] = useMutation(LIKE_LYRIC);
    const [newLyric, setNewLyric] = useState('');
    const { data, loading, error, refetch } = useQuery(FETCH_SONG_DETAIL, {
        variables: { id },
    });

    function handleDeleteLyric(id) {
        deleteLyric({ variables: { id } }).then(refetch);
    }

    function handleLikeLyric(id, likes) {
        likeLyric({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1,
                },
            },
        });
    }

    function handleChangeLyric(e) {
        setNewLyric(e.target.value);
    }

    function handleAddLyric() {
        if (newLyric === '') return;
        addLyric({ variables: { id, content: newLyric } }).then(() => {
            refetch();
            setNewLyric('');
        });
    }

    let lyrics = <h2>Loading...</h2>;

    if (data) {
        lyrics = data.song.lyrics.map(lyric => (
            <li key={lyric.id}>
                <div className={classes.Content}>{lyric.content}</div>
                <div className={classes.Actions}>
                    <div className={classes.Likes}>
                        <p>Likes: </p>
                        <span>{lyric.likes || 0}</span>
                    </div>
                    <div
                        className={classes.Like}
                        onClick={() => handleLikeLyric(lyric.id, lyric.likes)}>
                        <ThumbIcon />
                    </div>
                    <div
                        className={classes.Delete}
                        onClick={() => handleDeleteLyric(lyric.id)}>
                        <TrashIcon />
                    </div>
                </div>
            </li>
        ));
    }

    return (
        <div className={classes.SongDetail}>
            <div className={classes.Title}>
                <span>{data?.song?.title || 'Song'}</span>
            </div>
            <div className={classes.LyricsList}>
                <div className={classes.LyricsTitle}>Lyrics</div>
                <ul className={classes.List}>{lyrics}</ul>
            </div>
            <div className={classes.LyricsForm}>
                <div className={classes.FormGroup}>
                    <Input
                        label='add lyric'
                        name='newLyric'
                        value={newLyric}
                        onChange={handleChangeLyric}
                    />
                    <Button
                        theme='primary'
                        label='submit'
                        onClick={handleAddLyric}
                    />
                </div>
            </div>
        </div>
    );
};

export default SongDetail;
