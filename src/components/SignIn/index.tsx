import { FC } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import styles from './Style.module.css'

interface SignInProps {
  loginOnChange: (value: string) => void;
  emailOnChange: (value: string) => void;
  passwordOnChange: (value: string) => void;
  onClick: () => void;
}

const SignIn: FC<SignInProps> = ({ loginOnChange, emailOnChange, passwordOnChange, onClick }) => {
    return (
        <Card className={styles.container}>
          <Typography gutterBottom variant="h3" component="div">
            Sign up
          </Typography>
          <CardContent className={styles.fields}>
            <TextField 
              id="login" 
              label="Login" 
              variant="outlined" 
              required 
              onChange={(e) => loginOnChange(e.target.value)} />
            <TextField 
              id="email" 
              label="Email" 
              variant="outlined" 
              type="email" 
              required
              onChange={(e) => emailOnChange(e.target.value)} />
            <TextField 
              id="password" 
              label="Password" 
              variant="outlined" 
              type="password" 
              required
              onChange={(e) => passwordOnChange(e.target.value)} />
          </CardContent>
          <CardActions>
            <Button size="large" onClick={() => onClick()}>Sign Up</Button>
          </CardActions>
        </Card>
    )
}

export default SignIn;