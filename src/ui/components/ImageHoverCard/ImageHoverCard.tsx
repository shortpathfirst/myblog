
import Image from 'next/image';
import styles from '@/ui/styles/imagehovercard.module.css'
import Link from 'next/link';

type Props = {
    src: string,
    link?:string,
    width: number,
    height: number,
    children:React.ReactNode
}
export default function ImageHoverCard({ src, width, height, link='/' ,children}: Props) {
    return (
        <Link href={link} className={styles.link}>
            <div style={{"width":width,"height":height}}>
                <div style={{"width":width,"height":height}} className={styles.hoverState}>
                    {children}
                </div>
                <Image src={src} alt='' className={styles.image} width={width} height={height} />
            </div>
        </Link>

    )
}

