import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import FETCH_SONGS from '../../queries/fetch-songs';

import classes from '../../styles/SongList.module.scss';
import SongListItem from './SongListItem';

const SongList = props => {
    const { loading, error, data, refetch } = useQuery(FETCH_SONGS);

    useEffect(() => {
        refetch();
    }, []);

    if (loading) return <h3>Loading...</h3>;
    if (error)
        return (
            <h3 style={{ color: 'red' }}>
                There was a problem fecthing the data.
            </h3>
        );

    return (
        <div className={classes.SongList}>
            <div className={classes.Title}>Song's List</div>
            <ul className={classes.List}>
                {data.songs.map(song => (
                    <SongListItem
                        key={song.id}
                        song={song}
                        onDelete={refetch}
                    />
                ))}
            </ul>
        </div>
    );
};

export default SongList;
