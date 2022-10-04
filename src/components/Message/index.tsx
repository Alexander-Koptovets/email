// Core
import { FC } from 'react'

// Core
import { useState } from 'react'

// Component
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Utils 
import { Editor, EditorState } from 'draft-js'

// Style
import styles from './Style.module.css'

interface MessageProps {
    id: number | string;
    username: string;
    email: string;
    auth: any,
    onClick: () => void;
}

const Message: FC<MessageProps> = ({ id, username, email, auth, onClick }) => {
    const [to, setTo] = useState<string | null>(null);
    const [theme, setTheme] = useState<string | null>(null);
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [text, setText] = useState<string | null>(null);

    const onSend = async () => {
        if (to && theme && text) {
            const message = {
                sender: id,
                recipient: email,
                subject: to,
                message: text,
                // message: editorState.getCurrentContent(), // don`t work
            };

            const response = await fetch('http://164.92.190.53:4005/api/emails/', {
                method: 'POST',
                headers: {
                    "Authorization" : `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (response.ok) {
                setTo(null);
                setTheme(null);
                // setEditorState(() => EditorState.createEmpty());
                setText(null);
                onClick();
            }
        }
    }

    return (
        <Card className={styles.message}>
            <Typography variant='h5' components='div'>
                Creating message
            </Typography>
            <TextField
                id="from" 
                label="From" 
                variant="outlined"
                value={`${username} | ${email}`}
                disabled
            />
            <TextField
                id="to" 
                label="To" 
                variant="outlined"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <TextField
                id="theme" 
                label="Theme" 
                variant="outlined"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            />
            {/* <div className={styles.text}>
                <Editor editorState={editorState} onChange={setEditorState} />
            </div> */}
            <TextField
                id="text" 
                label="Text" 
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button variant='contained' className={styles.send} onClick={() => onSend()}>
                Send
            </Button>
        </Card>
    )
}

export default Message;