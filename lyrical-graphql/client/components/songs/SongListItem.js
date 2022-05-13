import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import DELETE_SONG from '../../mutations/delete-song';
import Button from '../ui/Button';
import classes from '../../styles/SongListItem.module.scss';

const SongListItem = ({ song, onDelete }) => {
    const [deleteSong, { data, loading, error }] = useMutation(DELETE_SONG);
    const { id, title } = song;

    useEffect(() => {
        if (!error && !loading && data) {
            onDelete();
        }
    }, [data]);

    function handleDeleteSong() {
        deleteSong({ variables: { id } });
    }

    return (
        <li className={classes.SongListItem}>
            <div className={classes.Content}>
                <Link to={`/songs/${id}`}>{title}</Link>
            </div>
            <div className={classes.Actions}>
                <Button
                    type='secondary'
                    label='delete'
                    onClick={handleDeleteSong}
                />
            </div>
        </li>
    );
};

export default SongListItem;
