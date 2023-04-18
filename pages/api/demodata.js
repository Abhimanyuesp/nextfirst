import CryptoJS from "crypto-js";


export default function handler(req, res) {

    const dataToBeHashed = req.query.value;
    console.log(req.query.value)

let hash = CryptoJS.SHA256(dataToBeHashed).toString(
  CryptoJS.enc.Hex
);

   // console.log(hash)
    res.status(200).send({data: hash+ "  =>  this is your encoded password for value => "+ req.query.value})
  }
  