import AuthBox from '@/components/AuthBox/AuthBox';
import CheckBox from '@/components/CheckBox/CheckBox';
import styles from '@/styles/check.module.css';
import { identify } from '@/utils/identify';
import { faAngleLeft, faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Check() {

    const router = useRouter()

    const [studentData, setStudentData] = useState([]); // 학생 데이터
    const [process, setProcess] = useState(false)

    const [redirect, setRedirect] = useState(false);

    const nextSlide = () => {
        setProcess(true)
    }

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setRedirect(true);
        }, 60000); // 1분 = 60초 = 60000밀리초
    
        function resetTimeout() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            setRedirect(true);
            }, 60000);
        }
    
        document.addEventListener("mousemove", resetTimeout);
        document.addEventListener("keydown", resetTimeout);
    
        return () => {
            document.removeEventListener("mousemove", resetTimeout);
            document.removeEventListener("keydown", resetTimeout);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>  
            {redirect && (window.location.replace("/"))}
            <div className={styles.container}>
                {!process ? <div className={styles.wrapper}>
                    <div className={styles.navbar}>
                        <button onClick={() => router.replace("/")} className={styles.prev_btn}><FontAwesomeIcon className={styles.prev_btn_icon} icon={faArrowLeft}/> 돌아가기</button>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.box_list}>
                            <div className={styles.slideBox}><AuthBox nextSlide={nextSlide} setStudentData={setStudentData} /></div>
                        </div>
                    </div>
                </div> : 
                <CheckBox studentData={studentData} />
                }
            </div>
        </>
    )
}