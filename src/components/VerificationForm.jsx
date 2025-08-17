import { useState } from "react";
import { getJSON, setJSON } from "../utils/storage";

export default function VerificationForm(){
  const [farmer, setFarmer] = useState(getJSON("farmer", null));
  const [idUrl, setIdUrl] = useState(null);
  const [selfieUrl, setSelfieUrl] = useState(null);

  const onId = e => setIdUrl(URL.createObjectURL(e.target.files[0]));
  const onSelfie = e => setSelfieUrl(URL.createObjectURL(e.target.files[0]));

  const verify = () => {
    if(!farmer){ alert("Register farmer first."); return; }
    if(!idUrl || !selfieUrl){ alert("Upload both ID and selfie."); return; }
    const updated = { ...farmer, status:"verified" };
    setJSON("farmer", updated);
    setFarmer(updated);
    alert("Farmer marked as VERIFIED ✅");
  };

  return (
    <div className="form-card">
      <h2><b><i>Verification</i></b></h2>
      {!farmer ? <p className="badge badge-warn">No farmer found.</p> :
        <p className={farmer.status==="verified"?"badge badge-ok":"badge badge-warn"}>
          Status: {farmer.status || "unverified"}
        </p>}
      <label>Upload ID document</label>
      <input type="file" accept="image/*" onChange={onId}/>
      {idUrl && <img src={idUrl} alt="" style={{marginTop:8, width:180, borderRadius:8}}/>}

      <label>Upload Selfie holding today’s date</label>
      <input type="file" accept="image/*" onChange={onSelfie}/>
      {selfieUrl && <img src={selfieUrl} alt="" style={{marginTop:8, width:180, borderRadius:8}}/>}

      <div className="actions">
        <button onClick={verify}>Mark Verified</button>
      </div>
    </div>
  );
}
