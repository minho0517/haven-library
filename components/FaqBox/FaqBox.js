import { useRef, useState } from "react";
import styles from "./FaqBox.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function FaqBox() {

    const faqData = require("@/public/data/faq.json");

    const [activeIndex, setActiveIndex] = useState(null);
    const contentRef = useRef([]);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        console.log(contentRef.current[index].offsetHeight)
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.accordian_list}>
                {faqData?.map((e, i) => (
                    <div key={i} className={`${styles.board_item} ${activeIndex === i ? styles.on : ""}`}>
                        <div onClick={() => handleClick(i)} className={styles.info_title}>
                            <strong className={styles.title_board}>{e.Q}</strong>
                            <span className={styles.arr_icon}>{activeIndex === i ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}</span>
                        </div>
                        <div className={styles.info_content} style={{ height: activeIndex === i ? `${contentRef.current[i].clientHeight}px` : 0 }}>
                            <p className={styles.content_board} ref={(el) => (contentRef.current[i] = el)}>
                                {e.A}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}