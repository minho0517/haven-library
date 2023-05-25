import styles from  "@/styles/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {

    const router = useRouter()
    const query = router.query.book;

    const [slideDown, setSlideDown] = useState(false);

    useEffect(() => {
        setSlideDown(true);
    }, [])

    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const bookList = require("common/data/book_list.json");
        const filteredBooks = bookList.filter((book) => {
            return book['제목']?.toLowerCase().replaceAll(" ", "").includes(query?.toLowerCase().replaceAll(" ", ""));
        }); 
        const getData = async () => {
            const newBookList = await Promise.all ( filteredBooks.map(async (book) => {
                const isbn = book.ISBN?.split(' '); 
                const detailData = isbn ?  await (await axios.get(`/api/book/info/detail/${isbn[isbn.length - 1]}`)).data : "";
                const response = await (await axios.get(`/api/book/check/borrowing/${book['등록번호']}`)).data;
                const commonData = {
                    id : book['등록번호'],
                    title : detailData ? detailData.title : book['제목'],
                    author : detailData ? detailData.authors[0] : book['저자'],
                    publisher : detailData ? detailData.publisher : book['출판사'],
                    isbn : detailData ? detailData.isbn : book["ISBN"],
                    thumbnail : detailData ? detailData.thumbnail : "https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http://search1.daumcdn.net/search/statics/common/img/noimg/4grid.png",
                    borrowing : response.borrowing,
                    contents : detailData ? detailData.contents : "",
                    url : detailData ? detailData.url : "",
                    tag : book['분류기호'],
                }
                return commonData;
            }))
            setBookData(newBookList)
        }
        getData();

    }, [query]);
    
    return (
        <div className={`${styles.container} ${slideDown ? styles.show : ""}`}>
            <div className={styles.book_list}>
                {bookData?.map((e, i) => (
                    <div key={i} className={styles.book}>
                        <div className={styles.book_wrapper}>
                            <div className={styles.book_top}>
                                <span className={`${styles.state} ${e.borrowing ? styles.state_borrowing : ""}`}>{e.borrowing ? "대출 중" : "대출 가능"}</span>
                                {/* <button className={styles.opt_btn}> <FontAwesomeIcon icon={faEllipsis}/></button> */}
                            </div>
                            <div className={styles.book_content}>
                                <div className={styles.thumbnail}>
                                    <img src={e.thumbnail ? e.thumbnail : "https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http://search1.daumcdn.net/search/statics/common/img/noimg/4grid.png"}></img>
                                </div>
                                <div className={styles.main_content}>
                                    <span className={styles.tag}>{} </span>
                                    <a target="_blank" href={e.url} className={styles.title}>{e.title}</a>
                                    <div className={styles.sub_content}>
                                        <div className={styles.book_info}>
                                            <span className={styles.info_text}>저자</span>
                                            <span className={styles.info_impact_text}>{e.author}</span>
                                        </div>
                                        <div className={styles.book_info}>
                                            <span className={styles.info_text}>출판</span>
                                            <span className={styles.info_impact_text}>{e.publisher}</span>
                                        </div>
                                    </div>
                                    <p className={styles.description}>{e.contents ? e.contents.slice(0, 150) + "..." : e.contents}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>  
    )
}