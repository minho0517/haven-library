import { useEffect, useRef, useState } from "react";
import styles from "./FormBox.module.css";
import axios from "axios";
import Link from "next/link";

function RequestbookForm() {
    
    const formRef = useRef(null);
    const iframeRef = useRef(null);

    const [submit, setSubmit] = useState(false)

    // 빈 값 확인 용
    const [inputData, setInputData] = useState({
        'title' : '',
        'author' : '',
        'publisher' : '',
        'link':'',
        'reason' : '',
    })

    const handleInputData = (e) => {
    
        setInputData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value
        }));
    };
    
    const handleSubmit = async (e) => {        
        if(!inputData.title) {
            return alert('책 제목을 입력해주세요')
        } else if(!inputData.author) {
            return alert('저자를 입력해주세요')
        } else if(!inputData.publisher) {
            return alert('출판사를 입력해주세요')
        } else if(!inputData.reason) {
            return alert('이유를 입력해주세요')
        } else {
            formRef.current.action = "https://docs.google.com/forms/u/2/d/e/1FAIpQLScdaHO1Ejb6bVrGqsYDcWM2jE1GLCS7Lz80YJ4rvCTKH2T89w/formResponse";
            formRef.current.method = "POST"; 
            setSubmit(true)
        }
    }
    const handleCancel = (e) => {
        e.preventDefault()
        window.location.reload();
    }

    return (
        <div className={styles.wrapper}>
            <iframe ref={iframeRef} id="iframe" name="iframe" style={{display: "none"}}></iframe>
            {submit ? 
            <div className={styles.submitPage}>
                <h2 className={styles.state_text}><strong>책 추가 요청</strong>이 접수되었습니다</h2>
                <span className={styles.more_text}>자세한 사항은 헤이븐도서팀으로 문의해주세요</span>
                <Link href="/" className={styles.link_text}>돌아가기</Link> 
            </div> : ""}
            <form onSubmit={handleSubmit} style={{display: submit ? "none" : "flex"}} id="form" name="form" target="iframe" ref={formRef} className={styles.form}>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="title">책제목</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <input onChange={handleInputData} name="entry.866281027" value={inputData['title']} className={styles.inputBox} id="title" autoComplete="off" placeholder="책제목을 입력해주세요" title="책제목을 입력해주세요" type="text"></input>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="author">저자</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <input onChange={handleInputData} name="entry.191869272" value={inputData['author']} className={styles.inputBox} id="author" autoComplete="off" placeholder="저자를 입력해주세요" title="저자를 입력해주세요" type="text"></input>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="publisher">출판사</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <input onChange={handleInputData} name="entry.1723143309" value={inputData['publisher']} className={styles.inputBox} id="publisher" autoComplete="off" placeholder="출판사를 입력해주세요" title="출판사를 입력해주세요" type="text"></input>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.notRequire_ico}></span>
                            <label htmlFor="reason">링크</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <input  onChange={handleInputData} value={inputData['link']} className={styles.inputBox} name="entry.642891587"  id="link" placeholder="책 관련 상세 링크를 입력해주세요" title="링크를 입력해주세요" autoComplete="off" type="text"></input>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="reason">이유</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <textarea onChange={handleInputData} name="entry.977450830" value={inputData['reason']} className={styles.textareaBox} id="reason" autoComplete="off" placeholder="이 책을 추가 요청하는 이유를 입력해주세요" title="이름을 입력해주세요" type="text"></textarea>
                    </div>
                </div>
                <div className={styles.button_group}>
                    <button onClick={handleCancel} className={styles.cancelBtn}>취소하기</button>
                    <button type="submit" className={styles.submitBtn}>접수하기</button>
                </div>
            </form>
        </div>
    )
}

