// Types
import { FC, useMemo } from 'react'

// Component
import Card from '@mui/material/Card'

// Style
import styles from './Style.module.css'

interface EmailTableProps {
    emails: any[];
}

const EmailTable: FC<EmailTableProps> = ({ emails }) => {
    const data = useMemo(() => [...emails], [emails]);

    return (
        <Card className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <td>Emails</td>
                    </tr>
                </thead>
                <tbody>
                    {data.length && data.map(email => (
                        <tr>
                            <td>{email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}

export default EmailTable;