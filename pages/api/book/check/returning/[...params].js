const db = require('../../../../../common/config/db');

export default async function handler(req, res) {
    const [ user_id, book_id] = req.query.params;
    const response = await getResponse(user_id, book_id);
    res.status(200).json(response);
}

async function getResponse(user_id, book_id) {
    const data = await getData(user_id, book_id);
    if(!data) {
        return {borrowing : true, msg:"해당 학생의 반납 도서가 아닙니다"}
    } else {
        return {borrowing : false, data: data}
    }
}

async function getData(user_id, book_id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT borrowList.* FROM borrowList LEFT JOIN returnList ON borrowList.borrow_id = returnList.borrow_id WHERE borrowList.book_id = ? AND borrowList.user_id = ? AND returnList.borrow_id IS NULL;`;
        db.query(query, [book_id, user_id], (err, data) => {
            if(err) reject(err)
            else resolve(data[0]);
        })
    })
}