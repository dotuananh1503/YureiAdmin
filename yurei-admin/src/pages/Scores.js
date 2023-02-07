import { Box, Typography } from '@mui/material';
import {ref, onValue} from 'firebase/database'
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import HeaderGame from '../components/HeaderGame';
import { db } from '../utils/firebase';

const Scores = () => {
    const [topScores, setTopScores] = useState()

    useEffect(() => {
        const DbRef = ref(db, "Scores")

        onValue(DbRef, (snapshot) => {
            let records = []
            snapshot.forEach(child => {
                let id = child.key
                let value = child.val()
                records.push({id, value})
            })
            setTopScores(records)
        })
    }, [])

    return (
        <Box>
            <HeaderGame />
            <Typography>TOP SCORES: </Typography>
            {topScores ? topScores.map(score => <Typography key={score.id} component="p">{score.value.playerName} - {score.value.playerScores}</Typography>) : <Typography>No records!!!!</Typography>}
            <Footer />
        </Box>
    )
}

export default Scores;