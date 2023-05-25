import FaqBox from '@/components/FaqBox/FaqBox';
import { FeedbackForm, InquiryForm, RequestbookForm } from '@/components/FormBox/FormBox';
import styles from '@/styles/service.module.css';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Servce() {

    const router = useRouter();
    const page = router.query.page;
    const [pageName, setPageName] = useState("");

    useEffect(() => {

        if(page === "faq") setPageName("자주 묻는 질문")
        else if(page === "requestbook") setPageName("책 추가 요청")
        else if(page === "inquiry") setPageName("1:1 문의")
        else if(page === "feedback") setPageName("피드백")

    }, [page])


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.section_header}>
                    <h3 className={styles.section_title}>{pageName}</h3>
                    <div className={styles.faq_search_wrappper}></div>
                </div>
                {page === "faq" ? <FaqBox /> : ""}
                {page === "requestbook" ? <RequestbookForm /> : ""}
                {page === "inquiry" ? <InquiryForm /> : ""}
                {page === "feedback" ? <FeedbackForm /> : ""}
            </div>
        </div>
    )
}