import styles from "./Headers.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Header() {

    const router = useRouter();

    const [scrollBackground, setScrollBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 10; 
            
            if (scrollPosition > threshold) {
                setScrollBackground(true);
            } else {
                setScrollBackground(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${router.pathname === "/book" || router.pathname === "/check" ? styles.bookHeader : ""} ${router.pathname.includes("/service") ? styles.serviceHeader : ""} ${scrollBackground ? styles.scrolling : ""}`}>
            <div className={styles.header_wrapper}>
                <div className={styles.header_logo}>
                    <Link href="/" className={styles.logo}><FontAwesomeIcon className={styles.logo_icon} icon={faBookOpenReader}/><span>HAVEN LIBRARY</span></Link>
                </div>
                <div className={styles.header_language}>
                    <Link href={"/"} className={`${styles.language_option} ${styles.selected}`}>KOR</Link>
                    <span className={styles.line}></span>
                    <Link href={"/"} className={`${styles.language_option}`}>ENG</Link>
                </div>
            </div>
        </header>
    )
}

export {Header}