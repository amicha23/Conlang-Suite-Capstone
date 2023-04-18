import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, ref } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  var lid = data.lid;
  lid = "-NTH0gwHuOrwGLDtlSc6";

  try {
    const langRef = ref(db, `languages/${lid}`);
    const snapshot = await get(langRef);

    if (!snapshot.exists()) {
      console.log(`lang with id ${lid} does not exist`);
      return res.status(404).json({ error: `Lang '${lid}' does not exist` });
    }

    const langData = snapshot.val();
    const updates = {}
    updates[`languages/${lid}`] = null;
    updates[`delete/`]
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}