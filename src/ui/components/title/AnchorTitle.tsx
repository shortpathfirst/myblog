import Link from "next/link";
import styles from './achortitle.module.css'
type Props = {
    children: string;
};

export function AnchorTitle({ children }: Props) {
    const parseAnchor = (string:string)=>{
        return string.replaceAll(" ","_").toLowerCase();
    }
    const title = parseAnchor(children);
    const anchorName =`#${title}`;
    return (
        <div>
            <h2 id={title} style={{ "fontSize": "42px" ,"position":"relative"}}>
            <Link className={styles.anchor} 
            href={anchorName}>#</Link>
            {children}
            </h2>
        </div>
    );
}
