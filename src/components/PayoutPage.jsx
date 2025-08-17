import { getJSON } from "../utils/storage";

export default function PayoutPage(){
  const claim = getJSON("lastClaim", null);

  if(!claim){
    return <div className="form-card">
      <h2><b><i>Payout</i></b></h2>
      <p>No claim calculated yet. Go to <b>Claim</b> and compute first.</p>
    </div>;
  }

  const when = new Date(claim.ts).toLocaleString();

  return (
    <div className="form-card">
      <h2><b><i>Payout Summary</i></b></h2>
      <p><b>Farmer:</b> {claim.farmerReg || "—"}</p>
      <p><b>Land:</b> {claim.landId} · <b>Area:</b> {claim.area} acres</p>
      <p><b>Damage:</b> {claim.damage}%</p>
      <p><b>Crop Type:</b> {claim.ml2?.cropType || "—"}</p>
      <div className="payout-box" style={{marginTop:12}}>
        ₹ {claim.payout.toLocaleString("en-IN")}
      </div>
      <p style={{marginTop:10}}>Calculated on: {when}</p>
    </div>
  );
}
