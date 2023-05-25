import { identify } from "@/utils/identify";

const db = require("../../../common/config/db");

export default async function handler(req, res) {
    const data = req.body;
    const borrow_date = new identify(new Date()).newDate();
    const return_date = new identify(new Date()).nextweek();
    const response = await postData(data, borrow_date, return_date)
    res.status(200).json(response);
}

async function postData(data, borrow_date, return_date) {
    return new Promise((resolve, reject) => {
        data.map((e) => {
            const query = "INSERT INTO borrowList(user_id, user_name, book_id, borrow_date, return_date) VALUES(?, ?, ?, ?, ?);";
            db.query(query, [e.user_id, e.user_name, e.book_id, borrow_date, return_date], (err) => {
                if(err) reject(err);
                else resolve({success:true, data:{borrow: borrow_date, return: return_date}})
            })
        })
    })
}