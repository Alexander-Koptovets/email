// Ttype 
import { FC } from 'react'

// Component
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Style
import styles from './Style.module.css'

interface MainLayoutProps {
    children: React.ReactNode;
    onClick: () => void;
}

const MainLayout: FC<MainLayoutProps> = ({ onClick, children }) => {
    return (
        <div>
            <header className={styles.header}>
                <Typography variant='h5' components='div'>Emails</Typography>
                <Button variant='contained' onClick={onClick}>Log Out</Button>
            </header>
            {children}
        </div>
    )
}

export default MainLayout;