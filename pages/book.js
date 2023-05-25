import AuthBox from '@/components/AuthBox/AuthBox';
import BorrowReturnBox from '@/components/BorrowReturnBox/BorrowReturnBox';
import CheckoutBox from '@/components/CheckoutBox/CheckoutBox';
import ResultBox from '@/components/ResultBox/ResultBox';
import styles from '@/styles/book.module.css';
import { identify } from '@/utils/identify';
import { faAngleLeft, faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Book() {

    const router = useRouter()

    const [studentData, setStudentData] = useState([]); // 학생 데이터
    const [process, setProcess] = useState(null); // 대출 or 반납 구분
    const [bookData, setBookData] = useState([]); //백엔드용 도서데이터
    const [dateData, setDateData] = useState([{borrow: new identify(new Date()).newDate(), return:new identify(new Date()).nextweek()}]); // 대출 및 반납 날짜 데이터

    const slideRef = useRef();
    const boxRef = useRef()

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex(currentIndex + 1);
    }
    const prevSlide = () => {
        if(currentIndex === 0) {
            router.replace("/")
        } else if(currentIndex === 2) {
            if(bookData.length > 0) {
                const response = confirm("책 목록이 초기화될 수 있습니다. \n그래도 뒤로가시겠습니까?");
                setCurrentIndex(response ? currentIndex - 1 : currentIndex);
                setBookData(response ? [] : bookData);
                setProcess(response ? null : process);
            } else {
                setProcess(null);
                setCurrentIndex(currentIndex - 1);
            }
        } 
        else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    // 슬라이드 박스
    useEffect(() => {
        slideRef.current.style.left = `-${boxRef.current.clientWidth * currentIndex}px`;
    }, [currentIndex]);
    useEffect(() => {
        const handleResize = () => {
            slideRef.current.style.left = `-${boxRef.current.clientWidth * currentIndex}px`;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex]);

    //대출 
    const borrowing = () => {
        const response  = confirm(`${bookData.length}권의 책을 대출하시겠습니까?`)
        const data = bookData.map((e) => {
            const newData = {
                user_id : studentData.id,
                user_name : studentData.name,
                book_id : e.id,
            };
            return newData;
        });
        if(response) {
            axios.post('/api/book/borrow', data)
            .then((res) => {
                if(res.data.success) {
                    setDateData([res.data.data]);
                    nextSlide();
                }
            })
        } 
    }

    //반납
    const returning = () => {
        const response  = confirm(`${bookData.length}권의 책을 반납하시겠습니까?`)
        const data = bookData.map((e) => {
            const newData = {
                borrow_id : e.borrow_id,
                user_id : studentData.id,
                user_name : studentData.name,
                book_id : e.id,
            };
            return newData;
        });
        if(response) {
            axios.post('/api/book/return', data)
            .then((res) => {
                if(res.data.success) {
                    setDateData([res.data.data]);
                    nextSlide();
                }
            })
        } 
    }

    const [redirect, setRedirect] = useState(false);

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
                <div className={styles.wrapper}>
                    <div className={styles.navbar}>
                        {currentIndex === 3 ? '' : <button onClick={prevSlide} className={styles.prev_btn}><FontAwesomeIcon className={styles.prev_btn_icon} icon={faArrowLeft}/> 돌아가기</button> }
                        {currentIndex === 2 && bookData.length > 0 ? <span className={styles.bookcount}>총 <span className={styles.currentCount}>{bookData.length}</span><span className={styles.countSlash}>/</span>5권</span> : ''}
                    </div>
                    <div className={styles.box}>
                        <div ref={slideRef} className={styles.box_list}>
                            <div ref={boxRef} className={styles.slideBox}><AuthBox nextSlide={nextSlide} setStudentData={setStudentData} /></div>
                            <div className={styles.slideBox}><CheckoutBox nextSlide={nextSlide} data={studentData} setProcess={setProcess} /></div>
                            <div className={styles.slideBox}>{currentIndex === 2 ? <BorrowReturnBox setBookData={setBookData} dateData={dateData} bookData={bookData} studentData={studentData} btnAction={process ? borrowing : returning} process={process} /> : ''}</div>
                            <div className={styles.slideBox}>{currentIndex === 3 ? <ResultBox process={process} dateData={dateData} bookData={bookData} /> : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}