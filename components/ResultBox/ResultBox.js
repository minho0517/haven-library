import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./ResultBox.module.css"
import Link from "next/link"

export default function ResultBox({dateData, bookData, process}) {

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.text_content}>
                <h3 className={styles.main_text}>총 <span className={styles.impact_main_text}>{bookData.length}</span>권의 {process ? "대출" : "반납"}이 완료되었습니다</h3>
            </div>
            <div className={styles.borrowlist}>
                <div className={styles.borrowlist_wrapper}>
                    {bookData?.map((e, i) => (
                    <div key={i} className={styles.book}>
                        <div className={styles.book_num}><span className={styles.num}>{i + 1}</span></div>
                        <div className={styles.book_content}>
                            <div className={styles.main_content}>
                                <h5 className={styles.book_title}>{e.title}</h5>
                            </div>
                            <div className={styles.sub_content}>
                                <div className={styles.book_info}>
                                    <span className={styles.info_text}>저자</span>
                                    <span className={styles.info_impact_text}>{e.author.length > 9 ? e.author.slice(0, 10) : e.author}</span>
                                </div>
                                <div className={styles.book_info}>
                                    <span className={styles.info_text}>출판</span>
                                    <span className={styles.info_impact_text}>{e.publisher.slice(0, 20)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <Link href="/" className={styles.homeBtn}>홈으로 가기</Link>
        </div>
        </>
    )
}