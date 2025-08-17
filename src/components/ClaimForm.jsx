import { useMemo, useState } from "react";
import { getJSON, setJSON } from "../utils/storage";

const RATE_PER_ACRE = 1000; // ₹ per acre (demo)

export default function ClaimForm(){
  const farmer = getJSON("farmer", null);
  const lands = getJSON("lands", []);
  const [landId, setLandId] = useState("");
  const selectedLand = useMemo(()=> lands.find(l=>l.id===landId) || null, [lands, landId]);

  // ML1 inputs
  const [ml1, setMl1] = useState({ ndvi:"", savi:"", chlorophyll:"", lai:"", temp:"", humidity:"", rainfall:"", soil_moisture:"" });
  // ML2 inputs
  const [ml2, setMl2] = useState({ expected_yield:"", stress:"", canopy:"", pest:"", cropType:"" });

  const [damage, setDamage] = useState(null);
  const [payout, setPayout] = useState(null);

  const on1 = e => setMl1(p=>({ ...p, [e.target.name]: e.target.value }));
  const on2 = e => setMl2(p=>({ ...p, [e.target.name]: e.target.value }));

  const runDamage = () => {
    const ndvi = parseFloat(ml1.ndvi);
    let dmg = isFinite(ndvi) ? Math.max(0, Math.min(100, 100 - ndvi*100)) : 0;
    // small influence of other fields (demo)
    const lai = parseFloat(ml1.lai)||0, rainfall = parseFloat(ml1.rainfall)||0;
    dmg = Math.max(0, Math.min(100, dmg + (2 - Math.min(lai,2)) + (rainfall<20 ? 5:0)));
    setDamage(+dmg.toFixed(1));
  };

  const runPayout = () => {
    if(!selectedLand){ alert("Select a land."); return; }
    const area = parseFloat(selectedLand.area)||0;
    const stress = parseFloat(ml2.stress)||0;
    const pest = parseFloat(ml2.pest)||0;
    const effectiveLoss = area * ((damage ?? 0)/100);
    const adjustment = 1 + (stress/100) - (pest/100);
    const amt = Math.max(0, Math.round(RATE_PER_ACRE * effectiveLoss * adjustment));
    setPayout(amt);

    // save "lastClaim" for Payout page
    const claim = {
      ts: Date.now(),
      farmerReg: farmer?.regNo || null,
      landId,
      area,
      ml1, damage,
      ml2: { ...ml2, cropType: ml2.cropType || selectedLand?.cropType },
      payout: amt
    };
    setJSON("lastClaim", claim);
  };

  return (
    <div className="form-card">
      <h2><b><i>Claim (ML1 → Damage, ML2 → Payout)</i></b></h2>

      {!farmer ? <p className="badge badge-warn">No farmer found. Register first.</p> :
        <p className="badge badge-ok">Farmer: {farmer.name} ({farmer.regNo})</p>}

      <label>Select Land</label>
      <select value={landId} onChange={e=>setLandId(e.target.value)}>
        <option value="">— choose —</option>
        {lands.map(l=><option key={l.id} value={l.id}>{l.name} · {l.area} acres</option>)}
      </select>

      <div className="form-card" style={{marginTop:12}}>
        <h3><b><i>Model 1 Inputs</i></b></h3>
        <label>NDVI (0–1)</label><input name="ndvi" value={ml1.ndvi} onChange={on1} />
        <label>SAVI</label><input name="savi" value={ml1.savi} onChange={on1} />
        <label>Chlorophyll</label><input name="chlorophyll" value={ml1.chlorophyll} onChange={on1} />
        <label>LAI</label><input name="lai" value={ml1.lai} onChange={on1} />
        <label>Temperature (°C)</label><input name="temp" value={ml1.temp} onChange={on1} />
        <label>Humidity (%)</label><input name="humidity" value={ml1.humidity} onChange={on1} />
        <label>Rainfall (mm)</label><input name="rainfall" value={ml1.rainfall} onChange={on1} />
        <label>Soil Moisture (%)</label><input name="soil_moisture" value={ml1.soil_moisture} onChange={on1} />
        <div className="actions"><button type="button" onClick={runDamage}>Run Damage Model</button></div>
        {damage!==null && <p className="badge badge-ok" style={{marginTop:10}}>Predicted Damage: {damage}%</p>}
      </div>

      <div className="form-card" style={{marginTop:12}}>
        <h3><b><i>Model 2 Inputs</i></b></h3>
        <label>Expected Yield (kg)</label><input name="expected_yield" value={ml2.expected_yield} onChange={on2} />
        <label>Crop Stress Indicator (0–100)</label><input name="stress" value={ml2.stress} onChange={on2} />
        <label>Canopy Coverage (%)</label><input name="canopy" value={ml2.canopy} onChange={on2} />
        <label>Pest Damage (%)</label><input name="pest" value={ml2.pest} onChange={on2} />
        <label>Crop Type</label><input name="cropType" value={ml2.cropType} onChange={on2} placeholder={selectedLand?.cropType || ""}/>
        <div className="actions"><button type="button" onClick={runPayout}>Compute Payout</button></div>
      </div>

      {payout!==null && <div className="payout-box" style={{marginTop:12}}>Eligible Payout: ₹{payout.toLocaleString("en-IN")}</div>}
    </div>
  );
}
