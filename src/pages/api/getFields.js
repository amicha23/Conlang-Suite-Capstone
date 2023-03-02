//Retrieve request for all dictionary setup form fields

export default function handler(req, res) {
  console.log(JSON.parse(req.body).data)
  res.status(200).json({ response: 'successfully sent form fields to server' })
}