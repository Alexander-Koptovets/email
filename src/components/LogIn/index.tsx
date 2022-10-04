// Types
import { FC } from 'react'

// Component
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// Style
import styles from './Style.module.css'

interface LogInProps {
  loginOnChange: (value: string) => void;
  passwordOnChange: (value: string) => void;
  onClick: () => void;
}

const LogIn: FC<LogInProps> = ({ loginOnChange, passwordOnChange, onClick }) => {
    return (
        <Card className={styles.container}>
          <Typography gutterBottom variant="h3" component="div">
            Log In
          </Typography>
          <CardContent className={styles.fields}>
            <TextField 
              id="login" 
              label="Login" 
              variant="outlined" 
              required 
              onChange={(e) => loginOnChange(e.target.value)} />
            <TextField 
              id="password" 
              label="Password" 
              variant="outlined" 
              type="password" 
              required
              onChange={(e) => passwordOnChange(e.target.value)} />
          </CardContent>
          <CardActions>
            <Button size="large" onClick={() => onClick()}>Log In</Button>
          </CardActions>
        </Card>
    )
}

export default LogIn;