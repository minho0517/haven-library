import { Fragment, useEffect, useRef, useState } from "react";
import { SearchHeader } from "../Headers/Headers";
import styles from "./SubHeaders.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeftAlt, faQuoteRight, faMagnifyingGlass, faL } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function HomeSubHeader() {

    const router = useRouter();
    const path = router.pathname

    const [slideDown, setSlideDown] = useState(false);

    const [searching, setSearching] = useState(false)
    
    useEffect(() => {
        setSearching(path.includes('/search') ? true : false);
        setSlideDown(path === "/" ? true : true)
    }, [path])

    useEffect(() => {
    }, [])

    const [query, setQuery] = useState();
    
    const inputHandler = (event) => {
        setQuery(event.target.value)
    }

    const submitKey = (event) => {
        if(event.key === "Enter" && query !== "") {
            search(event)
        } else if(event.key === "Enter" && query === "") {
            alert("검색할 책 제목을 입력해주세요")
        }
    }

    const search = (event) => {
        router.push(`/search/${query}`)
    }

    return (
        <div className={`${styles.subHeader} ${slideDown ? styles.show : ""} ${searching ? styles.searching : ""}`}>
            <div className={styles.wrapper}>
                <div className={styles.search_wrapper}>
                    <div className={styles.searchbox}>
                        <button onClick={search} id={styles.search}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                        <input onChange={inputHandler} autoComplete="off" onKeyDown={submitKey} value={query} id={styles.searchbox} placeholder="책 이름을 입력해주세요"></input>
                    </div>
                </div>
                {/* <div className={styles.} */}
            </div>
        </div>
    )
}

function ServiceSubHeader() {

    const router = useRouter();

    const [slideDown, setSlideDown] = useState(false)

    useEffect(() => {
        setSlideDown(true);
    }, [])

    return (
        <div className={`${styles.subHeader} ${styles.serviceHeader} ${slideDown ? styles.show : ""}`}>
            <div className={styles.service_wrapper}>
                <div className={styles.text_wrapper}>
                    <h3 className={styles.titleText}>무엇을 도와드릴까요?</h3>
                </div>
                <div className={styles.option_wrapper}>
                    <Link href="/service/faq" className={styles.optionBox}>
                        <span className={styles.optionText}>자주 묻는 질문</span>
                    </Link>
                    <Link href="/service/requestbook" className={styles.optionBox}>
                        <span className={styles.optionText}>책 추가 요청</span>
                    </Link>
                    <Link href="/service/inquiry" className={styles.optionBox}>
                        <span className={styles.optionText}>1:1 문의</span>
                    </Link>
                    <Link href="/service/feedback" className={styles.optionBox}>
                        <span className={styles.optionText}>피드백</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {HomeSubHeader, ServiceSubHeader}