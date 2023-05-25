import axios from "axios";

export default async function handler(req, res) {
    const [isbn] = req.query.params;
    const data = await getData(isbn)
    res.status(200).json(data);
}

async function getData(isbn) {

    const response = await axios.get(
        `https://dapi.kakao.com/v3/search/book?query=${isbn}&target=isbn`,
        {
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
            },
        }
    );
    // const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

    // const data = response.data.items[0].volumeInfo;
    const data = response.data.documents[0];

    return data;
}
