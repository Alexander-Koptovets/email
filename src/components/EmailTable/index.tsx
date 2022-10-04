// Core
import { FC, useMemo } from 'react'

// Types
import { Email } from '../../../types';

// Component
import Card from '@mui/material/Card'

// Style
import styles from './Style.module.css'

interface EmailTableProps {
    emails: Email[];
}

const EmailTable: FC<EmailTableProps> = ({ emails }) => {
    const data = useMemo(() => [...emails], [emails]);

    return (
        <Card className={styles.table}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Message</td>
                        <td>Recipient</td>
                        <td>Subject</td>
                    </tr>
                </thead>
                <tbody>
                    {data.length && data.map(email => (
                        <tr key={email.id}>
                            <td>{email.message}</td>
                            <td>{email.recipient}</td>
                            <td>{email.subject}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}

export default EmailTable;