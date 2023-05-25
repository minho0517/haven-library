
export default async function handler(req, res) {
    const id = req.query.id;
    const response = await getData(id);
    res.status(200).json(response);
}

async function getData(id) {

    try {
        const bookData = require("common/data/book_list.json")
        const targetData = bookData.find(obj => obj['등록번호'] === id);
        return targetData;
        
    } catch (error) {
        return error
    }
}