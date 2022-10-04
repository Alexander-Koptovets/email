// Types
import type { NextPage } from 'next'

// Core
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

// Components
import SignIn from '../src/components/SignIn'
import LogIn from '../src/components/LogIn'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Style
import styles from '../styles/Home.module.css'
import { formatMuiErrorMessage } from '@mui/utils'

const Home: NextPage = () => {
  const router = useRouter();

  const [login, setLogin] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    setLoading(true);
    
    const user = {
      username: login,
      email: email,
      password: password,
    }

    const response = await fetch('http://164.92.190.53:4005/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setLogin(null);
      setEmail(null)
      setPassword(null)
      setIsSignUp(false)
      setLoading(false);
    } else {
      const result = await response.json();

      let errors = [];
      for (let key in result) {
        errors.push(result[key]);
      }

      setLoading(false);
      setErrors(errors.join(' '));
    }
  }

  const onLogIn = async () => {
    setErrors(null);
    setLoading(true);

    const credentials = window.btoa(`${login}:${password}`);
    const auth = { "Authorization" : `Basic ${credentials}` };
    const response = await fetch('http://164.92.190.53:4005/api/users/current/', {
      headers: auth
    });

    if (response.ok) {
      setLoading(false);

      await router.push({
        pathname: '/emails',
        query: { credentials }
      });
    } else { 
      const result = await response.json();

      let errors = [];
      for (let key in result) {
        errors.push(result[key]);
      }

      setLoading(false);
      setErrors(errors.join(' '));
    }
  }

  const onSwitch = () => {
    setIsSignUp(prev => !prev);
    setErrors(null);
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Typography variant='h4' components='div'>Loading...</Typography>
      </div>
    )
  }

  return (
    <div className={styles.home}>
      <Head>
        <title>Sign Up | Sign In</title>
      </Head>

      {isSignUp ? (
        <SignIn 
          loginOnChange={setLogin}
          emailOnChange={setEmail} 
          passwordOnChange={setPassword}
          onClick={onSignUp} 
        />
      ) : (
        <LogIn
          loginOnChange={setLogin}
          passwordOnChange={setPassword}
          onClick={onLogIn}
        />
      )}
      {errors && (
        <div className={styles.errors}>{errors}</div>
      )}
      <Button size='small' color='info' onClick={() => onSwitch()}>
        {isSignUp ? 'Log In' : 'Sign Up'}
      </Button>
    </div>
  )
}

export default Home
