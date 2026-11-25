// Rates are transcribed from Walmart's 7/1/2024 Field Hourly PTO chart.
// Each row: [PTO rate, PPTO rate, annual PTO cap, annual PPTO cap].
// null means the chart states there is no annual earning maximum; 0 means not eligible.
const bands=[
 {min:0,max:2,label:"0–2 years"},{min:3,max:3,label:"3 years"},{min:4,max:6,label:"4–6 years"},{min:7,max:10,label:"7–10 years"},{min:11,max:15,label:"11–15 years"},{min:16,max:19,label:"16–19 years"},{min:20,max:99,label:"20+ years"}
];
const plans={
 national:{full:[[.024359,.033333,72,48],[.032052,.033333,88,48],[.051282,.033333,128,48],[.066667,.033333,160,48],[.074359,.033333,176,48],[.093590,.033333,216,48],[.112821,.033333,256,48]],part:[[0,.023077,0,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.035898,.033333,96,48]],temp:[[0,.023077,0,48]]},
 standard:{full:[[.024359,.033333,72,48],[.032052,.033333,88,48],[.051282,.033333,128,48],[.066667,.033333,160,48],[.074359,.033333,176,48],[.093590,.033333,216,48],[.112821,.033333,256,48]],part:[[0,.033333,0,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.016667,.033333,56,48],[.035898,.033333,96,48]],temp:[[0,.033333,0,48]]},
 continuous:{full:[[.024359,.033333,null,null],[.032052,.033333,null,null],[.051282,.033333,null,null],[.066667,.033333,null,null],[.074359,.033333,null,null],[.093590,.033333,null,null],[.112821,.033333,null,null]],part:[[0,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.035898,.033333,null,null]],temp:[[0,.033333,null,null]]},
 illinois:{full:[[.024359,.033333,60,60],[.032052,.033333,68,68],[.042308,.042308,88,88],[.05,.05,104,104],[.053846,.053846,112,112],[.063462,.063462,132,132],[.073077,.073077,152,152]],part:[[0,.033333,0,48],[.016667,.033333,52,52],[.016667,.033333,52,52],[.016667,.033333,52,52],[.016667,.033333,52,52],[.016667,.033333,52,52],[.034616,.034616,72,72]],temp:[[0,.033333,0,48]]},
 chicago:{full:[[.028571,.033333,60,60],[.032052,.033333,68,68],[.042308,.042308,88,88],[.05,.05,104,104],[.053846,.053846,112,112],[.063462,.063462,132,132],[.073077,.073077,152,152]],part:[[.028571,.033333,40,48],[.028571,.033333,52,52],[.028571,.033333,52,52],[.028571,.033333,52,52],[.028571,.033333,52,52],[.028571,.033333,52,52],[.034616,.034616,72,72]],temp:[[.028571,.033333,40,40]]},
 ca_nv:{full:[[.024359,.033333,null,null],[.032052,.033333,null,null],[.042308,.042308,null,null],[.05,.05,null,null],[.053846,.053846,null,null],[.063462,.063462,null,null],[.073077,.073077,null,null]],part:[[0,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.016667,.033333,null,null],[.034616,.034616,null,null]],temp:[[0,.033333,null,null]]}
};
const $=id=>document.getElementById(id),n=id=>Math.max(0,Number($(id).value)||0);
function rowFor(plan,status,years){const rows=plans[plan][status];return rows.length===1?rows[0]:rows[bands.findIndex(b=>years>=b.min&&years<=b.max)]||rows[0]}
function fmt(v){return Number(v).toFixed(2)+" h"}
function calculate(){
 const plan=$("plan").value,status=$("status").value,years=Math.floor(n("years")),hours=n("hours"),weeks=n("weeks");
 const [ptoRate,pptoRate,ptoCap,pptoCap]=rowFor(plan,status,years),work=hours*weeks;
 const ptoYtd=n("ptoYtd"),pptoYtd=n("pptoYtd");
 const ptoRoom=ptoCap===null?Infinity:Math.max(0,ptoCap-ptoYtd);
 const pptoRoom=pptoCap===null?Infinity:Math.max(0,pptoCap-pptoYtd);
 const pptoEarn=Math.min(work*pptoRate,pptoRoom);
 const remainingHours=pptoRate>0?Math.max(0,work-pptoEarn/pptoRate):0;
 const redirected=pptoRate>0?Math.min(remainingHours*pptoRate,ptoRoom):0;
 let ptoEarn=Math.min(work*ptoRate,Math.max(0,ptoRoom-redirected))+redirected;
 if(work*pptoRate<=pptoRoom)ptoEarn=Math.min(work*ptoRate,ptoRoom);
 const ptoAfter=Math.max(0,n("ptoBalance")+ptoEarn-n("usedPto"));
 const pptoAfter=Math.max(0,n("pptoBalance")+pptoEarn-n("usedPpto"));
 $("ptoEarned").textContent=fmt(ptoEarn);$("pptoEarned").textContent=fmt(pptoEarn);$("combined").textContent=fmt(ptoAfter+pptoAfter);
 const rateText=r=>r===0?"Not earned":(1/r).toFixed(2)+" work hours per 1 hour earned";
 const capText=v=>v===null?"No annual max":v+" h/year";
 const band=bands.find(b=>years>=b.min&&years<=b.max)?.label||"";
 $("rateSummary").textContent=band+" · PTO: "+rateText(ptoRate)+" · PPTO: "+rateText(pptoRate)+". Annual caps: PTO "+capText(ptoCap)+", PPTO "+capText(pptoCap)+".";
 const rows=[["Projected work hours",fmt(work)],["PTO earned in projection",fmt(ptoEarn)],["PPTO earned in projection",fmt(pptoEarn)],["PTO balance after planned use",fmt(ptoAfter)],["PPTO balance after planned use",fmt(pptoAfter)],["PTO cap remaining after projection",ptoCap===null?"No annual cap":fmt(Math.max(0,ptoCap-ptoYtd-ptoEarn))],["PPTO cap remaining after projection",pptoCap===null?"No annual cap":fmt(Math.max(0,pptoCap-pptoYtd-pptoEarn))]];
 $("details").innerHTML=rows.map(([a,b])=>'<div class="detail-row"><span>'+a+'</span><strong>'+b+'</strong></div>').join("");
}
document.querySelectorAll("input,select").forEach(el=>el.addEventListener("input",calculate));
$("reset").addEventListener("click",()=>{$("plan").value="continuous";$("status").value="full";$("years").value=5;$("hours").value=40;$("weeks").value=12;["ptoBalance","pptoBalance","ptoYtd","pptoYtd","usedPto","usedPpto"].forEach(id=>$(id).value=0);calculate()});
calculate();