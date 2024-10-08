import styles from './postheader.module.css'

type Props = {
    title: string;
    date?: string;
}

export default function PostHeader({ title, date = "March,2020" }: Props) {
    return (
        <>
            <h1 className={styles.title} style={{ "color": "#222222", "letterSpacing": "-0.1rem" }}>
                {title}
            </h1>
            <p style={{ "fontSize": "17px", "color": "#888888", "marginBottom": "25px" }}>
                {date}
            </p>

        </>
    )
}
