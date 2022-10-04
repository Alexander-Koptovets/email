// Types
import { FC } from 'react'

// Component 
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Style
import styles from './Style.module.css'

interface InfoCardProps {
    username: string;
    email: string;
    onClick: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ username, email, onClick }) => {
    return (
        <Card className={styles.info}>
            <Typography>{username}</Typography>
            <Typography>{email}</Typography>
            <Button variant='outlined' onClick={onClick}>Create message</Button>
        </Card>
    )
}

export default InfoCard;