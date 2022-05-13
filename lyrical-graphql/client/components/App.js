import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './navigation';
import SongForm from './songs/SongForm';
import SongList from './songs/SongList';
import classes from '../styles/App.module.scss';
import SongDetail from './songs/SongDetail';

const App = props => {
    return (
        <BrowserRouter>
            <Navigation />
            <div className={classes.App}>
                <Routes>
                    <Route path='/songs'>
                        <Route exact path='create' element={<SongForm />} />
                        <Route path=':id' element={<SongDetail />} />
                        <Route path='' element={<SongList />} />
                    </Route>
                    <Route path='/' element={<Navigate to='/songs' />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
