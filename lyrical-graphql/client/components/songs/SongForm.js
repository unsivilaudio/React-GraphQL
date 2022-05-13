import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import Input from '../ui/Input';
import Button from '../ui/Button';
import CREATE_SONG from '../../mutations/create-song';

import classes from '../../styles/SongForm.module.scss';

const SongForm = props => {
    const navigate = useNavigate();
    const [addSong, { data, loading, error }] = useMutation(CREATE_SONG);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!loading && data) {
            navigate('/songs', { replace: true });
        }
    }, [data, loading]);

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleSubmitSong() {
        addSong({ variables: { title } });
        setTitle('');
    }

    return (
        <div className={classes.SongForm}>
            <div className={classes.Title}>Add A New Song</div>
            <Input
                label='title'
                name='title'
                onChange={handleChangeTitle}
                value={title}
            />
            <div className={classes.Actions}>
                <Button label='Submit' onClick={handleSubmitSong} />
            </div>
        </div>
    );
};

export default SongForm;
