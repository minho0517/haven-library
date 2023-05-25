const db = require('../../../../../common/config/db');

export default async function handler(req, res) {
    const id = req.query.id;
    const response = await getResponse(id);
    res.status(200).json(response);
}

async function getResponse(id) {
    const data = await getData(id);
    if(data) {
        return {borrowing : true, msg:"이미 대출 중인 도서입니다"}
    } else {
        return {borrowing : false }
    }
}

async function getData(id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT borrowList.* FROM borrowList LEFT JOIN returnList ON borrowList.borrow_id = returnList.borrow_id WHERE borrowList.book_id = ? AND returnList.borrow_id IS NULL;`;
        db.query(query, [id], (err, data) => {
            if(err) reject(err)
            else resolve(data[0]);
        })
    })
}