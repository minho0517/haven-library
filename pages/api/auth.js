const db = require("../../common/config/db");

export default async function handler(req, res) {
  const data = req.body;
  const response  = await getAuth(data);
  res.status(200).json(response)
}

async function getAuth(data) {
  try {
    const studentData = require("common/data/student_list.json")
    const targetData = studentData.find(obj => obj['학번'] === data.id);    
    if(targetData) {
      const student = {
        id : targetData['학번'],
        name : targetData['이름(국문)'],
        engName : targetData['이름(국문)'],
      }
      return {success: true, data:student}
    } else {
      return {success : false, msg:"존재하지 않는 아이디입니다"}
    }
  } catch {
    return {success:false, msg:"에러 발생"}
  }
}