function InquiryForm() {
    
    const formRef = useRef(null);
    const iframeRef = useRef(null);

    const [submit, setSubmit] = useState(false)

    // 빈 값 확인 용
    const [inputData, setInputData] = useState({
        'id' : '',
        'content' : '',
    })

    const handleInputData = (e) => {
    
        setInputData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value
        }));
    };
    
    const handleSubmit = async (e) => {        
        if(!inputData.id) {
            return alert('학생도서코드를 입력해주세요')
        } else if(!inputData.content) {
            return alert('문의하실 내용를 입력해주세요')
        } else {
            formRef.current.action = "";
            formRef.current.method = "POST"; 
            setSubmit(true)
        }
    }
    const handleCancel = (e) => {
        e.preventDefault()
        window.location.reload();
    }

    return (
        <div className={styles.wrapper}>
            <iframe ref={iframeRef} id="iframe" name="iframe" style={{display: "none"}}></iframe>
            {submit ? 
            <div className={styles.submitPage}>
                <h2 className={styles.state_text}><strong>1:1 문의</strong>가 접수되었습니다</h2>
                <span className={styles.more_text}>자세한 사항은 헤이븐도서팀으로 문의해주세요</span>
                <Link href="/" className={styles.link_text}>돌아가기</Link> 
            </div> : ""}
            <form onSubmit={handleSubmit} style={{display: submit ? "none" : "flex"}} id="form" name="form" target="iframe" ref={formRef} className={styles.form}>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="id">아이디</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <input onChange={handleInputData} name="entry.866281027" value={inputData['id']} className={styles.inputBox} id="id" autoComplete="off" placeholder="학생도서코드을 입력해주세요" title="학생도서코드을 입력해주세요" type="text"></input>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="content">내용</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <textarea onChange={handleInputData} name="entry.977450830" value={inputData['content']} className={styles.textareaBox} id="content" autoComplete="off" placeholder="문의하실 내용을 입력해주세요" title="문의하실 내용을 입력해주세요" type="text"></textarea>
                    </div>
                </div>
                <div className={styles.button_group}>
                    <button onClick={handleCancel} className={styles.cancelBtn}>취소하기</button>
                    <button type="submit" className={styles.submitBtn}>접수하기</button>
                </div>
            </form>
        </div>
    )
}

function FeedbackForm() {
    
    const formRef = useRef(null);
    const iframeRef = useRef(null);

    const [submit, setSubmit] = useState(false)

    // 빈 값 확인 용
    const [inputData, setInputData] = useState({
        'content' : '',
    })

    const handleInputData = (e) => {
    
        setInputData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value
        }));
    };
    
    const handleSubmit = async (e) => {        
        if(!inputData.content) {
            return alert('피드백을 입력해주세요')
        } else {
            formRef.current.action = "";
            formRef.current.method = "POST"; 
            setSubmit(true)
        }
    }
    const handleCancel = (e) => {
        e.preventDefault()
        window.location.reload();
    }

    return (
        <div className={styles.wrapper}>
            <iframe ref={iframeRef} id="iframe" name="iframe" style={{display: "none"}}></iframe>
            {submit ? 
            <div className={styles.submitPage}>
                <h2 className={styles.state_text}><strong>피드백</strong>이 접수되었습니다</h2>
                <span className={styles.more_text}>자세한 사항은 헤이븐도서팀으로 문의해주세요</span>
                <Link href="/" className={styles.link_text}>돌아가기</Link> 
            </div> : ""}
            <form onSubmit={handleSubmit} style={{display: submit ? "none" : "flex"}} id="form" name="form" target="iframe" ref={formRef} className={styles.form}>
                <div className={styles.item}>
                    <div className={styles.item_title}>
                        <strong className={styles.title_board}>
                            <span className={styles.require_ico}></span>
                            <label htmlFor="content">내용</label>
                        </strong>
                    </div>
                    <div className={styles.item_input}>
                        <textarea onChange={handleInputData} name="entry.977450830" value={inputData['content']} className={styles.textareaBox} id="content" autoComplete="off" placeholder="헤이븐 라이브러리에 대한 피드백을 자유롭게 적어주세요" title="문의하실 내용을 입력해주세요" type="text"></textarea>
                    </div>
                </div>
                <div className={styles.button_group}>
                    <button onClick={handleCancel} className={styles.cancelBtn}>취소하기</button>
                    <button type="submit" className={styles.submitBtn}>접수하기</button>
                </div>
            </form>
        </div>
    )
}

export {RequestbookForm, InquiryForm, FeedbackForm}