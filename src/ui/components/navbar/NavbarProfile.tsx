import Link from "next/link";
import Image from 'next/image';
import ModalGeneric from "../modal/ModalGeneric";
import ButtonDownload from "../ButtonDownload/ButtonDownload";
import styles from './navbar.module.css'
import React from "react";
import config from "@/../next.config.mjs";

export default function NavbarProfile() {

    return (
        <div className={styles.nameImg}>

            <ModalGeneric img={
                <Image
                    src={`${config.basePath}/assets/profile.jpg`}
                    alt="Logo"
                    width={40}
                    height={40}
                    className={styles.profileImg}
                    priority={true}
                />
            }>
                <div className={styles.modalDescription}>
                    <div>
                        <Image
                            src={`${config.basePath}/assets/profile.jpg`}
                            alt="Logo"
                            width={200}
                            height={200}
                            priority={true}
                        />
                        <h1>Andrea Blog</h1>
                        <h2>Software Engineer</h2>
                        <p>I&apos;m a passionate technology enthusiast with an engeneering background.</p>
                        <ButtonDownload></ButtonDownload>
                    </div>
                </div>
            </ModalGeneric>

            <Link href={'/'}>
                <h1 className={styles.profileName}>Andrea Blog</h1>
            </Link>
        </div>
    );
}
