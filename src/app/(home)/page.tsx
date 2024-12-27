import styles from "@/ui/styles/homepage.module.css";
import { ReactNode } from "react";
import { content } from "./skillList";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {
          content.map((c, i) => (
            <Strip key={i}>
              <StripImage title={c.title} imageURL={c.imageURL}>{c.description}</StripImage>
              <StripDescription skills={c.skills} projects={c.projects}></StripDescription>
            </Strip>
          ))

        }
      </main>
    </div>
  );
}

const Strip = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.strip}>
      {children}
    </div>
  )
}

const StripImage = ({ children, title, imageURL }: { children: ReactNode, title: string, imageURL: string }) => {
  return (
    <div className={styles.image}>
      <div>
        <img src={imageURL} height={'250px'} alt="" />
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}
const StripDescription = ({ skills, projects }: { skills: string[], projects?: { name: string, image: string }[] }) => {
  return (
    <div className={styles.description}>
      <div>
        <h1>Skills</h1>
        <ul>
          {skills.map((skill: string, i: number) => (
            <li key={i}>{skill}</li>
          ))}

          {projects && projects[0]?.name && <>
            <li>Projects:</li>
            <ul>
              {projects.map((p: {
                name: string;
                image: string;
              }, i: number) => (
                <li key={i}>{p.name}</li>
              ))}
            </ul>
          </>}
        </ul>
        {projects && projects[0]?.image &&
          <div className={styles.imageList}>
            {projects.map((p: {
              name: string;
              image: string;
            }, i: number) => (
              <img key={i} src={p.image} width={180} height={180} />
            ))}
          </div>}
      </div>
    </div>
  )
}

