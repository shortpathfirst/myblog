
import PageContainer from '@/ui/components/page-container/PageContainer';
import Title from '@/ui/components/title/Title';
import styles from './about.module.css'
export default function About() {
  return (
    <PageContainer>
      <div className={styles.content}>
        <Title> About me </Title>
        <div className={styles.aboutme}>
          <p>
            Elit quis ullamco occaecat laboris nisi in. Incididunt labore pariatur dolor sint Lorem mollit. Nulla irure aliqua elit nisi enim aliquip. Labore duis nostrud proident culpa sit ipsum est ea. Amet incididunt Lorem ex enim qui mollit nulla officia magna. Veniam ea eiusmod laborum mollit et deserunt ipsum in ut tempor exercitation voluptate id.
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
    </PageContainer>
  );
}
