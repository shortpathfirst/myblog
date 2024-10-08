import Divider from "../divider/Divider";
import styles from './postheader.module.css'
type Props = {
    children:  React.ReactNode;
}

export default function PostBody({ children }: Props) {
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "gap": "2.5rem", "fontSize": "18px", "color": "#222222", "lineHeight": "1.7" }}>
            {children}
        </div>
    )
}
