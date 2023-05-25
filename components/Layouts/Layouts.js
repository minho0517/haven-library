import { useRouter } from "next/router"
import { Header, SearchHeader } from "../Headers/Headers"
import styles from "./Layouts.module.css"
import Footer from "../Footer/Footer";
import { HomeSubHeader, ServiceSubHeader } from "../SubHeaders/SubHeaders";

export default function Layout({children}) {

    const router = useRouter();
    const path = router.pathname;

    return (
        <>  
            <div className={styles.main}>
                <Header />
                {path.includes("/service") ? <ServiceSubHeader /> : ""}
                {path ===  "/" || path.includes("/search") ? <div className={`${styles.sub_wrapper} ${path.includes("/search") ? styles.show :  ""}`}>
                    {path === "/" ? <HomeSubHeader /> : <HomeSubHeader />}
                    <div className={`${styles.search_list}`}>
                        {path.includes("/search") ? children : ""} 
                    </div>
                </div> : ""}
                <div className={styles.main_wrapper}>
                    {path.includes("/search") ?  "" : children}
                </div>
                {path === "/book" || path === "/check" ? "" : <Footer />}
            </div>
        </>
    )
}