// To save dictionary setup data in the database
export default function handler(req, res) {
  // Return the request body in JSON
  console.log(JSON.parse(req.body))
  try {
    res.status(200).json('Sent dictionary data to the database!')
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}