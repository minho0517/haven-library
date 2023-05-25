import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CheckoutBox.module.css";
import { faArrowDown, faArrowDownLong, faArrowUp, faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutBox({setProcess, nextSlide, data}) {

    const selectProcess = (process) => {
        setProcess(process);
        nextSlide();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBox}>
                <h2 className={styles.impact_title}>{data.name}</h2>
                <h2 className={styles.title}>님이 원하시는 일을 선택해주세요</h2>
            </div>
            <div className={styles.boxList}>
                <div onClick={() => selectProcess(true)} id={styles.borrow} className={styles.box}>
                    <div className={styles.box_wrapper}>
                        <div className={styles.text_box}>
                            <h3 className={styles.main_title}>대출하기</h3>
                            <span className={styles.sub_title}>borrow</span>
                        </div>
                        <div className={styles.icon_box}>
                            <FontAwesomeIcon className={styles.icon} icon={faArrowDown}/>
                        </div>
                    </div>
                </div>
                <div onClick={() => selectProcess(false)} id={styles.return} className={styles.box}>
                    <div className={styles.box_wrapper}>
                        <div className={styles.text_box}>
                            <h3 className={styles.main_title}>반납하기</h3>
                            <span className={styles.sub_title}>return</span>
                        </div>
                        <div className={styles.icon_box}>
                            <FontAwesomeIcon className={styles.icon} icon={faArrowUpLong}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}