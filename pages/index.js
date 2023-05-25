import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import checking from '../assets/checking.png'
import loaning from '../assets/loaning.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faGift, faHeadset } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { HomeSubHeaders } from '@/components/SubHeaders/SubHeaders'

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main_wrapper}>
          <Link href='/book' id={styles.borrow} className={styles.main_box}>
            <div className={styles.box_wrapper}>
                <div className={styles.text_content}>
                  <h3 className={styles.title}>대출/반납</h3>
                  <span className={styles.sub_title}>borrow/return</span>
                </div>
            </div>
            <Image width={100} height={100} className={styles.box_bg} src={loaning}></Image>
          </Link>
          <Link href='/check' id={styles.check} className={styles.main_box}>
            <div className={styles.box_wrapper}>
              <div className={styles.text_content}>
                <h3 className={styles.title}>조회</h3>
                <span className={styles.sub_title}>check</span>
              </div>
            </div>
            <Image width={100} height={100} className={styles.box_bg} src={checking}></Image>
          </Link>
          <div className={styles.box_group}>
            <Link href='/event' className={styles.sub_box}>
              <div className={styles.sub_box_wrapper}>
                <div className={styles.text_content}>
                  <h3 className={styles.sub_box_title}>이벤트</h3>
                  <span className={styles.sub_box_sub_title}>event</span>
                </div>
                <FontAwesomeIcon className={styles.sub_box_bg} icon={faGift}/>
              </div>
            </Link>
            <Link href='/service/faq' className={styles.sub_box}>
              <div className={styles.sub_box_wrapper}>
                <div className={styles.text_content}>
                  <h3 className={styles.sub_box_title}>문의/안내</h3>
                  <span className={styles.sub_box_sub_title}>service</span>
                </div>
                <FontAwesomeIcon className={styles.sub_box_bg} icon={faHeadset}/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
