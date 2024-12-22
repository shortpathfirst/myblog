
import PageContainer from '@/ui/components/page-container/PageContainer';
import Title from '@/ui/components/title/Title';
import styles from './about.module.css'
export default function About() {
  return (
    <div className={styles.content}>
      <Title> About me </Title>
      <div className={styles.aboutme}>
        <p>
          I'm a passionate technology enthusiast with an engineering mindset and an insatiable curiosity for learning. My journey into the world of tech started at a young age, driven by a fascination with how things work and a desire to build and create.
        </p>

        <p>
          Nisi duis amet aute non ut dolore. Deserunt dolore deserunt adipisicing do dolore fugiat nisi id officia non. Pariatur nulla do nulla aliqua commodo laborum sint. Sint eiusmod commodo laboris irure enim ullamco adipisicing occaecat eiusmod nisi consequat ex aute duis.
        </p>
        <p>
          Sit fugiat sit officia id officia Lorem. Ea consequat amet deserunt ipsum velit fugiat sunt irure ad voluptate non. Irure anim enim fugiat officia mollit deserunt ea qui. Incididunt pariatur enim aliqua aute fugiat. Aute non non ipsum enim. Do occaecat ea enim cupidatat esse consectetur. Ad Lorem esse ipsum est magna cillum amet id veniam dolore et.
        </p>

        <p>Proident ad cillum duis occaecat mollit reprehenderit anim ut est sunt consectetur. Ea enim elit labore eu. Lorem fugiat do sit aliqua qui in enim non fugiat ex laborum amet fugiat proident. Ullamco eu consectetur cillum nisi laboris et quis nostrud. Anim incididunt elit non proident exercitation incididunt commodo elit et. Enim amet exercitation nisi irure anim irure esse voluptate deserunt excepteur commodo adipisicing adipisicing exercitation.</p>
      </div>
    </div>
  );
}
