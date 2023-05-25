import { useEffect, useRef, useState } from "react";
import styles from "./AuthBox.module.css";
import axios from "axios";

export default function AuthBox({nextSlide, setStudentData}) {

    const [disabled, setDisabled] = useState(true);
    const inputRef = useRef()

    const onChangeHandler = () => {
        const id = inputRef.current.value.replace(/[^0-9]/g, "");
        inputRef.current.value = id;
        setDisabled(id.length === 7 ? false : true)
    }

    const auth = () => {
        const data = {
            id : Number(inputRef.current.value),
        }
        axios.post('/api/auth', data)
        .then((res) => {
            if(res.data.success) {
                setStudentData(res.data.data);
                nextSlide();
            } else {
                setStudentData("");
                alert(res.data.msg);
                inputRef.current.value = "";
                onChangeHandler()
                inputRef.current.focus()
            }
        })
    }

    const submitBtn = () => {
        auth()
    }
    const submitKey = (event) => {
        if(event.key === "Enter" && disabled === false) {
            event.target.blur()
            auth()
        }
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.titlebox}>
                <h3 className={styles.main_title}>학생도서코드</h3>
                <h3 className={styles.sub_title}>를 입력해주세요</h3>
            </div>  
            <div className={styles.inputbox}>
                <input type="text" onKeyDown={submitKey} ref={inputRef} onChange={onChangeHandler} className={styles.stunum} maxLength='7'></input>
            </div>
            <div className={styles.buttonBox}>
                <button disabled={disabled} onClick={submitBtn} className={styles.authBtn}>확인</button>
            </div>
        </div>
    )
}
