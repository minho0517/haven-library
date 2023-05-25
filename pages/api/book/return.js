import { identify } from "@/utils/identify";

const db = require("../../../common/config/db");

export default async function handler(req, res) {
    const data = req.body;
    const return_date = new identify(new Date()).newDate();
    const response = await postData(data, return_date)
    res.status(200).json(response);
}

async function postData(data, return_date) {
    return new Promise((resolve, reject) => {
        data.map((e) => {
            const query = "INSERT INTO returnList(borrow_id, user_id, user_name, book_id) VALUES(?, ?, ?, ?);";
            db.query(query, [ e.borrow_id ,e.user_id, e.user_name, e.book_id], (err) => {
                if(err) reject(err);
                else resolve({success:true, data:{return: return_date}})
            })
        })
    })
}