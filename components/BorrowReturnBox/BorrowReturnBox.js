import { identify } from '@/utils/identify';
import styles from './BorrowReturnBox.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useScanDetection from 'use-scan-detection';

export default function BorrowReturnBox({setBookData, dateData, studentData, bookData, btnAction, process}) {

    const [disabled, setDisabled] = useState(true);
    const [currnetBook, setCurrnetBook] = useState("");

    useScanDetection({
        onComplete: setCurrnetBook,
    });

    //도서 목록 제거
    const removeBook = (num) => {
        const newBookData = [...bookData];
        newBookData.splice(num, 1);
        setBookData(newBookData);
    }
    
    //도서 목록 추가
    useEffect(() => {
        console.log(currnetBook)
        const getData = async () => {
            const newCurruntBook = currnetBook.replaceAll("Shift", "")
            axios.get(`/api/book/info/common/${newCurruntBook}`)
            .then( async (res) => {
                const book = res.data;
                if(book) {
                    // isbn 가공
                    const isbn = book.ISBN?.split(' '); 
                    console.log(book)
                    // 책 상세 정보 가져오기
                    const detailData = isbn ? await (await axios.get(`/api/book/info/detail/${isbn[isbn.length - 1]}`)).data : ""
                    // 이미 추가되었는지 확인
                    const valueCheck = bookData.some(obj => obj.id === book['등록번호']);
                    // 대출이라면 이미 책이 대출 중인지 확인 / 반납이라면 대출 정보 가져오기
                    const response = await (await axios.get(process ? `/api/book/check/borrowing/${book['등록번호']}` : `/api/book/check/returning/${studentData.id}/${book['등록번호']}`)).data;
                    // 책 정보 정리
                    const commonData = {
                        id : book['등록번호'],
                        title : detailData ? detailData.title : book['제목'],
                        author : detailData ? detailData.authors[0] : book['저자'],
                        publisher : detailData ? detailData.publisher : book['출판사'],
                        isbn : detailData ? detailData.isbn : book["ISBN"],
                        thumnail : detailData ? detailData.thumbnail : "",
                        // description : detailData ? detailData.description
                    }
                    if (response.borrowing) {
                        alert(response.msg);
                    } else if(!response.borrowing) {
                        if(valueCheck) {
                            alert("이미 추가된 도서입니다")
                            setCurrnetBook("")
                        } else {
                            setBookData([...bookData, process ? commonData : Object.assign({}, commonData, response.data)]);
                            setCurrnetBook("")
                        }
                    }
                } else {
                    alert("존재하지 않는 도서입니다");
                }
            })
        }
        if(!currnetBook == 0 && bookData.length < 5) {
            getData();
        }
    }, [currnetBook]); 

    //대출 버튼 활성화 유무
    useEffect(() => {
        if(bookData.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [bookData]);

    return (
        <>
        <div className={styles.wrapper}>
            {/* <div className={styles.addbook}>
                <button onClick={() => addBook(1)} className={styles.addBtn}>추가1</button>
                <button onClick={() => addBook(2)} className={styles.addBtn}>추가2</button>
            </div> */}

            {/* <span className={styles.book_count}>총 <span className={styles.count}>2</span>권</span> */}
            <div className={styles.bookCart}>
                {bookData.length === 0 ? 
                <div className={styles.blank_page}><span className={styles.blank_text}>{process ? "대출" : "반납"}하실 책의 바코드를 스캔해주세요</span></div> : 
                <div className={styles.bookCart_wrapper}>
                    {bookData?.map((e, i) => (
                    <div key={i} className={styles.book}>
                        <div className={styles.book_num}><span className={styles.num}>{i + 1}</span></div>
                        <div className={styles.book_img}><img src={e.thumnail} ></img></div>
                        <div className={styles.book_content}>
                            <div className={styles.main_content}>
                                <h5 className={styles.book_title}>{e.title}</h5>
                            </div>
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
                            {process ? "" : <div className={styles.borrow_info_group}>
                                <div className={styles.borrow_info}>
                                    <span className={styles.info_text}>대출일자</span>
                                    <span className={styles.info_impact_text}>{e.borrow_date}</span>
                                </div>
                                <div className={styles.borrow_info}>
                                    <span className={styles.info_text}>반납기한</span>
                                    <span className={styles.info_impact_text}>{e.return_date}</span>
                                </div>
                            </div>}
                        </div>
                        <div className={styles.book_btn}>
                            <button onClick={() => removeBook(i)} className={styles.removeBtn}><FontAwesomeIcon icon={faXmark} /> </button>
                        </div>
                    </div>
                    ))}
                </div>
                }
            </div>
            <div className={styles.bottom}>
                {process ? <div className={styles.dates}>
                    <div id={styles.borrowDate} className={styles.date_box}>
                        <span className={styles.date_name}>대출일자</span>
                        <h3 className={styles.date}>{dateData[0].borrow}</h3>
                    </div>
                    <div id={styles.returnDate} className={styles.date_box}>
                        <span className={styles.date_name}>반납기한</span>
                        <h3 className={styles.date}>{dateData[0].return}</h3>
                    </div>
                </div> : 
                <div className={styles.dates}>
                    <div id={styles.returnDate} className={styles.date_box}>
                        <span className={styles.date_name}>반납일자</span>
                        <h3 className={styles.date}>{dateData[0].borrow}</h3>
                    </div>
                </div>
                }
                <button disabled={disabled} onClick={btnAction} className={styles.borrow}>{process ? "대출" : "반납"}</button>
            </div>
        </div>
        </>
    )
}