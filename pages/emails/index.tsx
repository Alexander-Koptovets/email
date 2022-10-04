// Types
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

// Core
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

// Component
import InfoCard from '../../src/components/InfoCard'
import MainLayout from '../../src/layouts/mainLayiout'
import EmailTable from '../../src/components/EmailTable'
import Message from '../../src/components/Message'

// Style
import styles from './Style.module.css'

interface EmailsProps {
    user: any,
    count: number | string,
    emails: any[],
}

const Emails: NextPage<EmailsProps> = ({ user, count, emails }) => {
    const router = useRouter();

    const [isMessage, setIsMessage] = useState<boolean>(false);

    const onLogOut = () => {
        router.push({ pathname: '/' });
    }

    const onCreateMessage = () => {
        setIsMessage(prev => !prev);
    }

    return (
        <>
        <Head>
            <title>Emails</title>
        </Head>
        <MainLayout onClick={onLogOut}>
            <div className={styles.email}>
                <InfoCard 
                    username={user.username}
                    email={user.email}
                    onClick={onCreateMessage}
                />
                <EmailTable emails={emails} />
            </div>
            {isMessage && (
            <Message 
                id={user.id}
                username={user.username}
                email={user.email}
            />
        )}
        </MainLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const auth = { "Authorization" : `Basic ${query.credentials}` };
    
    const responseData = await fetch('http://164.92.190.53:4005/api/emails/', {
      headers: auth,
    });
    const data = await responseData.json();

    const responseUser = await fetch('http://164.92.190.53:4005/api/users/current/', {
       headers: auth
    });
    const user = await responseUser.json();

    return {
        props: {
            user: user,
            count: data.count,
            emails: data.results,
        }
    }
}

export default Emails;