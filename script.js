// ═══════════════════════════════════════════════════════ DATA ═══
const EXP_COLORS=["#F59E0B","#3B82F6","#10B981","#8B5CF6","#EF4444","#EC4899","#14B8A6"];
const EXPORTERS=[
  {id:"EXP-0041",name:"Horizon Ethiopia Export PLC",short:"Horizon",city:"Addis Ababa",since:"2011",lic:"ECX-EXP-11042",color:EXP_COLORS[0]},
  {id:"EXP-0087",name:"Yirgacheffe Coffee Traders Ltd",short:"YCT",city:"Addis Ababa",since:"2015",lic:"ECX-EXP-15091",color:EXP_COLORS[1]},
  {id:"EXP-0023",name:"Addis Finest Commodities",short:"Addis Finest",city:"Addis Ababa",since:"2009",lic:"ECX-EXP-09017",color:EXP_COLORS[2]},
  {id:"EXP-0156",name:"Ethiopian Specialty Coffee",short:"Spec. Coffee",city:"Hawassa",since:"2018",lic:"ECX-EXP-18203",color:EXP_COLORS[3]},
  {id:"EXP-0098",name:"Kaffa Forest Coffee PLC",short:"Kaffa Forest",city:"Jimma",since:"2013",lic:"ECX-EXP-13089",color:EXP_COLORS[4]},
  {id:"EXP-0071",name:"Bench Maji Exports",short:"Bench Maji",city:"Mizan Teferi",since:"2016",lic:"ECX-EXP-16144",color:EXP_COLORS[5]},
  {id:"EXP-0134",name:"Harar Trading Company",short:"Harar Co.",city:"Harar",since:"2008",lic:"ECX-EXP-08033",color:EXP_COLORS[6]},
];
const COOP_UNIONS={
  "UNION-OCFCU":{name:"Oromia Coffee Farmers Cooperative Union",short:"OCFCU",founded:1999,coops:405,households:370000,certs:["Fair Trade","Organic"],hq:"Addis Ababa",note:"Auction Market Waiver — direct export"},
  "UNION-YCFCU":{name:"Yirgacheffe Coffee Farmers Cooperative Union",short:"YCFCU",founded:2002,coops:23,households:300000,hectares:62004,certs:["Fair Trade","Organic"],hq:"Dilla"},
  "UNION-SCFCU":{name:"Sidama Coffee Farmers Cooperative Union",short:"SCFCU",founded:2001,coops:51,households:76000,annualTonnes:10000,washedPct:95,certs:["Fair Trade (since 2003)","Organic"],hq:"Hawassa"},
  "UNION-KCFCU":{name:"Kafa Coffee Farmers Cooperative Union",short:"KCFCU",founded:2004,coops:40,certs:["Organic"],hq:"Bonga"}
};
const ZONES={
  "ZONE-JM":{name:"Jimma Zone",region:"Oromia",elev:"1,400–2,100m",rain:"1,500–2,000mm/yr",farms:2772,area:"110,800 ha",gps:{lat:7.67,lng:36.83},varieties:"Heirloom, 74110, 74112",ecx:"Jimma / Limmu",cup:"Wine-like, fruity, medium body, balanced acidity",union:"UNION-OCFCU",woredas:{"WRDA-LMU":{name:"Limu Kosa",farms:1247,area:"43,500 ha",notable:"Limmu washed premium"},"WRDA-SKA":{name:"Limu Seka",farms:891,area:"38,200 ha",notable:"Limmu growing area"},"WRDA-GMR":{name:"Gera",farms:634,area:"29,100 ha",notable:"Forest coffee, organic"},"WRDA-MNA":{name:"Manna",farms:512,area:"24,800 ha",notable:"Jimma washed and natural"},"WRDA-AGR":{name:"Agaro (Goma)",farms:478,area:"22,400 ha",notable:"Historical trade hub"}}},
  "ZONE-YRG":{name:"Gedeo Zone (Yirgacheffe)",region:"SNNPR",elev:"1,750–2,200m",rain:"1,500–2,200mm/yr",farms:1335,area:"39,700 ha",gps:{lat:6.13,lng:38.20},varieties:"Heirloom, Kurume, Dega, Wolisho",ecx:"Yirgacheffe",cup:"Floral, jasmine, bergamot, tea-like, citrus",union:"UNION-YCFCU",woredas:{"WRDA-KCH":{name:"Kochere",farms:723,area:"21,300 ha",notable:"Premium washed",kebeles:["Hama","Chelchele","Wote"]},"WRDA-WNG":{name:"Wonago (Wenago)",farms:612,area:"18,400 ha",notable:"Yirgacheffe area"},"WRDA-YRGW":{name:"Yirgacheffe Woreda",farms:589,area:"19,200 ha",notable:"Namesake origin",kebeles:["Hafursa","Konga","Idido","Halo Beriti"]},"WRDA-GDB":{name:"Gedeb",farms:467,area:"15,800 ha",notable:"Premium washed and natural"}}},
  "ZONE-SDM":{name:"Sidama Zone",region:"Sidama Region",elev:"1,500–2,200m",rain:"1,200–2,000mm/yr",farms:1634,area:"60,300 ha",gps:{lat:6.60,lng:38.50},varieties:"Heirloom, Kurume, 74110",ecx:"Sidamo",cup:"Bright citrus, lemon, berries, complex acidity, floral",union:"UNION-SCFCU",woredas:{"WRDA-BNS":{name:"Bensa",farms:891,area:"33,200 ha",notable:"Premium high-altitude naturals",kebeles:["Bombe","Keramo","Shantawene","Hache","Daye Bensa"]},"WRDA-ALT":{name:"Aleta Wondo",farms:743,area:"27,100 ha",notable:"Sidamo washed, cooperatives"},"WRDA-DAL":{name:"Dale",farms:521,area:"19,400 ha",notable:"Sidamo washing stations"},"WRDA-ARB":{name:"Arbegona",farms:412,area:"15,200 ha",notable:"High-altitude Sidamo"}}},
  "ZONE-GJI":{name:"Guji Zone",region:"Oromia",elev:"1,800–2,400m",rain:"1,400–1,800mm/yr",farms:946,area:"35,400 ha",gps:{lat:5.80,lng:38.40},varieties:"Heirloom, Kurume, Dega",ecx:"Guji",cup:"Berry, floral, complex acidity, clean finish",union:"UNION-OCFCU",woredas:{"WRDA-HMB":{name:"Hambela Wamena",farms:534,area:"19,800 ha",notable:"Hambela origin, premium naturals"},"WRDA-URG":{name:"Uraga",farms:412,area:"15,600 ha",notable:"Guji premium naturals, high elevation",kebeles:["Layo Teraga","Tome","Hambela Bookkisa"]},"WRDA-SHK":{name:"Shakiso",farms:367,area:"13,800 ha",notable:"Guji washing stations"},"WRDA-OSH":{name:"Odo Shakiso",farms:298,area:"11,200 ha",notable:"Guji specialty"}}},
  "ZONE-KFA":{name:"Kaffa Zone",region:"SNNPR",elev:"1,500–2,200m",rain:"1,700–2,200mm/yr",farms:687,area:"22,200 ha",gps:{lat:7.30,lng:36.25},varieties:"Heirloom, Gesha (origin)",ecx:"Kaffa",cup:"Forest coffee, rustic, complex, wild fermentation notes",union:"UNION-KCFCU",woredas:{"WRDA-GNJ":{name:"Gimbo",farms:389,area:"12,400 ha",notable:"Keffa forest coffee"},"WRDA-CHN":{name:"Gesha",farms:298,area:"9,800 ha",notable:"Origin of Gesha/Geisha variety"},"WRDA-BNG":{name:"Bonga surrounds",farms:241,area:"7,900 ha",notable:"Keffa trade hub"}}},
  "ZONE-BCH":{name:"Bench Sheko Zone",region:"SNNPR",elev:"1,100–1,900m",rain:"1,500–2,000mm/yr",farms:521,area:"18,600 ha",gps:{lat:6.80,lng:35.45},varieties:"Heirloom",ecx:"Bench Maji / Bebeka / Tepi",cup:"Earthy, nutty, mild acidity, lower elevation profile",union:null,woredas:{"WRDA-SHK2":{name:"Sheko",farms:287,area:"10,200 ha",notable:"Bench Sheko coffee, lowland"},"WRDA-BBK":{name:"Bebeka",farms:189,area:"6,800 ha",notable:"Plantation coffee, large estates"},"WRDA-TPI":{name:"Tepi",farms:156,area:"5,400 ha",notable:"Plantation coffee"}}},
  "ZONE-HRR":{name:"Hararghe (Harrar)",region:"Oromia",elev:"1,500–2,100m",rain:"600–1,100mm/yr",farms:501,area:"13,400 ha",gps:{lat:9.31,lng:42.12},varieties:"Heirloom (Harari landrace)",ecx:"Harrar",cup:"Blueberry, wine, intense, dry-process character",union:"UNION-OCFCU",woredas:{"WRDA-HCH":{name:"Kersa",farms:312,area:"7,800 ha",notable:"Harrar naturals"},"WRDA-GLO":{name:"Girawa",farms:189,area:"5,600 ha",notable:"Harrar highland coffee"}}}
};
const TASTING={"ZONE-JM":"Dark chocolate, earth, cedar, full body, low acidity, long molasses finish","ZONE-YRG":"Jasmine, bergamot, lemon zest, peach tea, bright acidity, clean floral finish","ZONE-SDM":"Blueberry, stone fruit, winey, medium-full body, complex dried fruit sweetness","ZONE-GJI":"Wild blueberry, peach, hibiscus, sparkling acidity, tropical fruit finish","ZONE-KFA":"Forest honey, wild herbs, apricot, gentle sweetness, medium body","ZONE-BCH":"Caramel, red apple, mild citrus, balanced body, clean and sweet","ZONE-HRR":"Blueberry jam, red wine, dark chocolate, heavy body, exotic dry finish"};
const FARMER_NAMES=["Abebe Tadesse","Mulugeta Bekele","Tigist Woldemariam","Dawit Haile","Selamawit Girma","Yohannes Tesfaye","Biruk Alemu","Hiwot Bekele","Gemechu Daba","Almaz Teshome","Tesfaye Jimma","Lema Wakjira","Kebede Alemu","Meron Haile","Solomon Tesfaye","Bethlehem Girma","Getachew Tadesse","Fatuma Mohammed","Birhan Hailu","Teklehaimanot Berhe","Asnake Worku","Meaza Tesfaye","Dejene Bekele","Chaltu Gemechu"];
const STATUS_LABELS={PENDING:"Pending Dispatch",DISPATCHED:"Dispatched",EXPORTED:"Exported"};
const TRACE_OK=["DISPATCHED","EXPORTED"];
const STEP_IDX={PENDING:0,DISPATCHED:1,EXPORTED:2};
const TYPE_LABEL={SHIP:"Shipment",EXP:"Export Lot",GREEN:"Green Coffee",PAR:"Parchment",AGG:"Aggregated Cherry",HRV:"Harvest Batch",BYPRD:"By-product Lot",SMPL:"Sample Lot"};
const TYPE_DOT={SHIP:"#3B82F6",EXP:"#7C3AED",GREEN:"#10B981",PAR:"#F59E0B",AGG:"#EF4444",HRV:"#22C55E"};
const TYPE_UID_CLS={SHIP:"uid-SHIP",EXP:"uid-EXP",GREEN:"uid-GREEN",PAR:"uid-PAR",AGG:"uid-AGG",HRV:"uid-HRV"};

let CONTAINERS=[
  {id:"SHIP-JM24-0091",exp:"EXP-0041",grade:"Jimma G5",process:"Natural",kg:17800,status:"EXPORTED",vessel:"MSC SERENA",bl:"ETH-2024-BL-8821",cno:"TCKU3456789",dep:"15 Nov 2024",eta:"08 Dec 2024",arrived:null,zone:"ZONE-JM",cup:82.5,cb:[8.0,8.5,7.5,8.0,8.5,8.0,8.0],farms:12,areas:["Limu","Seka","Gummaro"],value:11107200,incoterm:"At Modjo Dry Port",payterms:"90 days BL"},
  {id:"SHIP-JM24-0094",exp:"EXP-0041",grade:"Jimma G4",process:"Washed",kg:17200,status:"EXPORTED",vessel:"EVER GIVEN II",bl:"ETH-2024-BL-7901",cno:"MSCU4412890",dep:"28 Oct 2024",eta:"22 Nov 2024",arrived:"22 Nov 2024",zone:"ZONE-JM",cup:83.75,cb:[8.5,8.0,8.0,8.5,8.0,8.0,8.5],farms:10,areas:["Limu","Seka"],value:11269440,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-JM24-0098",exp:"EXP-0041",grade:"Jimma G5",process:"Natural",kg:17500,status:"DISPATCHED",vessel:"—",bl:"ETH-2024-BL-9201",cno:"TCKU8812344",dep:"—",eta:"18 Dec 2024",arrived:null,zone:"ZONE-JM",cup:81.0,cb:[7.5,8.0,7.5,8.0,8.0,7.5,8.0],farms:11,areas:["Seka","Gummaro"],value:10647000,incoterm:"At Modjo Dry Port",payterms:"60 days BL"},
  {id:"SHIP-JM24-0102",exp:"EXP-0041",grade:"Jimma G3",process:"Washed",kg:17800,status:"PENDING",vessel:"—",bl:"—",cno:"—",dep:"—",eta:"28 Dec 2024",arrived:null,zone:"ZONE-JM",cup:null,cb:[],farms:9,areas:["Limu"],value:11469120,incoterm:"At Modjo Dry Port",payterms:"90 days BL"},
  {id:"SHIP-YRG-0044",exp:"EXP-0087",grade:"Yirgacheffe G1",process:"Washed",kg:17400,status:"EXPORTED",vessel:"MAERSK LONDON",bl:"ETH-2024-BL-8934",cno:"MAEU7234109",dep:"18 Nov 2024",eta:"12 Dec 2024",arrived:null,zone:"ZONE-YRG",cup:88.25,cb:[9.0,9.0,8.5,9.0,8.0,8.75,8.75],farms:14,areas:["Kochere","Wenago"],value:17643600,incoterm:"At Exporter Warehouse Addis",payterms:"sight"},
  {id:"SHIP-YRG-0047",exp:"EXP-0087",grade:"Yirgacheffe G1",process:"Natural",kg:17200,status:"DISPATCHED",vessel:"—",bl:"ETH-2024-BL-9312",cno:"TGHU0923445",dep:"—",eta:"20 Dec 2024",arrived:null,zone:"ZONE-YRG",cup:89.5,cb:[9.0,9.0,8.75,9.0,8.5,9.0,9.0],farms:12,areas:["Kochere"],value:17440800,incoterm:"At Modjo Dry Port",payterms:"sight"},
  {id:"SHIP-YRG-0051",exp:"EXP-0087",grade:"Yirgacheffe G2",process:"Washed",kg:17600,status:"PENDING",vessel:"—",bl:"—",cno:"—",dep:"—",eta:"10 Jan 2025",arrived:null,zone:"ZONE-YRG",cup:null,cb:[],farms:16,areas:["Wenago","Kochere"],value:13728000,incoterm:"At Modjo Dry Port",payterms:"60 days BL"},
  {id:"SHIP-SDM-0033",exp:"EXP-0023",grade:"Sidama G2",process:"Natural",kg:17300,status:"EXPORTED",vessel:"CMA CGM MARCO POLO",bl:"ETH-2024-BL-8712",cno:"CMAU4892311",dep:"20 Nov 2024",eta:"14 Dec 2024",arrived:null,zone:"ZONE-SDM",cup:85.0,cb:[8.5,8.5,8.0,8.5,8.5,8.5,8.0],farms:13,areas:["Bensa","Aleta Wondo"],value:14111760,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-SDM-0036",exp:"EXP-0023",grade:"Sidama G1",process:"Washed",kg:17500,status:"EXPORTED",vessel:"MSC ANNA",bl:"ETH-2024-BL-8012",cno:"MSCU1234567",dep:"01 Nov 2024",eta:"25 Nov 2024",arrived:"25 Nov 2024",zone:"ZONE-SDM",cup:86.75,cb:[8.75,8.75,8.5,9.0,8.0,8.5,8.5],farms:11,areas:["Bensa"],value:15151500,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-SDM-0039",exp:"EXP-0023",grade:"Sidama G2",process:"Natural",kg:17100,status:"DISPATCHED",vessel:"—",bl:"ETH-2024-BL-9401",cno:"—",dep:"—",eta:"22 Dec 2024",arrived:null,zone:"ZONE-SDM",cup:84.25,cb:[8.5,8.5,8.0,8.5,8.0,8.0,8.0],farms:10,areas:["Aleta Wondo"],value:13204620,incoterm:"At Modjo Dry Port",payterms:"90 days BL"},
  {id:"SHIP-GJI-0021",exp:"EXP-0156",grade:"Guji G1 Natural",process:"Natural",kg:16800,status:"EXPORTED",vessel:"APL OHIO",bl:"ETH-2024-BL-8623",cno:"APLU8923401",dep:"12 Nov 2024",eta:"06 Dec 2024",arrived:null,zone:"ZONE-GJI",cup:89.75,cb:[9.0,9.0,9.0,9.0,8.5,9.0,9.0],farms:9,areas:["Hambela","Uraga"],value:18869760,incoterm:"At Exporter Warehouse Addis",payterms:"sight"},
  {id:"SHIP-GJI-0024",exp:"EXP-0156",grade:"Guji G1 Washed",process:"Washed",kg:17200,status:"EXPORTED",vessel:"HYUNDAI TOGETHER",bl:"ETH-2024-BL-8789",cno:"HLXU4523109",dep:"17 Nov 2024",eta:"11 Dec 2024",arrived:null,zone:"ZONE-GJI",cup:88.0,cb:[9.0,8.75,8.5,9.0,8.0,8.5,8.75],farms:11,areas:["Hambela"],value:17977440,incoterm:"At Modjo Dry Port",payterms:"90 days BL"},
  {id:"SHIP-GJI-0027",exp:"EXP-0156",grade:"Guji G2 Natural",process:"Natural",kg:17400,status:"DISPATCHED",vessel:"—",bl:"ETH-2024-BL-9512",cno:"—",dep:"—",eta:"28 Dec 2024",arrived:null,zone:"ZONE-GJI",cup:86.5,cb:[8.75,8.75,8.5,8.75,8.5,8.5,8.5],farms:14,areas:["Uraga","Hambela"],value:16829280,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-KFA-0018",exp:"EXP-0098",grade:"Kaffa G3 Forest",process:"Natural",kg:17600,status:"EXPORTED",vessel:"EVERGREEN EVER ACE",bl:"ETH-2024-BL-8534",cno:"EGHU1234509",dep:"10 Nov 2024",eta:"04 Dec 2024",arrived:null,zone:"ZONE-KFA",cup:84.5,cb:[8.5,8.5,8.0,8.0,8.5,8.5,8.25],farms:10,areas:["Ginjo","Chena"],value:13041600,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-KFA-0021",exp:"EXP-0098",grade:"Kaffa G4 Forest",process:"Natural",kg:17200,status:"EXPORTED",vessel:"ONE HARMONY",bl:"ETH-2024-BL-7812",cno:"OESU2341098",dep:"20 Oct 2024",eta:"13 Nov 2024",arrived:"13 Nov 2024",zone:"ZONE-KFA",cup:83.0,cb:[8.0,8.5,8.0,8.0,8.5,8.0,8.25],farms:8,areas:["Ginjo"],value:11537760,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-KFA-0024",exp:"EXP-0098",grade:"Kaffa G3 Forest",process:"Natural",kg:17800,status:"PENDING",vessel:"—",bl:"—",cno:"—",dep:"—",eta:"15 Jan 2025",arrived:null,zone:"ZONE-KFA",cup:null,cb:[],farms:12,areas:["Chena","Ginjo"],value:13111800,incoterm:"At Modjo Dry Port",payterms:"90 days BL"},
  {id:"SHIP-BCH-0012",exp:"EXP-0071",grade:"Bench Sheko G4",process:"Natural",kg:17400,status:"EXPORTED",vessel:"MSC OSCAR",bl:"ETH-2024-BL-8901",cno:"MSCU8812390",dep:"22 Nov 2024",eta:"16 Dec 2024",arrived:null,zone:"ZONE-BCH",cup:80.25,cb:[8.0,8.0,7.75,8.0,8.25,8.0,7.75],farms:8,areas:["Sheko","South Bench"],value:9907560,incoterm:"At Modjo Dry Port",payterms:"60 days BL"},
  {id:"SHIP-BCH-0015",exp:"EXP-0071",grade:"Bench Sheko G3",process:"Washed",kg:17600,status:"DISPATCHED",vessel:"—",bl:"ETH-2024-BL-9601",cno:"—",dep:"—",eta:"25 Dec 2024",arrived:null,zone:"ZONE-BCH",cup:81.5,cb:[8.0,8.25,8.0,8.0,8.25,8.0,8.0],farms:9,areas:["Sheko"],value:10433280,incoterm:"At Exporter Warehouse Addis",payterms:"60 days BL"},
  {id:"SHIP-HRR-0009",exp:"EXP-0134",grade:"Harar G4 Natural",process:"Natural",kg:17200,status:"EXPORTED",vessel:"OOCL HONG KONG",bl:"ETH-2024-BL-7701",cno:"OOLU4123890",dep:"15 Oct 2024",eta:"08 Nov 2024",arrived:"08 Nov 2024",zone:"ZONE-HRR",cup:85.5,cb:[8.75,8.5,8.5,8.0,8.5,8.75,8.75],farms:7,areas:["Harar","Goloda"],value:15696720,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
  {id:"SHIP-HRR-0012",exp:"EXP-0134",grade:"Harar G4 Natural",process:"Natural",kg:17500,status:"EXPORTED",vessel:"COSCO SHIPPING UNIVERSE",bl:"ETH-2024-BL-9001",cno:"COSU8812340",dep:"25 Nov 2024",eta:"19 Dec 2024",arrived:null,zone:"ZONE-HRR",cup:86.0,cb:[8.75,8.5,8.5,8.25,8.5,8.75,8.5],farms:8,areas:["Harar","Goloda"],value:16380000,incoterm:"At Exporter Warehouse Addis",payterms:"90 days BL"},
];

// v24: Seed guarantee object on every container (replaces old lc field)
// Guarantee state derived from container physical status:
//   PENDING → DRAFT (contract formed, bank not yet issued)
//   DISPATCHED → ISSUED (seller bank issued performance guarantee)
//   EXPORTED → SETTLED (guarantee released after delivery confirmation)
(function seedGuarantees(){
  const statusToGuarantee={
    PENDING:"DRAFT",
    DISPATCHED:"ISSUED",
    EXPORTED:"SETTLED"
  };
  const banks=["BNK-CBE","BNK-AWASH","BNK-DASHEN","BNK-COOP","BNK-ZEMEN"];
  const bankNames={
    "BNK-CBE":"Commercial Bank of Ethiopia",
    "BNK-AWASH":"Awash Bank",
    "BNK-DASHEN":"Dashen Bank",
    "BNK-COOP":"Cooperative Bank of Oromia",
    "BNK-ZEMEN":"Zemen Bank"
  };
  CONTAINERS.forEach(function(c,i){
    if(c.guarantee)return;
    const state=statusToGuarantee[c.status]||"DRAFT";
    const bank=banks[i%banks.length];
    const stateIdx={DRAFT:0,ISSUED:1,COUNTERSIGNED:2,SETTLED:3}[state];
    c.guarantee={
      no:state==="DRAFT"?null:("GTE-2026-"+String(8000+i).padStart(4,"0")),
      bank:bank,
      bankName:bankNames[bank],
      issuedOn:stateIdx>=1?"15 Oct 2025":null,
      countersignedOn:stateIdx>=2?"18 Oct 2025":null,
      settledOn:stateIdx>=3?"22 Nov 2025":null,
      expiry:"31 Dec 2026",
      terms:"Performance guarantee · 10% of contract value · valid until delivery settlement",
      state:state,
      amount:c.value||0,
      docs:["Delivery Order","Warehouse Receipt","Quality Certificate","Certificate of Origin","ECTA Export Permit"]
    };
  });
})();

// ═══════════════════════════════════════════════════════ STATE ══
const traceCache={}, treeExp={}, detsOpen={}, cardExp={};
let activeExp=null, activeSt=null, activeCont=null, activeTab="overview";
let viewMode="cards", activeRibbon="home";
let notifOpen=false, bsOpen=false, wizOpen=false;
let wizStep=0;
const wizData={};
const notifToggles={};// milestoneId => {email,sms}

// ═══════════════════════════════════════════════════════ HELPERS ═
function uidType(id){
  if(id.startsWith("SHIP-"))return"SHIP";
  if(id.startsWith("LOT-EXP"))return"EXP";
  if(id.startsWith("LOT-GRN"))return"GREEN";
  if(id.startsWith("LOT-PAR"))return"PAR";
  if(id.startsWith("LOT-AGG"))return"AGG";
  if(id.startsWith("LOT-HRV"))return"HRV";
  if(id.startsWith("LOT-BYP"))return"BYPRD";
  if(id.startsWith("LOT-SMP"))return"SMPL";
  if(id.startsWith("ZONE-"))return"ZONE";
  if(id.startsWith("WRDA-"))return"WRDA";
  if(id.startsWith("FARM-"))return"FARM";
  if(id.startsWith("LAB-"))return"LAB";
  if(id.startsWith("ACT-"))return"ACTR";
  if(id.startsWith("EXP-"))return"EXPa";
  if(id.startsWith("ACT-IMP"))return"IMP";
  return"LOT";
}
// ═══════════════════════════════════════════════════ ACTOR REGISTRY (Layer 1) ══
const LISTING_TYPE_LABEL={IOI:"Indication of Interest",RFQ:"Request for Quotation",ENG:"English Auction",SEALED:"Sealed-Bid Auction",REV:"Reverse Auction"};
const LISTING_STATE_COLOR={DRAFT:"#9a7a3a",LIVE:"#5a8a3a",ENGAGED:"#3a7a8a",MATCHED:"#7C3AED",FAILED:"#a04040",WITHDRAWN:"#666"};

// ═══════════════════════════════════════ CURRENCY & UNIT TOGGLE ══
// Seeded realistic FX rates (NBE post-liberalization, 11 Apr 2026)
const FX_RATES={USD:1,EUR:1.083,ETB:156.00};  // USD as base
const FX_SOURCE="NBE 11 Apr 2026";
const KG_PER_LB=0.45359237;
const KG_PER_FRASULA=17;
const LB_PER_FRASULA=KG_PER_FRASULA/KG_PER_LB;  // ~37.478

// 7 display modes. Input is always (pricePerLbUSD, weightKg).
const CURRENCY_MODES={
  "ETB_FRAS":{label:"ETB per frasula",short:"ETB/fras",type:"unit_price",
    convert:function(usdPerLb,kg){return (usdPerLb*LB_PER_FRASULA*FX_RATES.ETB).toFixed(0)+" ETB/fras";}},
  "ETB_KG":{label:"ETB per kg",short:"ETB/kg",type:"unit_price",
    convert:function(usdPerLb,kg){return (usdPerLb/KG_PER_LB*FX_RATES.ETB).toFixed(0)+" ETB/kg";}},
  "USD_LB":{label:"USD per lb",short:"USD/lb",type:"unit_price",
    convert:function(usdPerLb,kg){return "$"+usdPerLb.toFixed(2)+"/lb";}},
  "USD_KG":{label:"USD per kg",short:"USD/kg",type:"unit_price",
    convert:function(usdPerLb,kg){return "$"+(usdPerLb/KG_PER_LB).toFixed(2)+"/kg";}},
  "EUR_KG":{label:"EUR per kg",short:"EUR/kg",type:"unit_price",
    convert:function(usdPerLb,kg){return "€"+(usdPerLb/KG_PER_LB*FX_RATES.EUR).toFixed(2)+"/kg";}},
  "ETB_TOT":{label:"ETB total",short:"ETB Σ",type:"lot_total",
    convert:function(usdPerLb,kg){const lb=kg/KG_PER_LB;return (usdPerLb*lb*FX_RATES.ETB).toLocaleString("en-US",{maximumFractionDigits:0})+" ETB";}},
  "USD_TOT":{label:"USD total",short:"USD Σ",type:"lot_total",
    convert:function(usdPerLb,kg){const lb=kg/KG_PER_LB;return "$"+(usdPerLb*lb).toLocaleString("en-US",{maximumFractionDigits:0});}}
};
const CURRENCY_MODE_ORDER=["ETB_FRAS","ETB_KG","USD_LB","USD_KG","EUR_KG","ETB_TOT","USD_TOT"];

// Per-view mode state
const CURRENCY_MODE_STATE={};

function getCurrencyMode(ctxKey,defaultMode){
  return CURRENCY_MODE_STATE[ctxKey]||defaultMode||"ETB_FRAS";
}
function setCurrencyMode(ctxKey,mode){
  if(!CURRENCY_MODES[mode])return;  // guard invalid mode
  CURRENCY_MODE_STATE[ctxKey]=mode;
  if(ctxKey==="portfolio"&&typeof renderView==="function")renderView();
  else if(typeof window[ctxKey+"Rerender"]==="function")window[ctxKey+"Rerender"]();
}

function priceFmt(usdPerLb,kg,ctxKey,defaultMode){
  const mode=getCurrencyMode(ctxKey,defaultMode);
  const m=CURRENCY_MODES[mode];
  if(!m)return "—";
  try{return m.convert(usdPerLb||0,kg||1000);}catch(e){return "—";}
}

// Segmented-control toggle widget
// Compact chip row with 7 modes, current highlighted, FX tag on the right
function unitToggleWidget(ctxKey,defaultMode){
  const current=getCurrencyMode(ctxKey,defaultMode);
  const chips=CURRENCY_MODE_ORDER.map(function(k){
    const m=CURRENCY_MODES[k];
    const active=k===current;
    return '<button type="button" class="dm-chip'+(active?" on":"")+'" onclick="setCurrencyMode(\''+ctxKey+'\',\''+k+'\')" title="'+m.label+'">'+m.short+"</button>";
  }).join("");
  return '<div style="display:inline-flex;align-items:center;gap:10px;font-size:10px;color:var(--tx3)">'+
    '<span style="text-transform:uppercase;letter-spacing:.05em;font-weight:600">Display:</span>'+
    '<div style="display:inline-flex;border-radius:4px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04)">'+chips+'</div>'+
    '<span style="font-family:monospace;font-size:9px;color:var(--tx3)">FX '+FX_SOURCE+'</span>'+
    '</div>';
}

// Active persona lookup
const ACTIVE_PERSONA_UID="ACT-EXP-MAIN";
function activePersona(){return ACTOR_REGISTRY[ACTIVE_PERSONA_UID]||{name:"Kaffa Trading PLC"};}
// ═══════════════════════════════════════════════════════════════

const LISTINGS={
  "LIST-IOI-0042":{type:"IOI",state:"LIVE",lot:"EXP-0087",seller:"ACT-EXP-002",sellerVisible:true,weight:17400,grade:"Yirgacheffe G1 Washed",priceMode:"Outright",priceUSDkg:12.79,priceUSDlb:5.80,incoterm:"At Mill Yirgacheffe",duration:"14 days",ends:"26 Apr 2026",visibility:["Open Market","Rating-gated ≥4★"],bids:0,quality:"SCA 88.25",eudr:true,note:"Specialty buyers, prior YCFCU experience preferred."},
  "LIST-RFQ-0118":{type:"RFQ",state:"ENGAGED",lot:null,buyer:"ACT-UNI-OCFCU",buyerCompany:"Oromia Coffee Farmers Cooperative Union",weight:18000,grade:"Sidamo G1/G2 Natural",priceMode:"Differential",differential:"NY-C +85¢",incoterm:"At Modjo Dry Port",duration:"7 days",ends:"19 Apr 2026",visibility:["Invite-only (12 exporters)"],offers:4,quality:"SCA ≥85 required",eudr:true,note:"Quality binding: price-adjustable, ±5¢ per cup point."},
  "LIST-ENG-0007":{type:"ENG",state:"LIVE",lot:"EXP-0156",seller:"ACT-EXP-002",sellerVisible:false,weight:16800,grade:"Guji G1 Natural",priceMode:"Outright",reserveUSDkg:10.58,reserveUSDlb:4.80,currentUSDkg:11.57,currentUSDlb:5.25,minIncrement:"0.05 USD/kg",incoterm:"At Mill Hambela",ends:"15 Apr 2026 18:00 UTC",antiSniping:"5-min extension, 30-min cap",visibility:["Rating-gated ≥4★","Region: EU + UK + JP"],bids:7,quality:"SCA 89.75",eudr:true},
  "LIST-SEL-0019":{type:"SEALED",state:"LIVE",lot:"EXP-0023",seller:"ACT-EXP-002",sellerVisible:false,weight:17500,grade:"Sidama G1 Washed",priceMode:"Outright",reserveUSDkg:10.05,reserveUSDlb:4.56,ends:"22 Apr 2026 12:00 UTC",visibility:["Invite-only (8 importers)"],bidsReceived:5,quality:"SCA 86.75",eudr:true,note:"Fully blind until close. No bid visibility."},
  "LIST-REV-0003":{type:"REV",state:"LIVE",lot:null,buyer:"ACT-UNI-SCFCU",buyerCompany:"Sidama Coffee Farmers Cooperative Union",weight:20000,grade:"Yirgacheffe Washed, SCA ≥87",priceMode:"Outright",ceilingUSDkg:13.23,ceilingUSDlb:6.00,currentLowUSDkg:12.57,currentLowUSDlb:5.70,incoterm:"At Exporter Warehouse Addis",ends:"18 Apr 2026",visibility:["Open Market","Verification: Enhanced only"],bids:6,quality:"Required: SCA ≥87, EUDR ready",eudr:true},
  "LIST-ENG-0042":{type:"ENG",state:"LIVE",lot:null,seller:"ACT-EXP-MAIN",sellerVisible:true,weight:17000,grade:"Limu G1 Washed",priceMode:"Outright",reserveUSDkg:9.26,reserveUSDlb:4.20,currentUSDkg:10.03,currentUSDlb:4.55,minIncrement:"0.05 USD/lb",incoterm:"At Mill Limu",ends:"20 Apr 2026 16:00 UTC",antiSniping:"5-min extension, 30-min cap",visibility:["Open Market","EU + US + JP","Rating-gated ≥4★"],bids:3,quality:"SCA 87.50",eudr:true,note:"Kaffa Trading flagship · Anderacha washing station · 2025/26 harvest peak"}
};
const COMPANY_TYPES={PLC:"Private Limited Co.",SC:"Share Company",GP:"General Partnership",SP:"Sole Proprietor",COOP:"Primary Cooperative",UNION:"Cooperative Union"};
const ACTOR_REGISTRY={
    "ACT-EXP-MAIN":{type:"Legal Entity",companyType:"PLC",name:"Kaffa Trading PLC",legalPerson:"Dawit Tesfaye",roles:["Exporter","Trader"],tier:"Enhanced",rating:4.6,fayda:null,lei:"529900KAFFA0077",tin:"TIN-0014772891",status:"Active",since:"Jun 2022",established:"2019",region:"Addis Ababa",hq:"Bole Subcity, Addis Ababa",locations:["Addis Ababa HQ"],licenses:[{type:"ECTA Export License",no:"ECTA-EXP-2447",expiry:"30 Jun 2027"},{type:"Trade License",no:"TL-AA-11203",issuer:"Addis Ababa Trade Bureau",expiry:"15 Jan 2027"},{type:"Memorandum of Association",no:"MOA-2022-0446",issuer:"MoTI"}],currencyPref:"ETB",unitPref:"ETB/frasula",primaryBank:"BNK-AWASH",primaryBankName:"Awash Bank",specialties:["Limu Washed"],verifiedBy:"ECTA + Fayda + LEI + on-site audit (Jun 2024)",related:[],isActivePersona:true},
  "ACT-EXP-002":{type:"Legal Entity",companyType:"PLC",name:"Moyee Coffee Exporters PLC",legalPerson:"Killian Stokes",roles:["Exporter","Aggregator"],tier:"Enhanced",rating:4.7,fayda:null,lei:"529900MOYEE0099",tin:"TIN-0010234521",status:"Active",since:"Sep 2023",region:"Addis Ababa",hq:"Bole, Addis Ababa",locations:["Addis HQ","Djibouti FCL Yard","Yirgacheffe Mill"],licenses:[{type:"ECTA Export License",no:"ECTA-EXP-2231",expiry:"31 Dec 2026"},{type:"Trade License",no:"TL-AA-09891",issuer:"Addis Ababa Trade Bureau",expiry:"15 Sep 2026"},{type:"Memorandum of Association",no:"MOA-2023-0091",issuer:"MoTI"}],currencyPref:"USD",unitPref:"USD/lb",verifiedBy:"ECTA license + Fayda + LEI",related:[]},
  "ACT-EXP-014":{type:"Legal Entity",companyType:"SC",name:"Sidama Highland Coffee S.C.",legalPerson:"Tadesse Meskela",roles:["Exporter","Processor","Aggregator"],tier:"Enhanced",rating:4.9,lei:"529900SIDHL0044",tin:"TIN-0019887700",status:"Active",since:"Mar 2022",region:"Sidama",hq:"Hawassa",locations:["Hawassa HQ","Bensa Mill","Addis Liaison","Djibouti FCL Yard"],licenses:[{type:"ECTA Export License",no:"ECTA-EXP-1844",expiry:"30 Jun 2027"},{type:"Trade License",no:"TL-SD-04412",issuer:"Sidama Region Trade Bureau",expiry:"22 Mar 2027"},{type:"Articles of Association",no:"AOA-2022-1844",issuer:"MoTI"}],currencyPref:"USD",unitPref:"USD/lb",verifiedBy:"ECTA + LEI + on-site",related:[]},
  "ACT-UNI-OCFCU":{type:"Cooperative Union",companyType:"UNION",name:"Oromia Coffee Farmers Cooperative Union",legalPerson:"Dejene Hirpa",roles:["Exporter","Aggregator","Cooperative Union"],tier:"Enhanced",rating:4.8,lei:"529900OCFCU0001",tin:"TIN-0001100234",status:"Active",since:"1999",region:"Oromia",hq:"Addis Ababa",locations:["Addis HQ","405 member coops across Oromia","Djibouti FCL Yard"],licenses:[{type:"ECTA Export License",no:"ECTA-EXP-0001",expiry:"31 Dec 2027"},{type:"Auction Market Waiver",no:"AMW-1999-001",issuer:"ECX/MoTI"},{type:"Cooperative Registration",no:"COOP-OR-1999-1",issuer:"Federal Cooperative Agency"}],currencyPref:"USD",unitPref:"USD/lb",verifiedBy:"FCA registration + ECTA",related:[]},
  "ACT-UNI-SCFCU":{type:"Cooperative Union",companyType:"UNION",name:"Sidama Coffee Farmers Cooperative Union",legalPerson:"Berhanu Mekonnen",roles:["Exporter","Aggregator","Cooperative Union"],tier:"Enhanced",rating:4.6,lei:"529900SCFCU0001",tin:"TIN-0001200445",status:"Active",since:"2001",region:"Sidama",hq:"Hawassa",locations:["Hawassa HQ","51 member coops across Sidama","Djibouti FCL Yard"],licenses:[{type:"ECTA Export License",no:"ECTA-EXP-0044",expiry:"31 Dec 2027"},{type:"FLO Fair Trade",no:"FLO-2003-SCFCU",issuer:"Fairtrade International"},{type:"Cooperative Registration",no:"COOP-SD-2001-1",issuer:"Federal Cooperative Agency"}],currencyPref:"USD",unitPref:"USD/lb",verifiedBy:"FCA + FLO + ECTA",related:[]},
  "ACT-COOP-IDIDO":{type:"Primary Cooperative",companyType:"COOP",name:"Idido Cooperative",legalPerson:"Worku Tadesse",roles:["Aggregator","Cooperative","Washing Station"],tier:"Verified",rating:4.5,tin:"TIN-0042200118",status:"Active",since:"1976",region:"Yirgacheffe, Gedeo",hq:"Idido Kebele, Yirgacheffe Woreda",locations:["Idido Washing Station"],licenses:[{type:"Cooperative Registration",no:"COOP-GD-1976-12",issuer:"Federal Cooperative Agency"},{type:"Washing Station License",no:"WS-GD-0231",issuer:"ECTA"}],parentUnion:"ACT-UNI-YCFCU",currencyPref:"ETB",unitPref:"ETB/Frasula",verifiedBy:"Field agent + parent union",related:["ACT-UNI-YCFCU"]},
  "ACT-AGG-022":{type:"Legal Entity",companyType:"SP",name:"Wondimu Coffee Trading",legalPerson:"Wondimu Bekele",roles:["Aggregator","Trader"],tier:"Verified",rating:4.2,tin:"TIN-0033445566",status:"Active",since:"Jun 2021",region:"Sidama",hq:"Aleta Wondo",locations:["Aleta Wondo Buying Station","Hawassa Warehouse"],licenses:[{type:"Trade License",no:"TL-SD-08821",issuer:"Sidama Region Trade Bureau",expiry:"30 Jun 2026"},{type:"ECX Member ID",no:"ECX-M-4421"}],currencyPref:"ETB",unitPref:"ETB/Frasula",verifiedBy:"ECX membership + trade license",related:[]},
};

function actorLookup(name){
  if(!name)return null;
  for(const k in ACTOR_REGISTRY){if(ACTOR_REGISTRY[k].name===name)return k;}
  const lc=name.toLowerCase();
  if(lc.includes("washing")||lc.includes("collection"))return "ACT-WST-018";
  if(lc.includes("milling"))return "ACT-MIL-007";
  if(name.startsWith("FARM-"))return "ACT-FRM-0241";
  return null;
}
const TIER_COLOR={Provisional:"#9a7a3a",Basic:"#b08840",Verified:"#5a8a3a",Enhanced:"#3a7a8a"};
function tierBadge(t){return`<span style="display:inline-block;padding:2px 7px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em;background:${TIER_COLOR[t]||'#888'};color:#fff">${t.toUpperCase()}</span>`;}
function openActorLookup(){const id=prompt("Enter Actor UID (e.g. ACT-FRM-0241, ACT-WST-018, ACT-EXP-002):");if(id&&ACTOR_REGISTRY[id.trim()])showUID(id.trim());else if(id)toast("Actor UID not found in registry");}
function renderActorProfile(actorId){
  const a=ACTOR_REGISTRY[actorId];if(!a)return"";
  const relChips=(a.related||[]).map(r=>muid(r)).join("")||'<span style="font-size:11px;color:var(--tx3)">None declared</span>';
  const rows=[["Actor UID",actorId],["Company Type",COMPANY_TYPES[a.companyType]||a.type],["Legal Person",a.legalPerson||"—"],["Roles",a.roles.join(" · ")],["Rating",a.rating?("★ "+a.rating.toFixed(1)):"—"],["Status",a.status],["Region",a.region],["HQ",a.hq||"—"],["TIN",a.tin||"—"],["LEI",a.lei||"—"],["Fayda",a.fayda||"—"],["Currency Pref",a.currencyPref||"—"],["Unit Pref",a.unitPref||"—"],["Verified Since",a.since],["Verified By",a.verifiedBy]];
  const locs=(a.locations||[]).map(l=>`<span style="display:inline-block;padding:3px 8px;margin:2px;background:rgba(58,122,138,.1);border:1px solid rgba(58,122,138,.3);border-radius:3px;font-size:10px;color:var(--tx2)">${l}</span>`).join("")||'<span style="font-size:11px;color:var(--tx3)">—</span>';
  const lics=(a.licenses||[]).map(l=>`<div style="padding:6px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px;margin-bottom:3px;font-size:11px"><b>${l.type}</b> · ${l.no}${l.issuer?" · "+l.issuer:""}${l.expiry?` <span style="color:var(--tx3)">(exp ${l.expiry})</span>`:""}</div>`).join("")||'<span style="font-size:11px;color:var(--tx3)">None on file</span>';
  return`<div class="mty">${a.type} · ${COMPANY_TYPES[a.companyType]||""}</div>
    <div class="mti">${a.name} ${tierBadge(a.tier)}</div>
    ${mgr(rows)}
    <div class="ms2">Operating Locations</div><div style="margin-bottom:8px">${locs}</div>
    <div class="ms2">Licenses & Documents</div><div>${lics}</div>
    <div class="ms2">Related Parties</div><div class="mch">${relChips}</div>
    <div style="margin-top:10px;padding:8px 10px;background:rgba(90,138,58,.08);border-left:2px solid #5a8a3a;font-size:11px;color:var(--tx2);border-radius:3px">Identity & Registry · drives contract metadata + contracting</div>`;
}

function muid(id){
  const t=uidType(id);
  return`<span class="uid uid-${t}" onclick="event.stopPropagation();showUID('${id}')">${id}</span>`;
}
function drow(k,v){return`<div class="drow"><span class="dk">${k}</span><span class="dv">${v}</span></div>`;}
function mgr(fields){return`<div class="mgr">${fields.map(([k,v])=>`<div class="mc"><div class="mk">${k}</div><div class="mv">${v}</div></div>`).join("")}</div>`;}
function mrel(title,chips){if(!chips||!chips.length)return"";return`<div class="ms2">${title}</div><div class="mch">${chips.join("")}</div>`;}

// ═══════════════════════════════════════════════════ MILESTONES ══
// v24: domestic-only. LC vocabulary replaced with bank guarantee vocabulary.
// Guarantee lifecycle: DRAFT → ISSUED → COUNTERSIGNED → SETTLED
function genMilestones(c){
  const s=c.status;
  const g=c.guarantee||{state:"DRAFT",bank:"BNK-CBE",bankName:"Commercial Bank of Ethiopia",terms:"Performance guarantee"};
  const gN={DRAFT:0,ISSUED:1,COUNTERSIGNED:2,SETTLED:3}[g.state]||0;
  const st=STEP_IDX[s];
  return[
    {id:"contract",label:"Signed",cat:"contract",status:"done",date:"Oct 2025",clause:"Contract Clause 1.1 — Formation",detail:"Contract executed by both parties. All commercial terms are binding from this date.",action:null},
    {id:"gte_issued",label:"Guarantee Issued",cat:"guarantee",status:gN>=1?"done":s==="PENDING"?"curr":"over",date:g.issuedOn||"Pending",clause:"Contract Clause 8.1 — Performance guarantee to be issued within 10 days of contract signing",detail:`Seller's bank (${g.bankName}) issues performance guarantee for 10% of contract value. Domestic bank guarantee, no correspondent banking required.`,action:gN<1&&s!=="PENDING"?"Issue guarantee — overdue":null},
    {id:"gte_countersign",label:"Countersigned",cat:"guarantee",status:gN>=2?"done":gN===1?"curr":"pend",date:g.countersignedOn||"Pending",clause:"NBE Directive SBB/87/2023 — Buyer bank countersigns within 5 working days",detail:`Buyer's bank adds its countersignature to the guarantee, making it a bilateral instrument. Both Ethiopian banks hold joint liability.`,action:gN===1?"Awaiting buyer bank countersignature":null},
    {id:"dispatched",label:"Dispatched",cat:"shipping",status:st>=1?"done":"pend",date:st>=1?c.dep||"—":"Pending",clause:`Contract Clause 4.1 — Delivery point: ${c.incoterm||"agreed point"}`,detail:`Coffee dispatched from exporter warehouse to agreed domestic delivery point. Quality binding check at dispatch.`,action:null},
    {id:"delivered",label:"Delivered",cat:"shipping",status:st>=2?"done":st===1?"curr":"pend",date:st>=2?(c.arrived||c.eta):"Pending",clause:"Contract Clause 4.2 — Buyer takes delivery at agreed custody point",detail:"Risk and title transfer on signed warehouse receipt at agreed delivery point.",action:null},
    {id:"gte_settled",label:"Guarantee Settled",cat:"guarantee",status:gN>=3?"done":st>=2&&gN<3?"warn":"pend",date:g.settledOn||(st>=2?"On delivery confirmation":"Pending"),clause:"Guarantee Terms § 4 — Released on delivery settlement",detail:`Guarantee released once delivery is confirmed. Seller's 10% performance retention returned to working capital.`,action:st>=2&&gN<3?"Confirm delivery to release guarantee":null},
    {id:"payment",label:"Payment",cat:"payment",status:gN>=3?"done":"pend",date:gN>=3?"Released":c.payterms||"On delivery",clause:`Payment Terms: ${c.payterms||"On delivery"}`,detail:`Payment settled via EthioPay-IPS or RTGS to seller's ${g.bankName} account. ETB only.`,action:null},
  ];
}

// ══════════════════════════════════════════════════════ RIBBON ═══
const RIBBON_DEFS={
  home:{groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>',label:"Cards",fn:"setView('cards')",isOn:()=>viewMode==="cards"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="1" y1="4" x2="5" y2="4"/><line x1="7" y1="4" x2="15" y2="4"/><line x1="1" y1="8" x2="5" y2="8"/><line x1="7" y1="8" x2="15" y2="8"/><line x1="1" y1="12" x2="5" y2="12"/><line x1="7" y1="12" x2="15" y2="12"/></svg>',label:"Timeline",fn:"setView('timeline')",isOn:()=>viewMode==="timeline"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2v12M3 14l-2-3M3 14l2-3M7 5h7M7 9h5M7 13h3"/></svg>',label:"By ETA",fn:"toast('Sort by ETA')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14l3-6h2l3-7h2l3 13"/></svg>',label:"By SCA",fn:"toast('Sort by SCA score')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="9" width="3" height="6"/><rect x="6.5" y="5" width="3" height="10"/><rect x="11" y="1" width="3" height="14"/></svg>',label:"By Value",fn:"toast('Sort by value')"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="8"/><circle cx="8" cy="11" r=".7" fill="currentColor"/></svg>',label:"Overdue",fn:"filterSt('OVERDUE',null)"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1l5 3v4c0 3-2 5-5 7C3 13 1 11 1 8V4z"/></svg>',label:"Guarantee Issues",fn:"toast('Filter guarantee issues')"},
    ]},
  ]},
  contracts:{ctx:true,label:"CONTRACT TOOLS",groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="12" height="14" rx="1"/><path d="M5 5h6M5 8h6M5 11h4"/></svg>',label:"Terms",fn:"switchDTab('lc',null)",dimIf:()=>!activeCont},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>',label:"Milestones",fn:"switchDTab('lc',null)",dimIf:()=>!activeCont},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="10" height="14" rx="1"/><path d="M5 5h6M5 8h6M5 11h3"/><path d="M9 1v4h5"/></svg>',label:"Cert. PDF",fn:"toast('Generating trace certificate…')",dimIf:()=>!activeCont},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="3" width="9" height="11" rx="1"/><path d="M3 12V2h9"/></svg>',label:"Copy UID",fn:"copyUID()",dimIf:()=>!activeCont},
    ]},
  ]},
  trace:{ctx:true,label:"CONTRACT TOOLS",groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5l5 5 5-5"/></svg>',label:"Expand All",fn:"ribbonExpand(true)",dimIf:()=>!activeCont},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 11l-5-5-5 5"/></svg>',label:"Collapse All",fn:"ribbonExpand(false)",dimIf:()=>!activeCont},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5"/><path d="M5 8l2 2 4-3"/></svg>',label:"Vol. Check",fn:"toast('Volume conservation verified ✓')",dimIf:()=>!activeCont},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="10" height="14" rx="1"/><path d="M5 5h6M5 8h4"/><path d="M9 1v4h5"/></svg>',label:"Trace PDF",fn:"toast('Generating trace PDF…')",dimIf:()=>!activeCont},
    ]},
  ]},
  quality:{ctx:true,label:"CONTRACT TOOLS",groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l2 2"/></svg>',label:"Labs Roster",fn:"openBackstage('quality')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8h12M8 2v12"/></svg>',label:"Challenge",fn:"toast('Challenge window: 7 days post-result')"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="6" height="10" rx="1"/><rect x="9" y="3" width="6" height="10" rx="1"/></svg>',label:"Compare",fn:"toast('Compare mode — Phase 2')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 13L5 7l3 3 3-6 3 6"/></svg>',label:"Trend",fn:"toast('Score trend — Phase 2')"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12l-4 5v5l-4-2V9z"/></svg>',label:"≥85 SCA",fn:"toast('Filter ≥85 SCA')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12l-4 5v5l-4-2V9z"/></svg>',label:"≥88 SCA",fn:"toast('Filter ≥88 SCA')"},
    ]},
  ]},
  actors:{groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 3-5 6-5s6 2 6 5"/></svg>',label:"Lookup UID",fn:"openActorLookup()"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 6h6M5 9h6M5 12h4"/></svg>',label:"Open Registry",fn:"openBackstage('actors')"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 8l2 2 4-4"/></svg>',label:"Verified Only",fn:"toast('Filter: Verified tier only')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg>',label:"Related Parties",fn:"toast('Related-party graph — Phase 2')"},
    ]},
  ]},
  compliance:{groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1l5 3v4c0 3-2 5-5 7C3 13 1 11 1 8V4z"/></svg>',label:"GPS Report",fn:"toast('GPS coverage report — Phase 2')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1l5 3v4c0 3-2 5-5 7C3 13 1 11 1 8V4z"/><path d="M5 8l2 2 4-3"/></svg>',label:"EUDR Pack",fn:"toast('EUDR pack — Phase 2')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="12" height="14" rx="1"/><line x1="5" y1="5" x2="11" y2="5"/><line x1="5" y1="8" x2="11" y2="8"/><line x1="5" y1="11" x2="8" y2="11"/></svg>',label:"Audit Log",fn:"toast('Audit log — Phase 2')"},
    ]},
  ]},
  reports:{groups:[
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="10" height="14" rx="1"/><path d="M5 5h6M5 8h6M5 11h3"/><path d="M9 1v4h5"/></svg>',label:"Trace PDF",fn:"toast('Trace PDF…')",dimIf:()=>!activeCont},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="14" height="14" rx="1"/><path d="M1 5h14M5 5v10M9 5v10"/></svg>',label:"Portfolio CSV",fn:"toast('Exporting CSV…')"},
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="2"/><path d="M5 8h6M8 5v6"/></svg>',label:"Cup Report",fn:"toast('Cup report — Phase 2')"},
    ]},
    {sep:true},
    {items:[
      {icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12h12M8 2v7M5 6l3 3 3-3"/></svg>',label:"Print View",fn:"toast('Print view…')"},
    ]},
  ]},
};

function switchRTab(id,btn){
  activeRibbon=id;
  document.querySelectorAll(".rtab").forEach(t=>t.classList.remove("active"));
  if(btn)btn.classList.add("active");
  else document.getElementById("tab-"+id)?.classList.add("active");
  renderRibbon();
  // Sync detail tab for context tabs
  if(id==="contracts")switchDTab("lc",null);
  else if(id==="trace")switchDTab("trace",null);
  else if(id==="quality")switchDTab("quality",null);
}
function renderRibbon(){
  const def=RIBBON_DEFS[activeRibbon];
  if(!def)return;
  // Context strip (height must stay in sync with .ribbon.ctx-on + .app-body in styles.css)
  const strip=document.getElementById("ctx-strip");
  const stripInner=document.getElementById("ctx-strip-inner");
  const ribbon=document.getElementById("ribbon");
  if(def.ctx&&activeCont){
    strip.classList.add("show");
    stripInner.innerHTML=`<div class="ctx-label">${def.label}</div>`;
    ribbon.classList.add("ctx-on");
  } else {
    strip.classList.remove("show");
    stripInner.innerHTML="";
    ribbon.classList.remove("ctx-on");
  }
  // Ribbon body
  const rb=document.getElementById("rbody");
  let html="";
  def.groups.forEach(g=>{
    if(g.sep){html+='<div class="rdiv"></div>';return;}
    html+='<div class="rgroup">';
    g.items.forEach(it=>{
      const on=it.isOn&&it.isOn()?" on":"";
      const dim=it.dimIf&&it.dimIf()?" dim":"";
      html+=`<button class="rb${on}${dim}" onclick="${it.fn}" title="${it.label}">${it.icon}<span>${it.label}</span></button>`;
    });
    html+='</div>';
  });
  rb.innerHTML=html;
}
function updateContextTabs(){
  const c=activeCont?CONTAINERS.find(x=>x.id===activeCont):null;
  const show=!!c;
  const traceOk=c&&TRACE_OK.includes(c.status);
  const qualOk=c&&c.cup;
  document.getElementById("tab-contracts").style.display=show?"":"none";
  document.getElementById("tab-trace").style.display=traceOk?"":"none";
  document.getElementById("tab-quality").style.display=qualOk?"":"none";
  // Auto-switch ribbon to contracts when a contract is selected
  if(show&&activeRibbon==="home"){switchRTab("contracts",null);}
  else if(!show&&["contracts","trace","quality"].includes(activeRibbon)){switchRTab("home",document.getElementById("tab-home"));}
  renderRibbon();
}

// ══════════════════════════════════════════════════════ SIDEBAR ══
(()=>{
  const el=document.getElementById("exp-list");
  EXPORTERS.forEach(e=>{
    const count=CONTAINERS.filter(c=>c.exp===e.id).length;
    const btn=document.createElement("button");
    btn.className="eb"; btn.id="btn-"+e.id;
    btn.innerHTML=`<div class="edot" style="background:${e.color}"></div><span class="en">${e.short}</span><span class="ec">${count}</span>`;
    btn.onclick=()=>filterExp(e.id,btn);
    el.appendChild(btn);
  });
})();
function filterExp(id,btn){
  activeExp=id;
  document.querySelectorAll(".eb,.sb-all").forEach(b=>b.classList.remove("on"));
  (btn||document.getElementById("btn-all")).classList.add("on");
  renderView();
}
function filterSt(s,btn){
  activeSt=s;
  document.querySelectorAll(".tp").forEach(b=>b.classList.remove("on"));
  if(btn)btn.classList.add("on");
  renderView();
}
function setView(m,btn){
  viewMode=m;
  const auctionNav=document.getElementById("bsn-auction");
  if(auctionNav)auctionNav.classList.toggle("on",m==="market");
  document.getElementById("v-cards").classList.toggle("on",m==="cards");
  document.getElementById("v-timeline").classList.toggle("on",m==="timeline");
  renderView();
  renderRibbon();
}
/** Importer sidebar — open live auction / listing grid in the main canvas (closes backstage overlay). */
function openAuctionFromSidebar(btn){
  const homeTab=document.getElementById("tab-home");
  if(typeof switchRTab==="function")switchRTab("home",homeTab||null);
  document.querySelectorAll(".bs-navitem").forEach(function(b){b.classList.remove("on");});
  if(btn)btn.classList.add("on");
  const dyn=document.getElementById("bs-dynamic");
  bsOpen=false;
  if(dyn){dyn.innerHTML="";dyn.hidden=true;}
  setPortfolioWelcomeVisible(false);
  if(typeof setView==="function")setView("market",null);
}
function handleSearch(q){
  if(!q.trim()){renderView();return;}
  const fl=CONTAINERS.filter(c=>
    c.id.toLowerCase().includes(q.toLowerCase())||
    c.grade.toLowerCase().includes(q.toLowerCase())||
    EXPORTERS.find(e=>e.id===c.exp)?.short.toLowerCase().includes(q.toLowerCase())
  );
  renderFilteredView(fl);
}

// ══════════════════════════════════════════════════════ VIEWS ════
function filtered(){
  return CONTAINERS.filter(c=>(!activeExp||c.exp===activeExp)&&(!activeSt||c.status===activeSt));
}
function renderView(){renderFilteredView(filtered());}
function renderFilteredView(fl){
  if(viewMode==="market")renderMarket();
  else if(viewMode==="timeline")renderTL(fl);
  else renderGrid(fl);
  updateStatusBar();
}

/* L4 INJECT */
// Bake live end timestamps + LISTED lot mapping (v12)
(function(){
  const M=6e4,H=60*M,D=24*H;
  const demoEnds={
    "LIST-ENG-0007":30*M,
    "LIST-ENG-0042":28*M,
    "LIST-SEL-0019":D+5*H,
    "LIST-REV-0003":2*H+40*M,
    "LIST-IOI-0042":3*D,
    "LIST-RFQ-0118":6*D+12*H,
  };
  for(const k in demoEnds){if(LISTINGS[k])LISTINGS[k].endsAt=Date.now()+demoEnds[k];}
  // Mark referenced lots as LISTED
  for(const k in LISTINGS){const L=LISTINGS[k];if(L.lot&&L.state==="LIVE"){const c=CONTAINERS.find(x=>x.exp===L.lot||x.id===L.lot);if(c)c.listed=k;}}
  // English auction config
  if(LISTINGS["LIST-ENG-0007"]){LISTINGS["LIST-ENG-0007"].minIncrementUSD=0.05;LISTINGS["LIST-ENG-0007"].antiSnipingMin=5;LISTINGS["LIST-ENG-0007"].hardCapMin=30;LISTINGS["LIST-ENG-0007"].bidHistory=[{actor:"Buyer #A4",amount:4.80,when:"2h ago"},{actor:"Buyer #B1",amount:4.95,when:"1h ago"},{actor:"Buyer #C7",amount:5.05,when:"45m ago"},{actor:"Buyer #A4",amount:5.15,when:"22m ago"},{actor:"Buyer #B1",amount:5.25,when:"8m ago"}];}
  if(LISTINGS["LIST-SEL-0019"]){LISTINGS["LIST-SEL-0019"].sealedBids=5;}
  if(LISTINGS["LIST-ENG-0042"]){LISTINGS["LIST-ENG-0042"].minIncrementUSD=0.05;LISTINGS["LIST-ENG-0042"].antiSnipingMin=5;LISTINGS["LIST-ENG-0042"].hardCapMin=30;LISTINGS["LIST-ENG-0042"].bidHistory=[{actor:"Buyer #K3",amount:4.20,when:"3h ago"},{actor:"Buyer #L8",amount:4.35,when:"1h ago"},{actor:"Buyer #M1",amount:4.55,when:"25m ago"}];}
  if(LISTINGS["LIST-REV-0003"]){LISTINGS["LIST-REV-0003"].bidHistory=[{actor:"Seller #X1",amount:5.95,when:"3h ago"},{actor:"Seller #Y2",amount:5.85,when:"2h ago"},{actor:"Seller #Z4",amount:5.80,when:"1h ago"},{actor:"Seller #X1",amount:5.75,when:"30m ago"},{actor:"Seller #W7",amount:5.70,when:"10m ago"}];}
  if(LISTINGS["LIST-RFQ-0118"]){LISTINGS["LIST-RFQ-0118"].bidHistory=[{actor:"Exporter #M2",amount:3.25,when:"5h ago"},{actor:"Exporter #N5",amount:3.40,when:"3h ago"},{actor:"Exporter #P1",amount:3.55,when:"1h ago"},{actor:"Exporter #M2",amount:3.70,when:"20m ago"}];}
})();





// ═══════════════════════════════════════════════════ RISK & MARKET MONITORING ══

// Market data feeds — static snapshot (Layer 9 v1 Option A)
// Real values approximating April 2026 post-liberalization reality
const MARKET_DATA={
  "NYC_ARABICA":{label:"NY-C Arabica",unit:"¢/lb",value:378.25,delta:+2.75,source:"ICE",scope:"International specialty benchmark",updated:"14 Apr 2026 13:42 EAT"},
  "LONDON_ROBUSTA":{label:"London Robusta",unit:"$/tonne",value:4285,delta:-18,source:"ICE Europe",scope:"International robusta benchmark",updated:"14 Apr 2026 13:40 EAT"},
  "USD_ETB":{label:"USD/ETB",unit:"ETB",value:156.00,delta:+0.20,source:"NBE interbank",scope:"Primary FX reference",updated:"14 Apr 2026 14:00 EAT"},
  "EUR_USD":{label:"EUR/USD",unit:"USD",value:1.083,delta:-0.002,source:"Refinitiv",scope:"Cross-rate",updated:"14 Apr 2026 13:55 EAT"},
  "DIFF_ETH_Y":{label:"Yirgacheffe Differential",unit:"¢/lb",value:+125,delta:+3,source:"Platform index",scope:"Ethiopian specialty differential to NY-C",updated:"14 Apr 2026 12:00 EAT"},
  "DIFF_ETH_L":{label:"Limu Differential",unit:"¢/lb",value:+85,delta:+1,source:"Platform index",scope:"Ethiopian specialty differential to NY-C",updated:"14 Apr 2026 12:00 EAT"},
  "WEATHER_KAFFA":{label:"Weather Index (Kaffa Zone)",unit:"index",value:0.94,delta:-0.01,source:"Ethiopian Met Institute",scope:"0.0-1.0 scale, 1.0 = optimal",updated:"14 Apr 2026 06:00 EAT"},
  "SHIPPING_DJIB":{label:"Djibouti→EU FCL",unit:"$/FCL",value:2850,delta:-75,source:"Baltic Exchange",scope:"40ft container freight",updated:"14 Apr 2026 09:00 EAT"},
  "SANCTIONS_OFAC":{label:"OFAC SDN sync",unit:"entries",value:13742,delta:+8,source:"OpenSanctions",scope:"Daily sync, last push 14 Apr 06:00",updated:"14 Apr 2026 06:00 EAT"}
};
const MARKET_DATA_ORDER=["NYC_ARABICA","LONDON_ROBUSTA","USD_ETB","EUR_USD","DIFF_ETH_Y","DIFF_ETH_L","WEATHER_KAFFA","SHIPPING_DJIB","SANCTIONS_OFAC"];

// Anomaly flag registry (append-only)
const ANOMALY_FLAGS={};
const FLAG_STATE_LABEL={OPEN:"Open",REVIEWING:"Reviewing",CLEARED:"Cleared",CONFIRMED:"Confirmed"};
const FLAG_STATE_COLOR={OPEN:"#c44",REVIEWING:"#A87832",CLEARED:"#5a8a3a",CONFIRMED:"#a04040"};
const FLAG_TRANSITIONS={OPEN:["REVIEWING","CLEARED","CONFIRMED"],REVIEWING:["CLEARED","CONFIRMED"],CLEARED:[],CONFIRMED:[]};

// Severity tiers per spec
const ALERT_SEVERITY={
  INFO:{label:"Info",color:"#5a8a3a",priority:1,channels:["in-app"]},
  WARN:{label:"Warning",color:"#A87832",priority:2,channels:["in-app","email"]},
  HIGH:{label:"High",color:"#c44",priority:3,channels:["in-app","email","SMS"]},
  CRITICAL:{label:"Critical",color:"#a04040",priority:4,channels:["in-app","email","SMS","push"]},
  EMERGENCY:{label:"Emergency",color:"#7a0000",priority:5,channels:["all","regulator-direct"]}
};

// Pattern library — describes what each detector looks for
const FRAUD_PATTERNS={
  "WEIGHT_MISMATCH":{label:"Weight Mismatch",category:"Anomaly",desc:"Declared vs received weight delta exceeds tolerance",active:true},
  "YIELD_IMPOSSIBLE":{label:"Yield Impossibility",category:"Anomaly",desc:"Cherry → parchment conversion outside 15-19% biological range",active:true},
  "MARGIN_BREACH":{label:"Margin Threshold Breach",category:"Risk",desc:"Active margin position breached maintenance threshold",active:true},
  "SANCTIONS_HIT":{label:"Sanctions List Match",category:"Compliance",desc:"Actor matched against OFAC/EU/UN sanctions list",active:true},
  "DUPLICATE_GPS":{label:"Duplicate GPS Coordinates",category:"Fraud",desc:"Two or more farms share identical lat/lon",active:true},
  "CIRCULAR_TRADE":{label:"Circular Trade (A→B→C→A)",category:"Surveillance",desc:"Same lot cycling between related actors",active:true,surveillance:true},
  "WASH_TRADING":{label:"Wash Trading",category:"Surveillance",desc:"Self-dealing across multi-role actors, no genuine counterparty change",active:true,surveillance:true},
  "CORNERING":{label:"Market Cornering",category:"Surveillance",desc:"Single actor holds >40% of outstanding supply in a grade",active:true,surveillance:true},
  "SPOOFING":{label:"Auction Spoofing",category:"Surveillance",desc:"Bids placed and withdrawn to manipulate price discovery",active:false},
  "IMPOSSIBLE_TRAVEL":{label:"Impossible Travel",category:"Fraud",desc:"Custody events at distant locations in insufficient time",active:false},
  "RAPID_CUSTODY":{label:"Rapid Custody Hopping",category:"Fraud",desc:"Lot passes through many hands in short window (layering signal)",active:false},
  "RELATED_PARTY":{label:"Undeclared Related-Party Cluster",category:"Fraud",desc:"Graph clustering suggests undeclared ownership links",active:false}
};

// Sanctions mock list — deliberately fake names that won't collide with real people
const SANCTIONS_MOCK=[
  {name:"Abel Gulo Limited",list:"OFAC SDN",reason:"Coffee sector front (mock)",added:"12 Jan 2025"},
  {name:"Mersa Export Co",list:"EU Consolidated",reason:"Sanctions evasion (mock)",added:"03 Mar 2025"},
  {name:"Red Harbor PLC",list:"UN 1267",reason:"Terrorism financing (mock)",added:"22 Feb 2025"}
];

// Reputation dimensions — 8 per spec
const REPUTATION_DIMS=[
  {key:"txn",label:"Transaction Volume",max:100},
  {key:"default",label:"Default History",max:100},
  {key:"quality",label:"Quality Consistency",max:100},
  {key:"delivery",label:"Delivery Reliability",max:100},
  {key:"dispute",label:"Dispute Record",max:100},
  {key:"weight",label:"Weight Declaration Accuracy",max:100},
  {key:"bilateral",label:"Counterparty Bilateral Rating",max:100},
  {key:"bankins",label:"Bank/Insurer Feedback",max:100}
];

// Seeded reputation scores for key actors — per-dimension
// Kaffa Trading = strong across board, moderate dispute record (one open dispute)
// Moyee = very strong, Sidama Highland = strong, Wondimu (ACT-AGG-022) = weak (sanctions hit, wash trading)
const REPUTATION_SCORES={
  "ACT-EXP-MAIN":{txn:78,default:95,quality:88,delivery:92,dispute:85,weight:94,bilateral:87,bankins:90},
  "ACT-EXP-002":{txn:92,default:98,quality:94,delivery:95,dispute:92,weight:96,bilateral:93,bankins:95},
  "ACT-EXP-014":{txn:85,default:97,quality:96,delivery:93,dispute:90,weight:95,bilateral:91,bankins:94},
  "ACT-AGG-022":{txn:55,default:48,quality:62,delivery:58,dispute:42,weight:54,bilateral:50,bankins:38},
  "ACT-UNI-OCFCU":{txn:96,default:99,quality:90,delivery:94,dispute:93,weight:92,bilateral:95,bankins:97},
  "ACT-UNI-SCFCU":{txn:82,default:96,quality:89,delivery:91,dispute:88,weight:90,bilateral:89,bankins:92}
};

// ─── Flag creation: single mutation point ──────────────────
function flagCreate(patternKey,severity,targetType,targetId,detail,confidence){
  const pattern=FRAUD_PATTERNS[patternKey];
  if(!pattern){console.warn("flagCreate: unknown pattern",patternKey);return null;}
  const sev=ALERT_SEVERITY[severity];
  if(!sev){console.warn("flagCreate: unknown severity",severity);return null;}
  const flagId="FLG-"+String(Object.keys(ANOMALY_FLAGS).length+4001).padStart(4,"0");
  ANOMALY_FLAGS[flagId]={
    id:flagId,
    pattern:patternKey,
    patternLabel:pattern.label,
    category:pattern.category,
    severity:severity,
    targetType:targetType,
    targetId:targetId,
    detail:detail||pattern.desc,
    confidence:confidence||0.75,
    state:"OPEN",
    createdAt:Date.now(),
    acknowledged:false,
    history:[{ts:Date.now(),event:"FLAG_OPENED",detail:detail||pattern.desc}]
  };
  return flagId;
}

function flagSetState(flagId,newState,detail){
  const f=ANOMALY_FLAGS[flagId];
  if(!f){console.warn("flagSetState: not found",flagId);return false;}
  const allowed=FLAG_TRANSITIONS[f.state]||[];
  if(allowed.indexOf(newState)<0){
    console.warn("flagSetState: illegal transition",f.state,"->",newState);return false;
  }
  f.state=newState;
  f.history.push({ts:Date.now(),event:newState,detail:detail||FLAG_STATE_LABEL[newState]});
  return true;
}

// ─── Detectors (5 active + 3 surveillance) ──────────────────
// Each returns array of flag IDs created

function detectWeightMismatch(){
  // Scan CONTAINERS for declared vs received weight deltas >3% tolerance
  const created=[];
  if(typeof CONTAINERS==="undefined")return created;
  CONTAINERS.forEach(function(c){
    if(!c.declaredWeight||!c.kg)return;
    const delta=Math.abs(c.kg-c.declaredWeight)/c.declaredWeight;
    if(delta>0.03){
      const pct=(delta*100).toFixed(1);
      const fid=flagCreate("WEIGHT_MISMATCH","WARN","lot",c.id,
        "Declared "+c.declaredWeight.toLocaleString()+" kg vs received "+c.kg.toLocaleString()+" kg ("+pct+"% delta)",0.85);
      if(fid)created.push(fid);
    }
  });
  return created;
}

function detectYieldImpossible(){
  // Scan for cherry-to-parchment conversions outside 15-19% biological range
  // In this simulator we don't have live conversion events, so seed a demo flag
  // against a known aggregated lot in CONTAINERS that has a suspicious yield declaration
  const created=[];
  if(typeof CONTAINERS==="undefined")return created;
  // Seed: pretend one specific lot came from a reported cherry intake that implies ~22% yield
  const demoLot=CONTAINERS.find(function(c){return c.id&&c.id.indexOf("EXP-0087")>=0;});
  if(demoLot){
    const fid=flagCreate("YIELD_IMPOSSIBLE","HIGH","lot",demoLot.id,
      "Reported cherry intake 76,000 kg → parchment 17,400 kg implies 22.9% yield (biological range: 15-19%). Declaration may be inflated.",0.92);
    if(fid)created.push(fid);
  }
  return created;
}

function detectMarginBreach(){
  // Scan FINANCING positions — flag if drawnUSD/creditLineUSD > 0.85 (approaching threshold)
  // or > 0.95 (breach)
  const created=[];
  if(typeof FINANCING==="undefined")return created;
  Object.values(FINANCING).forEach(function(f){
    if(!f.creditLineUSD)return;
    const util=f.drawnUSD/f.creditLineUSD;
    if(util>=0.95){
      const fid=flagCreate("MARGIN_BREACH","CRITICAL","financing",f.contractId,
        "Utilization "+(util*100).toFixed(1)+"% · breached maintenance threshold · auto-margin-call pending",0.99);
      if(fid)created.push(fid);
    }else if(util>=0.85){
      const fid=flagCreate("MARGIN_BREACH","WARN","financing",f.contractId,
        "Utilization "+(util*100).toFixed(1)+"% · approaching threshold (5% above maintenance)",0.88);
      if(fid)created.push(fid);
    }
  });
  return created;
}

function detectSanctionsHit(){
  // Match ACTOR_REGISTRY names against SANCTIONS_MOCK
  const created=[];
  if(typeof ACTOR_REGISTRY==="undefined")return created;
  Object.entries(ACTOR_REGISTRY).forEach(function(e){
    const uid=e[0],actor=e[1];
    if(!actor.name)return;
    const hit=SANCTIONS_MOCK.find(function(s){return actor.name.toLowerCase().indexOf(s.name.toLowerCase())>=0;});
    if(hit){
      const fid=flagCreate("SANCTIONS_HIT","CRITICAL","actor",uid,
        "Match against "+hit.list+" · "+hit.reason+" · added "+hit.added,0.98);
      if(fid)created.push(fid);
    }
  });
  return created;
}

function detectDuplicateGPS(){
  // Scan farm records for identical GPS coordinates
  // In this simulator most farms are in FARM_REGISTRY which has lat/lon strings
  const created=[];
  if(typeof FARM_REGISTRY==="undefined")return created;
  const gpsIndex={};
  Object.entries(FARM_REGISTRY).forEach(function(e){
    const uid=e[0],farm=e[1];
    if(!farm.geo)return;
    const key=farm.geo.replace(/\s+/g,"");
    if(!gpsIndex[key])gpsIndex[key]=[];
    gpsIndex[key].push(uid);
  });
  Object.entries(gpsIndex).forEach(function(e){
    const key=e[0],uids=e[1];
    if(uids.length>1){
      const fid=flagCreate("DUPLICATE_GPS","HIGH","farm",uids[0],
        "Identical GPS coordinates ("+key+") declared by "+uids.length+" farms: "+uids.join(", "),0.96);
      if(fid)created.push(fid);
    }
  });
  return created;
}

// ─── Surveillance detectors (detection only, no investigation workflow) ──

function detectCircularTrade(){
  // Look for lots whose custody chain passes through an actor more than once
  // In this simulator we don't have full custody chains, so this is a pattern-library-only entry
  // with one seeded demo flag if conditions are met
  return [];  // no-op for v1, detection surface is ready
}

function detectWashTrading(){
  // Self-dealing: aggregator role consolidating >50% from farmer role owned by same actor
  // Seed one demo flag if a multi-role actor exists with aggregation events
  return [];
}

function detectCornering(){
  // Single-actor dominance: one seller holds >40% of live listings in a grade
  const created=[];
  if(typeof LISTINGS==="undefined")return created;
  const gradeBySeller={};
  Object.values(LISTINGS).forEach(function(L){
    if(L.state!=="LIVE"||!L.seller||!L.grade)return;
    const grade=L.grade.split(" ")[0];  // first word = region
    if(!gradeBySeller[grade])gradeBySeller[grade]={};
    gradeBySeller[grade][L.seller]=(gradeBySeller[grade][L.seller]||0)+(L.weight||0);
  });
  Object.entries(gradeBySeller).forEach(function(e){
    const grade=e[0],bySeller=e[1];
    const total=Object.values(bySeller).reduce(function(a,b){return a+b;},0);
    if(total<50000)return;  // need meaningful volume to call it cornering
    Object.entries(bySeller).forEach(function(se){
      const seller=se[0],weight=se[1];
      if(weight/total>0.40){
        const fid=flagCreate("CORNERING","WARN","actor",seller,
          "Holds "+((weight/total)*100).toFixed(0)+"% of live "+grade+" listings ("+weight.toLocaleString()+"/"+total.toLocaleString()+" kg)",0.72);
        if(fid)created.push(fid);
      }
    });
  });
  return created;
}

// ─── Master runner: invoked once at boot to populate ANOMALY_FLAGS ──
// Note: in Layer 9 v1 (static snapshot / Option A), the real detectors below
// would produce zero flags against the current seeded data because CONTAINERS
// don't have declaredWeight fields, no active FINANCING positions exist, no
// actor names match the sanctions mock list, etc. The real detectors stay wired
// (they'd fire in production). Below the real-detector calls we seed 8 demo
// flags so the Command Center has realistic content to display.
function runAllDetectors(){
  // Real detectors (return zero flags against current seeded data)
  detectWeightMismatch();
  detectYieldImpossible();
  detectMarginBreach();
  detectSanctionsHit();
  detectDuplicateGPS();
  detectCircularTrade();
  detectWashTrading();
  detectCornering();
  // Demo flags — seeded to demonstrate the 5 active detectors + 2 surveillance
  seedDemoFlags();
}

// Demo flag seeder — produces 8 realistic flags that populate the Command Center
// These represent what the detectors WOULD find in a real production dataset
function seedDemoFlags(){
  // 1. Weight mismatch — WARN — against an aggregated lot from Wondimu Coffee Trading
  flagCreate("WEIGHT_MISMATCH","WARN","lot","AGG-WND-2209",
    "Declared 4,250 kg at dispatch from Aleta Wondo buying station vs received 4,089 kg at Hawassa mill (3.8% delta, tolerance 3.0%)",0.85);
  // 2. Yield impossibility — HIGH — implies inflated cherry intake
  flagCreate("YIELD_IMPOSSIBLE","HIGH","lot","GREEN-HWS-1844",
    "Reported cherry intake 76,000 kg → parchment 17,400 kg implies 22.9% biological yield (range: 15–19%). Declaration suggests weight inflation at washing station.",0.92);
  // 3. Margin breach — CRITICAL — against a contracted lot approaching/breaching threshold
  flagCreate("MARGIN_BREACH","CRITICAL","financing","CTR-1038",
    "Drawn $1,085,000 / line $1,100,000 = 98.6% utilization. Breached 95% maintenance threshold. Auto-margin-call issued to counterparty bank. Cure window: 48h.",0.99);
  // 4. Sanctions hit — CRITICAL — against a counterparty aggregator
  flagCreate("SANCTIONS_HIT","CRITICAL","actor","ACT-AGG-022",
    "Wondimu Coffee Trading matched against OFAC SDN list entry added 12 Jan 2025. Reason: coffee sector front entity (flagged via beneficial ownership chain). All transactions with this actor pending compliance review.",0.97);
  // 5. Duplicate GPS — HIGH — two farms sharing identical coordinates
  flagCreate("DUPLICATE_GPS","HIGH","farm","FARM-OCFCU-1832",
    "Identical GPS coordinates (7.0845°N, 36.2301°E) declared by FARM-OCFCU-1832 and FARM-OCFCU-1847. Both farms registered 2023 under different cooperatives in Gomma woreda. Fraud investigation pending.",0.94);
  // 6. Cornering — WARN — surveillance signal
  flagCreate("CORNERING","WARN","actor","ACT-EXP-014",
    "Sidama Highland Coffee S.C. holds 47% of live Sidama G1 Natural listings (3 listings totaling 52,000 kg of 111,000 kg total market volume). Single-actor dominance threshold: 40%. Note: vertical integration with own washing stations may explain concentration.",0.72);
  // 7. Wash trading — HIGH — surveillance signal (multi-role actor)
  flagCreate("WASH_TRADING","HIGH","actor","ACT-AGG-022",
    "Wondimu Coffee Trading: self-dealing detected. 63% of AGG-WND-2203 input lots were created by the same actor's farmer role (ACT-FRM-0641). Aggregation event bypasses dual-confirmation integrity guarantee. Compounds existing sanctions hit.",0.88);
  // 8. Info-level — unusual pattern, not suspicious
  flagCreate("CORNERING","INFO","actor","ACT-UNI-OCFCU",
    "Oromia Coffee Farmers Cooperative Union holds 38% of Yirgacheffe G1 Washed live volume. Below 40% cornering threshold but elevated concentration. Monitoring.",0.55);
}

// ─── Alert helpers ──────────────────
function flagAcknowledge(flagId){
  const f=ANOMALY_FLAGS[flagId];
  if(!f)return;
  f.acknowledged=true;
  f.history.push({ts:Date.now(),event:"ACKNOWLEDGED",detail:"User acknowledged alert"});
  if(typeof toast==="function")toast("Flag "+flagId+" acknowledged");
  flgShowDetail(flagId);  // refresh popover
}

// ─── Flag detail popover ──────────────
function flgShowDetail(flagId){
  const f=ANOMALY_FLAGS[flagId];if(!f)return;
  const pattern=FRAUD_PATTERNS[f.pattern]||{};
  const sev=ALERT_SEVERITY[f.severity]||{label:"?",color:"#666"};
  const stateColor=FLAG_STATE_COLOR[f.state]||"#666";
  const historyHTML=f.history.slice().reverse().map(function(h){
    return '<div style="font-family:monospace;font-size:10px;color:#c4a06a;padding:2px 0">'+
      new Date(h.ts).toISOString().slice(11,19)+' · '+h.event+' · '+h.detail+'</div>';
  }).join("");
  const ackBtn=f.acknowledged?
    '<span style="display:inline-block;padding:5px 12px;background:#5a8a3a;color:#fff;border-radius:5px;font-size:11px;font-weight:700">✓ Acknowledged</span>':
    '<button onclick="flagAcknowledge(\''+flagId+'\')" style="padding:8px 14px;background:#A87832;color:#fff;border:none;border-radius:5px;font-size:11px;font-weight:700;cursor:pointer">Acknowledge Alert</button>';
  document.getElementById("ms-pop-body").innerHTML=
    '<div style="padding:22px;max-width:560px">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:9px;color:'+sev.color+';font-weight:700;letter-spacing:.06em;text-transform:uppercase">Risk Flag · '+pattern.category+'</div><div style="font-size:20px;font-weight:800;color:var(--tx)">'+f.id+'</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">'+f.patternLabel+'</div></div><div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end"><span style="background:'+sev.color+';color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">'+sev.label+'</span><span style="background:'+stateColor+';color:#fff;padding:3px 10px;border-radius:10px;font-size:9px;font-weight:700">'+FLAG_STATE_LABEL[f.state]+'</span></div></div>'+
    '<div style="margin:14px 0;padding:12px 14px;background:#fff;border:1px solid #e5dccc;border-left:4px solid '+sev.color+';border-radius:4px;font-size:12px;color:var(--tx);line-height:1.5">'+f.detail+'</div>'+
    mgr([["Pattern",f.patternLabel],["Category",pattern.category||"—"],["Target",f.targetType+" · "+f.targetId],["Confidence",(f.confidence*100).toFixed(0)+"%"],["Delivery",(sev.channels||[]).join(", ")],["Created",new Date(f.createdAt).toLocaleString("en-GB")]])+
    '<div style="margin-top:14px;display:flex;gap:8px">'+ackBtn+'<button onclick="closeDetail();showUID(\''+f.targetId+'\')" style="padding:8px 14px;background:#fff;border:1px solid #d8cdb8;border-radius:5px;font-size:11px;color:var(--tx);cursor:pointer">View Target →</button></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-top:14px;margin-bottom:6px">Append-Only History</div>'+
    '<div style="background:#1a1208;border-radius:4px;padding:10px;max-height:120px;overflow-y:auto">'+historyHTML+'</div>'+
    '<div style="margin-top:14px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">© 2026 Ankuaru · Risk &amp; Market Monitoring · Append-only · Non-silenceable</div>'+
    '</div>';
  msPopOpenAsModal();
}

// ─── Reputation detail popover ──────────────
function repShowDetail(actorUid){
  const actor=ACTOR_REGISTRY[actorUid];
  const scores=REPUTATION_SCORES[actorUid];
  if(!actor||!scores){
    if(typeof toast==="function")toast("No reputation data for "+actorUid);
    return;
  }
  const dimBars=REPUTATION_DIMS.map(function(d){
    const score=scores[d.key]||0;
    const color=score>=90?"#5a8a3a":score>=75?"#A87832":score>=60?"#c44":"#a04040";
    return '<div style="margin-bottom:10px">'+
      '<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--tx2);margin-bottom:3px"><span>'+d.label+'</span><span style="font-family:monospace;font-weight:700;color:'+color+'">'+score+'/100</span></div>'+
      '<div style="height:6px;background:#f0e8d6;border-radius:3px;overflow:hidden"><div style="height:100%;width:'+score+'%;background:'+color+';border-radius:3px"></div></div>'+
      '</div>';
  }).join("");
  const avg=Math.round(Object.values(scores).reduce(function(a,b){return a+b;},0)/REPUTATION_DIMS.length);
  document.getElementById("ms-pop-body").innerHTML=
    '<div style="padding:22px;max-width:560px">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px"><div><div style="font-size:9px;color:#1a3a6a;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Reputation Breakdown · Multi-Dimensional</div><div style="font-size:18px;font-weight:800;color:var(--tx)">'+actor.name+'</div><div style="font-size:11px;color:var(--tx3);margin-top:2px">'+actorUid+'</div></div><div style="text-align:right"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Composite Avg</div><div style="font-size:28px;font-weight:800;color:#3a7a8a;font-family:monospace">'+avg+'</div></div></div>'+
    '<div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:14px">'+dimBars+'</div>'+
    '<div style="margin-top:10px;padding:10px 12px;background:rgba(58,122,138,.06);border-left:3px solid #3a7a8a;border-radius:4px;font-size:10px;color:var(--tx2);font-style:italic">Per-dimension visibility per Layer 9 spec · No single score shown · Event-driven updates with exponential decay · Defaults and fraud flags stick permanently</div>'+
    '</div>';
  msPopOpenAsModal();
}

// ═══════════════════════════════════════════════════════════════

// Update status bar market chip with current alert count
function refreshMarketChip(){
  const chip=document.getElementById("sb-alert-chip");
  if(!chip)return;
  const open=Object.values(ANOMALY_FLAGS).filter(function(f){return f.state==="OPEN";}).length;
  if(open>0)chip.innerHTML='⚠ <b style="color:#e8c060">'+open+'</b>';
  else chip.innerHTML='● <b style="color:#5a8a3a">OK</b>';
}
// Run detectors on boot so the status chip has data
function bootRiskLayer(){
  try{runAllDetectors();refreshMarketChip();}catch(e){console.warn("bootRiskLayer:",e.message);}
}

// ═══════════════════════════════════════════════════ INSURANCE ══
const INSURERS={
  // ── Ethiopian primary insurers — NBE/EIA licensed, on-the-ground ──
  "INS-EIC":{name:"Ethiopian Insurance Corporation",short:"EIC",type:"Domestic · Primary",role:"primary",products:["Inland Transit","Performance Bond","Trade Credit","Warehouse","Political Risk"],rating:"A- (Ethiopia)",capacity:"$50M",hq:"Addis Ababa"},
  "INS-AWASH":{name:"Awash Insurance Company",short:"Awash Ins",type:"Domestic · Primary",role:"primary",products:["Inland Transit","Quality Deviation","Warehouse","Performance Bond"],rating:"A- (Ethiopia)",capacity:"$25M",hq:"Addis Ababa"},
  "INS-NYALA":{name:"Nyala Insurance S.C.",short:"Nyala",type:"Domestic · Primary",role:"primary",products:["Inland Transit","Performance Bond","Parametric Weather","Warehouse"],rating:"A- (Ethiopia)",capacity:"$30M",hq:"Addis Ababa"},
  "INS-UNITED":{name:"United Insurance Company",short:"United",type:"Domestic · Primary",role:"primary",products:["Inland Transit","Quality Deviation","Warehouse"],rating:"A- (Ethiopia)",capacity:"$20M",hq:"Addis Ababa"},
  // ── International reinsurers — backend capacity only, not counterparty-facing ──
};


// Product catalog — sits behind the policy creation logic
const INSURANCE_PRODUCTS={
  // ── Domestic-leg covers (Ethiopian primary insurers) ──
  "INLAND_TRANSIT":{label:"Inland Transit (domestic leg)",mandatory:true,capPct:1.05,deductiblePct:0.02,slaDays:14,triggerType:"claim",leg:"domestic",desc:"Truck transit cover: mill → dry port → Djibouti border. Ethiopian primary insurer."},
  "PERFORMANCE":{label:"Performance Bond",mandatory:true,capPct:0.20,deductiblePct:0.03,slaDays:30,triggerType:"claim",leg:"domestic",desc:"Bridges regional prepayment gap; seller non-delivery bond. Ethiopian primary insurer."},
  "WAREHOUSE":{label:"Warehouse / Storage",mandatory:false,capPct:1.00,deductiblePct:0.05,slaDays:30,triggerType:"claim",leg:"domestic",desc:"Fire, theft, spoilage at mill/warehouse. Ethiopian primary insurer."},
  "QUALITY":{label:"Quality Deviation",mandatory:false,capPct:0.25,deductiblePct:0.05,slaDays:30,triggerType:"claim",leg:"domestic",desc:"Cup score delta beyond contract tolerance. Ethiopian primary insurer."},
  "WEATHER":{label:"Parametric Weather",mandatory:false,capPct:0.30,deductiblePct:0.00,slaDays:3,triggerType:"parametric",leg:"domestic",desc:"Farmer-level pre-harvest; satellite-triggered drought/flood. Ethiopian primary insurer."},
  // ── International-leg covers (Ethiopian primary, reinsured internationally) ──
};


const POLICIES={};
const CLAIMS={};
const POL_STATE_LABEL={DRAFT:"Draft",QUOTED:"Quoted",BOUND:"Bound",ACTIVE:"Active",EXPIRED:"Expired",CANCELLED:"Cancelled"};
const POL_STATE_COLOR={DRAFT:"#9a7a3a",QUOTED:"#A87832",BOUND:"#3a7a8a",ACTIVE:"#1a3a6a",EXPIRED:"#666",CANCELLED:"#a04040"};
const POL_TRANSITIONS={DRAFT:["QUOTED","CANCELLED"],QUOTED:["BOUND","CANCELLED"],BOUND:["ACTIVE","CANCELLED"],ACTIVE:["EXPIRED","CANCELLED"],EXPIRED:[],CANCELLED:[]};

const CLM_STATE_LABEL={FILED:"Filed",UNDER_REVIEW:"Under Review",APPROVED:"Approved",DECLINED:"Declined",PAID:"Paid",DISPUTED:"Disputed"};
const CLM_STATE_COLOR={FILED:"#9a7a3a",UNDER_REVIEW:"#A87832",APPROVED:"#3a7a8a",DECLINED:"#a04040",PAID:"#1a3a6a",DISPUTED:"#a04040"};
const CLM_TRANSITIONS={FILED:["UNDER_REVIEW","DECLINED"],UNDER_REVIEW:["APPROVED","DECLINED"],APPROVED:["PAID","DISPUTED"],PAID:["DISPUTED"],DECLINED:["DISPUTED"],DISPUTED:["APPROVED","DECLINED"]};

// Premium calculation — simple model based on product risk + contract notional.
// Real system uses insurer pricing APIs; simulator approximates.
function polCalcPremium(productKey,notionalUSD,contract){
  const prod=INSURANCE_PRODUCTS[productKey];
  if(!prod)return 0;
  const baseRates={MARINE:0.0045,PERFORMANCE:0.009,CREDIT:0.012,POLITICAL:0.015,QUALITY:0.008,WEATHER:0.035,WAREHOUSE:0.006};
  let rate=baseRates[productKey]||0.01;
  // Risk adjustments: unsampled lots cost more, verified actors cost less
  const lot=CONTAINERS.find(function(x){return x.id===(contract&&contract.lot)||x.exp===(contract&&contract.lot);});
  if(lot&&!lot.cup)rate*=1.15;
  if(lot&&lot.cup>=85)rate*=0.90;
  return Math.round(notionalUSD*prod.capPct*rate);
}

// polCreate — defensive; returns null on missing contract or invalid product
function polCreate(ctrId,productKey,insurerId,isMandatory){
  const c=CONTRACTS[ctrId];
  if(!c){console.warn("polCreate: contract not found",ctrId);return null;}
  const prod=INSURANCE_PRODUCTS[productKey];
  if(!prod){console.warn("polCreate: product not found",productKey);return null;}
  const insurer=INSURERS[insurerId];
  if(!insurer){console.warn("polCreate: insurer not found",insurerId);return null;}
  // Primary-only rule: every policy must be ISSUED by an Ethiopian primary insurer.
  if(insurer.role!=="primary"){console.warn("polCreate: only primary insurers can issue policies",insurerId);return null;}
  const polId="POL-"+String(Object.keys(POLICIES).length+7001).padStart(4,"0");
  const notional=Math.round(c.weight*c.price/0.453592);
  const premium=polCalcPremium(productKey,notional,c);
  const deductible=Math.round(notional*prod.deductiblePct);
  const cap=Math.round(notional*prod.capPct);
  // International-leg products get reinsured per the primary insurer's backend relationships
  const reinsuredWith=prod.leg==="international"?(insurer.reinsurers||[]):[];
  POLICIES[polId]={
    id:polId,contractId:ctrId,productKey,
    productLabel:prod.label,
    insurerId,insurerName:insurer.name,
    reinsuredWith:reinsuredWith,
    leg:prod.leg,
    state:"BOUND",
    mandatory:!!isMandatory,
    notional,premium,deductible,cap,
    premiumPayer:prod.mandatory?"Seller (auto)":"Contract-declared",
    triggerType:prod.triggerType,
    slaDays:prod.slaDays,
    createdAt:Date.now(),
    history:[{ts:Date.now(),event:"POLICY_BOUND",detail:prod.label+" · "+insurer.short+" · premium $"+premium.toLocaleString()+(reinsuredWith.length?" · reinsured":"")}]
  };
  c.history.push({ts:Date.now(),event:"INSURANCE_ATTACHED",detail:polId+" · "+prod.label+" · "+insurer.short});
  return polId;
}

// polSetState — single mutation point. Rejects illegal transitions.
function polSetState(polId,newState,detail){
  const p=POLICIES[polId];
  if(!p){console.warn("polSetState: not found",polId);return false;}
  const allowed=POL_TRANSITIONS[p.state]||[];
  if(allowed.indexOf(newState)<0){
    console.warn("polSetState: illegal transition",p.state,"->",newState);return false;
  }
  p.state=newState;
  p.history.push({ts:Date.now(),event:newState,detail:detail||POL_STATE_LABEL[newState]});
  return true;
}

// Auto-attach mandatory insurance at contract activation.
// Called from ctrAdvance when bankProgress===5 (Insurance auto-attach step).
function ctrAutoAttachInsurance(ctrId){
  const c=CONTRACTS[ctrId];
  if(!c)return;
  // v24: domestic-only platform. Every activated contract gets:
  //   - Inland Transit (mandatory)
  //   - Performance Bond (mandatory)
  // Optional products (Warehouse, Quality, Weather) attach only when contract-declared.
  const primaries=["INS-EIC","INS-AWASH","INS-NYALA","INS-UNITED"];
  const seed=Object.keys(POLICIES).length;
  const primaryInsurer=primaries[seed%primaries.length];
  polCreate(ctrId,"INLAND_TRANSIT",primaryInsurer,true);
  polCreate(ctrId,"PERFORMANCE",primaryInsurer,true);
}

// Claim helpers
function clmCreate(polId,reason,amountRequested){
  const p=POLICIES[polId];
  if(!p){console.warn("clmCreate: policy not found",polId);return null;}
  const clmId="CLM-"+String(Object.keys(CLAIMS).length+9001).padStart(4,"0");
  const amt=Math.min(amountRequested||Math.round(p.cap*0.5),p.cap);
  CLAIMS[clmId]={
    id:clmId,policyId:polId,contractId:p.contractId,
    state:"FILED",
    reason:reason||"Non-delivery",
    amountRequested:amt,
    amountPaid:0,
    filedAt:Date.now(),
    slaDays:p.slaDays,
    history:[{ts:Date.now(),event:"CLAIM_FILED",detail:reason+" · amount $"+amt.toLocaleString()}]
  };
  p.history.push({ts:Date.now(),event:"CLAIM_FILED_ON_POLICY",detail:clmId});
  return clmId;
}

function clmSetState(clmId,newState,detail){
  const cl=CLAIMS[clmId];
  if(!cl){console.warn("clmSetState: not found",clmId);return false;}
  const allowed=CLM_TRANSITIONS[cl.state]||[];
  if(allowed.indexOf(newState)<0){
    console.warn("clmSetState: illegal transition",cl.state,"->",newState);return false;
  }
  cl.state=newState;
  cl.history.push({ts:Date.now(),event:newState,detail:detail||CLM_STATE_LABEL[newState]});
  if(newState==="PAID")cl.amountPaid=cl.amountRequested;
  return true;
}

function clmAdvance(clmId){
  const cl=CLAIMS[clmId];
  if(!cl)return;
  const next={FILED:"UNDER_REVIEW",UNDER_REVIEW:"APPROVED",APPROVED:"PAID"};
  const target=next[cl.state];
  if(!target){toast("No further advance possible from "+cl.state);return;}
  clmSetState(clmId,target,target==="UNDER_REVIEW"?"Insurer acknowledges claim":target==="APPROVED"?"Loss verified by insurer":"Payout released to payee");
  clmShowDetail(clmId);
}

// Policy detail view
function polShowDetail(polId){
  const p=POLICIES[polId];if(!p)return;
  const prod=INSURANCE_PRODUCTS[p.productKey]||{};
  const insurer=INSURERS[p.insurerId]||{name:p.insurerName};
  const stateColor=POL_STATE_COLOR[p.state]||"#666";
  const fmt=function(v){return "$"+v.toLocaleString();};
  const triggerBadge=p.triggerType==="parametric"?'<span style="background:#c4a06a;color:#1a1208;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em">PARAMETRIC</span>':'<span style="background:#d8cdb8;color:#5a4a3a;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em">CLAIM-BASED</span>';
  const legBadge=p.leg==="international"?'<span style="background:#1a3a6a;color:#fff;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em">INTL LEG</span>':'<span style="background:#5a8a3a;color:#fff;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em">DOMESTIC LEG</span>';
  const reinsuredBlock=(p.reinsuredWith&&p.reinsuredWith.length)?'<div style="margin-top:10px;padding:10px 12px;background:rgba(26,58,106,.06);border-left:3px solid #1a3a6a;border-radius:4px;font-size:11px;color:var(--tx2)"><b>Reinsured capacity:</b> '+p.reinsuredWith.map(function(rid){var r=INSURERS[rid]||{};return r.short||rid;}).join(", ")+' · <span style="color:var(--tx3);font-style:italic">Backend relationship — primary insurer retains counterparty role</span></div>':"";
  const relatedClaims=Object.values(CLAIMS).filter(function(cl){return cl.policyId===polId;});
  const claimsBlock=relatedClaims.length?'<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-top:14px;margin-bottom:6px">Claims Against This Policy</div>'+relatedClaims.map(function(cl){return '<div onclick="clmShowDetail(\''+cl.id+'\')" style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px;margin-bottom:4px;cursor:pointer;display:flex;justify-content:space-between;font-size:11px"><span style="font-family:monospace;font-weight:700">'+cl.id+'</span><span style="background:'+(CLM_STATE_COLOR[cl.state]||"#666")+';color:#fff;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700">'+CLM_STATE_LABEL[cl.state]+'</span></div>';}).join(""):"";
  const history=p.history.slice().reverse().map(function(h){return '<div style="font-family:monospace;font-size:10px;color:#c4a06a;padding:2px 0">'+new Date(h.ts).toISOString().slice(11,19)+' · '+h.event+' · '+h.detail+'</div>';}).join("");
  document.getElementById("ms-pop-body").innerHTML=
    '<div style="padding:22px;max-width:560px">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:9px;color:#1a3a6a;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Policy · '+(p.mandatory?"Mandatory Auto-Attached":"Optional")+'</div><div style="font-size:20px;font-weight:800;color:var(--tx)">'+p.id+'</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">'+p.productLabel+'</div></div><div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end"><span style="background:'+stateColor+';color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">'+POL_STATE_LABEL[p.state]+'</span>'+legBadge+triggerBadge+'</div></div>'+
    reinsuredBlock+
    '<div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:12px 14px;margin:14px 0">'+
    '<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Coverage Economics</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
    '<div><div style="font-size:9px;color:var(--tx3)">Notional</div><div style="font-size:14px;font-weight:700;font-family:monospace">'+fmt(p.notional)+'</div></div>'+
    '<div><div style="font-size:9px;color:var(--tx3)">Cap</div><div style="font-size:14px;font-weight:700;font-family:monospace;color:#3a7a8a">'+fmt(p.cap)+' <span style="font-size:9px;color:var(--tx3)">('+(prod.capPct*100).toFixed(0)+'%)</span></div></div>'+
    '<div><div style="font-size:9px;color:var(--tx3)">Premium</div><div style="font-size:14px;font-weight:700;font-family:monospace;color:#A87832">'+fmt(p.premium)+'</div></div>'+
    '<div><div style="font-size:9px;color:var(--tx3)">Deductible</div><div style="font-size:14px;font-weight:700;font-family:monospace;color:#a04040">'+fmt(p.deductible)+' <span style="font-size:9px;color:var(--tx3)">('+(prod.deductiblePct*100).toFixed(1)+'%)</span></div></div>'+
    '</div></div>'+
    mgr([["Insurer",insurer.name],["Product",prod.desc||p.productLabel],["Contract",p.contractId],["Premium Payer",p.premiumPayer],["Trigger",p.triggerType==="parametric"?"Automatic (satellite/event feed)":"Claim-based (manual filing)"],["Settlement SLA",p.slaDays+" days"]])+
    claimsBlock+
    '<div style="display:flex;gap:8px;margin-top:14px"><button onclick="polFileClaimPrompt(\''+polId+'\')" style="flex:1;padding:10px;background:#a04040;color:#fff;border:none;border-radius:5px;font-size:12px;font-weight:700;cursor:pointer">File Claim</button><button onclick="closeDetail();showUID(\''+p.contractId+'\')" style="flex:1;padding:10px;background:#fff;border:1px solid #d8cdb8;border-radius:5px;font-size:12px;color:var(--tx);cursor:pointer">View Contract</button></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-top:14px;margin-bottom:6px">Append-Only History</div>'+
    '<div style="background:#1a1208;border-radius:4px;padding:10px;max-height:120px;overflow-y:auto">'+history+'</div>'+
    '<div style="margin-top:14px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">© 2026 Ankuaru · Track &amp; Trade · Insurer approves · Platform orchestrates</div>'+
    '</div>';
  msPopOpenAsModal();
}

// Claim filing — minimal prompt, could be expanded to a proper wizard later
function polFileClaimPrompt(polId){
  const p=POLICIES[polId];if(!p)return;
  const reason=prompt("Reason for claim (e.g. Marine cargo damage, Non-delivery, Quality dispute):","Non-delivery past cure window");
  if(!reason)return;
  const clmId=clmCreate(polId,reason,null);
  if(clmId){toast("Claim "+clmId+" filed · SLA "+p.slaDays+" days");clmShowDetail(clmId);}
}

// Claim detail view
function clmShowDetail(clmId){
  const cl=CLAIMS[clmId];if(!cl)return;
  const p=POLICIES[cl.policyId]||{};
  const stateColor=CLM_STATE_COLOR[cl.state]||"#666";
  const fmt=function(v){return "$"+v.toLocaleString();};
  const lifecycle=["FILED","UNDER_REVIEW","APPROVED","PAID"].map(function(s){
    const states=["FILED","UNDER_REVIEW","APPROVED","PAID"];
    const idx=states.indexOf(s);
    const cur=states.indexOf(cl.state);
    const done=idx<cur;
    const active=idx===cur;
    return '<div style="flex:1;padding:8px;text-align:center;background:'+(done?"#5a8a3a":active?"#1a3a6a":"#fff")+';color:'+(done||active?"#fff":"#999")+';border:1px solid '+(done?"#5a8a3a":active?"#1a3a6a":"#e5dccc")+';border-radius:3px;font-size:9px;font-weight:700;text-transform:uppercase">'+(done?"✓ ":"")+CLM_STATE_LABEL[s]+'</div>';
  }).join('<div style="width:4px"></div>');
  const history=cl.history.slice().reverse().map(function(h){return '<div style="font-family:monospace;font-size:10px;color:#c4a06a;padding:2px 0">'+new Date(h.ts).toISOString().slice(11,19)+' · '+h.event+' · '+h.detail+'</div>';}).join("");
  const advanceLabel=cl.state==="FILED"?"Begin Review":cl.state==="UNDER_REVIEW"?"Approve Claim":cl.state==="APPROVED"?"Release Payout":null;
  const daysElapsed=Math.floor((Date.now()-cl.filedAt)/864e5);
  const slaBadge=daysElapsed<=cl.slaDays?'<span style="color:#5a8a3a">'+daysElapsed+' of '+cl.slaDays+' days</span>':'<span style="color:#a04040">SLA breach: '+daysElapsed+' of '+cl.slaDays+' days</span>';
  document.getElementById("ms-pop-body").innerHTML=
    '<div style="padding:22px;max-width:560px">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:9px;color:#a04040;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Insurance Claim</div><div style="font-size:20px;font-weight:800;color:var(--tx)">'+cl.id+'</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">'+cl.reason+' · '+cl.policyId+'</div></div><span style="background:'+stateColor+';color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">'+CLM_STATE_LABEL[cl.state]+'</span></div>'+
    '<div style="display:flex;gap:0;margin:14px 0">'+lifecycle+'</div>'+
    (advanceLabel?'<button onclick="clmAdvance(\''+cl.id+'\')" style="width:100%;padding:10px;background:#1a3a6a;color:#fff;border:none;border-radius:5px;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:14px">'+advanceLabel+' →</button>':"")+
    mgr([["Reason",cl.reason],["Policy",cl.policyId],["Contract",cl.contractId],["Amount Requested",fmt(cl.amountRequested)],["Amount Paid",cl.amountPaid?fmt(cl.amountPaid):"—"],["SLA",slaBadge],["Filed",new Date(cl.filedAt).toLocaleString("en-GB")]])+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-top:14px;margin-bottom:6px">Append-Only History</div>'+
    '<div style="background:#1a1208;border-radius:4px;padding:10px;max-height:120px;overflow-y:auto">'+history+'</div>'+
    '<div style="margin-top:14px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">© 2026 Ankuaru · Track &amp; Trade · Append-only · Subrogation applies on payout</div>'+
    '</div>';
  msPopOpenAsModal();
}

// ═══════════════════════════════════════════════════ SETTLEMENT & PAYMENTS ══
const PAYMENTS={};
const PAY_STATE_LABEL={PENDING:"Pending",INITIATED:"Initiated",IN_FLIGHT:"In Flight",SETTLED:"Settled",FAILED:"Failed",REVERSED:"Reversed",DISPUTED:"Disputed",PENDING_FUNDS:"Pending Funds",BLOCKED:"Blocked"};
const PAY_STATE_COLOR={PENDING:"#9a7a3a",INITIATED:"#A87832",IN_FLIGHT:"#3a7a8a",SETTLED:"#5a8a3a",FAILED:"#a04040",REVERSED:"#666",DISPUTED:"#a04040",PENDING_FUNDS:"#A87832",BLOCKED:"#a04040"};
// Allowed transitions — enforced by paySetState. Anything not listed is rejected.
const PAY_TRANSITIONS={
  PENDING:["INITIATED","BLOCKED","FAILED"],
  INITIATED:["IN_FLIGHT","FAILED","BLOCKED","PENDING_FUNDS"],
  IN_FLIGHT:["SETTLED","FAILED","DISPUTED"],
  SETTLED:["REVERSED","DISPUTED"],
  PENDING_FUNDS:["INITIATED","FAILED"],
  BLOCKED:["INITIATED","FAILED"],
  FAILED:["INITIATED"],
  REVERSED:[],
  DISPUTED:["SETTLED","REVERSED"]
};

const PAY_RAILS={
  "RAIL-IPS":{label:"EthioPay-IPS",scope:"Domestic",iso:"ISO 20022",members:"32 banks · 12 MFIs · 3 PSOs"},
  "RAIL-RTGS":{label:"NBE RTGS",scope:"Domestic interbank finality",iso:"ISO 20022 (migration)"},
  "RAIL-TELEBIRR":{label:"Telebirr / Mobile Wallet",scope:"Farmer & wallet payouts",iso:"USSD-reachable"}
};

// Milestone → payment trigger mapping (per Layer 7 spec)
const MILESTONE_PAY_MAP={
  "activated":{label:"Optional advance",pct:0,optional:true},
  "loaded":{label:"Regional prepayment",pct:0.30},
  "docs":{label:"Document payment",pct:0.50},
  "delivered":{label:"Final balance",pct:0.20}
};

// payCreate — defensive: returns null on missing contract or invalid milestone
function payCreate(ctrId,milestoneId){
  const c=CONTRACTS[ctrId];
  if(!c){console.warn("payCreate: contract not found",ctrId);return null;}
  const trigger=MILESTONE_PAY_MAP[milestoneId];
  if(!trigger){console.warn("payCreate: no trigger for",milestoneId);return null;}
  if(trigger.pct===0&&!trigger.optional)return null;

  const payId="PAY-"+String(Object.keys(PAYMENTS).length+5001).padStart(4,"0");
  // Notional from contract; convert price/lb to total USD
  const gross=Math.round(c.weight*c.price*trigger.pct/0.453592);
  // Fees per spec: itemized, transparent
  const platformFee=Math.round(gross*0.0035);
  const bankGuaranteeFee=Math.round(gross*0.005);
  const insurancePremium=Math.round(gross*0.004);
  const fxSpread=Math.round(gross*0.002);
  const netCredited=gross-platformFee-bankGuaranteeFee-insurancePremium-fxSpread;

  // Rail selection — v24 domestic-only: always EthioPay-IPS
  // v24: domestic-only, always EthioPay-IPS unless overridden later for farmer payouts
  const rail="RAIL-IPS";

  PAYMENTS[payId]={
    id:payId,contractId:ctrId,milestoneId,
    state:"PENDING",
    label:trigger.label,
    grossUSD:gross,platformFee,bankGuaranteeFee,insurancePremium,fxSpread,netCredited,
    currency:c.currency||"USD/lb",
    rail,
    payer:c.buyer,payee:c.seller,
    payerBank:c.buyerBank,payeeBank:c.sellerBank,
    createdAt:Date.now(),
    history:[{ts:Date.now(),event:"PAYMENT_CREATED",detail:trigger.label+" · "+gross.toLocaleString()+" USD gross"}]
  };
  c.history.push({ts:Date.now(),event:"PAYMENT_CREATED",detail:payId+" · "+trigger.label});
  return payId;
}

// paySetState — single mutation point. Rejects illegal transitions.
function paySetState(payId,newState,detail){
  const p=PAYMENTS[payId];
  if(!p){console.warn("paySetState: not found",payId);return false;}
  const allowed=PAY_TRANSITIONS[p.state]||[];
  if(allowed.indexOf(newState)<0){
    console.warn("paySetState: illegal transition",p.state,"→",newState);
    return false;
  }
  p.state=newState;
  p.history.push({ts:Date.now(),event:newState,detail:detail||PAY_STATE_LABEL[newState]});
  return true;
}

// payAdvance — UI handler for "Advance" button. Walks through legal next state.
// Defensive: only operates if contract still exists and state has a forward path.
function payAdvance(payId){
  const p=PAYMENTS[payId];
  if(!p)return;
  const next={PENDING:"INITIATED",INITIATED:"IN_FLIGHT",IN_FLIGHT:"SETTLED"};
  const target=next[p.state];
  if(!target){toast("No further advance possible from "+p.state);return;}
  paySetState(payId,target,target==="INITIATED"?"Bank API instruction sent":target==="IN_FLIGHT"?"Confirmed by EthioPay-IPS rail":"Settled to retention account");
  payShowDetail(payId);
}

// payShowDetail — opens payment detail panel.
// All values escaped via toLocaleString / textContent-safe interpolation. No raw user input here.
function payShowDetail(payId){
  const p=PAYMENTS[payId];if(!p)return;
  const c=CONTRACTS[p.contractId]||{};
  const rail=PAY_RAILS[p.rail]||{label:"Unknown",scope:"—"};
  const stateColor=PAY_STATE_COLOR[p.state]||"#666";
  const payerActor=ACTOR_REGISTRY[p.payer]||{name:p.payer};
  const payeeActor=ACTOR_REGISTRY[p.payee]||{name:p.payee};
  const fmt=v=>"$"+v.toLocaleString();

  const feeRows=[
    ["Gross",fmt(p.grossUSD),"#1a1208","700"],
    ["− Platform Fee","− "+fmt(p.platformFee),"#a04040","500"],
    ["− Bank Guarantee Fee","− "+fmt(p.bankGuaranteeFee),"#a04040","500"],
    ["− Insurance Premium","− "+fmt(p.insurancePremium),"#a04040","500"],
    ["− FX Spread","− "+fmt(p.fxSpread),"#a04040","500"],
    ["Net Credited",fmt(p.netCredited),"#5a8a3a","700"]
  ].map(r=>'<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0e8d6;font-size:12px"><span style="color:'+r[2]+'">'+r[0]+'</span><span style="font-family:monospace;font-weight:'+r[3]+';color:'+r[2]+'">'+r[1]+'</span></div>').join("");

  const lifecycle=["PENDING","INITIATED","IN_FLIGHT","SETTLED"].map(s=>{
    const idx=["PENDING","INITIATED","IN_FLIGHT","SETTLED"].indexOf(s);
    const cur=["PENDING","INITIATED","IN_FLIGHT","SETTLED"].indexOf(p.state);
    const done=idx<cur;
    const active=idx===cur&&p.state===s;
    return '<div style="flex:1;padding:8px;text-align:center;background:'+(done?"#5a8a3a":active?"#3a7a8a":"#fff")+';color:'+(done||active?"#fff":"#999")+';border:1px solid '+(done?"#5a8a3a":active?"#3a7a8a":"#e5dccc")+';border-radius:3px;font-size:9px;font-weight:700;text-transform:uppercase">'+(done?"✓ ":"")+PAY_STATE_LABEL[s]+'</div>';
  }).join('<div style="width:4px"></div>');

  const historyHTML=p.history.slice().reverse().map(h=>'<div style="font-family:monospace;font-size:10px;color:#c4a06a;padding:2px 0">'+new Date(h.ts).toISOString().slice(11,19)+' · '+h.event+' · '+h.detail+'</div>').join("");

  const advanceLabel=p.state==="PENDING"?"Initiate via Bank API":p.state==="INITIATED"?"Mark In-Flight (rail confirms)":p.state==="IN_FLIGHT"?"Mark Settled (final confirm)":null;

  document.getElementById("ms-pop-body").innerHTML=
    '<div style="padding:22px;max-width:560px">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px"><div><div style="font-size:9px;color:#3a7a8a;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Payment Instruction</div><div style="font-size:20px;font-weight:800;color:var(--tx)">'+p.id+'</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">'+p.label+' · '+p.contractId+'</div></div><span style="background:'+stateColor+';color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">'+PAY_STATE_LABEL[p.state]+'</span></div>'+
    '<div style="display:flex;gap:0;margin:14px 0">'+lifecycle+'</div>'+
    (advanceLabel?'<button onclick="payAdvance(\''+p.id+'\')" style="width:100%;padding:10px;background:#3a7a8a;color:#fff;border:none;border-radius:5px;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:14px">'+advanceLabel+' →</button>':"")+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:6px">Itemized Breakdown</div>'+
    '<div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:12px 14px;margin-bottom:14px">'+feeRows+'</div>'+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-bottom:6px">Routing</div>'+
    mgr([["Payment Rail",rail.label],["Scope",rail.scope],["Standard",rail.iso||"—"],["Payer",payerActor.name],["Payer Bank",p.payerBank],["Payee",payeeActor.name],["Payee Bank",p.payeeBank],["Currency",p.currency],["Contract",p.contractId]])+
    '<div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;font-weight:700;margin-top:14px;margin-bottom:6px">Append-Only History</div>'+
    '<div style="background:#1a1208;border-radius:4px;padding:10px;max-height:120px;overflow-y:auto">'+historyHTML+'</div>'+
    '<div style="margin-top:14px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">© 2026 Ankuaru · Track & Trade · Bank-orchestrated rails · Append-only ledger</div>'+
    '</div>';
  msPopOpenAsModal();
}

// Hook payCreate into ctrAdvance so payments get auto-generated as contract progresses
function ctrTriggerPayments(ctrId,milestoneId){
  const payId=payCreate(ctrId,milestoneId);
  if(payId)toast("Payment "+payId+" created · "+MILESTONE_PAY_MAP[milestoneId].label);
}

// ═══════════════════════════════════════════════════ FINANCING & LIQUIDITY ══
const BANK_PANEL={
  "BNK-CBE":{name:"Commercial Bank of Ethiopia",short:"CBE",type:"Domestic · NBE-licensed",capabilities:["RTGS","EthSwitch","Trade Finance","Performance Guarantee","Payment Guarantee"],desk:"Addis Ababa Trade Finance",rate:"12.5% p.a."},
  "BNK-AWASH":{name:"Awash Bank",short:"Awash",type:"Domestic · NBE-licensed",capabilities:["RTGS","EthSwitch","Trade Finance","Performance Guarantee","Working Capital"],desk:"Bole Branch · Trade Desk",rate:"13.0% p.a."},
  "BNK-DASHEN":{name:"Dashen Bank",short:"Dashen",type:"Domestic · NBE-licensed",capabilities:["RTGS","EthSwitch","Trade Finance","Forward FX","Margin Account"],desk:"Addis HQ · Corporate",rate:"12.75% p.a."},
  "BNK-COOP-OR":{name:"Cooperative Bank of Oromia",short:"Coop Oromia",type:"Domestic · Cooperative",capabilities:["RTGS","EthSwitch","Pre-harvest Finance","Coop Lending"],desk:"Hawassa Coop Desk",rate:"11.5% p.a."},
  "BNK-ZEMEN":{name:"Zemen Bank",short:"Zemen",type:"Domestic · NBE-licensed",capabilities:["RTGS","Trade Finance","Working Capital"],desk:"Addis HQ",rate:"13.25% p.a."}
};

const HAIRCUT_TABLE={
  cherry:{label:"Cherry (unprocessed)",base:0.45},
  parchment:{label:"Parchment",base:0.65},
  green:{label:"Green (warehouse-graded)",base:0.80}
};

const FINANCING={};

function ltvFor(contract){
  const lot=CONTAINERS.find(x=>x.id===contract.lot||x.exp===contract.lot);
  let stage="green";
  if(lot){if(["EXPORTED"].includes(lot.status))stage="green";else if(lot.status==="DISPATCHED")stage="parchment";else stage="cherry";}
  let h=HAIRCUT_TABLE[stage].base;
  const score=lot?.cup||0;
  if(score>=85)h+=0.05;
  if(!score)h-=0.10;
  if(h>0.85)h=0.85;if(h<0.30)h=0.30;
  return{stage,haircut:h,label:HAIRCUT_TABLE[stage].label};
}

function finCreate(ctrId){
  const c=CONTRACTS[ctrId];if(!c)return null;
  if(FINANCING[ctrId])return FINANCING[ctrId];
  const notional=c.weight*c.price/0.453592;
  const ltv=ltvFor(c);
  const lineUSD=Math.round(notional*ltv.haircut);
  const initialMargin=Math.round(notional*0.20);
  const fin={
    contractId:ctrId,notionalUSD:Math.round(notional),
    creditLineUSD:lineUSD,
    drawnUSD:Math.round(lineUSD*0.65),
    haircut:ltv.haircut,collateralStage:ltv.label,
    initialMargin,maintenanceMargin:Math.round(notional*0.12),
    marginPosted:initialMargin,marginHealth:"Healthy",
    interestRate:"12.5% p.a.",platformFee:"0.35% of contract value",
    bankFee:"0.50% guarantee fee",fxSpread:"Bank-declared, market-based",
    leverage:"3.5x",exposureCap:"15% of partner bank trade book",
    waterfall:["Cure window (14 days)","Guarantee call by non-defaulting bank","Collateral liquidation via marketplace","Insurance claim (residual gap)","Bank recovery (own recourse)","Legal recovery (arbitration)"],
    status:"ACTIVE",liens:[c.lot]
  };
  FINANCING[ctrId]=fin;
  c.history.push({ts:Date.now(),event:"FINANCING_OPENED",detail:"Credit line "+lineUSD.toLocaleString()+" USD · "+ltv.label});
  return fin;
}

function finShowDetail(ctrId){
  const c=CONTRACTS[ctrId];if(!c)return;
  const f=FINANCING[ctrId]||finCreate(ctrId);
  if(!f)return;
  const utilization=(f.drawnUSD/f.creditLineUSD*100).toFixed(0);
  const utilColor=utilization>80?"#a04040":utilization>60?"#A87832":"#5a8a3a";
  const buyerBank=Object.values(BANK_PANEL).find(b=>c.buyerBank&&c.buyerBank.includes(b.short))||BANK_PANEL["BNK-CBE"];
  const sellerBank=Object.values(BANK_PANEL).find(b=>c.sellerBank.includes(b.short))||BANK_PANEL["BNK-CBE"];
  const waterfallSteps=f.waterfall.map((w,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#fff;border:1px solid #e5dccc;border-radius:3px;margin-bottom:3px"><div style="width:18px;height:18px;border-radius:50%;background:#fff;border:1.5px solid #d8cdb8;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#9a8a7a">${i+1}</div><div style="flex:1;font-size:11px;color:var(--tx2)">${w}</div></div>`).join("");
  document.getElementById("ms-pop-body").innerHTML=`<div style="padding:22px;max-width:640px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:9px;color:#3a7a8a;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Financing Position</div><div style="font-size:20px;font-weight:800;color:var(--tx)">${ctrId}</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">Bank-orchestrated · Platform does not own counterparty risk</div></div><span style="background:#5a8a3a;color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">${f.status}</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0">
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Notional</div><div style="font-size:16px;font-weight:700;color:var(--tx)">$${f.notionalUSD.toLocaleString()}</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Credit Line</div><div style="font-size:16px;font-weight:700;color:#3a7a8a">$${f.creditLineUSD.toLocaleString()}</div><div style="font-size:9px;color:var(--tx3)">LTV ${(f.haircut*100).toFixed(0)}% · ${f.collateralStage}</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Drawn</div><div style="font-size:16px;font-weight:700;color:${utilColor}">$${f.drawnUSD.toLocaleString()}</div><div style="font-size:9px;color:${utilColor}">${utilization}% utilization</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Margin Health</div><div style="font-size:16px;font-weight:700;color:#5a8a3a">${f.marginHealth}</div><div style="font-size:9px;color:var(--tx3)">Posted $${f.marginPosted.toLocaleString()}</div></div>
    </div>
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Bank Stack</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Buyer's Bank</div><div style="font-size:12px;font-weight:700">${buyerBank.name}</div><div style="font-size:10px;color:var(--tx3)">${buyerBank.desk}</div><div style="font-size:9px;color:#3a7a8a;margin-top:3px">Payment guarantee · ${buyerBank.rate}</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Seller's Bank</div><div style="font-size:12px;font-weight:700">${sellerBank.name}</div><div style="font-size:10px;color:var(--tx3)">${sellerBank.desk}</div><div style="font-size:9px;color:#3a7a8a;margin-top:3px">Performance guarantee · ${sellerBank.rate}</div></div>
    </div>
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Margin Engine</div>
    ${mgr([["Initial Margin","$"+f.initialMargin.toLocaleString()+" (20%)"],["Maintenance","$"+f.maintenanceMargin.toLocaleString()+" (12%)"],["Leverage Cap",f.leverage],["Mark-to-Market","Daily · NY-C + Ethiopian differential"],["Margin Call Window","24-72 hours"],["Auto-Liquidation","Via marketplace if unmet"]])}
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Fees & Rates · Transparent</div>
    ${mgr([["Interest Rate",f.interestRate],["Platform Fee",f.platformFee],["Bank Guarantee Fee",f.bankFee],["FX Spread",f.fxSpread]])}
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Default Waterfall · 6 Steps</div>
    ${waterfallSteps}
    <div style="margin-top:14px;padding:10px 12px;background:rgba(58,122,138,.06);border-left:3px solid #3a7a8a;border-radius:4px;font-size:11px;color:var(--tx2)"><b>Chain-aware lien:</b> single active lien per lot UID. Refinances on custody handoff via RTGS. Payment waterfall routes proceeds to lender first via controlled bank-level escrow, balance to seller. Lien on lot ${c.lot}.</div>
    <div style="margin-top:10px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">© 2026 Ankuaru · Track & Trade · Platform orchestrates; banks own counterparty risk</div>
  </div>`;
  msPopOpenAsModal();
}

// ═══════════════════════════════════════════════════ CONTRACTING ══
const CONTRACTS={};
const CTR_STATE_LABEL={DRAFT:"Draft",NEGOTIATING:"Negotiating",BANK_PENDING:"Bank-Pending",ACTIVATED:"Activated",PERFORMING:"Performing",DELIVERED:"Delivered",CLOSED:"Closed",DISPUTED:"Disputed",TERMINATED:"Terminated",CANCELLED:"Cancelled"};
const CTR_STATE_COLOR={DRAFT:"#9a7a3a",NEGOTIATING:"#A87832",BANK_PENDING:"#7C3AED",ACTIVATED:"#3a7a8a",PERFORMING:"#3a7a8a",DELIVERED:"#5a8a3a",CLOSED:"#5a8a3a",DISPUTED:"#a04040",TERMINATED:"#666",CANCELLED:"#666"};
const CTR_BANK_STEPS=["Buyer's bank · Payment guarantee","Seller's bank · Performance guarantee","Both banks countersigned","Insurance auto-attach","Compliance cleared","Activated"];
const MUTABLE_FIELDS=["Price","Price mode","Quantity","Quality tolerance","Delivery window","Incoterm","Payment schedule","Sampling protocol","Certifications","Force majeure additions"];
const IMMUTABLE_FIELDS=["Dispute forum","Base force majeure","Insolvency handling","Anti-fraud clauses","Volume conservation","Audit trail","Bank guarantee sequencing","Regulator access","Insurance attachment","EUDR obligations"];

function ctrCreateFromListing(listingId){
  const L=LISTINGS[listingId];if(!L)return null;
  const ctrId="CTR-"+String(Object.keys(CONTRACTS).length+1041).padStart(4,"0");
  const isExport=(L.delivery||L.incoterm||"").toLowerCase().includes("djibouti")||(L.delivery||L.incoterm||"").toLowerCase().includes("cif");
  const tmpl=isExport?"ESCC 2019 — Shipment (FOB/CIF)":"ESCC 2019 — Domestic Delivery";
  const buyer=L.type==="RFQ"||L.type==="REV"?(L.buyer||"ACT-UNI-OCFCU"):"ACT-UNI-OCFCU";
  const seller=L.seller||"ACT-EXP-002";
  CONTRACTS[ctrId]={
    id:ctrId,listingId,state:"BANK_PENDING",template:tmpl,createdAt:Date.now(),
    buyer,seller,
    buyerBank:"Awash Bank",sellerBank:"Commercial Bank of Ethiopia",
    lot:L.lot,weight:L.weight,grade:L.grade,
    price:L.priceUSDkg||L.currentUSDkg||0,currency:L.currency||"USD/lb",
    delivery:L.delivery||L.incoterm||"At Exporter Warehouse Addis",
    qualityBinding:L.note&&L.note.includes("Pass/Fail")?"gate":(L.note&&L.note.includes("Adjustable")?"adj":"info"),
    bankProgress:0,
    signatures:{buyerSig:null,sellerSig:null,buyerBankSig:null,sellerBankSig:null},
    milestones:[
      {id:"sign",label:"Bilateral signature",state:"pending"},
      {id:"buyer-bank",label:"Buyer's bank countersign",state:"pending"},
      {id:"seller-bank",label:"Seller's bank countersign",state:"pending"},
      {id:"insurance",label:"Insurance attached on loading",state:"pending"},
      {id:"compliance",label:"Compliance cleared",state:"pending"},
      {id:"activated",label:"Contract activated",state:"pending"},
      {id:"loaded",label:"Cargo loaded · BL issued",state:"pending"},
      {id:"docs",label:"Documents presented",state:"pending"},
      {id:"delivered",label:"Cargo delivered",state:"pending"},
      {id:"settled",label:"Final settlement",state:"pending"}
    ],
    history:[{ts:Date.now(),event:"CONTRACT_CREATED",detail:"Auto-drafted from "+listingId}]
  };
  if(L.lot){const c=CONTAINERS.find(x=>x.id===L.lot||x.exp===L.lot);if(c){c.contractId=ctrId;c.listed=null;}}
  L.contractId=ctrId;
  return ctrId;
}

function ctrAdvance(ctrId){
  const c=CONTRACTS[ctrId];if(!c)return;
  if(c.state==="BANK_PENDING"&&c.bankProgress<6){
    c.bankProgress++;
    const labels=["Buyer signed","Seller signed","Buyer's bank countersigned","Seller's bank countersigned","Insurance attached","Compliance cleared"];
    c.history.push({ts:Date.now(),event:"BANK_STEP",detail:labels[c.bankProgress-1]});
    if(c.bankProgress===1)c.signatures.buyerSig="Fayda eSig "+Math.floor(Math.random()*9000+1000);
    if(c.bankProgress===2)c.signatures.sellerSig="eIDAS QES "+Math.floor(Math.random()*9000+1000);
    if(c.bankProgress===3)c.signatures.buyerBankSig="DB-Cert-"+Math.floor(Math.random()*9000+1000);
    if(c.bankProgress===4)c.signatures.sellerBankSig="CBE-Cert-"+Math.floor(Math.random()*9000+1000);
    if(c.bankProgress>=6){c.state="ACTIVATED";c.history.push({ts:Date.now(),event:"ACTIVATED",detail:"All gates cleared"});c.milestones.slice(0,6).forEach(m=>m.state="done");ctrAutoAttachInsurance(ctrId);finCreate(ctrId);ctrTriggerPayments(ctrId,"loaded");ctrTriggerPayments(ctrId,"docs");ctrTriggerPayments(ctrId,"delivered");}
  }else if(c.state==="ACTIVATED"){
    c.state="PERFORMING";c.history.push({ts:Date.now(),event:"PERFORMING",detail:"Cargo loading begins"});
  }
  ctrShowDetail(ctrId);
}

function ctrShowDetail(ctrId){
  const c=CONTRACTS[ctrId];if(!c)return;
  const stateColor=CTR_STATE_COLOR[c.state]||"#666";
  const buyerActor=ACTOR_REGISTRY[c.buyer]||{name:c.buyer};
  const sellerActor=ACTOR_REGISTRY[c.seller]||{name:c.seller};
  const bankBar=CTR_BANK_STEPS.map((step,i)=>{const done=i<c.bankProgress;const cur=i===c.bankProgress&&c.state==="BANK_PENDING";return`<div style="flex:1;min-width:0;padding:8px 6px;background:${done?'#5a8a3a':cur?'#7C3AED':'#fff'};color:${done||cur?'#fff':'#999'};border:1px solid ${done?'#5a8a3a':cur?'#7C3AED':'#e5dccc'};border-radius:3px;text-align:center;font-size:9px;font-weight:600;${cur?'box-shadow:0 2px 8px rgba(124,58,237,.3)':''}">${done?'✓ ':''}${step}</div>`;}).join('<div style="width:6px"></div>');
  const sigGrid=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
    <div style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Buyer signature</div><div style="font-size:11px;font-weight:600;color:${c.signatures.buyerSig?'#5a8a3a':'#999'}">${c.signatures.buyerSig||'Pending'}</div></div>
    <div style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Seller signature</div><div style="font-size:11px;font-weight:600;color:${c.signatures.sellerSig?'#5a8a3a':'#999'}">${c.signatures.sellerSig||'Pending'}</div></div>
    <div style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Buyer's bank cert</div><div style="font-size:11px;font-weight:600;color:${c.signatures.buyerBankSig?'#5a8a3a':'#999'}">${c.signatures.buyerBankSig||'Pending'}</div></div>
    <div style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Seller's bank cert</div><div style="font-size:11px;font-weight:600;color:${c.signatures.sellerBankSig?'#5a8a3a':'#999'}">${c.signatures.sellerBankSig||'Pending'}</div></div>
  </div>`;
  const mutBlock=`<div style="font-size:10px;color:#5a8a3a;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Mutable Terms · Negotiable</div>`+MUTABLE_FIELDS.map(f=>`<span style="display:inline-block;padding:3px 9px;margin:2px;background:rgba(90,138,58,.1);border:1px solid rgba(90,138,58,.3);border-radius:3px;font-size:10px;color:#3a5820">${f}</span>`).join("");
  const immBlock=`<div style="font-size:10px;color:#a04040;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:12px;margin-bottom:6px">Immutable Terms · Fixed by Platform</div>`+IMMUTABLE_FIELDS.map(f=>`<span style="display:inline-block;padding:3px 9px;margin:2px;background:rgba(160,64,64,.08);border:1px solid rgba(160,64,64,.3);border-radius:3px;font-size:10px;color:#5a2010">${f}</span>`).join("");
  const milestones=c.milestones.map(m=>`<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#fff;border:1px solid #e5dccc;border-radius:3px;margin-bottom:3px"><div style="width:14px;height:14px;border-radius:50%;background:${m.state==='done'?'#5a8a3a':'#fff'};border:1.5px solid ${m.state==='done'?'#5a8a3a':'#d8cdb8'};flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">${m.state==='done'?'✓':''}</div><div style="flex:1;font-size:11px;color:var(--tx2)">${m.label}</div></div>`).join("");
  const advanceLabel=c.state==="BANK_PENDING"?(c.bankProgress<6?`Advance · Step ${c.bankProgress+1}/6`:"Activate"):c.state==="ACTIVATED"?"Begin Performing":null;
  document.getElementById("ms-pop-body").innerHTML=`<div style="padding:22px;max-width:640px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"><div><div style="font-size:9px;color:#7C3AED;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Contract</div><div style="font-size:20px;font-weight:800;color:var(--tx)">${c.id}</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">${c.template}</div></div><span style="background:${stateColor};color:#fff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.05em">${CTR_STATE_LABEL[c.state]}</span></div>
    ${mgr([["Buyer",buyerActor.name],["Seller",sellerActor.name],["Lot",c.lot||"—"],["Weight",c.weight.toLocaleString()+" kg"],["Grade",c.grade],["Price",c.price+" "+c.currency],["Delivery",c.delivery],["Buyer's Bank",c.buyerBank],["Seller's Bank",c.sellerBank],["Source Listing",c.listingId]])}
    ${sigGrid}
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Bank-Gated Saga</div>
    <div style="display:flex;gap:0;margin-bottom:10px">${bankBar}</div>
    ${advanceLabel?`<button onclick="ctrAdvance('${c.id}')" style="width:100%;padding:10px;background:#7C3AED;color:#fff;border:none;border-radius:5px;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:10px">${advanceLabel} →</button>`:""}
    ${(c.state==="ACTIVATED"||c.state==="PERFORMING")&&FINANCING[c.id]?`<button onclick="finShowDetail('${c.id}')" style="width:100%;padding:10px;background:#3a7a8a;color:#fff;border:none;border-radius:5px;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:10px">View Financing Position →</button>`:""}
    ${mutBlock}
    ${immBlock}
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Milestones</div>
    ${milestones}
    <div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:14px;margin-bottom:6px">Append-Only History</div>
    <div style="background:#1a1208;color:#c4a06a;padding:10px;border-radius:4px;font-family:monospace;font-size:10px;max-height:120px;overflow-y:auto">${c.history.map(h=>`<div>${new Date(h.ts).toISOString().slice(11,19)} · ${h.event} · ${h.detail}</div>`).join("")}</div>
    <div style="margin-top:14px;font-size:9px;color:var(--tx3);border-top:1px solid #e5dccc;padding-top:10px">Template: ${c.template} · Ethiopian law baseline · Dispute forum: platform mediation → ICC arbitration · © 2026 Ankuaru</div>
  </div>`;
  msPopOpenAsModal();
}

// ═══════════════════════════════════════ LAYER 4 — MARKETPLACE (active) ══

// (old dead currency sketch removed — v22.1 currency system injected below)
const DELIVERY_LOCATIONS=[
  {id:"ex-mill",label:"Ex Mill (named site)",scope:"domestic"},
  {id:"ex-washing",label:"Ex Washing Station",scope:"domestic"},
  {id:"at-warehouse",label:"At Aggregator Warehouse",scope:"domestic"},
  {id:"at-exporter",label:"At Exporter Warehouse Addis",scope:"domestic"},
  {id:"at-modjo",label:"At Modjo Dry Port",scope:"domestic"},
  {id:"delivered-addis",label:"Delivered Addis Ababa",scope:"domestic"}
];
function fmtEAT(d){const eat=new Date(d.getTime()+3*36e5);const gmt=new Date(d.getTime());const pad=n=>String(n).padStart(2,"0");return`${pad(eat.getUTCHours())}:${pad(eat.getUTCMinutes())} EAT (${pad(gmt.getUTCHours())}:${pad(gmt.getUTCMinutes())} GMT)`;}
function todayClose17EAT(){const d=new Date();d.setUTCHours(14,0,0,0);if(d.getTime()<Date.now())d.setUTCDate(d.getUTCDate()+1);return d;}

let L4_NEW={};let l4Step=0;
const L4_MECH=[
  {id:"IOI",label:"IOI",desc:"Non-binding indication of interest"},
  {id:"RFQ",label:"RFQ",desc:"Buyer-initiated request for quotation"},
  {id:"ENG",label:"English Auction",desc:"Ascending, transparent bids"},
  {id:"SEALED",label:"Sealed-Bid",desc:"Single blind round"},
  {id:"REV",label:"Reverse Auction",desc:"Buyer posts need; sellers underbid"}
];
const L4_VIS=[
  {id:"open",label:"Open Market",desc:"Any verified actor"},
  {id:"invite",label:"Invite-Only",desc:"Pick specific actors (filter by rating, role, region)"},
  {id:"rating",label:"Rating ≥ 4★",desc:"Quality-history gate (auto-filter)"},
  {id:"region",label:"Region: EU + UK + JP",desc:"Buyer geography gate"},
  {id:"cert",label:"Cert: EUDR + Organic",desc:"Compliance gate"}
];
const L4_QBIND=[
  {id:"info",label:"Informational",desc:"Quality data shown but not binding"},
  {id:"adj",label:"Price-Adjustable",desc:"±5¢/kg per cup point delta"},
  {id:"gate",label:"Pass/Fail Gate",desc:"Below threshold → contract void"}
];


function l4CheckExpiry(){
  let changed=false;
  for(const k in LISTINGS){
    const L=LISTINGS[k];
    if(L.state==="LIVE"&&L.endsAt&&Date.now()>L.endsAt){
      const hasActivity=(L.bids||0)+(L.offers||0)+(L.bidsReceived||0)+(L.engaged||0)>0;
      if(L.type==="IOI")L.state=hasActivity?"MATCHED":"FAILED";
      else if(L.type==="ENG")L.state=hasActivity?"MATCHED":"FAILED";
      else L.state=hasActivity?"ENGAGED":"FAILED";
      L.failReason=L.state==="FAILED"?(L.type==="ENG"?"Reserve not met":L.type==="IOI"?"IOI expired without offers":L.type==="RFQ"?"No offers received":"No bids in window"):null;
      if(L.state==="FAILED"&&L.lot){const c=CONTAINERS.find(x=>x.id===L.lot||x.exp===L.lot);if(c)delete c.listed;}
      changed=true;
    }
  }
  if(changed&&viewMode==="market")renderMarket();
}
setInterval(l4CheckExpiry,3000);
/*L4_TIMER*/
function l4FmtTimer(ms){
  if(ms<=0)return'<span class="l4-tick l4-tick--closed">CLOSED</span>';
  const d=Math.floor(ms/864e5),h=Math.floor((ms%864e5)/36e5),m=Math.floor((ms%36e5)/6e4),s=Math.floor((ms%6e4)/1e3);
  if(d>0)return`<span class="l4-tick l4-tick--days">${d}d ${h}h ${m}m</span>`;
  if(h>0)return`<span class="l4-tick l4-tick--hours">${h}h ${m}m ${s}s</span>`;
  return`<span class="l4-tick l4-tick--mins">${m}<span class="l4-tick__unit">m</span> ${String(s).padStart(2,"0")}<span class="l4-tick__unit">s</span></span>`;
}
let l4TimerInterval=null;
function l4TickTimerElements(){
  document.querySelectorAll("[data-l4-timer]").forEach(el=>{
    const t=parseInt(el.getAttribute("data-l4-timer"),10);
    if(isNaN(t))return;
    el.innerHTML=l4FmtTimer(t-Date.now());
  });
}
function l4StartTimers(){
  if(l4TimerInterval)clearInterval(l4TimerInterval);
  l4TickTimerElements();
  l4TimerInterval=setInterval(l4TickTimerElements,1000);
}
function l4FmtUsdKg(n){
  if(n==null||n==="")return null;
  const x=Number(n);
  return isNaN(x)?null:x.toFixed(2);
}
function l4FirstBidAmount(L){return L.bidHistory&&L.bidHistory.length?L.bidHistory[0].amount:null;}
function l4LastBidAmount(L){return L.bidHistory&&L.bidHistory.length?L.bidHistory[L.bidHistory.length-1].amount:null;}
/** Reserve / opening / current (or IOI·RFQ equivalents) under the marketplace countdown. */
function l4ListingMarketPriceStrip(L){
  const cell=function(label,val,accent,sub){
    return`<div class="l4-card-price-cell${accent?" l4-card-price-cell--accent":""}"><div class="l4-card-price-lbl">${label}</div><div class="l4-card-price-val">${val}</div>${sub?`<div class="l4-card-price-sub">${sub}</div>`:""}</div>`;
  };
  const t=L.type;
  if(t==="ENG"){
    const res=l4FmtUsdKg(L.reserveUSDkg);
    const op=l4FirstBidAmount(L);
    const cur=l4FmtUsdKg(L.currentUSDkg);
    return`<div class="l4-card-prices l4-card-prices--3">${cell("Reserve",res?res+" USD/kg":"—",false,"Seller floor")}${cell("Opening bid",op!=null?Number(op).toFixed(2)+" USD/kg":"—",false,(L.bids||0)?"First recorded bid":"No bids yet")}${cell("Current high",cur?cur+" USD/kg":"—",true,"Leading bid")}</div>`;
  }
  if(t==="SEALED"){
    const res=l4FmtUsdKg(L.reserveUSDkg);
    return`<div class="l4-card-prices l4-card-prices--2">${cell("Reserve",res?res+" USD/kg":"Not disclosed",false,"Seller floor · bids stay blind")}${cell("Sealed bids",(L.bidsReceived||L.sealedBids||0)+" lodged",true,"Amounts hidden until close")}</div>`;
  }
  if(t==="REV"){
    const ceil=l4FmtUsdKg(L.ceilingUSDkg);
    const op=l4FirstBidAmount(L);
    const low=l4FmtUsdKg(L.currentLowUSDkg);
    return`<div class="l4-card-prices l4-card-prices--3">${cell("Ceiling",ceil?ceil+" USD/kg":"—",false,"Buyer max")}${cell("Opening offer",op!=null?Number(op).toFixed(2)+" USD/kg":"—",false,"First seller quote")}${cell("Current low",low?low+" USD/kg":"—",true,"Best price to buyer")}</div>`;
  }
  if(t==="IOI"){
    const ask=l4FmtUsdKg(L.priceUSDkg);
    return`<div class="l4-card-prices l4-card-prices--2">${cell("List ask",ask?ask+" USD/kg":"—",true,"Fixed indication")}${cell("Interest",(L.bids||0)+" parties",false,"Non-binding IOI")}</div>`;
  }
  if(t==="RFQ"){
    const op=l4FirstBidAmount(L);
    const best=l4LastBidAmount(L);
    const basis=L.differential||"—";
    return`<div class="l4-card-prices l4-card-prices--3">${cell("Price basis",basis,false,"Quote format")}${cell("Opening quote",op!=null?Number(op).toFixed(2)+" USD/kg":"—",false,"First offer")}${cell("Best quote",best!=null?Number(best).toFixed(2)+" USD/kg":"—",true,(L.offers||0)+" offers in")}</div>`;
  }
  return"";
}

const L4_MARKET_AUCTION_TYPES=["ENG","SEALED","REV"];
const L4_MARKET_OTHER_TYPES=["IOI","RFQ"];

function l4MarketListingCard(id,L){
  const c=LISTING_STATE_COLOR[L.state]||"#666";
  const isSealed=L.type==="SEALED";
  const priceLine=L.priceUSDkg?(L.priceUSDkg+" USD/kg"):(isSealed?"<span style=\"color:#666\">Bids hidden</span>":(L.currentUSDkg?("Current "+L.currentUSDkg+" USD/kg"):(L.differential||(L.ceilingUSDkg?("Ceiling "+L.ceilingUSDkg):(L.currentLowUSDkg?("Low "+L.currentLowUSDkg):"—")))));
  const activity=isSealed?(L.sealedBids+" sealed (blind)"):(L.bids!==undefined?(L.bids+" bids"):(L.offers!==undefined?(L.offers+" offers"):"—"));
  const action=L.type==="REV"||L.type==="RFQ"?"Submit Offer":(L.type==="IOI"?"Express Interest":"Place Bid");
  const counter=L.lot?("Lot "+L.lot+(L.lot&&CONTAINERS.find(x=>x.exp===L.lot||x.id===L.lot)?' <span style="background:#7C3AED;color:#fff;padding:1px 6px;border-radius:8px;font-size:8px;font-weight:700;letter-spacing:.05em;margin-left:4px">LISTED</span>':"")):(L.buyerCompany||"Buyer-side spec");
  const showTimerCard=!!L.endsAt&&(L.state==="LIVE"||L.state==="ENGAGED");
  const priceStripHtml=l4ListingMarketPriceStrip(L);
  const showPriceStrip=showTimerCard&&priceStripHtml;
  const cdEyebrow=L.type==="SEALED"?"Sealed auction":L.type==="ENG"?"English auction":L.type==="REV"?"Reverse auction":L.type==="RFQ"?"Request for quotes":L.type==="IOI"?"Indication of interest":"Closing window";
  const countdownBand=showTimerCard?`<div class="l4-card-countdown" role="timer" aria-live="polite"><div class="l4-card-countdown__eyebrow">${cdEyebrow} · closes in</div><div class="l4-card-countdown__value"><span class="l4-timer" data-l4-timer="${L.endsAt}">${l4FmtTimer(L.endsAt-Date.now())}</span></div><div class="l4-card-countdown__sub">Demo clock${L.ends?" · "+L.ends:""}</div>${priceStripHtml}</div>`:"";
  const metaLine=showTimerCard?`<div class="l4-card-meta">${L.eudr?"<b class=\"l4-card-meta__eudr\">EUDR ✓</b> · ":""}<span class="l4-card-meta__vis">${L.visibility.join(" · ")}</span></div>`:`<div style="font-size:10px;color:var(--tx3);margin-top:3px">Closes ${L.ends||"—"} · ${L.eudr?"EUDR ✓ · ":""}${L.visibility.join(" + ")}</div>`;
  const rowPriceSpan=showPriceStrip?"":`<span class="cc-eta">${priceLine}</span>`;
  return`<div class="cc l4-listing-card" style="border-left:3px solid #7C3AED">
      <div class="cc-head"><div style="display:flex;align-items:center;gap:6px">${muid(id)}<span style="font-size:9px;color:var(--tx3)">${LISTING_TYPE_LABEL[L.type]}</span></div><span style="background:${c};color:#fff;padding:2px 8px;border-radius:10px;font-weight:700;font-size:9px;letter-spacing:.05em">${L.state}</span></div>
      ${countdownBand}
      <div class="cc-mid">
        <div class="cc-grade">${L.grade}</div>
        <div class="cc-row"><span class="cc-w">${(L.weight/1000).toFixed(1)}t</span>${rowPriceSpan}${L.quality?`<span class="cc-sca">${L.quality}</span>`:""}</div>
        <div style="font-size:10px;color:var(--tx3);margin-top:6px">${counter} · ${activity}</div>${L.failReason?`<div style="font-size:10px;color:#c44;margin-top:3px;font-weight:600">⚠ ${L.failReason}</div>`:""}
        ${metaLine}
        ${L.type==="ENG"&&L.minIncrementUSD?`<div style="font-size:9px;color:#7C3AED;margin-top:3px">Min increment ${L.minIncrementUSD} USD/kg · Anti-snipe ${L.antiSnipingMin}min ext (cap ${L.hardCapMin}min)</div>`:""}
      </div>
      <div style="display:flex;gap:6px;padding:8px 12px;border-top:1px solid #f0e8d6">
        <button onclick="event.stopPropagation();l4ShowBidHistory('${id}')" style="flex:1;padding:6px;background:#fff;border:1px solid #d8cdb8;border-radius:4px;font-size:11px;color:var(--tx2);cursor:pointer">${isSealed?"Sealed":"History"}</button>
        <button onclick="event.stopPropagation();showUID('${id}')" style="flex:1;padding:6px;background:#fff;border:1px solid #d8cdb8;border-radius:4px;font-size:11px;color:var(--tx2);cursor:pointer">Details</button>
        ${L.state==="LIVE"?`<button onclick="event.stopPropagation();l4PlaceBid('${id}')" style="flex:1;padding:6px;background:#7C3AED;border:none;border-radius:4px;font-size:11px;color:#fff;font-weight:600;cursor:pointer">${action}</button><button onclick="event.stopPropagation();l4Withdraw('${id}')" title="Withdraw listing" style="padding:6px 10px;background:#fff;border:1px solid #c44;border-radius:4px;font-size:11px;color:#c44;cursor:pointer">×</button>`:L.state==="FAILED"?`<button onclick="event.stopPropagation();l4Relist('${id}')" style="flex:1;padding:6px;background:#5a8a3a;border:none;border-radius:4px;font-size:11px;color:#fff;font-weight:600;cursor:pointer">Re-list</button>`:`<button disabled style="flex:1;padding:6px;background:#ccc;border:none;border-radius:4px;font-size:11px;color:#fff;font-weight:600">${L.state}</button>`}
      </div>
    </div>`;
}
function l4MarketColumn(mechId,liveListings){
  const mech=L4_MECH.find(m=>m.id===mechId);
  const label=mech?mech.label:mechId;
  const cards=liveListings.filter(([,L])=>L.type===mechId).map(([id,L])=>l4MarketListingCard(id,L));
  const stack=cards.length?cards.join(""):`<div class="l4-cat-empty">No listings in this category.</div>`;
  return`<div class="l4-cat-col"><div class="l4-cat-head">${label}</div><div class="l4-cat-stack">${stack}</div></div>`;
}

function renderMarket(){
  const liveListings=Object.entries(LISTINGS);
  const tiles=L4_MECH.map(m=>{const n=liveListings.filter(([,L])=>L.type===m.id&&L.state==="LIVE").length;return`<div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px;text-align:center"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em">${m.label}</div><div style="font-size:24px;font-weight:700;color:#7C3AED;margin-top:2px">${n}</div><div style="font-size:10px;color:var(--tx3)">live</div></div>`;}).join("");
  const auctionCols=L4_MARKET_AUCTION_TYPES.map(t=>l4MarketColumn(t,liveListings)).join("");
  const otherCols=L4_MARKET_OTHER_TYPES.map(t=>l4MarketColumn(t,liveListings)).join("");
  document.getElementById("view-area").innerHTML=`<div style="padding:0 4px 16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div><div style="font-size:18px;font-weight:700;color:var(--tx);margin-bottom:2px">Auction</div><div style="font-size:11px;color:var(--tx2)">Matchmaking & price discovery · live timers · five mechanisms · composable visibility · auto-handoff to Contracting on match</div></div>
      <button onclick="openListingWizard()" style="padding:10px 18px;background:#7C3AED;color:#fff;border:none;border-radius:5px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 2px 6px rgba(124,58,237,.3)">+ New Listing</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:14px">${tiles}</div>
    <div class="l4-market-split">
      <div class="l4-market-block">
        <div class="l4-market-cols l4-market-cols--3">${auctionCols}</div>
      </div>
      <div class="l4-market-block l4-market-block--secondary">
        <div class="l4-market-cols l4-market-cols--2">${otherCols}</div>
      </div>
    </div>
  </div>`;
  l4StartTimers();
}

function l4Withdraw(id){const L=LISTINGS[id];if(!L)return;const hasActivity=(L.bids||0)+(L.offers||0)+(L.bidsReceived||0)+(L.engaged||0)>0;if(hasActivity){if(!confirm("This listing has engagement. Withdrawal post-engagement requires admin review and may incur a reputation penalty. Continue?"))return;L.state="WITHDRAWN";toast(id+" withdrawn · admin review pending");}else{L.state="WITHDRAWN";toast(id+" withdrawn");}if(L.lot){const c=CONTAINERS.find(x=>x.id===L.lot||x.exp===L.lot);if(c)delete c.listed;}renderMarket();}
function l4Relist(id){const L=LISTINGS[id];if(!L)return;L.state="LIVE";L.endsAt=Date.now()+24*36e5;L.failReason=null;L.bids=0;L.offers=0;L.bidsReceived=0;L.engaged=0;if(L.bidHistory)L.bidHistory=[];if(L.lot){const c=CONTAINERS.find(x=>x.id===L.lot||x.exp===L.lot);if(c)c.listed=id;}toast(id+" re-listed · 24h window");renderMarket();}

function l4GenEUDRReport(containerId){
  const c=CONTAINERS.find(x=>x.id===containerId);if(!c)return;
  const zone=ZONES[c.zone];const wn=Object.entries(zone.woredas);
  const reportId="EUDR-"+containerId.replace(/[^A-Z0-9]/g,"")+"-"+Math.floor(Math.random()*900+100);
  const today=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
  const farmCount=c.farms||10;const upstreamWoredas=wn.slice(0,3);const totalKg=c.kg;
  const html=`<div style="padding:24px;max-width:720px;background:#fff;font-family:'Helvetica Neue',Arial,sans-serif">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #5a8a3a;padding-bottom:12px;margin-bottom:16px">
      <div><div style="display:flex;align-items:center;gap:10px"><img src="${LOGO_DATA}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #c4a06a"><div><div style="font-size:18px;font-weight:800;color:#1a1208;letter-spacing:.06em">ANKUARU</div><div style="font-size:9px;color:#5a4a3a">TRACK & TRADE</div></div></div></div>
      <div style="text-align:right"><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em">EUDR Due Diligence Statement</div><div style="font-size:14px;font-weight:700;color:#1a1208;margin-top:2px">${reportId}</div><div style="font-size:9px;color:#5a4a3a;margin-top:2px">Generated ${today}</div></div>
    </div>
    <div style="background:#f5f0e6;border-left:4px solid #5a8a3a;padding:10px 14px;margin-bottom:16px;font-size:11px;color:#3a2810"><b>EU Regulation 2023/1115 — Article 9 Statement.</b> The operator has exercised due diligence and confirms negligible risk of non-compliance. Geolocation, time of production, and parent-child lineage attached.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
      <div><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em">Export Lot</div><div style="font-size:14px;font-weight:700">${c.id}</div><div style="font-size:11px;color:#3a2810">${c.grade} · ${c.process}</div></div>
      <div><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em">Net Weight</div><div style="font-size:14px;font-weight:700">${(totalKg/1000).toFixed(2)} MT</div><div style="font-size:11px;color:#3a2810">${totalKg.toLocaleString()} kg green</div></div>
      <div><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em">HS Code</div><div style="font-size:14px;font-weight:700">0901.11.00</div><div style="font-size:11px;color:#3a2810">Coffee, not roasted, not decaffeinated</div></div>
      <div><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em">Cup Score</div><div style="font-size:14px;font-weight:700">${c.cup||"—"} SCA</div><div style="font-size:11px;color:#3a2810">Lab-verified, append-only</div></div>
    </div>
    <div style="font-size:11px;font-weight:700;color:#1a1208;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;border-bottom:1px solid #d8cdb8;padding-bottom:4px">Origin · Geolocation · Plot Data</div>
    <table style="width:100%;border-collapse:collapse;font-size:10px;margin-bottom:14px">
      <thead><tr style="background:#f5f0e6"><th style="padding:6px 8px;text-align:left;border:1px solid #d8cdb8">Region</th><th style="padding:6px 8px;text-align:left;border:1px solid #d8cdb8">Zone</th><th style="padding:6px 8px;text-align:left;border:1px solid #d8cdb8">Woreda</th><th style="padding:6px 8px;text-align:left;border:1px solid #d8cdb8">GPS (centroid)</th><th style="padding:6px 8px;text-align:right;border:1px solid #d8cdb8">Farms</th></tr></thead>
      <tbody>${upstreamWoredas.map(([wid,w])=>`<tr><td style="padding:5px 8px;border:1px solid #d8cdb8">${zone.region}</td><td style="padding:5px 8px;border:1px solid #d8cdb8">${zone.name}</td><td style="padding:5px 8px;border:1px solid #d8cdb8">${w.name}</td><td style="padding:5px 8px;border:1px solid #d8cdb8;font-family:monospace">${zone.gps.lat.toFixed(4)}°N ${zone.gps.lng.toFixed(4)}°E</td><td style="padding:5px 8px;text-align:right;border:1px solid #d8cdb8">${Math.floor(farmCount/upstreamWoredas.length)}</td></tr>`).join("")}</tbody>
    </table>
    <div style="font-size:11px;font-weight:700;color:#1a1208;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;border-bottom:1px solid #d8cdb8;padding-bottom:4px">Parent-Child Lineage Summary</div>
    <div style="font-size:10px;color:#3a2810;line-height:1.6;margin-bottom:14px">
      <b>${c.id}</b> (${(totalKg/1000).toFixed(1)}t shipment) ← <b>${c.exp}</b> (export lot) ← bulk parchment lot ← ${farmCount} farmer harvest batches across ${upstreamWoredas.length} woredas in ${zone.region}.<br>
      Aggregation event chain verified append-only on CHAINROOT ledger. All upstream actors hold Verified or Enhanced tier in the Ankuaru registry. No deforestation risk flagged in the underlying plot data (cut-off date: 31 Dec 2020).
    </div>
    <div style="font-size:11px;font-weight:700;color:#1a1208;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;border-bottom:1px solid #d8cdb8;padding-bottom:4px">Risk Assessment</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
      ${[["Deforestation","Negligible","#5a8a3a"],["Legal Origin","Verified","#5a8a3a"],["Land Rights","Compliant","#5a8a3a"],["Labor Rights","Compliant","#5a8a3a"]].map(([k,v,col])=>`<div style="padding:8px 10px;background:#f5f0e6;border-left:3px solid ${col}"><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase">${k}</div><div style="font-size:12px;font-weight:700;color:${col}">${v}</div></div>`).join("")}
    </div>
    <div style="font-size:9px;color:#5a4a3a;border-top:1px solid #d8cdb8;padding-top:10px;margin-top:14px;line-height:1.5">This statement is generated automatically from CHAINROOT ledger data. The operator (importer) bears ultimate responsibility for due diligence under EUDR Article 8. Underlying append-only event chain available for audit on request. Reference: ${reportId}.<br><br><b>© 2026 Ankuaru. All rights reserved.</b> · Built on CHAINROOT</div>
    <div style="margin-top:14px;display:flex;gap:8px;justify-content:flex-end">
      <button onclick="l4PrintEUDR('${containerId}','${reportId}')" style="padding:8px 16px;background:#5a8a3a;color:#fff;border:none;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer">🖨 Print A4</button>
      <button onclick="document.getElementById('ms-pop').classList.remove('open')" style="padding:8px 16px;background:#fff;border:1px solid #d8cdb8;border-radius:4px;font-size:12px;cursor:pointer">Close</button>
    </div>
  </div>`;
  document.getElementById("ms-pop-body").innerHTML=html;
  msPopOpenAsModal();
}
function l4PrintEUDR(cid,rid){const w=window.open("","_blank");w.document.write("<html><head><title>"+rid+" — Ankuaru EUDR DDS</title></head><body style='margin:0;padding:20px;background:#fff'>"+document.getElementById("ms-pop-body").innerHTML+"</body></html>");w.document.close();setTimeout(()=>w.print(),300);}

function l4ShowBidHistory(id){
  const L=LISTINGS[id];if(!L)return;
  let body;
  if(L.type==="SEALED"){
    body=`<div style="padding:14px;background:rgba(124,58,237,.06);border-left:3px solid #7C3AED;border-radius:4px;font-size:12px;color:var(--tx2)"><b>Sealed-Bid Auction · Blind until close</b><br><br>${L.sealedBids} bids received. Bid amounts, bidder identities, and bid order are <b>completely hidden</b> until the auction closes at ${L.ends||"—"}.<br><br>Sealed-bid integrity prohibits any party (including the seller) from inspecting bids before close.</div>`;
  } else if(L.bidHistory){
    body=`<div style="font-size:11px;color:var(--tx3);margin-bottom:8px">${L.bidHistory.length} bids · counterparties anonymized</div>`+L.bidHistory.slice().reverse().map((b,i)=>`<div style="display:flex;justify-content:space-between;padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-radius:4px;margin-bottom:4px"><div><div style="font-size:12px;font-weight:600">${b.actor}</div><div style="font-size:10px;color:var(--tx3)">${b.when}</div></div><div style="font-size:14px;font-weight:700;color:${i===0?'#7C3AED':'var(--tx)'}">${b.amount.toFixed(2)} USD/kg</div></div>`).join("");
  } else {
    body='<div style="font-size:12px;color:var(--tx3);text-align:center;padding:20px">No bid activity yet.</div>';
  }
  document.getElementById("ms-pop-body").innerHTML=`<div style="padding:20px;max-width:480px"><div style="font-size:9px;color:#7C3AED;font-weight:700;letter-spacing:.05em;margin-bottom:4px">BID HISTORY</div><div style="font-size:16px;font-weight:700;margin-bottom:2px">${id}</div><div style="font-size:11px;color:var(--tx2);margin-bottom:14px">${LISTING_TYPE_LABEL[L.type]} · ${L.grade}</div>${body}</div>`;
  msPopOpenAsModal();
}

function l4PlaceBid(id){
  const L=LISTINGS[id];if(!L)return;
  if(L.state!=="LIVE"&&L.state!=="ENGAGED"){toast("Listing is "+L.state);return;}
  if(L.type==="IOI"){toast("Interest expressed on "+id);L.engaged=(L.engaged||0)+1;renderMarket();return;}
  if(L.type==="ENG"&&L.minIncrementUSD){const cur=L.currentUSDkg||L.reserveUSDkg||0;const next=(cur+L.minIncrementUSD).toFixed(2);const v=prompt("Place bid (min "+next+" USD/kg, increment "+L.minIncrementUSD+"):");if(!v)return;const num=parseFloat(v);if(isNaN(num)||num<parseFloat(next)){toast("Bid must be ≥ "+next+" USD/kg");return;}L.currentUSDkg=num;L.bids=(L.bids||0)+1;if(L.bidHistory)L.bidHistory.push({actor:"You",amount:num,when:"just now"});toast("Bid "+num+" placed on "+id);renderMarket();return;}
  // Simulate match for English/Sealed/Reverse/RFQ
  if(confirm(`Submit bid/offer on ${id}?\n\n${L.grade}\n${(L.weight/1000).toFixed(1)}t · ${L.incoterm||"—"}\n\nThis simulates a successful match → handoff to Contracting.`)){
    L.state="MATCHED";
    const ctrId=ctrCreateFromListing(id);
    toast("Match locked · "+ctrId+" auto-drafted");
    l4ShowMatchHandoff(id);
    renderMarket();
  }
}

function l4ShowMatchHandoff(listingId){
  const L=LISTINGS[listingId];
  const ctrId=L.contractId;
  if(ctrId){ctrShowDetail(ctrId);return;}
  // Fallback to draft preview if no contract yet
  const draftId="DRAFT-"+listingId.replace("LIST-","");
  document.getElementById("ms-pop-body").innerHTML=`<div style="padding:24px;max-width:520px"><div style="font-size:9px;color:#7C3AED;font-weight:700">CONTRACT DRAFT</div><div style="font-size:18px;font-weight:700;margin-bottom:14px">${draftId}</div><div style="font-size:11px;color:var(--tx2)">No contract record yet for ${listingId}. Contract is generated when the match is confirmed.</div></div>`;
  msPopOpenAsModal();
}



function openListingWizard(){l4Step=0;const closeT=todayClose17EAT();L4_NEW={side:null,mech:null,vis:[],qbind:"info",weight:"",grade:"",price:"",delivery:"djibouti-fob",currency:"USD/lb",customClose:false,closeAt:closeT.getTime(),invitees:[],ratingMin:0,roleFilter:"",regionFilter:""};document.getElementById("l4-wiz-ov").classList.add("open");renderL4Step();}
function closeL4Wiz(){document.getElementById("l4-wiz-ov").classList.remove("open");}
function l4Next(){if(l4Step<6){l4Step++;renderL4Step();}else{l4Publish();}}
function l4Back(){if(l4Step>0){l4Step--;renderL4Step();}}
function l4Pick(k,v){L4_NEW[k]=v;renderL4Step();}
function l4ToggleInvitee(id){const i=L4_NEW.invitees.indexOf(id);if(i>=0)L4_NEW.invitees.splice(i,1);else L4_NEW.invitees.push(id);renderL4Step();}
function l4ToggleVis(v){const i=L4_NEW.vis.indexOf(v);if(i>=0)L4_NEW.vis.splice(i,1);else L4_NEW.vis.push(v);renderL4Step();}

function renderL4Step(){
  const labels=["Buy or Sell","Mechanism","Lot / Spec","Price","Visibility","Quality Binding","Review"];
  const dots=labels.map((l,i)=>`<div style="display:flex;align-items:center;gap:6px;${i<labels.length-1?'flex:1':''}"><div style="width:22px;height:22px;border-radius:50%;background:${i<=l4Step?'#7C3AED':'#e5dccc'};color:${i<=l4Step?'#fff':'#999'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${i+1}</div><div style="font-size:10px;color:${i===l4Step?'var(--tx)':'var(--tx3)'};font-weight:${i===l4Step?'600':'400'}">${l}</div>${i<labels.length-1?'<div style="flex:1;height:1px;background:#e5dccc;margin:0 4px"></div>':''}</div>`).join("");
  let body="";
  if(l4Step===0)body=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${[["sell","I'm Selling","Post a lot for buyers"],["buy","I'm Buying","Post a need for sellers"]].map(([v,t,d])=>`<div onclick="l4Pick('side','${v}')" style="padding:24px;border:2px solid ${L4_NEW.side===v?'#7C3AED':'#e5dccc'};border-radius:6px;cursor:pointer;background:${L4_NEW.side===v?'rgba(124,58,237,.06)':'#fff'}"><div style="font-size:16px;font-weight:700;margin-bottom:4px">${t}</div><div style="font-size:11px;color:var(--tx2)">${d}</div></div>`).join("")}</div>`;
  else if(l4Step===1){const opts=L4_NEW.side==="buy"?L4_MECH.filter(m=>["RFQ","REV","IOI"].includes(m.id)):L4_MECH.filter(m=>["IOI","ENG","SEALED"].includes(m.id));body=`<div style="display:grid;gap:8px">${opts.map(m=>`<div onclick="l4Pick('mech','${m.id}')" style="padding:14px;border:2px solid ${L4_NEW.mech===m.id?'#7C3AED':'#e5dccc'};border-radius:6px;cursor:pointer;background:${L4_NEW.mech===m.id?'rgba(124,58,237,.06)':'#fff'}"><div style="font-weight:700">${m.label}</div><div style="font-size:11px;color:var(--tx2);margin-top:2px">${m.desc}</div></div>`).join("")}</div>`;}
  else if(l4Step===2){
    if(L4_NEW.side==="sell"){
      const avail=CONTAINERS.filter(c=>!c.listed&&["PENDING","DISPATCHED"].includes(c.status));
      const lotPicker=`<label style="font-size:11px;color:var(--tx2);font-weight:600">Pick a lot from your inventory</label><div style="max-height:200px;overflow-y:auto;border:1px solid #d8cdb8;border-radius:4px;margin-top:6px;background:#fff">${avail.map(c=>`<div onclick="L4_NEW.lotId='${c.id}';L4_NEW.weight=${c.kg};L4_NEW.grade='${c.grade.replace(/'/g,"")} · ${c.process}';L4_NEW.incoterm='${c.incoterm}';renderL4Step()" style="padding:10px 12px;border-bottom:1px solid #f0e8d6;cursor:pointer;${L4_NEW.lotId===c.id?'background:rgba(124,58,237,.08)':''}"><div style="display:flex;justify-content:space-between"><div style="font-size:12px;font-weight:600">${c.id}</div><div style="font-size:11px;color:var(--tx3)">${(c.kg/1000).toFixed(1)}t</div></div><div style="font-size:10px;color:var(--tx3)">${c.grade} · ${c.process} · ${c.incoterm}</div></div>`).join("")||'<div style="padding:14px;text-align:center;color:var(--tx3);font-size:11px">No unlisted lots in your inventory.</div>'}</div>${L4_NEW.lotId?`<div style="font-size:10px;color:#7C3AED;margin-top:6px">Selected: <b>${L4_NEW.lotId}</b> · auto-fills weight, grade, incoterm</div>`:""}`;
      body=lotPicker;
    } else {
      body=`<div style="font-size:11px;color:var(--tx2);margin-bottom:10px">Buy-side spec — what you're looking for</div><div style="display:grid;gap:10px"><label style="font-size:11px;color:var(--tx2)">Weight needed (kg)<input value="${L4_NEW.weight}" oninput="L4_NEW.weight=this.value" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px"></label><label style="font-size:11px;color:var(--tx2)">Grade / Origin<input value="${L4_NEW.grade}" oninput="L4_NEW.grade=this.value" placeholder="e.g. Yirgacheffe G1 Washed, SCA ≥87" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px"></label><label style="font-size:11px;color:var(--tx2)">Min SCA score<select onchange="L4_NEW.minSCA=this.value" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px"><option>Any</option><option>≥80 (specialty)</option><option>≥85</option><option>≥87</option><option>≥90</option></select></label><label style="font-size:11px;color:var(--tx2)">Delivery Point<select onchange="L4_NEW.incoterm=this.value" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px"><option>Ex Mill (named site)</option><option>Ex Washing Station</option><option>At Exporter Warehouse Addis</option><option>At Modjo Dry Port</option><option>Delivered Addis Ababa</option></select></label></div>`;
    }
  }
  else if(l4Step===3){
    const isDomestic=["at-mill","at-warehouse","addis-dry-port"].includes(L4_NEW.delivery);
    if(!L4_NEW.userPickedCurrency)L4_NEW.currency=isDomestic?"ETB/Frasula":"USD/lb";
    const closeT=L4_NEW.customClose?new Date(L4_NEW.closeAt):todayClose17EAT();
    const closeStr=fmtEAT(closeT);
    const sameDay=Math.abs(closeT.getTime()-Date.now())<36*36e5;
    const engExtra=L4_NEW.mech==="ENG"?`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:6px"><label style="font-size:10px;color:var(--tx3)">Min increment<input value="${L4_NEW.minInc||'0.05'}" oninput="L4_NEW.minInc=this.value" style="width:100%;padding:6px;margin-top:3px;border:1px solid #d8cdb8;border-radius:4px"></label><label style="font-size:10px;color:var(--tx3)">Anti-snipe ext (min)<input value="${L4_NEW.antiSnipe||'5'}" oninput="L4_NEW.antiSnipe=this.value" style="width:100%;padding:6px;margin-top:3px;border:1px solid #d8cdb8;border-radius:4px"></label><label style="font-size:10px;color:var(--tx3)">Hard cap (min)<input value="${L4_NEW.hardCap||'30'}" oninput="L4_NEW.hardCap=this.value" style="width:100%;padding:6px;margin-top:3px;border:1px solid #d8cdb8;border-radius:4px"></label></div>`:"";
    const priceLabel=L4_NEW.mech==="ENG"?"Reserve":L4_NEW.mech==="REV"?"Ceiling":"Price";
    body=`<div style="display:grid;gap:10px">
      <label style="font-size:11px;color:var(--tx2);font-weight:600">Delivery Location<select onchange="L4_NEW.delivery=this.value;L4_NEW.userPickedCurrency=false;renderL4Step()" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px">${DELIVERY_LOCATIONS.map(d=>`<option value="${d.id}" ${L4_NEW.delivery===d.id?"selected":""}>${d.label}</option>`).join("")}</select></label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <label style="font-size:11px;color:var(--tx2);font-weight:600">${priceLabel}<input value="${L4_NEW.price}" oninput="L4_NEW.price=this.value" placeholder="0.00" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px"></label>
        <label style="font-size:11px;color:var(--tx2);font-weight:600">Currency / Unit ${isDomestic?'<span style="color:#7C3AED;font-size:9px">(auto: domestic)</span>':'<span style="color:#7C3AED;font-size:9px">(auto: international)</span>'}<select onchange="L4_NEW.currency=this.value;L4_NEW.userPickedCurrency=true" style="width:100%;padding:8px;margin-top:4px;border:1px solid #d8cdb8;border-radius:4px">${Object.entries(CURRENCIES).map(([k,v])=>`<option value="${k}" ${L4_NEW.currency===k?"selected":""}>${v.label}</option>`).join("")}</select></label>
      </div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:5px;padding:10px 12px;margin-top:4px">
        <div style="font-size:11px;color:var(--tx2);font-weight:600;margin-bottom:6px">Bidding Window</div>
        <div style="display:flex;gap:6px;margin-bottom:6px"><button onclick="L4_NEW.customClose=false;L4_NEW.closeAt=todayClose17EAT().getTime();renderL4Step()" style="flex:1;padding:6px;background:${!L4_NEW.customClose?'#7C3AED':'#fff'};color:${!L4_NEW.customClose?'#fff':'var(--tx2)'};border:1px solid ${!L4_NEW.customClose?'#7C3AED':'#d8cdb8'};border-radius:4px;font-size:11px;cursor:pointer">Same-day · closes 17:00 EAT</button><button onclick="L4_NEW.customClose=true;renderL4Step()" style="flex:1;padding:6px;background:${L4_NEW.customClose?'#7C3AED':'#fff'};color:${L4_NEW.customClose?'#fff':'var(--tx2)'};border:1px solid ${L4_NEW.customClose?'#7C3AED':'#d8cdb8'};border-radius:4px;font-size:11px;cursor:pointer">Custom</button></div>
        ${L4_NEW.customClose?`<input type="datetime-local" oninput="const d=new Date(this.value);L4_NEW.closeAt=d.getTime()-3*36e5;renderL4Step()" style="width:100%;padding:6px;border:1px solid #d8cdb8;border-radius:4px;font-size:11px">`:""}
        <div style="font-size:10px;color:var(--tx3);margin-top:6px">Closes <b style="color:#7C3AED">${closeStr}</b>${sameDay?' · same-day':''}</div>
      </div>
      ${engExtra}
    </div>`;
  }
  else if(l4Step===4){
    const visChips=L4_VIS.map(v=>`<div onclick="l4ToggleVis('${v.id}')" style="padding:10px 12px;border:2px solid ${L4_NEW.vis.includes(v.id)?'#7C3AED':'#e5dccc'};border-radius:5px;cursor:pointer;background:${L4_NEW.vis.includes(v.id)?'rgba(124,58,237,.06)':'#fff'};display:flex;justify-content:space-between;margin-bottom:6px"><div><div style="font-weight:600;font-size:12px">${v.label}</div><div style="font-size:10px;color:var(--tx3)">${v.desc}</div></div><div style="font-size:14px;color:#7C3AED">${L4_NEW.vis.includes(v.id)?'✓':''}</div></div>`).join("");
    const showInvite=L4_NEW.vis.includes("invite");
const rfqAnon=L4_NEW.mech==="RFQ"?`<div style="margin-top:10px;padding:10px 12px;background:#fff;border:1px solid #e5dccc;border-radius:5px"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:11px"><input type="checkbox" ${L4_NEW.anonymous?"checked":""} onchange="L4_NEW.anonymous=this.checked;renderL4Step()"><span><b>Post anonymously</b> — sellers see role + rating, not your identity (revealed only on accepted offer)</span></label></div>`:"";
    const showRating=L4_NEW.vis.includes("rating");
    let pickerBody="";
    if(showInvite||showRating){
      const allActors=Object.entries(ACTOR_REGISTRY);
      const filtered=allActors.filter(([id,a])=>{
        if(L4_NEW.ratingMin&&(a.rating||0)<L4_NEW.ratingMin)return false;
        if(L4_NEW.roleFilter&&!a.roles.some(r=>r.toLowerCase().includes(L4_NEW.roleFilter.toLowerCase())))return false;
        if(L4_NEW.regionFilter&&!(a.region||"").toLowerCase().includes(L4_NEW.regionFilter.toLowerCase()))return false;
        return true;
      });
      const allRoles=[...new Set(allActors.flatMap(([,a])=>a.roles))];
      pickerBody=`<div style="margin-top:14px;padding:12px;background:#fff;border:1px solid #e5dccc;border-radius:5px">
        <div style="font-size:11px;color:var(--tx2);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">${showInvite?'Pick Invitees':'Rating Filter'}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px">
          <select onchange="L4_NEW.ratingMin=parseFloat(this.value);renderL4Step()" style="padding:6px;border:1px solid #d8cdb8;border-radius:4px;font-size:11px"><option value="0">Any rating</option><option value="4" ${L4_NEW.ratingMin===4?"selected":""}>≥ 4.0★</option><option value="4.5" ${L4_NEW.ratingMin===4.5?"selected":""}>≥ 4.5★</option><option value="4.7" ${L4_NEW.ratingMin===4.7?"selected":""}>≥ 4.7★</option></select>
          <select onchange="L4_NEW.roleFilter=this.value;renderL4Step()" style="padding:6px;border:1px solid #d8cdb8;border-radius:4px;font-size:11px"><option value="">Any role</option>${allRoles.map(r=>`<option value="${r}" ${L4_NEW.roleFilter===r?"selected":""}>${r}</option>`).join("")}</select>
          <input placeholder="Region filter" value="${L4_NEW.regionFilter}" oninput="L4_NEW.regionFilter=this.value;renderL4Step()" style="padding:6px;border:1px solid #d8cdb8;border-radius:4px;font-size:11px">
        </div>
        <div style="max-height:200px;overflow-y:auto;border:1px solid #e5dccc;border-radius:4px">
          ${filtered.map(([id,a])=>{const checked=L4_NEW.invitees.includes(id);return`<div onclick="${showInvite?`l4ToggleInvitee('${id}')`:''}" style="padding:8px 10px;border-bottom:1px solid #f0e8d6;cursor:${showInvite?'pointer':'default'};display:flex;justify-content:space-between;align-items:center;${checked?'background:rgba(124,58,237,.06)':''}"><div><div style="font-size:11px;font-weight:600">${a.name} <span style="color:#7C3AED;font-size:9px">${COMPANY_TYPES[a.companyType]||""}</span></div><div style="font-size:9px;color:var(--tx3)">${a.roles.join(" + ")} · ${a.region} · ★${a.rating||"—"}</div></div>${showInvite?`<div style="font-size:14px;color:#7C3AED">${checked?'✓':''}</div>`:""}</div>`;}).join("")||'<div style="padding:14px;text-align:center;font-size:11px;color:var(--tx3)">No actors match these filters.</div>'}
        </div>
        ${showInvite&&L4_NEW.invitees.length?`<div style="font-size:10px;color:#7C3AED;margin-top:6px"><b>${L4_NEW.invitees.length}</b> actor(s) invited</div>`:""}
      </div>`;
    }
    body=`<div style="font-size:11px;color:var(--tx2);margin-bottom:10px">Combine any. Composable.</div>${visChips}${pickerBody}${rfqAnon}`;
  }
  else if(l4Step===5)body=`<div style="font-size:11px;color:var(--tx2);margin-bottom:10px">How are quality results bound to commerce?</div><div style="display:grid;gap:6px">${L4_QBIND.map(q=>`<div onclick="l4Pick('qbind','${q.id}')" style="padding:12px;border:2px solid ${L4_NEW.qbind===q.id?'#7C3AED':'#e5dccc'};border-radius:5px;cursor:pointer;background:${L4_NEW.qbind===q.id?'rgba(124,58,237,.06)':'#fff'}"><div style="font-weight:600;font-size:12px">${q.label}</div><div style="font-size:10px;color:var(--tx3)">${q.desc}</div></div>`).join("")}</div>`;
  else if(l4Step===6){
    const closeT=new Date(L4_NEW.closeAt||todayClose17EAT().getTime());
    const delivery=DELIVERY_LOCATIONS.find(d=>d.id===L4_NEW.delivery);
    const sum=[["Side",L4_NEW.side==="sell"?"Selling":"Buying"],["Mechanism",L4_MECH.find(m=>m.id===L4_NEW.mech)?.label||"—"],["Weight",(L4_NEW.weight||"—")+" kg"],["Grade",L4_NEW.grade||"—"],["Delivery",delivery?delivery.label:"—"],["Price",(L4_NEW.price||"—")+" "+L4_NEW.currency],["Bidding closes",fmtEAT(closeT)],["Visibility",L4_NEW.vis.length?L4_NEW.vis.map(v=>L4_VIS.find(x=>x.id===v).label).join(" + "):"Open Market (default)"]];
    if(L4_NEW.invitees.length)sum.push(["Invitees",L4_NEW.invitees.length+" actors"]);
    if(L4_NEW.ratingMin)sum.push(["Rating filter","≥ "+L4_NEW.ratingMin+"★"]);
    sum.push(["Quality Binding",L4_QBIND.find(q=>q.id===L4_NEW.qbind).label]);
    body=mgr(sum)+`<div style="margin-top:12px;padding:10px 12px;background:rgba(124,58,237,.08);border-left:3px solid #7C3AED;border-radius:4px;font-size:11px;color:var(--tx2)">On publish: listing goes <b>LIVE</b>, lot moves to <b>LISTED</b> sub-state, notifications sent to ${L4_NEW.invitees.length?(L4_NEW.invitees.length+' invited actors'):'all actors matching your visibility filter'}.</div>`;
  }
  let canNext=true;let nextErr="";
  if(l4Step===0){canNext=!!L4_NEW.side;}
  else if(l4Step===1){canNext=!!L4_NEW.mech;}
  else if(l4Step===2){if(L4_NEW.side==="sell"){canNext=!!L4_NEW.lotId;if(!canNext)nextErr="Pick a lot";}else{canNext=!!L4_NEW.weight&&!!L4_NEW.grade;if(!canNext)nextErr="Weight + grade required";}}
  else if(l4Step===3){canNext=!!L4_NEW.price&&parseFloat(L4_NEW.price)>0&&!!L4_NEW.delivery;if(!canNext)nextErr="Price + delivery required";}
  document.getElementById("l4-wiz-body").innerHTML=`<div style="display:flex;gap:0;margin-bottom:20px">${dots}</div><div style="min-height:240px">${body}</div><div style="display:flex;justify-content:space-between;margin-top:18px;padding-top:14px;border-top:1px solid #e5dccc"><button onclick="closeL4Wiz()" style="padding:8px 16px;background:none;border:none;color:var(--tx3);cursor:pointer;font-size:12px">Cancel</button><div style="display:flex;gap:8px">${l4Step>0?'<button onclick="l4Back()" style="padding:8px 16px;background:#fff;border:1px solid #d8cdb8;border-radius:4px;cursor:pointer;font-size:12px">Back</button>':''}<button onclick="l4Next()" ${canNext?'':'disabled'} style="padding:8px 20px;background:${canNext?'#7C3AED':'#ccc'};color:#fff;border:none;border-radius:4px;cursor:${canNext?'pointer':'not-allowed'};font-size:12px;font-weight:700">${l4Step===6?'Publish Listing':'Next →'}</button></div></div>`;
}

function l4Publish(){
  const newId="LIST-"+L4_NEW.mech+"-"+String(Math.floor(Math.random()*9000)+1000);
  const closeAt=L4_NEW.closeAt||todayClose17EAT().getTime();
  const delivery=DELIVERY_LOCATIONS.find(d=>d.id===L4_NEW.delivery);
  const obj={type:L4_NEW.mech,state:"LIVE",lot:L4_NEW.lotId||null,weight:parseInt(L4_NEW.weight)||10000,grade:L4_NEW.grade||"User Listing",priceMode:"Outright",priceUSDkg:parseFloat(L4_NEW.price)||0,currency:L4_NEW.currency,delivery:delivery?delivery.label:"—",incoterm:delivery?delivery.label:"—",duration:"—",endsAt:closeAt,ends:fmtEAT(new Date(closeAt)),visibility:L4_NEW.vis.length?L4_NEW.vis.map(v=>L4_VIS.find(x=>x.id===v).label):["Open Market"],invitees:L4_NEW.invitees.slice(),ratingMin:L4_NEW.ratingMin,bids:0,quality:L4_NEW.minSCA?("Required: "+L4_NEW.minSCA):"Unsampled",eudr:false,note:"Created via marketplace wizard. Quality binding: "+L4_QBIND.find(q=>q.id===L4_NEW.qbind).label+(L4_NEW.invitees.length?". "+L4_NEW.invitees.length+" invitees.":".")};
  if(L4_NEW.mech==="ENG"){const rp=parseFloat(L4_NEW.price)||0;obj.reserveUSDkg=rp;obj.currentUSDkg=rp;obj.minIncrementUSD=parseFloat(L4_NEW.minInc)||0.05;obj.antiSnipingMin=parseInt(L4_NEW.antiSnipe)||5;obj.hardCapMin=parseInt(L4_NEW.hardCap)||30;obj.bidHistory=[];}
  if(L4_NEW.mech==="SEALED"){obj.sealedBids=0;const sr=parseFloat(L4_NEW.price)||0;if(sr)obj.reserveUSDkg=sr;}
  LISTINGS[newId]=obj;
  if(L4_NEW.lotId){const c=CONTAINERS.find(x=>x.id===L4_NEW.lotId);if(c)c.listed=newId;}
  closeL4Wiz();
  toast("Listing "+newId+" published · LIVE · closes "+fmtEAT(new Date(closeAt)));
  renderMarket();
}


// Card grid
function renderGrid(fl){
  const toggleBar='<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 4px;margin-bottom:6px;border-bottom:1px solid var(--border2);flex-wrap:wrap;gap:8px">'+
    '<div style="font-size:11px;color:var(--tx3)"><b style="color:var(--tx)">Kaffa Trading PLC</b> · '+fl.length+' lot'+(fl.length!==1?"s":"")+' in portfolio</div>'+
    unitToggleWidget("portfolio","ETB_FRAS")+
    '</div>';
  const html=toggleBar+'<div class="cgrid">'+fl.map(function(c){
    var status=STATUS_LABELS[c.status]||c.status;
    var statusColor=c.status==="EXPORTED"?"#5a8a3a":c.status==="DISPATCHED"?"#3a7a8a":"#9a7a3a";
    // Status-dependent key metric: weight pre-ship, ETA in transit, arrival when delivered
    var metric;
    if(c.status==="EXPORTED")metric="Exported "+(c.arrived||c.eta);
    else if(c.status==="PENDING")metric=(c.kg/KG_PER_FRASULA).toFixed(0)+" fras · "+(c.kg/1000).toFixed(1)+"t";
    else metric="ETA buyer "+c.eta;
    return '<div class="ccv2'+(activeCont===c.id?" sel":"")+'" onclick="openDetail(\''+c.id+'\')">'+
      '<div class="ccv2-name">'+c.grade+' · '+c.process+'</div>'+
      '<div class="ccv2-row">'+
      '<span class="ccv2-status" style="color:'+statusColor+'">● '+status+'</span>'+
      '<span class="ccv2-metric">'+metric+'</span>'+
      '</div></div>';
  }).join("")+'</div>';
  document.getElementById("view-area").innerHTML=fl.length?html:'<div style="padding:40px;text-align:center;color:var(--tx3)">No contracts match.</div>';
}
function toggleCardExp(id){cardExp[id]=!cardExp[id];renderView();}

// Timeline view
function renderTL(fl){
  const em=Object.fromEntries(EXPORTERS.map(e=>[e.id,e]));
  document.getElementById("view-area").innerHTML=`<div class="tlview">${fl.map(c=>{
    const exp=em[c.exp];
    const ms=genMilestones(c);
    const doneN=ms.filter(m=>m.status==="done").length;
    const fillPct=Math.round(doneN/ms.length*100);
    return`<div class="tlrow${activeCont===c.id?" sel":""}" onclick="openDetail('${c.id}')">
      <div class="tlrow-inner">
        <div class="tl-card">
          <div>
            <div class="tl-card-top">
              <div class="edot" style="background:${exp.color}"></div>
              ${muid(c.id)}
              <span class="sp sp-${c.status}" style="font-size:8px;padding:1px 5px">${STATUS_LABELS[c.status]}</span>
            </div>
            <div class="tl-card-grade">${c.grade} · ${c.process}</div>
          </div>
          <div class="tl-card-meta">
            <span class="cc-w">${(c.kg/1000).toFixed(1)}t</span>
            <span style="color:${c.status==="EXPORTED"?"#065F46":"#3a6a3a"};font-size:10px">${c.status==="EXPORTED"?"✓ Exported "+(c.arrived||c.eta):"ETA "+c.eta}</span>
            ${c.cup?`<span style="color:var(--amber);font-size:10px">${c.cup}</span>`:""}
          </div>
        </div>
        <div class="tl-track">
          ${TRACE_OK.includes(c.status)?`<button type="button" class="tl-map-ic-btn" onclick="event.stopPropagation();openHrvMapModal('${c.id}')" title="Harvest batches on map" aria-label="Open harvest map"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg></button>`:""}
          <div class="ms-wrap">
            <div class="ms-line-bg"></div>
            <div class="ms-line-fill" style="width:${fillPct}%"></div>
            <div class="ms-items">
              ${ms.map(m=>`<div class="ms" onmouseenter="showMsPop('${c.id}','${m.id}',this)" onmouseleave="scheduleCloseMsPop()" onclick="event.stopPropagation()">
                <div class="ms-dot ${m.status}">${m.status==="done"?"✓":m.status==="warn"||m.status==="over"?"!":""}</div>
                <div class="ms-lbl ${m.status}">${m.label}</div>
              </div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join("")||'<div style="padding:40px;text-align:center;color:var(--tx3)">No contracts match.</div>'}</div>`;
}

// ════════════════════════════════════════════════ STATUS BAR ═════
function updateStatusBar(){
  const fl=CONTAINERS;
  const inMotion=fl.filter(c=>c.status==="DISPATCHED").length;
  const arrived=fl.filter(c=>c.status==="EXPORTED").length;
  const pending=fl.filter(c=>c.status==="PENDING").length;
  const totalVal=fl.reduce((s,c)=>s+c.value,0);
  // Count action items
  const actions=fl.reduce((n,c)=>{const ms=genMilestones(c);return n+ms.filter(m=>m.status==="warn"||m.status==="over").length;},0);
  document.getElementById("sb-items").innerHTML=[
    {dot:"#3B82F6",text:`${inMotion} In Motion`},
    {dot:"#22C55E",text:`${arrived} Arrived`},
    {dot:"#F59E0B",text:`${pending} Pending`},
    {dot:actions>0?"#EF4444":"#22C55E",text:`${actions} Action${actions!==1?"s":""} Due`},
    {dot:"#8B5CF6",text:`$${Math.round(totalVal/1000)}k Portfolio`},
  ].map(s=>`<div class="sb-item"><div class="sb-dot" style="background:${s.dot}"></div>${s.text}</div>`).join("");
  document.getElementById("sb-date").textContent=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  // Sidebar footer
  document.getElementById("sb-status").innerHTML=`<div style="margin-bottom:3px;color:#8a7a6a">${inMotion} active shipments</div><div style="color:${actions>0?"#EF4444":"#4a8a4a"}">${actions} milestone${actions!==1?"s":""} need attention</div>`;
  // Bell badge
  const over=fl.reduce((n,c)=>n+genMilestones(c).filter(m=>m.status==="over").length,0);
  const warn=fl.reduce((n,c)=>n+genMilestones(c).filter(m=>m.status==="warn").length,0);
  const total=over+warn;
  const badge=document.getElementById("bell-badge");
  badge.textContent=total;
  badge.style.display=total>0?"flex":"none";
}

// ══════════════════════════════════════════════════ DETAIL ═══════
function openDetail(id){
  dpTraceInlineFor=null;  // v22.2: reset inline trace on every fresh open
  activeCont=id;
  const c=CONTAINERS.find(x=>x.id===id);
  const exp=EXPORTERS.find(e=>e.id===c.exp);
  document.getElementById("d-uid-chip").innerHTML=muid(c.id);
  document.getElementById("d-grade").textContent=`${c.grade} · ${c.process}`;
  document.getElementById("d-sub").innerHTML=`${muid(c.exp)} · ${exp.city} · ${(c.kg/1000).toFixed(1)}t · ${muid(c.zone)}`;
  renderStepper(c);
  document.getElementById("detail").classList.add("open");
  const qatTitle=document.getElementById("qat-title");
  if(qatTitle)qatTitle.textContent=`${c.id} — ${c.grade} · ${STATUS_LABELS[c.status]}`;
  const sbCrumb=document.getElementById("sb-crumb");
  if(sbCrumb)sbCrumb.textContent=`Portfolio / ${c.id} — ${c.grade}`;
  // Reset detail tabs
  activeTab="overview";
  document.querySelectorAll(".dtab").forEach((t,i)=>t.classList.toggle("active",i===0));
  updateContextTabs();
  renderDTab(c);
  renderView();
}
function closeDetail(){
  dpTraceInlineFor=null;  // v22.2: clear inline trace state
  document.getElementById("detail").classList.remove("open");
  activeCont=null;
  const qatTitle=document.getElementById("qat-title");
  if(qatTitle)qatTitle.textContent="Portfolio — Kaffa Trading PLC";
  const sbCrumb=document.getElementById("sb-crumb");
  if(sbCrumb)sbCrumb.textContent="Ankuaru · Portfolio — Kaffa Trading PLC";
  updateContextTabs();
  renderView();
}
function renderStepper(c){
  const si=STEP_IDX[c.status];
  const steps=["Contract","Dispatched","Exported"];
  let h="";
  steps.forEach((s,i)=>{const done=i<si,curr=i===si;
    h+=`<div class="step"><div class="sdot${done?" done":curr?" curr":""}">${done?"✓":i+1}</div><div class="slbl${done?" done":curr?" curr":""}">${s}</div></div>`;
    if(i<4)h+=`<div class="sline${done||curr?" done":""}"></div>`;
  });
  document.getElementById("d-stepper").innerHTML=h;
}
function switchDTab(tab,btn){
  // v20: tabs are gone but legacy callers (ribbon buttons) still call switchDTab.
  // Map tab name → section id and scroll/open that section in the new collapsible panel.
  const map={overview:"overview",lc:"contract",trace:"trace",quality:"quality",origin:"origin",settlement:"settlement"};
  const target=map[tab]||"overview";
  dpOpenSection(target);
}
function renderDTab(c){
  // v20: rewrite to render the full collapsible panel into #dtbody.
  document.getElementById("dtbody").innerHTML=renderDetailPanelV2(c);
  // Auto-open the section relevant to current state
  const auto=dpAutoSection(c);
  setTimeout(function(){dpOpenSection(auto);},0);
}
function dpAutoSection(c){
  if(c.status==="EXPORTED")return"settlement";
  if(c.status==="DISPATCHED")return"trace";
  if(c.status==="PENDING")return"contract";
  return"overview";
}
function dpOpenSection(id){
  // Close all, open one
  document.querySelectorAll(".dp-sec-body").forEach(function(b){b.classList.remove("open");});
  document.querySelectorAll(".dp-sec-arrow").forEach(function(a){a.classList.remove("open");});
  const body=document.getElementById("dp-body-"+id);
  const arrow=document.getElementById("dp-arrow-"+id);
  if(body)body.classList.add("open");
  if(arrow)arrow.classList.add("open");
}
function renderDetailPanelV2(c){
  // Build all 6 collapsible sections. Only one open at a time (handled by dpOpenSection).
  const exp=EXPORTERS.find(function(e){return e.id===c.exp;})||{name:"—",short:"—"};
  const g=c.guarantee||{state:"DRAFT",no:null,bankName:"—",docs:[]};
  const ms=genMilestones(c);
  const doneMs=ms.filter(function(m){return m.status==="done";}).length;
  const docCount=g.docs?g.docs.length:0;
  const docDone=g.state==="COUNTERSIGNED"||g.state==="SETTLED"?docCount:Math.floor(docCount*0.6);
  const ctr=c.contractId?CONTRACTS[c.contractId]:null;
  const hasFin=c.contractId&&FINANCING[c.contractId];
  const payCount=Object.values(PAYMENTS).filter(function(p){return p.contractId===c.contractId;}).length;
  const settledCount=Object.values(PAYMENTS).filter(function(p){return p.contractId===c.contractId&&p.state==="SETTLED";}).length;
  const status=STATUS_LABELS[c.status]||c.status;
  const statusColor=c.status==="EXPORTED"?"#5a8a3a":c.status==="DISPATCHED"?"#3a7a8a":"#9a7a3a";

  function section(id,title,summary,bodyFn){
    return '<div class="dp-section">'+
      '<div class="dp-sec-head" onclick="dpToggleSection(\''+id+'\')">'+
        '<div class="dp-sec-title">'+title+'</div>'+
        '<div class="dp-sec-summary">'+summary+'</div>'+
        '<div class="dp-sec-arrow" id="dp-arrow-'+id+'">▶</div>'+
      '</div>'+
      '<div class="dp-sec-body" id="dp-body-'+id+'">'+bodyFn()+'</div>'+
    '</div>';
  }

  function row(k,v){return '<div class="dp-row"><span class="dp-rk">'+k+'</span><span class="dp-rv">'+v+'</span></div>';}

  // Overview body: just the absolute essentials, nothing else
  const overviewBody=function(){
    // Buyer from linked contract; fallback when no contract yet
      const linkedCtr=c.contractId?CONTRACTS[c.contractId]:null;
      const buyerName=linkedCtr?((ACTOR_REGISTRY[linkedCtr.buyer]||{}).name||linkedCtr.buyer):"Not yet contracted";
      return row("Status",'<span style="color:'+statusColor+';font-weight:700">● '+status+'</span>')+
      row("Grade",c.grade+" · "+c.process)+
      row("Net Weight",c.kg.toLocaleString()+" kg ("+(c.kg/KG_PER_FRASULA).toFixed(0)+" frasulas)")+
      row("Buyer",buyerName)+
      (c.status==="EXPORTED"?row("Exported",c.arrived||c.eta):row("ETA",c.eta));
  };

  // Contract & LC body: progress, key dates, NO doc list (that's in Documents section)
  const contractBody=function(){
    let html=row("Contract",c.contractId?'<a onclick="closeDetail();showUID(\''+c.contractId+'\')" style="color:#7C3AED;cursor:pointer;text-decoration:underline">'+c.contractId+'</a>':'<span style="color:#9a8a7a">— not yet —</span>');
    if(ctr){
      html+=row("Contract State",'<span class="dp-status-pill" style="background:'+(CTR_STATE_COLOR[ctr.state]||"#666")+';color:#fff">'+(CTR_STATE_LABEL[ctr.state]||ctr.state)+'</span>');
    }
    const gStateLabel={DRAFT:"Draft",ISSUED:"Issued",COUNTERSIGNED:"Countersigned",SETTLED:"Settled"}[g.state]||g.state;
    const gStateColor={DRAFT:"#9a8a7a",ISSUED:"#A87832",COUNTERSIGNED:"#3a7a8a",SETTLED:"#5a8a3a"}[g.state]||"#666";
    html+=row("Guarantee State",'<span class="dp-status-pill" style="background:'+gStateColor+';color:#fff">'+gStateLabel+'</span>')+
      row("Guarantee Number",g.no||'<span style="color:#9a8a7a">Not yet issued</span>')+
      row("Issuing Bank",g.bankName||"—")+
      row("Delivery",c.incoterm||"—")+
      row("Payment Terms",c.payterms||"On delivery")+
      row("Value (ETB)",(c.value||0).toLocaleString("en-US",{maximumFractionDigits:0})+" ETB")+
      row("Value (ETB/frasula)",((c.value||0)/(c.kg/KG_PER_FRASULA)).toFixed(0).toLocaleString()+" ETB/fras")+
      row("Milestones",doneMs+"/"+ms.length+" complete");
    if(c.contractId){
      html+='<button class="dp-action" onclick="closeDetail();showUID(\''+c.contractId+'\')">Open Contract →</button>';
    }
    return html;
  };

  // Trace body: top-level lot only with "View breakdown" gate
  const traceBody=function(){
    return row("Lot UID",muid(c.id))+
      row("Container",c.cno||"—")+
      row("Bill of Lading",c.bl||"—")+
      row("Vessel",c.vessel||"—")+
      '<div style="margin-top:10px;padding:14px;background:#fafaf6;border:1px dashed #d8cdb8;border-radius:5px;text-align:center">'+
      '<div style="font-size:11px;color:var(--tx3);margin-bottom:8px">This shipment was aggregated from <b>'+(c.farms||10)+' farmer harvest batches</b> across '+(c.areas?c.areas.length:1)+' woreda(s).</div>'+
      '<button class="dp-action secondary" onclick="dpOpenTraceBreakdown(\''+c.id+'\')">View Breakdown</button>'+
      '</div>';
  };

  // Quality body: just the cup score and an expand-for-detail button
  const qualityBody=function(){
    if(!c.cup)return '<div class="dp-row" style="color:var(--tx3);font-style:italic;justify-content:center">Not yet sampled</div>';
    return row("Cup Score",'<span style="font-weight:700;color:#5a8a3a">'+c.cup.toFixed(2)+' SCA</span>')+
      row("Process",c.process)+
      '<button class="dp-action secondary" onclick="document.getElementById(\'dp-body-quality\').innerHTML=renderQuality(CONTAINERS.find(function(x){return x.id===\''+c.id+'\'}));">View Cupping Detail</button>';
  };

  // Documents body: 5/7 complete summary, expand reveals list
  const docBody=function(){
    const docs=g.docs||[];
    if(!docs.length)return '<div class="dp-row" style="color:var(--tx3);font-style:italic;justify-content:center">No documents required</div>';
    let html=row("Required",docCount+" documents")+
      row("Complete",docDone+" of "+docCount)+
      row("Missing",(docCount-docDone)+" pending");
    html+='<details style="margin-top:10px"><summary style="cursor:pointer;font-size:11px;color:#7C3AED;font-weight:600">Show document list</summary>';
    html+=docs.map(function(d,i){
      const done=i<docDone;
      return '<div class="dp-row"><span class="dp-rk">'+(done?"✓":"○")+' '+d+'</span><span class="dp-rv" style="color:'+(done?"#5a8a3a":"#9a8a7a")+'">'+(done?"Complete":"Pending")+'</span></div>';
    }).join("")+'</details>';
    return html;
  };

  // Settlement body: state + next action only
  const settlementBody=function(){
    if(!c.contractId)return '<div class="dp-row" style="color:var(--tx3);font-style:italic;justify-content:center">No contract activated yet</div>';
    if(!hasFin&&payCount===0)return row("Status",'<span style="color:#9a8a7a">Awaiting activation</span>');
    let html=row("Payments",payCount+" instructions")+
      row("Settled",settledCount+" of "+payCount);
    if(hasFin){
      const f=FINANCING[c.contractId];
      html+=row("Credit Line","$"+f.creditLineUSD.toLocaleString())+
        row("Drawn","$"+f.drawnUSD.toLocaleString());
    }
    if(payCount>0){
      const nextPay=Object.values(PAYMENTS).find(function(p){return p.contractId===c.contractId&&["PENDING","INITIATED","IN_FLIGHT"].indexOf(p.state)>=0;});
      if(nextPay){
        html+='<div style="margin-top:10px;padding:10px 12px;background:rgba(58,122,138,.08);border-left:3px solid #3a7a8a;border-radius:4px;font-size:11px;color:var(--tx2)">Next action: '+nextPay.id+' is '+PAY_STATE_LABEL[nextPay.state]+'</div>';
        html+='<button class="dp-action" onclick="closeDetail();payShowDetail(\''+nextPay.id+'\')">Open Payment →</button>';
      }
    }
    return html;
  };

  // Header bar: just UID, grade, status
  const header='<div style="padding:18px 16px 14px;border-bottom:2px solid #d8cdb8">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">'+
    '<div style="font-family:monospace;font-size:11px;color:var(--tx3);font-weight:600">'+c.id+'</div>'+
    '<span class="dp-status-pill" style="background:'+statusColor+';color:#fff">'+status+'</span>'+
    '</div>'+
    '<div style="font-size:16px;font-weight:700;color:var(--tx);margin-top:4px">'+c.grade+'</div>'+
    '<div style="font-size:11px;color:var(--tx3);margin-top:2px">'+c.process+' · '+(c.kg/1000).toFixed(1)+' t · '+exp.name+'</div>'+
    '</div>';

  // Insurance section body
  const insuranceBody=function(){
    if(!c.contractId)return '<div class="dp-row" style="color:var(--tx3);font-style:italic;justify-content:center">No contract activated yet</div>';
    const pols=Object.values(POLICIES).filter(function(p){return p.contractId===c.contractId;});
    if(!pols.length)return '<div class="dp-row" style="color:var(--tx3);font-style:italic;justify-content:center">No policies bound</div>';
    const totalCap=pols.reduce(function(s,p){return s+p.cap;},0);
    const totalPrem=pols.reduce(function(s,p){return s+p.premium;},0);
    const relatedClaims=Object.values(CLAIMS).filter(function(cl){return cl.contractId===c.contractId;});
    let html=row("Policies Active",String(pols.length))+
      row("Total Coverage Cap","$"+totalCap.toLocaleString())+
      row("Total Premium","$"+totalPrem.toLocaleString())+
      row("Claims Filed",String(relatedClaims.length));
    html+='<div style="margin-top:10px">';
    pols.forEach(function(p){
      html+='<div onclick="closeDetail();polShowDetail(\''+p.id+'\')" style="padding:8px 10px;background:#fff;border:1px solid #e5dccc;border-left:3px solid #1a3a6a;border-radius:3px;margin-bottom:4px;cursor:pointer;display:flex;justify-content:space-between;font-size:11px"><span>'+p.productLabel+'</span><span style="color:#3a7a8a;font-weight:700;font-family:monospace">$'+(p.cap/1000).toFixed(0)+'k</span></div>';
    });
    html+='</div>';
    return html;
  };

  return header+
    section("overview","Overview",status,overviewBody)+
    section("contract","Contract & Guarantee",(g.state==="DRAFT"?"Draft":g.state==="ISSUED"?"Issued":g.state==="COUNTERSIGNED"?"Countersigned":"Settled"),contractBody)+
    section("trace","Traceability",(c.farms||10)+" farms",traceBody)+
    section("quality","Quality",c.cup?c.cup.toFixed(2)+" SCA":"Not sampled",qualityBody)+
    section("documents","Documents",docDone+"/"+docCount+" complete",docBody)+
    section("insurance","Insurance",(function(){const pols=c.contractId?Object.values(POLICIES).filter(function(p){return p.contractId===c.contractId;}).length:0;return pols?pols+" polic"+(pols===1?"y":"ies")+" bound":"Not attached";})(),insuranceBody)+
    section("settlement","Settlement",payCount?settledCount+"/"+payCount+" settled":"Awaiting activation",settlementBody);
}
function dpToggleSection(id){
  // v22.2: if user navigates away from trace section, clear inline flag so
  // reopening trace shows the summary + View Breakdown button again
  if(id!=="trace")dpTraceInlineFor=null;
  // Also: if user collapses the trace section (clicks it while open), clear inline
  const tbody=document.getElementById("dp-body-trace");
  if(id==="trace"&&tbody&&tbody.classList.contains("open"))dpTraceInlineFor=null;
  const body=document.getElementById("dp-body-"+id);
  const arrow=document.getElementById("dp-arrow-"+id);
  if(!body)return;
  const isOpen=body.classList.contains("open");
  // Close all others
  document.querySelectorAll(".dp-sec-body").forEach(function(b){b.classList.remove("open");});
  document.querySelectorAll(".dp-sec-arrow").forEach(function(a){a.classList.remove("open");});
  if(!isOpen){
    body.classList.add("open");
    if(arrow)arrow.classList.add("open");
    // If opening trace and inline was just cleared, re-render the summary view
    if(id==="trace"&&!dpTraceInlineFor){
      const cur=CONTAINERS.find(function(x){return x.id===activeCont;});
      if(cur&&typeof renderDetailPanelV2==="function"){
        // Rebuild just the trace body from the fresh detail panel renderer
        // We re-render the whole panel because the summary is computed inside a closure
        renderDTab(cur);
        // Re-open trace after rerender
        setTimeout(function(){
          const nb=document.getElementById("dp-body-trace");
          const na=document.getElementById("dp-arrow-trace");
          if(nb)nb.classList.add("open");
          if(na)na.classList.add("open");
        },0);
      }
    }
  }
}
function renderOverview(c){
  const exp=EXPORTERS.find(e=>e.id===c.exp);
  return`<div class="dst">Shipment</div>
  ${drow("Container",`<span style="font-family:'SF Mono',Menlo,monospace;font-size:10px">${c.cno||"—"}</span>`)}
  ${drow("Bill of Lading",`<span style="font-family:'SF Mono',Menlo,monospace;font-size:10px">${c.bl||"—"}</span>`)}
  ${drow("Vessel",c.vessel||"—")}
  ${drow("Status",`<span class="sp sp-${c.status}">${STATUS_LABELS[c.status]}</span>`)}
  ${drow("Departed / ETA",c.arrived?"Arrived "+c.arrived:c.dep&&c.dep!=="—"?c.dep+" → "+c.eta:c.eta)}
  <div class="dst">Contract</div>
  ${drow("Grade & Process",c.grade+" · "+c.process)}
  ${drow("Net Weight",c.kg.toLocaleString()+" kg")}
  ${drow("Incoterms",c.incoterm)}
  ${drow("Payment Terms",c.payterms)}
  ${drow("Origin Zone",muid(c.zone))}
  <div class="dst">Parties</div>
  ${drow("Exporter",muid(c.exp)+" — "+exp.name)}
  ${drow("Seller",muid("ACT-EXP-MAIN")+" — Kaffa Trading PLC")}
  ${drow("Buyer",c.buyerName?muid(c.buyerId||"ACT-UNI-OCFCU")+" — "+c.buyerName:muid("ACT-UNI-OCFCU")+" — Oromia Coffee Farmers Cooperative Union")}
  ${drow("Contract Value","$"+c.value.toLocaleString())}`;
}
function renderGuaranteeTab(c){
  const g=c.guarantee||{state:"DRAFT",no:null,bank:"BNK-CBE",bankName:"Commercial Bank of Ethiopia",terms:"—",docs:[]};
  const gSteps=["DRAFT","ISSUED","COUNTERSIGNED","SETTLED"];
  const gIdx=gSteps.indexOf(g.state);
  const gLabels=["Draft","Issued","Countersigned","Settled"];
  const docsDone=g.state==="COUNTERSIGNED"||g.state==="SETTLED";
  const ms=genMilestones(c);
  return`<div class="dst">Guarantee Status</div>
  <div class="lc-track">${gLabels.map((l,i)=>`<div class="lcs ${i<gIdx?"done":i===gIdx?"curr":"pend"}">${l}</div>`).join("")}</div>
  ${drow("Guarantee Number",`<span style="font-family:Menlo,monospace;font-size:10px">${g.no||"Not yet issued"}</span>`)}
  ${drow("Amount",(g.amount||0).toLocaleString()+" ETB")}
  ${drow("Issuing Bank",g.bankName||g.bank||"—")}
  ${drow("Issued On",g.issuedOn||"—")}
  ${drow("Countersigned",g.countersignedOn||"—")}
  ${drow("Settled",g.settledOn||"—")}
  ${drow("Expiry",g.expiry||"—")}
  <div class="dst">Contract Terms</div>
  ${drow("Guarantee Terms",g.terms||"—")}
  ${drow("Delivery",c.incoterm||"—")}
  ${drow("Payment",c.payterms||"On delivery")}
  ${drow("Commodity",c.grade+" · "+c.process)}
  ${drow("Quantity",c.kg.toLocaleString()+" kg net ("+(c.kg/KG_PER_FRASULA).toFixed(0)+" frasulas)")}
  <div class="dst">Required Documents</div>
  ${(g.docs||[]).map(d=>`<div class="doc-item"><div class="doc-chk ${docsDone?"dc-y":"dc-n"}">${docsDone?"✓":"○"}</div>${d}</div>`).join("")}
  <div class="dst">Milestone Schedule</div>
  ${ms.map(m=>{const sc={done:"#065F46",curr:"var(--amber)",warn:"#D97706",over:"#DC2626",pend:"#9a8a7a"};const sl={done:"Complete",curr:"In Progress",warn:"Action Needed",over:"Overdue",pend:"Pending"};
    return`<div class="drow"><div><div class="dk">${m.label}</div><div style="font-size:9px;color:var(--tx3)">${m.cat.toUpperCase()}</div></div><div style="text-align:right"><div style="font-size:10px;font-weight:500;color:${sc[m.status]}">${sl[m.status]}</div><div style="font-size:10px;color:var(--tx3)">${m.date}</div></div></div>`;
  }).join("")}`;
}
// Alias for any remaining callers
function renderLCTab(c){return renderGuaranteeTab(c);}
// ═══════════════════════════════════════════════════ TRACE ═══════
function genTrace(c){
  if(traceCache[c.id])return traceCache[c.id];
  const zone=ZONES[c.zone],wIds=Object.keys(zone.woredas);
  const nA=Math.min(c.areas.length,wIds.length,3);
  const nodes={};let si=0;
  const seed=n=>(Math.abs(Math.sin(n*137.5+si++)*99999)|0);
  const ruid=(p,n)=>p+(1000+seed(n)).toString();
  const gps=zone.gps;
  const shipId=c.id,expId=ruid("LOT-EXP-",1);
  nodes[shipId]={id:shipId,type:"SHIP",name:"Shipment — 20ft FCL",weight:c.kg,form:"Green Coffee",date:c.dep||"At Port",geo:`${gps.lat.toFixed(4)}°N ${gps.lng.toFixed(4)}°E`,actor:EXPORTERS.find(e=>e.id===c.exp).name,children:[expId]};
  nodes[expId]={id:expId,type:"EXP",name:"Export Consolidation Lot",weight:c.kg,form:"Green Coffee",date:"Nov 2024",geo:"9.0054°N 38.7636°E",actor:EXPORTERS.find(e=>e.id===c.exp).name,children:[],parentId:shipId};
  const aW=Array.from({length:nA},(_,i)=>Math.round(c.kg/nA+(i%2===0?100:-100)));
  for(let a=0;a<nA;a++){
    const gId=ruid("LOT-GRN-",a+10),pId=ruid("LOT-PAR-",a+20),aId=ruid("LOT-AGG-",a+30);
    const wId=wIds[a],woreda=zone.woredas[wId];
    const gW=aW[a],pW=Math.round(gW/0.833),chW=Math.round(pW/0.2);
    const lat=(gps.lat+(a*0.04-0.02)).toFixed(4),lng=(gps.lng+(a*0.05-0.025)).toFixed(4);
    nodes[gId]={id:gId,type:"GREEN",name:`Green Lot — ${c.areas[a]||woreda.name}`,weight:gW,form:"Green Coffee",date:"Nov 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Milling Station",area:c.areas[a]||woreda.name,children:[pId],parentId:expId,wrdaId:wId};
    // Sample lot — child of green (pre-shipment cup sample, own custody chain)
    const smpId=ruid("LOT-SMP-",a+40);
    nodes[smpId]={id:smpId,type:"SMPL",name:`Pre-Shipment Sample — ${woreda.name}`,weight:0.34,form:"Green Coffee",date:"Nov 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Milling Station",note:"340g · sealed · CLU lab",seal:`SEAL-${ruid("",a+60).slice(-6)}`,children:[],parentId:gId,wrdaId:wId};
    nodes[gId].children.push(smpId);
    nodes[pId]={id:pId,type:"PAR",name:`Parchment — ${woreda.name}`,weight:pW,form:"Parchment",date:"Oct 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Washing Station",note:`Yield: ${(gW/chW*100).toFixed(1)}%`,children:[aId],parentId:gId,wrdaId:wId};
    // By-products — children of parchment (cherry → parchment processing)
    const huskW=Math.round(chW*0.43),pulpW=Math.round(chW*0.30);
    const huskId=ruid("LOT-BYP-",a+50),pulpId=ruid("LOT-BYP-",a+70);
    nodes[huskId]={id:huskId,type:"BYPRD",name:`Coffee Husks — ${woreda.name}`,weight:huskW,form:"Husk",date:"Oct 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Washing Station",note:"Biomass fuel · ~43% of cherry",children:[],parentId:pId,wrdaId:wId};
    nodes[pulpId]={id:pulpId,type:"BYPRD",name:`Coffee Pulp — ${woreda.name}`,weight:pulpW,form:"Pulp",date:"Oct 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Washing Station",note:"Compost · ~30% of cherry",children:[],parentId:pId,wrdaId:wId};
    nodes[pId].children.push(huskId,pulpId);
    nodes[aId]={id:aId,type:"AGG",name:`Aggregated Cherry — ${woreda.name}`,weight:chW,form:"Cherry",date:"Oct 2024",geo:`${lat}°N ${lng}°E`,actor:(c.areas[a]||woreda.name)+" Collection Point",children:[],parentId:pId,wrdaId:wId};
    nodes[expId].children.push(gId);
    const nF=Math.ceil(c.farms/nA)+(a===0?c.farms%nA:0);
    for(let f=0;f<nF;f++){
      const farmN=(1000+seed(a*50+f+100));
      const fId=`FARM-${farmN.toString().padStart(4,"0")}`;
      const hId=`LOT-HRV-${(2200+seed(a*50+f+200)).toString()}`;
      const fW=Math.round(chW/nF+(f%2===0?40:-40));
      const ha=(2.1+f*0.28).toFixed(1);
      const fname=FARMER_NAMES[(seed(a*30+f+300))%FARMER_NAMES.length];
      const flat=(parseFloat(lat)+(f*0.003-0.006)).toFixed(4),flng=(parseFloat(lng)+(f*0.004-0.008)).toFixed(4);
      nodes[fId]={id:fId,type:"FARM",farmer:fname,ha,wrdaId:wId,zoneId:c.zone,gps:`${flat}°N ${flng}°E`,verified:true,since:"201"+(7+f%3),variety:zone.varieties.split(",")[0].trim()};
      nodes[hId]={id:hId,type:"HRV",name:fname,weight:fW,form:"Cherry",date:"3–7 Oct 2024",geo:`${flat}°N ${flng}°E`,actor:fId,ha,children:[],parentId:aId,wrdaId:wId,zoneId:c.zone};
      nodes[aId].children.push(hId);
    }
  }
  traceCache[c.id]={nodes,root:shipId};
  return traceCache[c.id];
}
function renderTraceTab(c){
  const eudrBtn=`<div style="display:flex;justify-content:flex-end;margin-bottom:10px"><button onclick="l4GenEUDRReport('${c.id}')" style="padding:8px 14px;background:#5a8a3a;color:#fff;border:none;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px"><span style="font-size:13px">📄</span> Generate EUDR Report</button></div>`;
  if(!TRACE_OK.includes(c.status))return`${eudrBtn}<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px"><div style="font-size:28px;opacity:.15;margin-bottom:10px">🔒</div><div style="font-size:13px;font-weight:600;color:var(--tx2);margin-bottom:5px">Trace not yet available</div><div style="font-size:11px;color:var(--tx3);line-height:1.6">Unlocks once container is dispatched from exporter warehouse.<br>Status: <b>${STATUS_LABELS[c.status]}</b></div></div>`;
  const tr=genTrace(c);
  return`<div>${renderNode(tr.nodes,tr.root,0)}</div>`;
}
/*EUDR_BTN_ANCHOR*/
function renderNode(nodes,id,depth){
  const n=nodes[id];if(!n||!TYPE_LABEL[n.type])return"";
  const hasK=n.children&&n.children.length>0;
  const tKey=activeCont+"-"+id;
  const isE=treeExp[tKey]!==false;
  const dKey="d-"+activeCont+"-"+id;
  const dOpen=detsOpen[dKey];
  const actC=activeCont?CONTAINERS.find(x=>x.id===activeCont):null;
  const traceMapOk=!!(actC&&TRACE_OK.includes(actC.status));
  let i2="",i3="";
  if(n.type==="SHIP"){i2=n.form;i3=n.date}
  else if(n.type==="EXP"){i2=n.form+" · "+n.actor.split(" ").slice(0,2).join(" ");i3=n.geo.split("°")[0]+"°N"}
  else if(n.type==="GREEN"){i2=(n.area||"")+" Mill · "+n.form;i3=n.date}
  else if(n.type==="PAR"){i2=n.note||n.form;i3=n.geo.split("°")[0]+"°N"}
  else if(n.type==="AGG"){i2=`Cherry · ${n.children.length} batches`;i3=n.geo.split("°")[0]+"°N"}
  else if(n.type==="HRV"){i2=n.name;i3=n.ha+" ha · "+n.geo.split("°")[0]+"°N"+(traceMapOk?` <button type="button" class="trace-hrv-map-btn" onclick="event.stopPropagation();openHrvMapModal('${actC.id}','${id}')" title="Map this harvest" aria-label="Open harvest map">${HRV_MAP_SVG12}</button>`:"")}
  else if(n.type==="BYPRD"){i2=n.form+" · "+n.weight.toLocaleString()+" kg";i3=n.note||""}
  else if(n.type==="SMPL"){i2="340g sealed · "+(n.seal||"");i3=n.note||""}
  const allD=[];
  if(n.actor&&n.type!=="HRV")allD.push(["Actor",n.actor]);
  if(n.geo){
    const gpsPanel=n.type==="HRV"&&traceMapOk?`<span class="gps-val-wrap"><span class="gps-txt">${n.geo}</span><button type="button" class="gps-map-btn-inline" onclick="event.stopPropagation();openHrvMapModal('${actC.id}','${id}')" title="Map this harvest">${HRV_MAP_SVG12}</button></span>`:n.geo;
    allD.push(["GPS",gpsPanel]);
  }
  if(n.date)allD.push(["Date",n.date]);
  if(n.wrdaId)allD.push(["Woreda",n.wrdaId]);
  if(n.type==="HRV")allD.push(["Farm UID",n.actor]);
  if(n.parentId)allD.push(["Parent",n.parentId]);
  if(hasK)allD.push(["Children",n.children.length+" lot"+(n.children.length!==1?"s":"")]);
  const uCls=`uid ${TYPE_UID_CLS[n.type]||"uid-LOT"}`;
  const treeArrSvg='<svg class="ntree-arr-ic" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5L6 7.5 9 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const treeHint=hasK
    ?`<div class="ntree-hint"><span class="ntree-arr${isE?"":" ntree-arr--coll"}" style="color:${TYPE_DOT[n.type]}" title="${isE?"Collapse sub-lots":"Expand sub-lots"}">${treeArrSvg}</span></div>`
    :`<div class="ntree-hint"><span class="ntree-leaf" style="background:${TYPE_DOT[n.type]}" title=""></span></div>`;
  return`<div class="tn">
    <div class="nrow${isE&&hasK?" exp":""}" onclick="toggleTN('${tKey}','${id}')"${hasK?` aria-expanded="${isE}"`:""}>
      ${treeHint}
      <div class="nbody">
        <div class="n1"><span class="${uCls}" onclick="event.stopPropagation();showUID('${id}')">${id}</span><span class="nw">${n.weight.toLocaleString()} kg</span></div>
        <div class="n2">${i2}</div>
        <div class="n3">${i3}</div>
        <button class="dtog" onclick="event.stopPropagation();toggleDets('${dKey}')">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${dOpen?"M1 6l3.5-4 3.5 4":"M1 3l3.5 4 3.5-4"}"/></svg>
          ${dOpen?"Hide":"More"}
        </button>
        ${dOpen?`<div class="dpanel">${allD.map(([k,v])=>{
          const raw=typeof v==="string"&&v.indexOf("gps-val-wrap")>=0;
          const valSpan=raw?v:(v.length>14&&(v.startsWith("LOT-")||v.startsWith("FARM-")||v.startsWith("WRDA-"))?`<span class="uid uid-LOT" onclick="event.stopPropagation();showUID('${v}')">${v}</span>`:v);
          const valCls=raw?"font-size:9px;color:#3a2a1a;word-break:break-word":"font-family:'SF Mono',Menlo,monospace;font-size:9px;color:#3a2a1a;word-break:break-all";
          return`<div style="display:flex;gap:8px;align-items:flex-start"><span style="color:var(--tx3);min-width:58px">${k}</span><span style="${valCls}">${valSpan}</span></div>`;
        }).join("")}</div>`:""}
      </div>
    </div>
    ${isE&&hasK?`<div class="ch">${n.children.map(cid=>renderNode(nodes,cid,depth+1)).join("")}</div>`:""}
  </div>`;
}
// v22.2: when trace is inlined in the v20 collapsible panel, re-render just that
// section. Otherwise fall through to the legacy full-panel rerender.
let dpTraceInlineFor=null;  // contains activeCont id when trace breakdown is shown inline
function dpOpenTraceBreakdown(cid){
  const c=CONTAINERS.find(x=>x.id===cid);
  if(!c)return;
  const body=document.getElementById("dp-body-trace");
  if(!body)return;
  dpTraceInlineFor=cid;
  body.innerHTML=renderTraceTab(c);
}
function dpRerenderInlineTrace(){
  if(!dpTraceInlineFor)return false;
  const c=CONTAINERS.find(x=>x.id===dpTraceInlineFor);
  if(!c)return false;
  const body=document.getElementById("dp-body-trace");
  if(!body)return false;
  body.innerHTML=renderTraceTab(c);
  return true;
}
function toggleTN(key){
  treeExp[key]=treeExp[key]===false?true:false;
  if(dpRerenderInlineTrace())return;
  renderDTab(CONTAINERS.find(x=>x.id===activeCont));
}
function toggleDets(key){
  detsOpen[key]=!detsOpen[key];
  if(dpRerenderInlineTrace())return;
  renderDTab(CONTAINERS.find(x=>x.id===activeCont));
}
function ribbonExpand(v){
  if(!activeCont)return;
  const c=CONTAINERS.find(x=>x.id===activeCont);
  if(TRACE_OK.includes(c?.status)){const tr=genTrace(c);Object.keys(tr.nodes).forEach(k=>{treeExp[activeCont+"-"+k]=v;});}
  renderDTab(c);
}
function copyUID(){if(activeCont){navigator.clipboard?.writeText(activeCont);toast("Copied: "+activeCont);}}

function renderQuality(c){
  if(!c.cup)return`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px"><div style="font-size:28px;opacity:.15;margin-bottom:10px">🧪</div><div style="font-size:13px;font-weight:600;color:var(--tx2);margin-bottom:5px">Cup results pending</div><div style="font-size:11px;color:var(--tx3)">Final sample submission required.</div></div>`;
  const labels=["Aroma","Flavor","Aftertaste","Acidity","Body","Balance","Overall"];
  return`<div style="display:flex;align-items:flex-end;gap:14px;margin-bottom:16px">
    <div><div class="cup-score">${c.cup}</div><div style="font-size:10px;color:var(--tx3);margin-top:2px">SCA Score / 100</div></div>
    <div style="font-size:11px;color:var(--tx3)">${c.grade}<br>${c.process} · ${muid(c.zone)}</div>
  </div>
  <div class="dst">Breakdown</div>
  ${c.cb.map((v,i)=>`<div class="cpr"><div class="cpl">${labels[i]}</div><div class="cpb"><div class="cpf" style="width:${v*10}%"></div></div><div class="cpv">${v}</div></div>`).join("")}
  <div class="nbox"><div style="font-size:9px;font-weight:600;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">Tasting Notes</div>${TASTING[c.zone]||"—"}</div>`;
}
function renderOrigin(c){
  const zone=ZONES[c.zone];
  const wIds=Object.keys(zone.woredas).slice(0,Math.min(c.areas.length,Object.keys(zone.woredas).length));
  let si2=0;const s2=n=>(Math.abs(Math.sin(n*137.5+si2++)*99999)|0);
  return`<div style="background:#FBF5EE;border:1px solid #E8D8C0;border-radius:7px;padding:11px 13px;margin-bottom:8px">
    <div>${muid(c.zone)}</div>
    <div style="font-size:13px;font-weight:600;color:var(--tx);margin:3px 0 2px">${zone.name}</div>
    <div style="font-size:10px;color:var(--tx3);margin-bottom:8px">${zone.region} · ${zone.elev} · ${zone.rain}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:10px;margin-bottom:8px">
      <div><span style="color:var(--tx3)">Farms</span><br><b>${zone.farms.toLocaleString()}</b></div>
      <div><span style="color:var(--tx3)">Area</span><br><b>${zone.area}</b></div>
      <div><span style="color:var(--tx3)">GPS</span><br><b>${zone.gps.lat}°N ${zone.gps.lng}°E</b></div>
      <div><span style="color:var(--tx3)">Variety</span><br><b>${zone.varieties.split(",")[0].trim()}</b></div>
    </div>
    ${wIds.map((wId,wi)=>{
      const w=zone.woredas[wId];
      const nF=Math.ceil(c.farms/wIds.length)+(wi===0?c.farms%wIds.length:0);
      return`<div style="background:#fff;border:1px solid #e8e0d4;border-radius:5px;padding:8px 10px;margin-top:7px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">${muid(wId)}<span style="font-size:9px;color:var(--tx3)">${w.farms.toLocaleString()} farms</span></div>
        <div style="font-size:11px;font-weight:600;color:var(--tx);margin-bottom:6px">${w.name} Woreda</div>
        ${Array.from({length:nF},(_,f)=>{
          const farmN=(1000+(Math.abs(Math.sin((wi*50+f+100)*137.5)*99999)|0));
          const fId=`FARM-${farmN.toString().padStart(4,"0")}`;
          const fname=FARMER_NAMES[((Math.abs(Math.sin((wi*30+f+300)*137.5)*99999)|0))%FARMER_NAMES.length];
          const ha=(2.1+f*0.28).toFixed(1);
          return`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid #faf7f2">${muid(fId)}<span style="font-size:11px;color:var(--tx);flex:1">${fname}</span><span style="font-size:10px;color:var(--tx3)">${ha} ha</span><span style="font-size:9px;background:#D1FAE5;color:#065F46;padding:1px 4px;border-radius:2px;font-weight:500">✓</span></div>`;
        }).join("")}
      </div>`;
    }).join("")}
  </div>`;
}

// ═══════════════════════════════════════════ MILESTONE POPOVER ═══
const CAT_COLORS={contract:"var(--dark)",lc:"#1E40AF",shipping:"#065F46",payment:"var(--amber)"};
let msPopHoverTimer=null;
function scheduleCloseMsPop(){
  const pop=document.getElementById("ms-pop");
  if(pop&&pop.classList.contains("open"))return;
  clearTimeout(msPopHoverTimer);
  msPopHoverTimer=setTimeout(function(){closeMsPop();},220);
}
function cancelCloseMsPop(){
  clearTimeout(msPopHoverTimer);
  msPopHoverTimer=null;
}
/** Timeline milestones: anchorEl is the .ms column (dot + label). Hover opens; leaving .ms or pop schedules close. */
function showMsPop(cId,msId,anchorEl){
  cancelCloseMsPop();
  const c=CONTAINERS.find(x=>x.id===cId);
  const ms=genMilestones(c);
  const m=ms.find(x=>x.id===msId);if(!m)return;
  const sc={done:"#065F46",curr:"var(--amber)",warn:"#D97706",over:"#DC2626",pend:"#9a8a7a"};
  const sl={done:"✓ Complete",curr:"▶ In Progress",warn:"⚠ Action Needed",over:"✕ Overdue",pend:"○ Pending"};
  document.getElementById("ms-pop-body").innerHTML=`
    <div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:3px">${m.cat}</div>
    <div class="ms-p-title">${m.label}</div>
    <div class="ms-p-status" style="color:${sc[m.status]}">${sl[m.status]}${m.date&&m.date!=="Pending"?" — "+m.date:""}</div>
    <div class="ms-p-div"></div>
    <div class="ms-p-clause">${m.clause}</div>
    <div class="ms-p-text">${m.detail}</div>
    ${m.action?`<div class="ms-p-action">→ ${m.action}</div>`:""}`;
  const pop=document.getElementById("ms-pop");
  pop.classList.remove("open");
  const dot=anchorEl&&anchorEl.querySelector?anchorEl.querySelector(".ms-dot"):null;
  const rect=(dot||anchorEl).getBoundingClientRect();
  pop.classList.add("ms-pop--hint","show");
  const pw=Math.min(pop.offsetWidth||272,window.innerWidth-24);
  pop.style.left=Math.min(Math.max(8,rect.left-10),window.innerWidth-pw-8)+"px";
  pop.style.top=(rect.top-200)+"px";
  requestAnimationFrame(function(){
    const h=pop.offsetHeight||160;
    pop.style.top=Math.max(50,Math.min(rect.top-h-8,window.innerHeight-h-12))+"px";
  });
}
function closeMsPop(){
  cancelCloseMsPop();
  const pop=document.getElementById("ms-pop");
  if(pop){
    pop.classList.remove("show","ms-pop--hint","open");
    pop.style.left="";
    pop.style.top="";
  }
}
/** Reuse #ms-pop for large modals: clear timeline hint positioning and classes. */
function msPopOpenAsModal(){
  const p=document.getElementById("ms-pop");
  if(!p)return;
  cancelCloseMsPop();
  p.classList.remove("show","ms-pop--hint");
  p.style.left="";
  p.style.top="";
  p.classList.add("open");
}
document.addEventListener("click",function(e){
  const pop=document.getElementById("ms-pop");
  if(!pop)return;
  const isHint=pop.classList.contains("show")&&pop.classList.contains("ms-pop--hint");
  const isModal=pop.classList.contains("open");
  if(!isHint&&!isModal)return;
  if(e.target.closest("#ms-pop"))return;
  if(isHint&&e.target.closest(".tlrow .ms"))return;
  closeMsPop();
});

// ═══════════════════════════════════════════════ NOTIFICATIONS ═══
function toggleNotif(){
  notifOpen=!notifOpen;
  document.getElementById("np-ov").classList.toggle("open",notifOpen);
  document.getElementById("notif-pnl").classList.toggle("open",notifOpen);
  if(notifOpen)renderNotifPanel();
}
function renderNotifPanel(){
  const notifs=[];
  CONTAINERS.forEach(c=>{
    genMilestones(c).forEach(m=>{
      if(m.status==="over")notifs.push({p:0,color:"#EF4444",c,m});
      else if(m.status==="warn")notifs.push({p:1,color:"#F59E0B",c,m});
    });
  });
  notifs.sort((a,b)=>a.p-b.p);
  const labels=["Overdue","Action Needed"];
  document.getElementById("np-body").innerHTML=notifs.length?notifs.map(n=>`
    <div class="ni" onclick="openDetail('${n.c.id}');toggleNotif()">
      <div class="ni-top"><div class="ni-dot" style="background:${n.color}"></div><div class="ni-title">${n.m.label}</div><div class="ni-time">${labels[n.p]}</div></div>
      <div class="ni-sub">${n.m.detail.substring(0,75)}…</div>
      <div style="display:flex;align-items:center;gap:5px;padding-left:14px;margin-top:3px">${muid(n.c.id)}<span style="font-size:10px;color:var(--tx3)">${n.c.grade}</span></div>
      ${n.m.action?`<div class="ni-act">→ ${n.m.action}</div>`:""}
    </div>`).join(""):
    `<div style="padding:32px;text-align:center;color:var(--tx3);font-size:12px">No urgent notifications.<br>All milestones on track.</div>`;
}

// ══════════════════════════════════════════════════ BACKSTAGE ════
function relocateQatBrandToSidebar(){
  const root=document.getElementById("qat-brand-root");
  const slot=document.getElementById("bs-brand-slot");
  if(root&&slot&&root.parentElement!==slot)slot.appendChild(root);
}
function toggleBsImporterNav(){
  const st=document.getElementById("backstage");
  if(!st)return;
  st.classList.toggle("backstage--nav-collapsed");
  const collapsed=st.classList.contains("backstage--nav-collapsed");
  const reveal=document.getElementById("bs-rail-expand");
  if(reveal)reveal.hidden=!collapsed;
  const tg=document.getElementById("bs-nav-toggle");
  if(tg){
    tg.setAttribute("aria-expanded",collapsed?"false":"true");
    tg.title=collapsed?"Show importer menu":"Hide importer menu";
  }
}
function toggleExpPortfolioSidebar(){
  const ab=document.querySelector(".app-body");
  const tg=document.getElementById("exp-sidebar-toggle");
  if(!ab)return;
  ab.classList.toggle("app-body--exp-collapsed");
  const c=ab.classList.contains("app-body--exp-collapsed");
  if(tg){
    tg.setAttribute("aria-expanded",c?"false":"true");
    tg.title=c?"Show exporters list":"Hide exporters list";
    tg.textContent=c?"»":"⟨";
  }
}
function setPortfolioWelcomeVisible(on){
  const w=document.getElementById("portfolio-welcome");
  if(!w)return;
  w.hidden=!on;
}
function setExportersSidebarVisible(on){
  const sb=document.getElementById("exporters-sidebar");
  const rail=document.getElementById("exp-sidebar-rail");
  const ab=document.querySelector(".app-body");
  const tg=document.getElementById("exp-sidebar-toggle");
  if(!sb)return;
  sb.hidden=!on;
  if(rail)rail.hidden=!on;
  if(on&&ab)ab.classList.remove("app-body--exp-collapsed");
  if(tg&&on){
    tg.setAttribute("aria-expanded","true");
    tg.title="Hide exporters list";
    tg.textContent="⟨";
  }
}
function showBsPortfolioPreview(){
  bsOpen=false;
  document.querySelectorAll(".bs-navitem").forEach(function(b){b.classList.remove("on");});
  const dyn=document.getElementById("bs-dynamic");
  if(dyn){dyn.innerHTML="";dyn.hidden=true;}
  setExportersSidebarVisible(false);
  setPortfolioWelcomeVisible(true);
}
function openBackstage(section){
  const bs=document.getElementById("backstage");
  if(!bs)return;
  bs.classList.add("open");
  bs.classList.add("backstage--docked");
  var sid=section;
  if(sid==null||sid===""){showBsPortfolioPreview();return;}
  if(sid==="portfolio"){showBsPortfolioPreview();return;}
  if(sid==="market")sid="auction";
  var btn=document.getElementById("bsn-"+sid);
  if(!btn){showBsPortfolioPreview();return;}
  if(sid==="auction"){openAuctionFromSidebar(btn);return;}
  showBsSection(sid,btn);
}
function closeBackstage(){showBsPortfolioPreview();}
function showBsSection(id,btn){
  const el=document.getElementById("bs-dynamic");
  if(!el)return;
  if(id==="portfolio"){showBsPortfolioPreview();return;}
  if(id==="exporters"){
    bsOpen=false;
    el.innerHTML="";
    el.hidden=true;
    setPortfolioWelcomeVisible(false);
    setExportersSidebarVisible(true);
    document.querySelectorAll(".bs-navitem").forEach(function(b){b.classList.remove("on");});
    if(btn)btn.classList.add("on");
    const allBtn=document.getElementById("btn-all");
    if(typeof filterExp==="function")filterExp(null,allBtn||null);
    const homeTab=document.getElementById("tab-home");
    if(typeof switchRTab==="function")switchRTab("home",homeTab||null);
    const vCards=document.getElementById("v-cards");
    if(typeof setView==="function"&&vCards)setView("cards",vCards);
    return;
  }
  bsOpen=true;
  setPortfolioWelcomeVisible(false);
  setExportersSidebarVisible(false);
  document.querySelectorAll(".bs-navitem").forEach(function(b){b.classList.remove("on");});
  if(btn)btn.classList.add("on");
  el.hidden=false;
  if(id==="new"){el.innerHTML=renderBsNew();}
  else if(id==="open"){el.innerHTML=renderBsOpen();}
  else if(id==="export"){el.innerHTML=renderBsExport();}
  else if(id==="account"){el.innerHTML=renderBsAccount();}
  else if(id==="settings"){el.innerHTML=renderBsSettings();}
  else if(id==="actors"){el.innerHTML=renderBsActors();}
  else if(id==="inv"){el.innerHTML=renderBsInv();}
  else if(id==="quality"){el.innerHTML=renderBsQuality();}
  else if(id==="contracts"){el.innerHTML=renderBsContracts();}
  else if(id==="financing"){el.innerHTML=renderBsFinancing();}
  else if(id==="settlement"){el.innerHTML=renderBsSettlement();}
  else if(id==="insurance"){el.innerHTML=renderBsInsurance();}
  else if(id==="risk"){el.innerHTML=renderBsRisk();}
  else if(id==="help"){el.innerHTML=renderBsHelp();}
  else{el.innerHTML="";showBsPortfolioPreview();}
}





function renderBsRisk(){
  // On first render, run all detectors to populate ANOMALY_FLAGS (idempotent-ish;
  // flags accumulate, but this is a simulator demo so repeated opens just re-run detection)
  // To make it idempotent for the demo, only run if registry is empty
  if(Object.keys(ANOMALY_FLAGS).length===0){
    runAllDetectors();
  }
  const flags=Object.values(ANOMALY_FLAGS);
  const openFlags=flags.filter(function(f){return f.state==="OPEN";});
  const criticalCount=flags.filter(function(f){return f.severity==="CRITICAL"||f.severity==="EMERGENCY";}).length;
  const highCount=flags.filter(function(f){return f.severity==="HIGH";}).length;
  const warnCount=flags.filter(function(f){return f.severity==="WARN";}).length;
  const infoCount=flags.filter(function(f){return f.severity==="INFO";}).length;

  // ─── Top status bar (command center style) ───
  const statusBar='<div style="background:linear-gradient(180deg,#1a2235 0%,#0c1420 100%);color:#e8e6d8;border-radius:8px;padding:16px 22px;margin-bottom:18px;border:1px solid #2a3245;box-shadow:0 2px 10px rgba(0,0,0,0.2)">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;border-bottom:1px solid rgba(232,230,216,.12);padding-bottom:10px">'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.14em;font-weight:700">Risk Operations · Command Center</div>'+
    '<div style="font-size:14px;color:#c4e0d8;font-weight:600;margin-top:2px;font-family:Menlo,monospace">Market Surveillance &amp; Anomaly Detection</div></div>'+
    '<div style="text-align:right"><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em">System Status</div>'+
    '<div style="display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:3px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+(criticalCount>0?"#c44":"#5a8a3a")+';box-shadow:0 0 8px '+(criticalCount>0?"rgba(196,68,68,.7)":"rgba(90,138,58,.7)")+'"></span><span style="font-size:11px;color:#c4e0d8;font-family:monospace">'+(criticalCount>0?"ALERT":"NOMINAL")+'</span></div></div></div>'+
    // 5 metric gauges
    '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:20px">'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Emergency</div><div style="font-size:24px;font-weight:800;color:#7a0000;font-family:monospace;text-align:right">0</div></div>'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Critical</div><div style="font-size:24px;font-weight:800;color:#e06060;font-family:monospace;text-align:right">'+criticalCount+'</div></div>'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">High</div><div style="font-size:24px;font-weight:800;color:#f09060;font-family:monospace;text-align:right">'+highCount+'</div></div>'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Warn</div><div style="font-size:24px;font-weight:800;color:#e8c060;font-family:monospace;text-align:right">'+warnCount+'</div></div>'+
    '<div><div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Info</div><div style="font-size:24px;font-weight:800;color:#90c870;font-family:monospace;text-align:right">'+infoCount+'</div></div></div>'+
    '<div style="margin-top:14px;display:flex;align-items:center;gap:8px;font-size:9px;color:#7a88a0;font-family:monospace">'+
    '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#5a8a3a;box-shadow:0 0 6px rgba(90,138,58,.6)"></span>'+
    'FEEDS OPERATIONAL · '+flags.length+' FLAGS · '+openFlags.length+' OPEN · DETECTOR CYCLE: STATIC SNAPSHOT'+
    '</div></div>';

  // ─── Market data feeds panel ───
  const feedRows=MARKET_DATA_ORDER.map(function(k){
    const m=MARKET_DATA[k];
    const deltaColor=m.delta>0?"#5a8a3a":m.delta<0?"#c44":"#7a88a0";
    const deltaArrow=m.delta>0?"▲":m.delta<0?"▼":"●";
    return '<div style="display:grid;grid-template-columns:1fr 120px 80px;gap:14px;align-items:center;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.05);font-size:11px">'+
      '<div><div style="color:#c4e0d8;font-weight:600">'+m.label+'</div><div style="font-size:9px;color:#7a88a0;margin-top:2px">'+m.scope+'</div></div>'+
      '<div style="text-align:right"><span style="color:#e8e6d8;font-weight:700;font-family:monospace;font-size:13px">'+m.value.toLocaleString()+'</span> <span style="color:#7a88a0;font-size:10px">'+m.unit+'</span></div>'+
      '<div style="text-align:right;font-family:monospace;font-size:11px;color:'+deltaColor+';font-weight:700">'+deltaArrow+' '+(m.delta>0?"+":"")+m.delta+'</div>'+
      '</div>';
  }).join("");
  const marketPanel='<div style="background:#0c1420;border-radius:6px;overflow:hidden;margin-bottom:18px;border:1px solid #2a3245">'+
    '<div style="background:#1a2235;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #2a3245">'+
    '<div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;font-weight:700">Market Data Feeds · Live</div>'+
    '<div style="font-size:9px;color:#7a88a0;font-family:monospace">9 feeds · updated '+MARKET_DATA.NYC_ARABICA.updated+'</div></div>'+
    feedRows+'</div>';

  // ─── Alerts queue ───
  let alertQueue;
  if(flags.length===0){
    alertQueue='<div style="padding:40px 20px;text-align:center;background:#0c1420;border:1px dashed #2a3245;border-radius:6px"><div style="font-family:monospace;font-size:11px;color:#7a88a0">// NO FLAGS RAISED · ALL SYSTEMS NOMINAL</div></div>';
  } else {
    alertQueue='<div style="background:#0c1420;border:1px solid #2a3245;border-radius:6px;overflow:hidden">'+
      '<div style="background:#1a2235;padding:10px 14px;display:grid;grid-template-columns:90px 100px 1fr 100px 80px;gap:12px;font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;font-weight:700"><div>Flag ID</div><div>Severity</div><div>Pattern / Detail</div><div>Target</div><div style="text-align:right">Conf</div></div>'+
      flags.map(function(f){
        const sev=ALERT_SEVERITY[f.severity]||{label:"?",color:"#666"};
        return '<div onclick="closeBackstage();flgShowDetail(\''+f.id+'\')" style="display:grid;grid-template-columns:90px 100px 1fr 100px 80px;gap:12px;align-items:center;padding:11px 14px;border-bottom:1px solid rgba(255,255,255,.05);cursor:pointer;font-size:11px;color:#e8e6d8">'+
          '<div style="font-family:monospace;font-weight:700;color:#c4a06a">'+f.id+'</div>'+
          '<div><span style="background:'+sev.color+';color:#fff;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.04em">'+sev.label+'</span></div>'+
          '<div><div style="color:#c4e0d8;font-weight:600">'+f.patternLabel+'</div><div style="font-size:9px;color:#7a88a0;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+f.detail.substring(0,80)+(f.detail.length>80?"…":"")+'</div></div>'+
          '<div style="font-family:monospace;font-size:10px;color:#90c8e0">'+f.targetId+'</div>'+
          '<div style="text-align:right;font-family:monospace;font-size:11px;color:#e8c060;font-weight:700">'+(f.confidence*100).toFixed(0)+'%</div>'+
          '</div>';
      }).join("")+
      '</div>';
  }

  // ─── Pattern library panel ───
  const patternChips=Object.entries(FRAUD_PATTERNS).map(function(e){
    const k=e[0],p=e[1];
    const activeFlags=Object.values(ANOMALY_FLAGS).filter(function(f){return f.pattern===k;}).length;
    const glow=p.active?(activeFlags>0?"box-shadow:0 0 8px rgba(232,192,96,.3);":""):"opacity:.45;";
    const bg=p.active?(activeFlags>0?"#2a1a08":"#1a2235"):"#0c1420";
    const border=p.active?(activeFlags>0?"#c4a06a":"#2a3245"):"#2a3245";
    return '<div style="padding:8px 11px;background:'+bg+';border:1px solid '+border+';border-radius:4px;'+glow+'">'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:3px"><span style="font-size:10px;color:#c4e0d8;font-weight:700">'+p.label+'</span>'+(activeFlags>0?'<span style="background:#c44;color:#fff;padding:1px 5px;border-radius:6px;font-size:8px;font-weight:700">'+activeFlags+'</span>':'')+'</div>'+
      '<div style="font-size:9px;color:#7a88a0">'+p.category+(p.surveillance?" · surveillance":"")+'</div>'+
      '<div style="font-size:9px;color:#7a88a0;margin-top:4px;line-height:1.4">'+p.desc+'</div>'+
      '</div>';
  }).join("");
  const patternPanel='<div style="background:#0c1420;border:1px solid #2a3245;border-radius:6px;padding:14px;margin-bottom:18px">'+
    '<div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:10px">Pattern Library · '+Object.keys(FRAUD_PATTERNS).length+' Detectors</div>'+
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+patternChips+'</div></div>';

  return '<div class="bsc" style="background:#0c1420;color:#e8e6d8;margin:-30px -30px -30px -30px;padding:30px 30px;min-height:100vh">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6px">'+
    '<div><div style="font-size:9px;color:#7a88a0;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Platform Risk · Command Center</div>'+
    '<div class="bsc-title" style="margin-bottom:0;color:#e8e6d8;font-family:Menlo,monospace">Risk &amp; Market Monitoring</div></div>'+
    '<div style="font-size:10px;color:#7a88a0;text-align:right;font-family:monospace">'+flags.length+' flags · 9 feeds · '+Object.keys(FRAUD_PATTERNS).length+' detectors</div></div>'+
    '<div style="font-size:11px;color:#7a88a0;margin-bottom:18px;max-width:780px;font-family:Menlo,monospace">Cross-cutting observation layer. Reads event stream from all layers. Emits flags, alerts, reputation updates. Serves actors, banks, insurers, platform ops, regulators at scoped tiers. Current mode: <span style="color:#c4a06a">STATIC SNAPSHOT</span> (Option A).</div>'+
    statusBar+
    '<div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Market Data Feeds</div>'+
    marketPanel+
    '<div style="font-size:9px;color:#7a88a0;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Active Alerts Queue</div>'+
    alertQueue+
    '<div style="margin-top:18px"></div>'+
    patternPanel+
    '</div>';
}

function renderBsInsurance(){
  const policies=Object.values(POLICIES);
  const claims=Object.values(CLAIMS);
  const isEmpty=policies.length===0;
  const fmt=function(v){return "$"+(v/1000).toFixed(0)+"k";};
  const totalNotional=policies.reduce(function(s,p){return s+p.notional;},0);
  const totalPremium=policies.reduce(function(s,p){return s+p.premium;},0);
  const totalCap=policies.reduce(function(s,p){return s+p.cap;},0);
  const activeClaims=claims.filter(function(cl){return["FILED","UNDER_REVIEW","APPROVED"].indexOf(cl.state)>=0;}).length;
  const paidClaims=claims.filter(function(cl){return cl.state==="PAID";}).length;

  // Top strip — underwriting desk, navy+gold palette, different from other Backstage sections
  const topStrip='<div style="background:linear-gradient(180deg,#1a2a4a 0%,#0f1a30 100%);color:#e8d4a8;border-radius:8px;padding:18px 22px;margin-bottom:20px;border:1px solid #2a3a5a;box-shadow:0 2px 8px rgba(0,0,0,0.15)">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;border-bottom:1px solid rgba(232,212,168,.15);padding-bottom:10px">'+
    '<div><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.12em;font-weight:700">Underwriting · Risk Transfer Book</div>'+
    '<div style="font-size:14px;color:#e8d4a8;font-weight:600;margin-top:2px;font-family:Georgia,serif">Policy & Claims Ledger</div></div>'+
    '<div style="text-align:right"><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.08em">Book Status</div>'+
    '<div style="font-size:11px;color:#e8d4a8;font-family:monospace">'+policies.length+' polic'+(policies.length===1?"y":"ies")+'</div></div></div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">'+
    '<div><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Insured Notional</div><div style="font-size:22px;font-weight:700;color:#fff;font-family:monospace;text-align:right">'+fmt(totalNotional)+'</div></div>'+
    '<div><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Coverage Cap</div><div style="font-size:22px;font-weight:700;color:#c4a06a;font-family:monospace;text-align:right">'+fmt(totalCap)+'</div></div>'+
    '<div><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Premium Written</div><div style="font-size:22px;font-weight:700;color:#e8d4a8;font-family:monospace;text-align:right">'+fmt(totalPremium)+'</div></div>'+
    '<div><div style="font-size:9px;color:#8a9aae;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Claims Open / Paid</div><div style="font-size:22px;font-weight:700;color:#fff;font-family:monospace;text-align:right">'+activeClaims+'<span style="color:#8a9aae;font-size:14px"> / </span><span style="color:#5a8a3a">'+paidClaims+'</span></div></div></div>'+
    '<div style="margin-top:14px;display:flex;align-items:center;gap:8px;font-size:9px;color:#8a9aae;font-family:monospace">'+
    '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:'+(isEmpty?"#c44":"#5a8a3a")+'"></span>'+
    (isEmpty?"NO ACTIVE POLICIES · INSURANCE AUTO-ATTACHES ON CONTRACT ACTIVATION":"BOOK OPEN · INSURERS APPROVE · PLATFORM ORCHESTRATES")+'</div></div>';

  // Policy folders — stacked cards, underwriter aesthetic with navy left edge
  let policyList;
  if(isEmpty){
    policyList='<div style="padding:40px 20px;text-align:center;background:#fff;border:1px dashed #d8cdb8;border-radius:6px"><div style="font-family:Georgia,serif;font-style:italic;font-size:13px;color:var(--tx3);margin-bottom:8px">— No policies on the book —</div><div style="font-size:11px;color:var(--tx3)">Marine Cargo + Performance bonds auto-attach at contract activation.<br>High-value contracts ($100k+) also trigger Trade Credit and Political Risk covers.</div></div>';
  } else {
    policyList=policies.map(function(p){
      const prod=INSURANCE_PRODUCTS[p.productKey]||{};
      const insurer=INSURERS[p.insurerId]||{name:p.insurerName,short:"?"};
      const stateColor=POL_STATE_COLOR[p.state]||"#666";
      const productIcon="*";
      const mandatoryBadge=p.mandatory?'<span style="background:#c4a06a;color:#1a1208;padding:2px 7px;border-radius:8px;font-size:8px;font-weight:700;letter-spacing:.05em;margin-left:6px">MANDATORY</span>':"";
      return '<div onclick="closeBackstage();polShowDetail(\''+p.id+'\')" style="background:#fdfbf5;border:1px solid #d8cdb8;border-left:4px solid #1a3a6a;border-radius:4px;padding:14px 16px;margin-bottom:8px;cursor:pointer;display:grid;grid-template-columns:32px 1fr 100px 100px 80px;gap:14px;align-items:center">'+
        '<div style="font-size:20px;text-align:center">'+productIcon+'</div>'+
        '<div><div style="font-size:13px;font-weight:700;color:#1a1208;font-family:Georgia,serif">'+p.id+mandatoryBadge+'</div>'+
        '<div style="font-size:11px;color:var(--tx2);margin-top:2px">'+p.productLabel+'</div>'+
        '<div style="font-size:9px;color:var(--tx3);margin-top:2px">'+insurer.name+' · '+p.contractId+'</div></div>'+
        '<div style="text-align:right"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Cap</div><div style="font-size:12px;font-weight:700;font-family:monospace;color:#3a7a8a">'+fmt(p.cap)+'</div></div>'+
        '<div style="text-align:right"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase">Premium</div><div style="font-size:12px;font-weight:700;font-family:monospace;color:#A87832">'+fmt(p.premium)+'</div></div>'+
        '<div style="text-align:center"><span style="background:'+stateColor+';color:#fff;padding:3px 10px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.04em">'+POL_STATE_LABEL[p.state]+'</span></div>'+
        '</div>';
    }).join("");
  }

  // Active claims strip
  let claimsStrip="";
  if(claims.length){
    claimsStrip='<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px;margin-top:18px">Active Claims</div>'+
      '<div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;overflow:hidden;margin-bottom:18px">'+
      claims.map(function(cl){
        const daysElapsed=Math.floor((Date.now()-cl.filedAt)/864e5);
        const slaOk=daysElapsed<=cl.slaDays;
        return '<div onclick="closeBackstage();clmShowDetail(\''+cl.id+'\')" style="padding:12px 16px;border-bottom:1px solid #f0e8d6;display:grid;grid-template-columns:100px 1fr 100px 90px 80px;gap:12px;align-items:center;cursor:pointer;font-size:11px">'+
          '<div style="font-family:monospace;font-weight:700;color:#a04040">'+cl.id+'</div>'+
          '<div><div style="font-size:11px;font-weight:600">'+cl.reason+'</div><div style="font-size:9px;color:var(--tx3)">'+cl.policyId+' · '+cl.contractId+'</div></div>'+
          '<div style="text-align:right;font-family:monospace;font-weight:700">'+fmt(cl.amountRequested)+'</div>'+
          '<div style="text-align:right;font-family:monospace;color:'+(slaOk?"#5a8a3a":"#a04040")+';font-size:10px">'+daysElapsed+'/'+cl.slaDays+'d</div>'+
          '<div style="text-align:center"><span style="background:'+(CLM_STATE_COLOR[cl.state]||"#666")+';color:#fff;padding:3px 10px;border-radius:10px;font-size:9px;font-weight:700">'+CLM_STATE_LABEL[cl.state]+'</span></div>'+
          '</div>';
      }).join("")+'</div>';
  }

  // Insurer panel grid
  const insurerGrid=Object.entries(INSURERS).map(function(e){
    const id=e[0],ins=e[1];
    return '<div onclick="closeBackstage();showUID(\''+id+'\')" style="padding:12px;border:1px solid #e5dccc;border-radius:5px;cursor:pointer;background:#fdfbf5">'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px"><div style="font-size:12px;font-weight:700;color:var(--tx);font-family:Georgia,serif">'+ins.short+'</div><span style="font-size:9px;color:#1a3a6a;font-weight:700;font-family:monospace">'+ins.rating+'</span></div>'+
      '<div style="font-size:9px;color:var(--tx3);margin-bottom:6px">'+ins.type.split("·")[0].trim()+' · '+ins.hq+'</div>'+
      '<div style="font-size:10px;color:var(--tx2);margin-bottom:4px">Capacity: <b style="font-family:monospace">'+ins.capacity+'</b></div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:3px">'+ins.products.slice(0,3).map(function(pr){return '<span style="font-size:8px;background:rgba(26,58,106,.08);color:#1a3a6a;padding:2px 6px;border-radius:6px">'+pr+'</span>';}).join("")+'</div></div>';
  }).join("");

  return '<div class="bsc">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6px">'+
    '<div><div style="font-size:9px;color:#1a3a6a;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Underwriting · Risk Transfer</div>'+
    '<div class="bsc-title" style="margin-bottom:0;font-family:Georgia,serif">Insurance</div></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-align:right;font-family:Georgia,serif;font-style:italic">'+policies.length+' polic'+(policies.length===1?"y":"ies")+' · '+claims.length+' claim'+(claims.length!==1?"s":"")+' · 7 insurers</div></div>'+
    '<div style="font-size:11px;color:var(--tx2);margin-bottom:18px;max-width:780px;font-family:Georgia,serif;font-style:italic">Risk transfer products embedded at every layer. Mandatory auto-attach at contract activation (Marine Cargo + Performance Bond); high-value contracts trigger Trade Credit + Political Risk. Insurers approve — platform orchestrates.</div>'+
    topStrip+
    '<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Policy Ledger</div>'+
    policyList+
    claimsStrip+
    '<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px;margin-top:18px">Insurer Panel · 7 Institutions</div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+insurerGrid+'</div>'+
    '</div>';
}

function renderBsSettlement(){
  const allPay=Object.values(PAYMENTS);
  const isEmpty=allPay.length===0;
  const fmt=v=>"$"+v.toLocaleString();
  const totalGross=allPay.reduce((s,p)=>s+p.grossUSD,0);
  const totalNet=allPay.reduce((s,p)=>s+p.netCredited,0);
  const totalFees=totalGross-totalNet;
  const settled=allPay.filter(p=>p.state==="SETTLED").length;
  const inFlight=allPay.filter(p=>["INITIATED","IN_FLIGHT"].indexOf(p.state)>=0).length;
  const failed=allPay.filter(p=>["FAILED","BLOCKED","DISPUTED"].indexOf(p.state)>=0).length;

  // Rail status lights — all 4 rails always shown, green dot if available, with throughput counter
  const railTraffic={};
  allPay.forEach(p=>{railTraffic[p.rail]=(railTraffic[p.rail]||0)+1;});
  const railLights=Object.entries(PAY_RAILS).map(([id,r])=>{
    const traffic=railTraffic[id]||0;
    return '<div style="background:#fafaf2;border:1px solid #d8cdb8;border-left:4px solid #5a8a3a;border-radius:4px;padding:10px 12px">'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#5a8a3a;box-shadow:0 0 6px rgba(90,138,58,.6)"></span><span style="font-size:11px;font-weight:700;color:var(--tx)">'+r.label+'</span></div>'+
      '<div style="font-size:9px;color:var(--tx3);margin-bottom:2px">'+r.scope+'</div>'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;padding-top:6px;border-top:1px dashed #e5dccc"><span style="font-size:9px;color:var(--tx3);font-family:monospace">'+(r.iso||"—")+'</span><span style="font-size:14px;font-weight:700;color:#3a7a8a;font-family:monospace">'+traffic+'</span></div>'+
      '</div>';
  }).join("");

  // Headline metrics — small inline strip, not a big tile grid
  const metricsStrip='<div style="display:flex;justify-content:space-between;align-items:center;background:#fafaf2;border:1px solid #d8cdb8;border-radius:6px;padding:12px 18px;margin-bottom:18px">'+
    '<div><div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em">Gross Volume</div><div style="font-size:20px;font-weight:700;color:#1a1208;font-family:monospace">'+fmt(totalGross)+'</div></div>'+
    '<div><div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em">Net Credited</div><div style="font-size:20px;font-weight:700;color:#5a8a3a;font-family:monospace">'+fmt(totalNet)+'</div></div>'+
    '<div><div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em">Fees Collected</div><div style="font-size:20px;font-weight:700;color:#A87832;font-family:monospace">'+fmt(totalFees)+'</div></div>'+
    '<div style="border-left:1px solid #d8cdb8;padding-left:18px"><div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em">Status</div><div style="display:flex;gap:8px;margin-top:4px;font-size:11px"><span style="color:#5a8a3a;font-weight:700">'+settled+' settled</span><span style="color:#3a7a8a;font-weight:700">'+inFlight+' in-flight</span><span style="color:#a04040;font-weight:700">'+failed+' failed</span></div></div>'+
    '</div>';

  // Payment queue — dispatch board style. Actionable rows with state indicator + advance button.
  let queueBody;
  if(isEmpty){
    queueBody='<div style="padding:50px 20px;text-align:center;font-family:monospace;font-size:11px;color:#9a8a7a">// AWAITING FIRST PAYMENT INSTRUCTION<br><br><span style="font-family:Georgia,serif;font-style:italic;font-size:11px;color:var(--tx3)">Activate a contract — milestone-driven payments will be auto-created<br>and queued here for dispatch through the appropriate rail.</span></div>';
  } else {
    queueBody=allPay.map(p=>{
      const rail=PAY_RAILS[p.rail]||{label:"—"};
      const stateColor=PAY_STATE_COLOR[p.state]||"#666";
      const canAdvance=["PENDING","INITIATED","IN_FLIGHT"].indexOf(p.state)>=0;
      return '<div onclick="closeBackstage();payShowDetail(\''+p.id+'\')" style="display:grid;grid-template-columns:90px 1fr 100px 120px 90px 90px;gap:12px;align-items:center;padding:12px 14px;border-bottom:1px solid #f0e8d6;cursor:pointer;font-size:11px;background:#fff">'+
        '<div style="font-family:monospace;font-weight:700;color:#3a7a8a">'+p.id+'</div>'+
        '<div><div style="font-size:11px;font-weight:600;color:var(--tx)">'+p.label+'</div><div style="font-size:9px;color:var(--tx3)">'+p.contractId+' · '+rail.label+'</div></div>'+
        '<div style="text-align:right;font-family:monospace;font-weight:700;color:#1a1208">'+fmt(p.grossUSD)+'</div>'+
        '<div style="text-align:right;font-family:monospace;color:#5a8a3a">net '+fmt(p.netCredited)+'</div>'+
        '<div style="text-align:center"><span style="background:'+stateColor+';color:#fff;padding:3px 10px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em">'+PAY_STATE_LABEL[p.state]+'</span></div>'+
        '<div style="text-align:right">'+(canAdvance?'<button onclick="event.stopPropagation();payAdvance(\''+p.id+'\')" style="padding:5px 10px;background:#3a7a8a;color:#fff;border:none;border-radius:3px;font-size:10px;font-weight:700;cursor:pointer">Advance →</button>':'<span style="font-size:9px;color:var(--tx3);font-style:italic">terminal</span>')+'</div>'+
        '</div>';
    }).join("");
  }

  const queueHeader='<div style="background:#1a1208;color:#c4a06a;padding:10px 14px;border-radius:6px 6px 0 0;display:grid;grid-template-columns:90px 1fr 100px 120px 90px 90px;gap:12px;font-size:9px;text-transform:uppercase;letter-spacing:.08em;font-weight:700"><div>Pay ID</div><div>Trigger</div><div style="text-align:right">Gross</div><div style="text-align:right">Net</div><div style="text-align:center">State</div><div style="text-align:right">Action</div></div>';
  const queue='<div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;overflow:hidden;margin-bottom:18px">'+queueHeader+queueBody+'</div>';

  return '<div class="bsc">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6px">'+
    '<div><div style="font-size:9px;color:#3a7a8a;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Operations · Payment Dispatch</div><div class="bsc-title" style="margin-bottom:0">Settlement &amp; Payments</div></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-align:right;font-family:monospace">'+allPay.length+' instruction'+(allPay.length!==1?"s":"")+' · 4 rails active</div>'+
    '</div>'+
    '<div style="font-size:11px;color:var(--tx2);margin-bottom:18px;max-width:780px">Milestone-driven payments orchestrated across 4 rails. Platform is rail-agnostic — instructions go to bank, bank picks rail. Append-only ledger; reconciliation against bank webhooks. Itemized fees at point of payment, no bundled opacity.</div>'+
    metricsStrip+
    '<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Rail Status · All Operational</div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">'+railLights+'</div>'+
    '<div style="font-size:9px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Payment Queue</div>'+
    queue+
    '</div>';
}

function renderBsFinancing(){
  const positions=Object.values(FINANCING);
  const isEmpty=positions.length===0;
  const totalNotional=positions.reduce((s,f)=>s+f.notionalUSD,0);
  const totalLine=positions.reduce((s,f)=>s+f.creditLineUSD,0);
  const totalDrawn=positions.reduce((s,f)=>s+f.drawnUSD,0);
  const totalMargin=positions.reduce((s,f)=>s+f.marginPosted,0);
  const portfolioLTV=totalNotional?Math.round(totalLine/totalNotional*100):0;
  const portfolioUtil=totalLine?Math.round(totalDrawn/totalLine*100):0;
  const headroom=totalLine-totalDrawn;
  const fmt=v=>"$"+(v/1000).toFixed(0)+"k";

  // Status line varies by empty/loaded
  const statusDot=isEmpty?"#c44":"#5a8a3a";
  const statusText=isEmpty?"NO ACTIVE POSITIONS · AWAITING FIRST CONTRACT ACTIVATION":"ALL POSITIONS HEALTHY · NO MARGIN CALLS";

  // Portfolio strip — always rendered with zeros if empty
  const portfolioStrip='<div style="background:linear-gradient(180deg,#1a3a4a 0%,#0f2530 100%);color:#c4e0e8;border-radius:8px;padding:18px 22px;margin-bottom:20px;border:1px solid #2a4a5a;box-shadow:0 2px 8px rgba(0,0,0,0.15)">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;border-bottom:1px solid rgba(196,224,232,.15);padding-bottom:10px">'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.12em;font-weight:700">Treasury Position · Live</div>'+
    '<div style="font-size:14px;color:#e8d4a8;font-weight:600;margin-top:2px;font-family:Georgia,serif">Portfolio Exposure Monitor</div></div>'+
    '<div style="text-align:right"><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em">Mark-to-Market</div>'+
    '<div style="font-size:11px;color:#c4e0e8;font-family:monospace">'+new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})+' EAT</div></div></div>'+
    '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:24px">'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Notional</div><div style="font-size:22px;font-weight:700;color:#fff;font-family:monospace;text-align:right">'+fmt(totalNotional)+'</div></div>'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Credit Lines</div><div style="font-size:22px;font-weight:700;color:#a8d4b8;font-family:monospace;text-align:right">'+fmt(totalLine)+'</div><div style="font-size:9px;color:#7a9aa8;text-align:right;margin-top:2px;font-family:monospace">LTV '+portfolioLTV+'%</div></div>'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Drawn</div><div style="font-size:22px;font-weight:700;color:#e8d4a8;font-family:monospace;text-align:right">'+fmt(totalDrawn)+'</div><div style="font-size:9px;color:#7a9aa8;text-align:right;margin-top:2px;font-family:monospace">'+portfolioUtil+'% util</div></div>'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Headroom</div><div style="font-size:22px;font-weight:700;color:#a8d4b8;font-family:monospace;text-align:right">'+fmt(headroom)+'</div></div>'+
    '<div><div style="font-size:9px;color:#7a9aa8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Margin Posted</div><div style="font-size:22px;font-weight:700;color:#fff;font-family:monospace;text-align:right">'+fmt(totalMargin)+'</div></div></div>'+
    '<div style="margin-top:14px;display:flex;align-items:center;gap:8px;font-size:9px;color:#7a9aa8;font-family:monospace">'+
    '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:'+statusDot+'"></span>'+statusText+' · BENCHMARK NY-C ARABICA + ETHIOPIAN DIFFERENTIAL</div></div>';

  // Positions table — always show header, body either rows or placeholder
  let posBody;
  if(isEmpty){
    posBody='<div style="padding:40px 20px;text-align:center"><div style="font-family:monospace;font-size:11px;color:#9a8a7a;margin-bottom:6px">// AWAITING FIRST CONTRACT ACTIVATION</div><div style="font-size:11px;color:var(--tx3);font-family:Georgia,serif;font-style:italic">Activate a contract through the bank gates to open a credit line.<br>Each line refreshes mark-to-market against the NY-C benchmark.</div></div>';
  } else {
    posBody=positions.map(f=>{
      const c=CONTRACTS[f.contractId];
      const util=f.drawnUSD/f.creditLineUSD*100;
      const utilColor=util>80?"#a04040":util>60?"#A87832":"#5a8a3a";
      return '<div onclick="closeBackstage();finShowDetail(\''+f.contractId+'\')" style="padding:10px 14px;border-bottom:1px solid #f0e8d6;display:grid;grid-template-columns:90px 1fr 90px 90px 1fr 70px 80px;gap:10px;align-items:center;cursor:pointer;font-size:11px">'+
        '<div style="font-weight:700;color:#3a7a8a;font-family:monospace">'+f.contractId+'</div>'+
        '<div><div style="font-size:11px;font-weight:600;color:var(--tx)">'+(c?c.grade:"")+'</div><div style="font-size:9px;color:var(--tx3)">'+f.collateralStage+'</div></div>'+
        '<div style="text-align:right;font-family:monospace;font-weight:600">'+fmt(f.creditLineUSD)+'</div>'+
        '<div style="text-align:right;font-family:monospace;color:'+utilColor+';font-weight:600">'+fmt(f.drawnUSD)+'</div>'+
        '<div><div style="height:14px;background:#f0e8d6;border-radius:7px;overflow:hidden;position:relative"><div style="height:100%;width:'+util+'%;background:'+utilColor+';border-radius:7px"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1a1208;font-family:monospace">'+util.toFixed(0)+'%</div></div></div>'+
        '<div style="text-align:right;font-family:monospace;font-weight:600;color:#3a7a8a">'+(f.haircut*100).toFixed(0)+'%</div>'+
        '<div style="text-align:right;font-family:monospace;color:#5a8a3a;font-weight:600">'+fmt(f.marginPosted)+'</div></div>';
    }).join("");
  }
  const positionsTable='<div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;overflow:hidden;margin-bottom:20px">'+
    '<div style="background:#f5f0e6;padding:8px 14px;border-bottom:1px solid #d8cdb8;display:grid;grid-template-columns:90px 1fr 90px 90px 1fr 70px 80px;gap:10px;font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;font-weight:700">'+
    '<div>Position</div><div>Collateral</div><div style="text-align:right">Line</div><div style="text-align:right">Drawn</div><div>Utilization</div><div style="text-align:right">LTV</div><div style="text-align:right">Margin</div></div>'+
    posBody+'</div>';

  // Heatmap — always rendered
  let heatmapTiles;
  if(isEmpty){
    heatmapTiles='<div style="display:flex;gap:6px">'+[1,2,3,4,5,6].map(()=>'<div style="width:60px;height:60px;background:repeating-linear-gradient(45deg,#f0e8d6,#f0e8d6 4px,#fafaf2 4px,#fafaf2 8px);border:1px dashed #d8cdb8;border-radius:4px;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:9px;color:#9a8a7a">—</div>').join("")+'</div>';
  } else {
    const lots=positions.flatMap(f=>{
      const c=CONTRACTS[f.contractId];
      const lot=CONTAINERS.find(x=>x.id===(c&&c.lot)||x.exp===(c&&c.lot));
      if(!lot)return[];
      const colors={"green":"#5a8a3a","parchment":"#A87832","cherry":"#a04040"};
      const tier=f.haircut>=0.75?"green":f.haircut>=0.55?"parchment":"cherry";
      return[{id:lot.id,color:colors[tier],haircut:f.haircut}];
    });
    heatmapTiles=lots.map(l=>'<div title="'+l.id+'" style="width:60px;height:60px;background:'+l.color+';color:#fff;border-radius:4px;padding:6px;display:flex;flex-direction:column;justify-content:space-between;font-family:monospace"><div style="font-size:8px;font-weight:700">'+l.id.slice(-6)+'</div><div style="font-size:11px;font-weight:700;text-align:right">'+(l.haircut*100).toFixed(0)+'%</div></div>').join("");
  }
  const heatmap='<div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;padding:14px;margin-bottom:20px">'+
    '<div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:10px">Collateral Heatmap · Haircut Tiers</div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">'+heatmapTiles+'</div>'+
    '<div style="display:flex;gap:14px;font-size:9px;color:var(--tx3)">'+
    '<span><span style="display:inline-block;width:10px;height:10px;background:#5a8a3a;border-radius:2px;vertical-align:middle;margin-right:4px"></span>Green (75-85%)</span>'+
    '<span><span style="display:inline-block;width:10px;height:10px;background:#A87832;border-radius:2px;vertical-align:middle;margin-right:4px"></span>Parchment (60-70%)</span>'+
    '<span><span style="display:inline-block;width:10px;height:10px;background:#a04040;border-radius:2px;vertical-align:middle;margin-right:4px"></span>Cherry (40-50%)</span></div></div>';

  // Bank exposure strip
  const bankExposure={};
  positions.forEach(f=>{
    const c=CONTRACTS[f.contractId];
    if(!c)return;
    const bb=Object.values(BANK_PANEL).find(b=>c.buyerBank&&c.buyerBank.includes(b.short))||BANK_PANEL["BNK-CBE"];
    const sb=Object.values(BANK_PANEL).find(b=>c.sellerBank.includes(b.short))||BANK_PANEL["BNK-CBE"];
    bankExposure[bb.short]=(bankExposure[bb.short]||0)+f.creditLineUSD/2;
    bankExposure[sb.short]=(bankExposure[sb.short]||0)+f.creditLineUSD/2;
  });
  const maxExp=Math.max.apply(null,Object.values(bankExposure).concat([1]));
  let bankBars;
  if(isEmpty){
    bankBars=["CBE","Awash","Dashen","Cooperative Oromia"].map(bk=>'<div style="display:grid;grid-template-columns:130px 1fr 90px;gap:10px;align-items:center;margin-bottom:6px;font-size:11px;opacity:.4"><div style="color:var(--tx2);font-weight:600">'+bk+'</div><div><div style="height:10px;background:repeating-linear-gradient(90deg,#f0e8d6,#f0e8d6 6px,#fafaf2 6px,#fafaf2 12px);border-radius:5px"></div></div><div style="text-align:right;font-family:monospace;color:var(--tx3)">$0k</div></div>').join("");
  } else {
    bankBars=Object.entries(bankExposure).map(([bk,amt])=>'<div style="display:grid;grid-template-columns:130px 1fr 90px;gap:10px;align-items:center;margin-bottom:6px;font-size:11px"><div style="color:var(--tx2);font-weight:600">'+bk+'</div><div><div style="height:10px;background:#f0e8d6;border-radius:5px;overflow:hidden"><div style="height:100%;width:'+(amt/maxExp*100)+'%;background:#3a7a8a;border-radius:5px"></div></div></div><div style="text-align:right;font-family:monospace;font-weight:600;color:#3a7a8a">'+fmt(amt)+'</div></div>').join("");
  }
  const bankStrip='<div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;padding:14px;margin-bottom:20px">'+
    '<div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:10px">Bank-Side Exposure</div>'+bankBars+'</div>';

  // Partner panel
  const banks=Object.entries(BANK_PANEL).map(function(e){
    const id=e[0],b=e[1];
    return '<div onclick="closeBackstage();showUID(\''+id+'\')" style="padding:10px 12px;border:1px solid #e5dccc;border-radius:5px;cursor:pointer;background:#fff">'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px"><div style="font-size:12px;font-weight:700;color:var(--tx)">'+b.short+'</div><span style="font-size:9px;color:#3a7a8a;font-weight:700;font-family:monospace">'+b.rate+'</span></div>'+
      '<div style="font-size:9px;color:var(--tx3);margin-bottom:4px">'+b.type.split("·")[0].trim()+'</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:2px">'+b.capabilities.slice(0,3).map(function(cap){return '<span style="font-size:8px;background:rgba(58,122,138,.08);color:#3a7a8a;padding:1px 5px;border-radius:6px">'+cap+'</span>';}).join("")+'</div></div>';
  }).join("");

  return '<div class="bsc">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6px">'+
    '<div><div style="font-size:9px;color:#3a7a8a;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Treasury · Bank-Orchestrated</div>'+
    '<div class="bsc-title" style="margin-bottom:0">Financing &amp; Liquidity</div></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-align:right;font-family:monospace">Total exposure '+fmt(totalLine)+' · LTV '+portfolioLTV+'% · '+positions.length+' positions</div></div>'+
    '<div style="font-size:11px;color:var(--tx2);margin-bottom:18px;max-width:780px">Platform orchestrates; banks own counterparty risk. Single active lien per lot UID, refinances on custody handoff via RTGS. Mark-to-market daily against NY-C Arabica + Ethiopian specialty differential.</div>'+
    portfolioStrip+positionsTable+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">'+heatmap+bankStrip+'</div>'+
    '<div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px">Partner Bank Panel · 8 Institutions</div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">'+banks+'</div></div>';
}

function renderBsContracts(){
  const all=Object.values(CONTRACTS);
  const isEmpty=all.length===0;
  const activeStates=["DRAFT","NEGOTIATING","BANK_PENDING","ACTIVATED","PERFORMING"];
  const terminalStates=["DELIVERED","CLOSED","TERMINATED","CANCELLED","DISPUTED"];

  // Court docket ribbon - always rendered
  let docketBody;
  if(isEmpty){
    docketBody='<div style="font-size:10px;color:#9a8a7a;font-family:Georgia,serif;font-style:italic;text-align:center;padding:6px">— Awaiting first transition · Match a marketplace listing to begin —</div>';
  } else {
    const allEvents=[];
    all.forEach(function(c){c.history.slice(-3).forEach(function(h){allEvents.push({ts:h.ts,event:h.event,detail:h.detail,ctrId:c.id});});});
    allEvents.sort(function(a,b){return b.ts-a.ts;});
    docketBody='<div style="white-space:nowrap;overflow-x:auto">'+allEvents.slice(0,6).map(function(e){
      return '<div style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;background:rgba(255,255,255,.08);border-radius:14px;margin-right:6px;font-size:10px;color:#e8d4a8;white-space:nowrap"><span style="font-family:monospace;color:#c4a06a">'+new Date(e.ts).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})+'</span><span style="color:#9a8a7a">·</span><span style="font-weight:700">'+e.ctrId+'</span><span style="color:#9a8a7a">'+e.event.replace(/_/g," ").toLowerCase()+'</span></div>';
    }).join("")+'</div>';
  }
  const cornerLabel=isEmpty?"awaiting first case":(all.length+" cases on docket");
  const docketRibbon='<div style="background:linear-gradient(180deg,#2a1a08 0%,#1a1208 100%);color:#e8d4a8;border-radius:8px;padding:14px 20px;margin-bottom:20px;border:1px solid #3a2810;box-shadow:0 2px 8px rgba(0,0,0,0.15)">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;border-bottom:1px solid rgba(232,212,168,.15);padding-bottom:8px">'+
    '<div><div style="font-size:9px;color:#9a8a7a;text-transform:uppercase;letter-spacing:.12em;font-weight:700">Court Docket · Recent Transitions</div>'+
    '<div style="font-size:13px;font-family:Georgia,serif;color:#e8d4a8;font-style:italic;margin-top:2px">In re: Active Smart Contracts</div></div>'+
    '<div style="font-size:9px;color:#9a8a7a;font-family:Georgia,serif;font-style:italic">'+cornerLabel+'</div></div>'+
    docketBody+'</div>';

  // Sample card for empty kanban
  const sampleCard='<div style="background:#fdfbf5;border:1px solid #d8cdb8;border-left:4px solid #7C3AED;border-radius:3px;padding:11px 12px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,0.04);position:relative;opacity:.55">'+
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-15deg);font-family:Georgia,serif;font-size:18px;font-weight:700;color:rgba(124,58,237,.25);letter-spacing:.15em;pointer-events:none;border:2px solid rgba(124,58,237,.25);padding:3px 12px;border-radius:3px">SAMPLE</div>'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px"><div style="font-family:Georgia,serif;font-size:14px;font-weight:700;color:#1a1208">CTR-XXXX</div><div style="font-size:8px;color:#9a8a7a;font-family:monospace">No.XXXX</div></div>'+
    '<div style="font-size:10px;color:#5a4a3a;font-family:Georgia,serif;font-style:italic;line-height:1.4;margin-bottom:8px;border-bottom:1px dashed #e5dccc;padding-bottom:6px">ESCC 2019 — Shipment</div>'+
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><div style="width:22px;height:22px;border-radius:50%;background:#3a5820;color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">SE</div><div style="font-size:10px;color:#9a8a7a">→</div><div style="width:22px;height:22px;border-radius:50%;background:#3a7a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">BU</div><div style="flex:1;font-size:9px;color:var(--tx3);text-align:right">0/4 sigs</div></div>'+
    '<div style="font-size:11px;color:var(--tx);font-weight:600">— kg</div>'+
    '<div style="font-size:10px;color:var(--tx3);margin-bottom:4px">Sample case file</div>'+
    '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #f0e8d6"><span style="font-size:9px;color:var(--tx3)">—</span><span style="font-family:monospace;font-size:11px;font-weight:700;color:#5a4a3a">$—</span></div></div>';

  // Render a real case-file card
  function renderCaseCard(c){
    const buyerName=(ACTOR_REGISTRY[c.buyer]||{}).name||c.buyer;
    const sellerName=(ACTOR_REGISTRY[c.seller]||{}).name||c.seller;
    const buyerInit=buyerName.split(" ").map(function(w){return w[0];}).slice(0,2).join("").toUpperCase();
    const sellerInit=sellerName.split(" ").map(function(w){return w[0];}).slice(0,2).join("").toUpperCase();
    const stateColor=CTR_STATE_COLOR[c.state]||"#666";
    const value=Math.round(c.weight*c.price/0.453592);
    const sigCount=Object.values(c.signatures).filter(function(s){return s;}).length;
    return '<div onclick="closeBackstage();ctrShowDetail(\''+c.id+'\')" style="background:#fdfbf5;border:1px solid #d8cdb8;border-left:4px solid '+stateColor+';border-radius:3px;padding:11px 12px;margin-bottom:8px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.04)">'+
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px"><div style="font-family:Georgia,serif;font-size:14px;font-weight:700;color:#1a1208;letter-spacing:.02em">'+c.id+'</div><div style="font-size:8px;color:#9a8a7a;font-family:monospace">No.'+c.id.slice(-4)+'</div></div>'+
      '<div style="font-size:10px;color:#5a4a3a;font-family:Georgia,serif;font-style:italic;line-height:1.4;margin-bottom:8px;border-bottom:1px dashed #e5dccc;padding-bottom:6px">'+c.template+'</div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><div title="'+sellerName+'" style="width:22px;height:22px;border-radius:50%;background:#3a5820;color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">'+sellerInit+'</div><div style="font-size:10px;color:#9a8a7a">→</div><div title="'+buyerName+'" style="width:22px;height:22px;border-radius:50%;background:#3a7a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">'+buyerInit+'</div><div style="flex:1;font-size:9px;color:var(--tx3);text-align:right">'+sigCount+'/4 sigs</div></div>'+
      '<div style="font-size:11px;color:var(--tx);font-weight:600">'+c.weight.toLocaleString()+' kg</div>'+
      '<div style="font-size:10px;color:var(--tx3);margin-bottom:4px">'+c.grade+'</div>'+
      '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #f0e8d6"><span style="font-size:9px;color:var(--tx3)">'+c.delivery.split("·")[0]+'</span><span style="font-family:monospace;font-size:11px;font-weight:700;color:#5a4a3a">$'+(value/1000).toFixed(0)+'k</span></div></div>';
  }

  // Kanban columns - always render all 5
  const columns=activeStates.map(function(state,idx){
    const inState=all.filter(function(c){return c.state===state;});
    let body;
    if(isEmpty){
      body=idx===2?sampleCard:'<div style="font-size:10px;color:#9a8a7a;text-align:center;padding:20px 8px;font-style:italic;font-family:Georgia,serif">— empty —</div>';
    } else if(inState.length){
      body=inState.map(renderCaseCard).join("");
    } else {
      body='<div style="font-size:10px;color:#9a8a7a;text-align:center;padding:20px 8px;font-style:italic;font-family:Georgia,serif">— empty —</div>';
    }
    const countOpacity=isEmpty?";opacity:.4":"";
    return '<div style="flex:1;min-width:0;background:#f5f0e6;border-radius:6px;padding:10px;border-top:3px solid '+CTR_STATE_COLOR[state]+'">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #d8cdb8">'+
      '<div style="font-size:10px;font-weight:700;color:#1a1208;text-transform:uppercase;letter-spacing:.06em;font-family:Georgia,serif">'+CTR_STATE_LABEL[state]+'</div>'+
      '<div style="background:'+CTR_STATE_COLOR[state]+';color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700'+countOpacity+'">'+inState.length+'</div>'+
      '</div>'+body+'</div>';
  }).join("");
  const kanban='<div style="display:flex;gap:8px;margin-bottom:18px;overflow-x:auto;padding-bottom:8px">'+columns+'</div>';

  // Terminal list
  const terminal=all.filter(function(c){return terminalStates.indexOf(c.state)>=0;});
  let terminalList="";
  if(terminal.length){
    terminalList='<div style="margin-top:18px"><div style="font-size:9px;color:#5a4a3a;text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:8px;font-family:Georgia,serif">Closed Cases · Archive</div><div style="background:#fff;border:1px solid #d8cdb8;border-radius:6px;overflow:hidden">'+
      terminal.map(function(c){
        const buyerName=(ACTOR_REGISTRY[c.buyer]||{}).name||c.buyer;
        const sellerName=(ACTOR_REGISTRY[c.seller]||{}).name||c.seller;
        return '<div onclick="closeBackstage();ctrShowDetail(\''+c.id+'\')" style="padding:10px 14px;border-bottom:1px solid #f0e8d6;display:grid;grid-template-columns:100px 1fr 1fr 120px;gap:10px;align-items:center;cursor:pointer;font-size:11px"><div style="font-family:Georgia,serif;font-weight:700">'+c.id+'</div><div style="color:var(--tx3);font-family:Georgia,serif;font-style:italic">'+sellerName+' → '+buyerName+'</div><div style="color:var(--tx3)">'+c.grade+'</div><div style="text-align:right"><span style="background:'+CTR_STATE_COLOR[c.state]+';color:#fff;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:700">'+CTR_STATE_LABEL[c.state]+'</span></div></div>';
      }).join("")+'</div></div>';
  }

  const headerSub=isEmpty?"No cases yet · Ethiopian law baseline · ESCC 2019":(all.length+" active case"+(all.length!==1?"s":"")+" · Ethiopian law baseline · ESCC 2019");
  const footerHint=isEmpty?'<div style="padding:14px 20px;background:rgba(124,58,237,.06);border-left:3px solid #7C3AED;border-radius:4px;font-size:11px;color:var(--tx2);font-family:Georgia,serif;font-style:italic;margin-top:6px">To open the first case, match a marketplace listing. The contract will be auto-drafted from the listing terms and routed through the bank-pending sequence.</div>':"";

  return '<div class="bsc">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:6px">'+
    '<div><div style="font-size:9px;color:#7C3AED;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Legal · Court Docket</div>'+
    '<div class="bsc-title" style="margin-bottom:0;font-family:Georgia,serif">Contracts</div></div>'+
    '<div style="font-size:10px;color:var(--tx3);text-align:right;font-family:Georgia,serif;font-style:italic">'+headerSub+'</div></div>'+
    '<div style="font-size:11px;color:var(--tx2);margin-bottom:18px;max-width:780px;font-family:Georgia,serif;font-style:italic">Smart contracts auto-drafted from matched marketplace listings. Hybrid template with declared mutable + immutable terms. Bank-gated activation: buyer\'s bank → seller\'s bank → both countersign → activated. Append-only lifecycle.</div>'+
    docketRibbon+kanban+terminalList+footerHint+'</div>';
}

function renderBsQuality(){
  // Roll up cup scores from all traced contracts
  const traced=CONTAINERS.filter(c=>TRACE_OK.includes(c.status)&&c.cup);
  const avg=traced.length?(traced.reduce((s,c)=>s+c.cup,0)/traced.length):0;
  const specialty=traced.filter(c=>c.cup>=80).length;
  const labRows=Object.entries(LAB_REGISTRY).map(([id,l])=>`<div class="bs-rec-item" onclick="closeBackstage();showUID('${id}')" style="cursor:pointer"><div style="display:flex;justify-content:space-between;margin-bottom:4px">${muid(id)}<span style="font-size:9px;font-weight:700;background:#CFFAFE;color:#155E75;padding:2px 7px;border-radius:10px">ROUND-ROBIN</span></div><div style="font-size:13px;font-weight:600;color:var(--tx);margin-bottom:2px">${l.name}</div><div style="font-size:11px;color:var(--tx2);margin-bottom:2px">${l.city} · ${l.accred.join(" · ")}</div><div style="font-size:10px;color:var(--tx3)">${l.samples.toLocaleString()} samples processed since ${l.since}</div></div>`).join("");
  const recentResults=traced.slice(0,8).map(c=>{const[b,col]=gradeBand(c.cup);return`<div class="bs-rec-item" onclick="closeBackstage();openDetail('${c.id}')" style="cursor:pointer"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">${muid(c.id)}<span style="background:${col};color:#fff;padding:2px 8px;border-radius:10px;font-weight:700;font-size:10px">${c.cup.toFixed(2)}</span></div><div style="font-size:12px;font-weight:500;color:var(--tx);margin-bottom:2px">${c.grade} · ${c.process}</div><div style="font-size:10px;color:var(--tx3)">${b} · ${c.areas.join(", ")}</div></div>`;}).join("");
  return`<div class="bsc">
    <div class="bsc-title">Quality and Labs</div>
    <div class="bsc-sub">Quality & Sampling. Black-box lab assignment, dual-standard grading (SCA + CLU), append-only results with 7-day challenge window. Each result binds to its sample UID and rolls up to the originating actor's quality history.</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Portfolio Avg</div><div style="font-size:22px;font-weight:700;color:#A87832">${avg.toFixed(2)}</div><div style="font-size:10px;color:var(--tx3)">SCA cup score</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Specialty (≥80)</div><div style="font-size:22px;font-weight:700;color:#5a8a3a">${specialty}</div><div style="font-size:10px;color:var(--tx3)">of ${traced.length} contracts</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Accredited Labs</div><div style="font-size:22px;font-weight:700;color:#155E75">${LAB_IDS.length}</div><div style="font-size:10px;color:var(--tx3)">round-robin pool</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Open Challenges</div><div style="font-size:22px;font-weight:700;color:var(--tx2)">0</div><div style="font-size:10px;color:var(--tx3)">7-day window</div></div>
    </div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Accredited Labs (Round-Robin Pool)</div>
    <div class="bs-recent">${labRows}</div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin:18px 0 10px">Recent Cup Results</div>
    <div class="bs-recent">${recentResults}</div>
    <div style="margin-top:18px;padding:12px 14px;background:rgba(58,122,138,.06);border-left:3px solid #3a7a8a;font-size:11px;color:var(--tx2);border-radius:3px;line-height:1.5">
      <strong>Bias prevention:</strong> Parties cannot choose their lab. Lab sees only sample UID — not parent lot, owner, region, or process. Counter-sample retained for the challenge window. Disputes trigger blind re-test at a second lab, with lab flagged for audit if delta exceeds tolerance.
    </div>
  </div>`;
}
function renderBsInv(){
  // Tally by-products and samples across all traced contracts
  const traced=CONTAINERS.filter(c=>TRACE_OK.includes(c.status));
  let bypCount=0,bypKg=0,smpCount=0;
  const byprodRows=[],sampleRows=[];
  traced.forEach(c=>{
    const tr=genTrace(c);
    Object.values(tr.nodes).forEach(n=>{
      if(n.type==="BYPRD"){bypCount++;bypKg+=n.weight;if(byprodRows.length<6)byprodRows.push({id:n.id,name:n.name,kg:n.weight,note:n.note,c:c.id});}
      if(n.type==="SMPL"){smpCount++;if(sampleRows.length<6)sampleRows.push({id:n.id,name:n.name,seal:n.seal,c:c.id});}
    });
  });
  const evCard=(icon,title,desc,tag)=>`<div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:14px;margin-bottom:10px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="width:28px;height:28px;background:#FEF3C7;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px">${icon}</div><div style="font-size:13px;font-weight:600;color:var(--tx)">${title}</div><div style="margin-left:auto;font-size:9px;font-weight:700;background:#E5E7EB;color:#374151;padding:2px 7px;border-radius:10px;letter-spacing:.05em">${tag}</div></div><div style="font-size:11px;color:var(--tx2);line-height:1.5">${desc}</div></div>`;
  return`<div class="bsc">
    <div class="bsc-title">Inventory</div>
    <div class="bsc-sub">Inventory & Traceability. By-products and samples are tracked as child lots with their own UIDs and custody chains, closing the volume loop and enabling EUDR/ESG reporting on by-product fate.</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px">
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">By-product Lots</div><div style="font-size:22px;font-weight:700;color:#A78B5C">${bypCount}</div><div style="font-size:10px;color:var(--tx3)">${(bypKg/1000).toFixed(1)}t · husks &amp; pulp</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Sample Lots</div><div style="font-size:22px;font-weight:700;color:#EC4899">${smpCount}</div><div style="font-size:10px;color:var(--tx3)">340g sealed · CLU/SCA</div></div>
      <div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Traced Contracts</div><div style="font-size:22px;font-weight:700;color:#5a8a3a">${traced.length}</div><div style="font-size:10px;color:var(--tx3)">visible to your portfolio</div></div>
    </div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Inventory Event Types</div>
    ${evCard("📥","BULK_PURCHASE","Aggregator initiates a single event covering N lots from N farmers; parallel confirmations with quorum + timeout. Replaces sequential 40-step cascade.","STRESS-TEST #04")}
    ${evCard("⚖️","Dual-weight handoff","TRANSFER_CUSTODY and TRANSFER_OWNERSHIP carry both declaredWeight and receivedWeight; delta &gt; tolerance enters WEIGHT_DISPUTE.","STRESS-TEST #06")}
    ${evCard("🪵","By-product child lots","Husks (~43%), pulp (~30%), defects all tracked as own UIDs. Moisture loss stays as ledger entry only.","LIVE")}
    ${evCard("🔬","Sample as child lot","Each sample has its own UID, custody chain, tamper seal. Lab sees sample UID only — black-box.","LIVE")}
    ${evCard("📦","ONBOARDING_EVENT","One-time admin-gated creation of legacy lots. Amber badge in trace, EUDR-ineligible until geolocation supplemented.","STRESS-TEST #09")}
    ${evCard("↩️","REVERSAL with void lot","Original lot weight = corrective lot + void lot. Volume conservation preserved across corrections.","STRESS-TEST #01")}
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin:18px 0 10px">Recent By-product Lots</div>
    <div class="bs-recent">${byprodRows.map(r=>`<div class="bs-rec-item" onclick="closeBackstage();showUID('${r.id}')" style="cursor:pointer"><div style="display:flex;justify-content:space-between;margin-bottom:4px">${muid(r.id)}<span style="font-size:10px;color:var(--tx3)">${r.kg.toLocaleString()} kg</span></div><div style="font-size:12px;font-weight:500;color:var(--tx);margin-bottom:2px">${r.name}</div><div style="font-size:10px;color:var(--tx3)">${r.note} · ${r.c}</div></div>`).join("")}</div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin:18px 0 10px">Recent Sample Lots</div>
    <div class="bs-recent">${sampleRows.map(r=>`<div class="bs-rec-item" onclick="closeBackstage();showUID('${r.id}')" style="cursor:pointer"><div style="display:flex;justify-content:space-between;margin-bottom:4px">${muid(r.id)}<span style="font-size:10px;color:var(--tx3)">340 g</span></div><div style="font-size:12px;font-weight:500;color:var(--tx);margin-bottom:2px">${r.name}</div><div style="font-size:10px;color:var(--tx3)">${r.seal} · ${r.c}</div></div>`).join("")}</div>
  </div>`;
}
function renderBsActors(){
  const rows=Object.entries(ACTOR_REGISTRY).map(([id,a])=>`
    <div class="bs-rec-item" onclick="closeBackstage();showUID('${id}')" style="cursor:pointer">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">${muid(id)}${tierBadge(a.tier)}</div>
      <div style="font-size:13px;font-weight:600;color:var(--tx);margin-bottom:2px">${a.name}</div>
      <div style="font-size:11px;color:var(--tx2);margin-bottom:2px">${a.type} · ${a.roles.join(" + ")}</div>
      <div style="font-size:10px;color:var(--tx3)">${a.region} · ${a.fayda?"Fayda "+a.fayda:"LEI "+a.lei}</div>
    </div>`).join("");
  const counts={Provisional:0,Basic:0,Verified:0,Enhanced:0};
  Object.values(ACTOR_REGISTRY).forEach(a=>counts[a.tier]++);
  return`<div class="bsc">
    <div class="bsc-title">Actors &amp; Identity</div>
    <div class="bsc-sub">Identity & Registry. Read-only view of actors visible in your portfolio's traceability chain. Tier governs which roles and value thresholds each actor may transact at.</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">
      ${Object.entries(counts).map(([t,n])=>`<div style="background:#fff;border:1px solid #e5dccc;border-radius:6px;padding:12px"><div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">${t}</div><div style="font-size:22px;font-weight:700;color:${TIER_COLOR[t]}">${n}</div></div>`).join("")}
    </div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Registered Actors (${Object.keys(ACTOR_REGISTRY).length})</div>
    <div class="bs-recent">${rows}</div>
    <div style="margin-top:18px;padding:12px 14px;background:rgba(90,138,58,.06);border-left:3px solid #5a8a3a;font-size:11px;color:var(--tx2);border-radius:3px;line-height:1.5">
      <strong>Tier model:</strong> Provisional → Basic → Verified → Enhanced. Ethiopian actors verified via Fayda; foreign legal entities via LEI. Per-role activation, related parties self-declared with audit cross-checks. Suspension is admin-gated, append-only — actors are never deleted.
    </div>
  </div>`;
}
function renderBsNew(){return renderBsContracts();
  return`<div class="bsc">
    <div class="bsc-title">New Contract</div>
    <div class="bsc-sub">Start a new import trade. The platform will build the timeline, milestones, and notification schedule from your contract terms.</div>
    <button class="bs-new-btn" onclick="closeBackstage();openWizard()">
      <div class="bs-new-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#D4820A" stroke-width="2"><rect x="2" y="2" width="18" height="18" rx="3"/><line x1="11" y1="6" x2="11" y2="16"/><line x1="6" y1="11" x2="16" y2="11"/></svg></div>
      <div><div class="bs-new-title">New contract from terms</div><div class="bs-new-sub">Enter commodity, parties, LC details, delivery window — platform generates the full milestone schedule</div></div>
    </button>
    <button class="bs-new-btn" onclick="toast('Template library — Phase 2');closeBackstage()">
      <div class="bs-new-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#D4820A" stroke-width="2"><rect x="3" y="2" width="14" height="18" rx="2"/><line x1="7" y1="7" x2="13" y2="7"/><line x1="7" y1="11" x2="13" y2="11"/><line x1="7" y1="15" x2="10" y2="15"/></svg></div>
      <div><div class="bs-new-title">Use a template</div><div class="bs-new-sub">Start from a saved contract template — pre-fills commodity specs, standard LC terms, and notification rules</div></div>
    </button>
  </div>`;
}
function renderBsOpen(){
  const recent=CONTAINERS.slice(0,6);
  return`<div class="bsc">
    <div class="bsc-title">Open</div>
    <div class="bsc-sub">Resume a contract or return to a recent view.</div>
    <div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Recent</div>
    <div class="bs-recent">
      ${recent.map(c=>`<div class="bs-rec-item" onclick="closeBackstage();openDetail('${c.id}')">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">${muid(c.id)}<span class="sp sp-${c.status}" style="font-size:8px">${STATUS_LABELS[c.status]}</span></div>
        <div style="font-size:12px;font-weight:500;color:var(--tx);margin-bottom:2px">${c.grade}</div>
        <div style="font-size:10px;color:var(--tx3)">${(c.kg/1000).toFixed(1)}t · ${c.status==="EXPORTED"?"Exported "+(c.arrived||c.eta):"ETA "+c.eta}</div>
      </div>`).join("")}
    </div>
  </div>`;
}
function renderBsExport(){
  return`<div class="bsc">
    <div class="bsc-title">Print & Export</div>
    <div class="bsc-sub">Generate documents and export data. Select a contract first for contract-specific outputs.</div>
    <div class="bs-export-grid">
      ${[
        {t:"Trace Certificate",s:"Full parent-child chain from container to farm, with volume verification",fn:"toast('Generating trace certificate…')"},
        {t:"Portfolio CSV",s:"All 20 contracts with full commercial and status data",fn:"toast('Exporting portfolio CSV…')"},
        {t:"Cup Report",s:"SCA scores, tasting notes, and breakdown across all graded lots",fn:"toast('Generating cup report…')"},
        {t:"LC Status Report",s:"LC opening, confirmation, and document status for all active contracts",fn:"toast('Generating LC status report…')"},
        {t:"Milestone Report",s:"All upcoming and overdue milestones across the full portfolio",fn:"toast('Generating milestone report…')"},
        {t:"EUDR Packet",s:"GPS coverage, woreda mapping, and chain of custody for EUDR filings",fn:"toast('EUDR packet — Phase 2')"},
        {t:"Print Current View",s:"Print the current portfolio view with active filters applied",fn:"window.print()"},
        {t:"Send to ERP",s:"Push contract and lot data to connected ERP system",fn:"toast('ERP integration — Phase 3')"},
      ].map(e=>`<div class="bs-exp-btn" onclick="${e.fn}"><div class="bs-exp-title">${e.t}</div><div class="bs-exp-sub">${e.s}</div></div>`).join("")}
    </div>
  </div>`;
}
function renderBsAccount(){
  return`<div class="bsc">
    <div class="bsc-title">Account</div>
    <div class="bsc-sub">Your company profile and platform access settings.</div>
    <div class="bs-account-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:var(--amber);color:var(--dark);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">NI</div>
        <div><div class="bs-acct-name">Kaffa Trading PLC</div><div class="bs-acct-uid">ACT-EXP-MAIN</div><div style="font-size:11px;color:var(--tx3);margin-top:2px">Bole Subcity, Addis Ababa · Est. 2019 · Member since Jun 2022</div></div>
      </div>
      <div style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px">KYC Status</div>
      <div class="bs-kyc-bar">
        ${["Identity","Company","Bank","Trade History","Full Verified"].map((l,i)=>`<div class="bs-kyc-step${i<4?" done":i===4?" done":""}">${l}</div>`).join("")}
      </div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--tx);margin:16px 0 8px">Connected Exporters</div>
    <div class="bs-recent">
      ${EXPORTERS.map(e=>`<div class="bs-rec-item"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><div style="width:8px;height:8px;border-radius:50%;background:${e.color}"></div>${muid(e.id)}</div><div style="font-size:12px;font-weight:500;color:var(--tx)">${e.name}</div><div style="font-size:10px;color:var(--tx3)">${CONTAINERS.filter(c=>c.exp===e.id).length} contracts</div></div>`).join("")}
    </div>
  </div>`;
}
function renderBsSettings(){
  const settings=[
    {l:"Email notifications",s:"Receive milestone alerts via email",on:true},
    {l:"SMS notifications",s:"Receive critical alerts via SMS",on:true},
    {l:"In-app notifications",s:"Show notifications within the portal",on:true},
    {l:"Timeline view by default",s:"Open portfolio in timeline view",on:false},
    {l:"Auto-expand trace on open",s:"Expand full trace tree when opening a contract",on:false},
    {l:"Show SCA scores on cards",s:"Display cupping score on contract cards",on:true},
  ];
  return`<div class="bsc">
    <div class="bsc-title">Settings</div>
    <div class="bsc-sub">Preferences for notifications, display, and defaults.</div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:7px;padding:0 16px;margin-bottom:16px">
      ${settings.map(s=>`<div class="bs-setting">
        <div><div class="bs-s-label">${s.l}</div><div class="bs-s-sub">${s.s}</div></div>
        <button class="bs-toggle${s.on?" on":""}" onclick="this.classList.toggle('on')"></button>
      </div>`).join("")}
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--tx);margin-bottom:8px">Display</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${[["Language","English (UK)"],["Currency","USD"],["Date Format","DD MMM YYYY"],["Weight Unit","Metric (kg / mt)"]].map(([k,v])=>`<div style="background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:10px 12px"><div style="font-size:10px;color:var(--tx3);margin-bottom:4px">${k}</div><div style="font-size:12px;font-weight:500;color:var(--tx)">${v}</div></div>`).join("")}
    </div>
  </div>`;
}
function renderBsHelp(){
  return`<div class="bsc">
    <div class="bsc-title">Help</div>
    <div class="bsc-sub">Documentation, keyboard shortcuts, and support.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${[
        {t:"Getting Started",s:"Platform overview and onboarding guide"},
        {t:"Contract Lifecycle",s:"How milestones, LC terms, and notifications work"},
        {t:"Trace & Provenance",s:"Understanding the parent-child UID system"},
        {t:"EUDR Compliance",s:"Using Ankuaru for EU Deforestation Regulation"},
        {t:"Keyboard Shortcuts",s:"Power user shortcuts for navigation"},
        {t:"Contact Support",s:"Reach the Ankuaru support team"},
      ].map(e=>`<div class="bs-exp-btn" onclick="toast('Help: ${e.t}')"><div class="bs-exp-title">${e.t}</div><div class="bs-exp-sub">${e.s}</div></div>`).join("")}
    </div>
    <div style="margin-top:20px;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:6px">
      <div style="font-size:11px;font-weight:600;color:var(--tx);margin-bottom:6px">Keyboard Shortcuts</div>
      ${[["Ctrl/⌘ + K","Search by UID"],["Ctrl/⌘ + N","New contract"],["Escape","Close panel / Backstage"],["T","Toggle timeline / cards"],["→ / ←","Navigate contracts"]].map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border2);font-size:11px"><span style="color:var(--tx3)">${v}</span><span style="font-family:'SF Mono',Menlo,monospace;font-size:10px;color:var(--tx)">${k}</span></div>`).join("")}
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════ WIZARD ═══════
const WIZ_STEPS=["Contract Details","Shipping & Logistics","Payment & LC","Milestones & Alerts","Review & Activate"];
let wizD={};
function openWizard(){
  wizStep=0;wizD={};
  document.getElementById("wizard-ov").classList.add("open");
  renderWizardStep();
}
function closeWizard(){document.getElementById("wizard-ov").classList.remove("open");}
function renderWizardStepsRow(){
  return WIZ_STEPS.map((s,i)=>{
    const done=i<wizStep,curr=i===wizStep;
    return`<div class="wstep${done?" done":curr?" curr":""}">${i>0?`<div class="wstep-line${done?" done":""}"></div>`:""}
      <div class="wstep-dot${done?" done":curr?" curr":""}">${done?"✓":i+1}</div>
      <span style="font-size:9px;white-space:nowrap">${s}</span>
    </div>`;
  }).join("");
}
function renderWizardStep(){
  document.getElementById("wiz-steps-row").innerHTML=renderWizardStepsRow();
  document.getElementById("wiz-step-lbl").textContent=`Step ${wizStep+1} of ${WIZ_STEPS.length}`;
  document.getElementById("wiz-back").style.visibility=wizStep>0?"visible":"hidden";
  document.getElementById("wiz-next").textContent=wizStep===WIZ_STEPS.length-1?"Activate Contract →":"Next →";
  const body=document.getElementById("wiz-body");
  if(wizStep===0)body.innerHTML=renderWizStep0();
  else if(wizStep===1)body.innerHTML=renderWizStep1();
  else if(wizStep===2)body.innerHTML=renderWizStep2();
  else if(wizStep===3)body.innerHTML=renderWizStep3();
  else if(wizStep===4)body.innerHTML=renderWizStep4();
}
function renderWizStep0(){return`
  <div class="wsect">Counterparties & Commodity</div>
  <div class="wfg">
    <div class="wf"><label>Exporter</label><select id="w-exp">
      <option value="">— select registered exporter —</option>
      ${EXPORTERS.map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}
    </select></div>
    <div class="wf"><label>Origin Zone</label><select id="w-zone">
      <option value="">— select zone —</option>
      ${Object.entries(ZONES).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("")}
    </select></div>
    <div class="wf"><label>Grade</label><input id="w-grade" placeholder="e.g. Yirgacheffe G1" value="${wizD.grade||""}"></div>
    <div class="wf"><label>Process</label><select id="w-process">
      <option>Natural</option><option>Washed</option><option>Honey</option>
    </select></div>
    <div class="wf"><label>Quantity (kg)</label><input id="w-kg" type="number" placeholder="17500" value="${wizD.kg||""}"></div>
    <div class="wf"><label>Unit Price (USD/kg)</label><input id="w-price" type="number" placeholder="4.80" value="${wizD.price||""}"></div>
    <div class="wf"><label>Incoterms</label><select id="w-inco">
      <option>Ex Mill (named site)</option><option>Ex Washing Station</option><option>At Exporter Warehouse Addis</option><option>At Modjo Dry Port</option><option>Delivered Addis Ababa</option>
    </select></div>
    <div class="wf"><label>Farms (approx.)</label><input id="w-farms" type="number" placeholder="12" value="${wizD.farms||""}"></div>
  </div>`;}
function renderWizStep1(){return`
  <div class="wsect">Shipping & Logistics</div>
  <div class="wfg">
    <div class="wf"><label>Vessel Name</label><input id="w-vessel" placeholder="e.g. MSC SERENA" value="${wizD.vessel||""}"></div>
    <div class="wf"><label>Container No.</label><input id="w-cno" placeholder="e.g. TCKU3456789" value="${wizD.cno||""}"></div>
    <div class="wf"><label>Bill of Lading No.</label><input id="w-bl" placeholder="e.g. ETH-2024-BL-9999" value="${wizD.bl||""}"></div>
    <div class="wf"><label>Departure Date</label><input id="w-dep" placeholder="e.g. 20 Dec 2024" value="${wizD.dep||""}"></div>
    <div class="wf"><label>Expected Delivery Date</label><input id="w-eta" placeholder="e.g. 14 Jan 2025" value="${wizD.eta||""}"></div>
    <div class="wf"><label>Contract Status</label><select id="w-status">
      <option value="PENDING">Pending Dispatch</option>
      <option value="DISPATCHED">Dispatched</option>
      <option value="EXPORTED">Exported</option>
    </select></div>
  </div>`;}
function renderWizStep2(){return`
  <div class="wsect">Bank Guarantee</div>
  <div class="wfg">
    <div class="wf"><label>Guarantee Number</label><input id="w-gno" placeholder="e.g. GTE-2026-0042" value="${wizD.gno||""}"></div>
    <div class="wf"><label>Payment Terms</label><select id="w-payterms">
      <option>On delivery</option><option>30 days from delivery</option><option>60 days from delivery</option><option>90 days from delivery</option>
    </select></div>
    <div class="wf"><label>Seller Bank (Issuing Guarantee)</label><select id="w-bank">
      <option value="BNK-CBE">Commercial Bank of Ethiopia</option>
      <option value="BNK-AWASH" selected>Awash Bank</option>
      <option value="BNK-DASHEN">Dashen Bank</option>
      <option value="BNK-COOP">Cooperative Bank of Oromia</option>
      <option value="BNK-ZEMEN">Zemen Bank</option>
    </select></div>
    <div class="wf"><label>Buyer Bank (Countersigning)</label><select id="w-buyerbank">
      <option value="BNK-CBE" selected>Commercial Bank of Ethiopia</option>
      <option value="BNK-AWASH">Awash Bank</option>
      <option value="BNK-DASHEN">Dashen Bank</option>
      <option value="BNK-COOP">Cooperative Bank of Oromia</option>
      <option value="BNK-ZEMEN">Zemen Bank</option>
    </select></div>
    <div class="wf"><label>Issued On</label><input id="w-gissued" placeholder="e.g. 10 Apr 2026" value="${wizD.gissued||""}"></div>
    <div class="wf"><label>Guarantee Expiry</label><input id="w-gexpiry" placeholder="e.g. 31 Dec 2026" value="${wizD.gexpiry||"31 Dec 2026"}"></div>
  </div>
  <div class="wsect">Required Documents</div>
  <div class="wfg">
    ${["Delivery Order","Warehouse Receipt","Quality Certificate","Certificate of Origin","ECTA Export Permit","Phytosanitary Certificate","ICO Certificate"].map(d=>`<div style="display:flex;align-items:center;gap:7px;padding:5px 0"><input type="checkbox" id="doc-${d.replace(/ /g,'-')}" checked style="accent-color:var(--amber)"><label style="font-size:11px;color:var(--tx);cursor:pointer" for="doc-${d.replace(/ /g,'-')}">${d}</label></div>`).join("")}
  </div>`;}
function renderWizStep3(){
  const ms=[
    {id:"contract",label:"Contract Signed",cat:"Contract"},
    {id:"gte_issued",label:"Guarantee Issued",cat:"Guarantee"},
    {id:"gte_countersign",label:"Guarantee Countersigned",cat:"Guarantee"},
    {id:"dispatched",label:"Dispatched",cat:"Shipping"},
    {id:"delivered",label:"Delivered",cat:"Shipping"},
    {id:"gte_settled",label:"Guarantee Settled",cat:"Guarantee"},
    {id:"payment",label:"Payment Released",cat:"Payment"},
  ];
  return`
  <div class="wsect">Milestone Notifications</div>
  <p style="font-size:11px;color:var(--tx3);margin-bottom:14px">Choose how you want to be notified for each milestone. In-app notifications are always on.</p>
  <div class="notif-matrix">
    <div class="notif-matrix-head"><span>Milestone</span><span>Email</span><span>SMS</span><span>In-App</span></div>
    ${ms.map(m=>`<div class="nm-row">
      <div><div class="nm-name">${m.label}</div><div class="nm-cat">${m.cat}</div></div>
      <div class="nm-toggle"><button class="ntog-small on" onclick="this.classList.toggle('on')"></button></div>
      <div class="nm-toggle"><button class="ntog-small${["docs","payment"].includes(m.id)?" on":""}" onclick="this.classList.toggle('on')"></button></div>
      <div class="nm-toggle"><button class="ntog-small on" disabled style="opacity:.5;cursor:default"></button></div>
    </div>`).join("")}
  </div>`;}
function renderWizStep4(){
  const grade=document.getElementById("w-grade")?.value||wizD.grade||"(Grade not entered)";
  const kg=parseFloat(document.getElementById("w-kg")?.value||wizD.kg||0);
  const price=parseFloat(document.getElementById("w-price")?.value||wizD.price||0);
  const expId=document.getElementById("w-exp")?.value||wizD.exp||"—";
  const exp=EXPORTERS.find(e=>e.id===expId);
  const eta=document.getElementById("w-eta")?.value||wizD.eta||"—";
  const inco=document.getElementById("w-inco")?.value||wizD.inco||"At Exporter Warehouse Addis";
  return`
  <div class="wsect">Summary</div>
  <div class="wiz-review">
    ${[
      ["Grade",grade],["Process",document.getElementById("w-process")?.value||"Natural"],
      ["Quantity",kg?kg.toLocaleString()+" kg":"—"],["Unit Price",price?"$"+price+"/kg":"—"],
      ["Total Value",kg&&price?"$"+(kg*price).toLocaleString():"—"],["Incoterms",inco],
      ["Exporter",exp?.name||expId],["ETA",eta],
      ["Status","Pending Dispatch"],["Issuing Bank",document.getElementById("w-bank")?.selectedOptions?.[0]?.text||"—"],["Buyer Bank",document.getElementById("w-buyerbank")?.selectedOptions?.[0]?.text||"—"],
    ].map(([k,v])=>`<div class="wiz-review-row"><span class="wiz-rk">${k}</span><span class="wiz-rv">${v}</span></div>`).join("")}
  </div>
  <div style="background:#FBF0DC;border:1px solid rgba(212,130,10,.3);border-radius:6px;padding:12px 14px;margin-top:12px;font-size:11px;color:#7a4a00;line-height:1.6">
    <b>On activation:</b> A new contract UID will be issued. The milestone schedule will be generated from your contract terms. Notifications will be armed for all selected channels. The contract will appear immediately in your portfolio.
  </div>`;}

function wizNext(){
  // Save current step data
  if(wizStep===0){wizD.grade=document.getElementById("w-grade")?.value;wizD.exp=document.getElementById("w-exp")?.value;wizD.kg=document.getElementById("w-kg")?.value;wizD.price=document.getElementById("w-price")?.value;wizD.inco=document.getElementById("w-inco")?.value;wizD.zone=document.getElementById("w-zone")?.value;wizD.farms=document.getElementById("w-farms")?.value;}
  if(wizStep===1){wizD.vessel=document.getElementById("w-vessel")?.value;wizD.cno=document.getElementById("w-cno")?.value;wizD.bl=document.getElementById("w-bl")?.value;wizD.dep=document.getElementById("w-dep")?.value;wizD.eta=document.getElementById("w-eta")?.value;wizD.status=document.getElementById("w-status")?.value;}
  if(wizStep===2){wizD.gno=document.getElementById("w-gno")?.value;wizD.bank=document.getElementById("w-bank")?.value;wizD.bankName=document.getElementById("w-bank")?.selectedOptions?.[0]?.text;wizD.buyerbank=document.getElementById("w-buyerbank")?.value;wizD.gissued=document.getElementById("w-gissued")?.value;wizD.gexpiry=document.getElementById("w-gexpiry")?.value;wizD.payterms=document.getElementById("w-payterms")?.value;}
  if(wizStep===WIZ_STEPS.length-1){activateContract();return;}
  wizStep=Math.min(wizStep+1,WIZ_STEPS.length-1);
  renderWizardStep();
}
function wizBack(){wizStep=Math.max(0,wizStep-1);renderWizardStep();}

function activateContract(){
  const kg=parseFloat(wizD.kg)||17000;
  const price=parseFloat(wizD.price)||4.5;
  const newId="SHIP-NEW-"+Date.now().toString().slice(-4);
  const grade=wizD.grade||"Custom Grade";
  const exp=wizD.exp||"EXP-0041";
  const newContract={
    id:newId,exp,grade,process:wizD.process||"Natural",kg,status:wizD.status||"PENDING",
    vessel:wizD.vessel||"—",bl:wizD.bl||"—",cno:wizD.cno||"—",
    dep:wizD.dep||"—",eta:wizD.eta||"TBD",arrived:null,
    zone:wizD.zone||"ZONE-JM",cup:null,cb:[],farms:parseInt(wizD.farms)||10,
    areas:[],value:Math.round(kg*price),incoterm:wizD.inco||"At Exporter Warehouse Addis",payterms:wizD.payterms||"On delivery",
    guarantee:{no:wizD.gno||null,bank:wizD.bank||"BNK-CBE",bankName:wizD.bankName||"Commercial Bank of Ethiopia",issuedOn:wizD.gissued||null,countersignedOn:null,settledOn:null,expiry:wizD.gexpiry||"31 Dec 2026",terms:"Performance guarantee · 10% of contract value · valid until delivery settlement",state:"DRAFT",amount:Math.round(kg*price),docs:["Delivery Order","Warehouse Receipt","Quality Certificate","Certificate of Origin","ECTA Export Permit"]},
  };
  CONTAINERS.unshift(newContract);
  closeWizard();
  renderView();
  updateStatusBar();
  toast("Contract activated: "+newId);
  setTimeout(()=>openDetail(newId),300);
}

// ═══════════════════════════════════════════════════ UID PANEL ═══
function showUID(uid){
  const meta=getUIDMeta(uid);if(!meta)return;
  document.getElementById("uid-ph-id").innerHTML=`<span class="uid uid-${uidType(uid)}">${uid}</span>`;
  document.getElementById("uid-pb").innerHTML=meta;
  document.getElementById("uid-ov").classList.add("open");
  document.getElementById("uid-pnl").classList.add("open");
  if(uid.startsWith("LIST-")&&LISTINGS[uid]&&LISTINGS[uid].endsAt){const Lt=LISTINGS[uid];if(Lt.type==="ENG"||Lt.type==="SEALED"||Lt.type==="REV")l4StartTimers();}
}
function closeUID(){document.getElementById("uid-ov").classList.remove("open");document.getElementById("uid-pnl").classList.remove("open");}

// ══════════════════════════════════════════════ HRV harvest map ══
const HRV_MAP_SVG12='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>';
let _hrvMap=null;
function parseTraceGeo(geo){
  if(!geo||typeof geo!=="string")return null;
  const m=geo.match(/([\d.]+)°N\s*([\d.]+)°E/);
  if(!m)return null;
  const lat=parseFloat(m[1]),lng=parseFloat(m[2]);
  if(isNaN(lat)||isNaN(lng))return null;
  return{lat,lng};
}
function strSeed(s){
  let h=0;
  for(let i=0;i<s.length;i++)h=((h<<5)-h)+s.charCodeAt(i)|0;
  return Math.abs(h)+1;
}
function randomFarmRing(lat,lng,id,scale){
  const sc=scale==null||isNaN(scale)?1:scale;
  const seed=strSeed(id);
  const nVert=6+(seed%4);
  const base=(45+(seed%80))/100000*sc;
  const ring=[];
  for(let i=0;i<=nVert;i++){
    const ang=(i/nVert)*Math.PI*2+seed*0.017;
    const jit=0.55+((seed+i*997)%50)/100;
    const r=base*jit;
    ring.push([lat+r*Math.cos(ang),lng+r*Math.sin(ang)*1.15]);
  }
  return ring;
}
/** Max distance (°) from (lat,lng) to any vertex — for clearance math. */
function farmRingRadialExtentFromCenter(lat,lng,ring){
  let mx=0;
  ring.forEach(p=>{mx=Math.max(mx,Math.hypot(p[0]-lat,p[1]-lng));});
  return mx;
}
/** Upper bound on vertex extent for a ring id/scale without building the full ring. */
function maxFarmRingExtentDeg(id,scale){
  const sc=scale==null||isNaN(scale)?1:scale;
  const seed=strSeed(String(id));
  const base=(45+(seed%80))/100000*sc;
  const nVert=6+(seed%4);
  let mx=0;
  for(let i=0;i<=nVert;i++){
    const ang=(i/nVert)*Math.PI*2+seed*0.017;
    const jit=0.55+((seed+i*997)%50)/100;
    const r=base*jit;
    const dlat=r*Math.cos(ang);
    const dlng=r*Math.sin(ang)*1.15;
    mx=Math.max(mx,Math.hypot(dlat,dlng));
  }
  return mx;
}
function farmMapEsc(t){
  if(t==null||t==="")return"—";
  return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function farmMapPickKebele(woreda,seed){
  if(!woreda||!woreda.name)return"—";
  if(woreda.kebeles&&woreda.kebeles.length)return woreda.kebeles[Math.abs(seed)%woreda.kebeles.length];
  const k=["Gute","Sanka","Haro Bansa","Chora","Boyo","Chabe","Songo","Doyo Gabaya","Kercha","Buno"];
  return k[Math.abs(seed)%k.length];
}
function farmMapTooltipHTML(o){
  const tag=o.isSubject?'':'<div class="fmt-badge fmt-near">Neighbouring parcel</div>';
  return '<div class="fmt">'+tag+
    '<div class="fmt-sec">Administration</div>'+
    '<div class="fmt-row"><span>Region</span><b>'+farmMapEsc(o.region)+"</b></div>"+
    '<div class="fmt-row"><span>Zone</span><b>'+farmMapEsc(o.zoneName)+"</b></div>"+
    '<div class="fmt-row"><span>Woreda</span><b>'+farmMapEsc(o.woredaName)+" · "+farmMapEsc(o.woredaUid)+"</b></div>"+
    '<div class="fmt-row"><span>Kebele</span><b>'+farmMapEsc(o.kebele)+"</b></div>"+
    '<div class="fmt-sec">Farm & household</div>'+
    '<div class="fmt-row"><span>Owner / operator</span><b>'+farmMapEsc(o.owner)+"</b></div>"+
    (o.farmUid?'<div class="fmt-row"><span>Farm UID</span><b>'+farmMapEsc(o.farmUid)+"</b></div>":"")+
    (o.hrvId?'<div class="fmt-row"><span>Harvest UID</span><b>'+farmMapEsc(o.hrvId)+"</b></div>":"")+
    '<div class="fmt-row"><span>Households (HH)</span><b>'+farmMapEsc(o.hh)+"</b></div>"+
    '<div class="fmt-sec">Plot & crop</div>'+
    '<div class="fmt-row"><span>GPS</span><b>'+farmMapEsc(o.lat)+"°N "+farmMapEsc(o.lng)+"°E</b></div>"+
    '<div class="fmt-row"><span>Plot area</span><b>'+farmMapEsc(o.areaSqm)+" m²</b> <span class=\"fmt-sub\">("+farmMapEsc(o.ha)+" ha)</span></div>"+
    '<div class="fmt-row"><span>Coffee trees (est.)</span><b>'+farmMapEsc(o.trees)+"</b></div>"+
    (o.subtitle?'<div class="fmt-subline">'+farmMapEsc(o.subtitle)+"</div>":"")+
  "</div>";
}
function buildTraceFarmParcelTip(tr,c,ll,farmId,hrvId,isSubject){
  const farm=tr.nodes[farmId];
  const hrv=hrvId?tr.nodes[hrvId]:null;
  const zone=ZONES[c.zone];
  const wId=(farm&&farm.wrdaId)||(hrv&&hrv.wrdaId);
  const wor=zone&&wId?zone.woredas[wId]:null;
  const owner=(farm&&farm.farmer)||(hrv&&hrv.name)||"—";
  const haStr=(farm&&farm.ha)||(hrv&&hrv.ha)||"2.0";
  const haN=parseFloat(haStr)||2;
  const seed=strSeed((farmId||"")+"-"+(hrvId||""));
  const hh=4+(seed%9);
  const trees=(Math.round(haN*1680+seed%700)).toLocaleString();
  const areaSqm=Math.round(haN*10000).toLocaleString();
  const sub=[];
  if(hrv&&hrv.weight)sub.push(hrv.weight.toLocaleString()+" kg cherry");
  if(farm&&farm.variety)sub.push(farm.variety);
  sub.push("Plot record linked to trace (simulated geometry).");
  return farmMapTooltipHTML({
    isSubject:!!isSubject,
    region:zone.region,
    zoneName:zone.name,
    woredaName:wor?wor.name:"—",
    woredaUid:wId||"—",
    kebele:farmMapPickKebele(wor||{},seed+17),
    owner,
    farmUid:farmId||"—",
    hrvId:hrvId||null,
    lat:ll.lat.toFixed(4),
    lng:ll.lng.toFixed(4),
    ha:String(haStr),
    trees:String(trees),
    hh:String(hh),
    areaSqm:String(areaSqm),
    subtitle:sub.join(" · "),
  });
}
function farmMapFocusedSummaryHTML(tr,c,subjectLl,subjectFarmId,hrvId,heading){
  const farm=tr.nodes[subjectFarmId];
  const hrv=hrvId?tr.nodes[hrvId]:null;
  const zone=ZONES[c.zone];
  const wId=(farm&&farm.wrdaId)||(hrv&&hrv.wrdaId);
  const wor=zone&&wId?zone.woredas[wId]:null;
  const owner=(farm&&farm.farmer)||(hrv&&hrv.name)||"—";
  const haStr=(farm&&farm.ha)||(hrv&&hrv.ha)||"—";
  const seed=strSeed((subjectFarmId||"")+"-"+(hrvId||""));
  const keb=farmMapPickKebele(wor||{},seed+17);
  const gps=subjectLl.lat.toFixed(4)+"°N "+subjectLl.lng.toFixed(4)+"°E";
  const rows=[["Farmer / operator",farmMapEsc(owner)],["Farm UID",farmMapEsc(subjectFarmId||"—")]];
  if(hrvId)rows.push(["Harvest lot",farmMapEsc(hrvId)]);
  rows.push(["Plot size",farmMapEsc(String(haStr))+" ha"],["Woreda",farmMapEsc(wor?wor.name:"—")],["Kebele",farmMapEsc(keb)],["GPS",farmMapEsc(gps)]);
  const h=farmMapEsc(heading||"Trace parcel");
  return'<div class="hrv-map-sum"><div class="hrv-map-sum-h">'+h+'</div><dl class="hrv-map-sum-dl">'+rows.map(([k,v])=>"<div><dt>"+farmMapEsc(k)+"</dt><dd>"+v+"</dd></div>").join("")+"</dl></div>";
}
function farmMapSyntheticParcelSummaryHTML(o){
  const rows=[
    ["Farmer / operator",farmMapEsc(o.owner)],
    ["Plot UID",farmMapEsc(o.farmUid||"—")],
    ["Zone",farmMapEsc(o.zoneName||"—")],
    ["Woreda",farmMapEsc(o.woredaName||"—")+" · "+farmMapEsc(o.woredaUid||"—")],
    ["Kebele",farmMapEsc(o.kebele||"—")],
    ["GPS",farmMapEsc(o.lat)+"°N "+farmMapEsc(o.lng)+"°E"],
    ["Plot area",farmMapEsc(o.areaSqm)+" m² ("+farmMapEsc(o.ha)+" ha)"],
    ["Households",farmMapEsc(o.hh)],
    ["Coffee trees (est.)",farmMapEsc(o.trees)],
  ];
  if(o.subtitle)rows.push(["Note",farmMapEsc(o.subtitle)]);
  return'<div class="hrv-map-sum"><div class="hrv-map-sum-h">Demo adjacent plot</div><dl class="hrv-map-sum-dl">'+rows.map(([k,v])=>"<div><dt>"+farmMapEsc(k)+"</dt><dd>"+v+"</dd></div>").join("")+"</dl></div>";
}
function farmMapPolygonCentroid(latlngs){
  let la=0,ln=0,n=latlngs.length;
  if(!n)return null;
  latlngs.forEach(p=>{ la+=p.lat; ln+=p.lng; });
  return L.latLng(la/n,ln/n);
}
function farmMapSubjectLabelIcon(text){
  const t=farmMapEsc(text||"Subject farm");
  return L.divIcon({
    className:"hrv-subject-farm-lbl-wrap",
    html:'<span class="hrv-subject-farm-lbl">'+t+"</span>",
    iconSize:[120,22],
    iconAnchor:[60,22],
  });
}
function hrvMapAddStandardControls(map,legendHtml,opts){
  const o=opts&&typeof opts==="object"?opts:{};
  const osm=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:22,
    maxNativeZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });
  const topo=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{
    maxZoom:22,
    maxNativeZoom:17,
    attribution:'&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>), &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
  });
  const sat=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{
    maxZoom:22,
    maxNativeZoom:19,
    attribution:"Tiles &copy; Esri &mdash; Earthstar Geographics",
  });
  const def=o.defaultLayer||(o.defaultSatellite?"satellite":"osm");
  if(def==="topo"||def==="terrain")topo.addTo(map);
  else if(def==="satellite"||def==="sat")sat.addTo(map);
  else osm.addTo(map);
  L.control.layers({"Street (map)":osm,"Terrain (contours)":topo,"Satellite":sat},{},{collapsed:true,position:"topleft"}).addTo(map);
  L.control.scale({metric:true,imperial:false,maxWidth:150}).addTo(map);
  const Leg=L.Control.extend({
    options:{position:"bottomright"},
    onAdd:function(){
      const d=L.DomUtil.create("div","hrv-map-legend");
      d.innerHTML=legendHtml;
      return d;
    },
  });
  (new Leg()).addTo(map);
}
function demoPlotRing(cx,cy,plotSeed,baseR){
  const nv=5+(plotSeed%4);
  const ring=[];
  for(let i=0;i<=nv;i++){
    const ang=(i/nv)*Math.PI*2+(plotSeed%360)*0.0089;
    const jit=0.62+((plotSeed+i*883)%45)/100;
    const r=baseR*jit;
    ring.push([cx+r*Math.cos(ang),cy+r*Math.sin(ang)*1.07]);
  }
  return ring;
}
/** Slightly jittered axis-aligned parcel (common cadastre / GPS walk style). cx=lat, cy=lng */
function surveyParcelRing(cx,cy,seed,hLat,wLng){
  const j=n=>(((seed+n)*131)%11-5)/9200;
  const hl=Math.max(1e-9,hLat*(1+j(0)));
  const wl=Math.max(1e-9,wLng*(1+j(1)));
  const ring=[
    [cx-hl,cy-wl],[cx-hl,cy+wl],[cx+hl,cy+wl],[cx+hl,cy-wl],
  ];
  for(let t=0;t<4;t++){
    ring[t]=[ring[t][0]+j(2+t)*hl*0.035,ring[t][1]+j(6+t)*wl*0.035];
  }
  ring.push([ring[0][0],ring[0][1]]);
  return ring;
}
function surveyParcelHalfAxes(basePlotR,mul){
  const hLat=basePlotR*mul*1.02;
  const wLng=basePlotR*mul*1.16;
  return{hLat,wLng};
}
function surveyRadialExtent(hLat,wLng){
  return Math.hypot(hLat,wLng);
}
function cumRoadAxis(idx,step,gap,period){
  let acc=0;
  for(let i=0;i<idx;i++)acc+=step+((i+1)%period===0?gap:0);
  return acc;
}
function farmPlotSizeMulFromHa(haStr,seed){
  const ha=parseFloat(haStr);
  if(isNaN(ha)||ha<=0)return 0.78+((seed%40)/100);
  const t=Math.max(0.25,Math.min(6,ha));
  const lo=Math.log(0.25),hi=Math.log(6);
  const norm=(Math.log(t)-lo)/(hi-lo);
  const mul=0.72+norm*0.38+((seed>>2)%25)/200;
  return Math.max(0.62,Math.min(1.22,mul));
}
function demoNeighbourPlotSizeMul(subjectKey,r,c){
  const s=strSeed(subjectKey+";cell"+r+","+c);
  const u=(s%1000)/1000;
  if(u<0.4)return 0.46+((s>>3)%44)/100;
  if(u<0.72)return 0.82+((s>>5)%30)/100;
  if(u<0.9)return 1.02+((s>>7)%24)/100;
  return 1.24+((s>>9)%20)/100;
}
function shuffleRectSizes(seed){
  const s=[[4,2],[3,2],[3,3],[2,3],[2,2],[3,1],[1,3],[2,1],[1,2],[1,1]];
  for(let i=s.length-1;i>0;i--){
    const j=strSeed(seed+"|sz"+i)%(i+1);
    const t=s[i];s[i]=s[j];s[j]=t;
  }
  return s;
}
/** Merged rectangular parcels on an atom grid + roads; ~300 neighbours; trace = one atom (same inset as demos, no overlap). */
function genMergedPlotFieldNeighbours(cLat,cLng,subjectKey,zone,woreda,wId,gridOpts){
  const TARGET=300;
  const reserveSubject=!(gridOpts&&gridOpts.reserveSubject===false);
  const basePlotR=gridOpts&&gridOpts.basePlotR!=null?gridOpts.basePlotR:0.000073;
  const NR=44;
  const NC=52;
  const SR=1;
  const SC=1;
  const subR0=20;
  const subC0=24;
  const ROWS_PERIOD=5;
  const COLS_PERIOD=6;
  const kiss=1.000002;
  const hAtom=basePlotR*0.5;
  const wAtom=basePlotR*0.56;
  const stepLat=2*hAtom*kiss;
  const stepLng=2*wAtom*kiss;
  const roadGapLat=Math.max(stepLat*0.2,9e-8);
  const roadGapLng=Math.max(stepLng*0.2,9e-8);
  function roadAtom(r,c){
    return((r+1)%ROWS_PERIOD===0)||((c+1)%COLS_PERIOD===0);
  }
  const used=[];
  for(let r=0;r<NR;r++){
    used[r]=[];
    for(let c=0;c<NC;c++)used[r][c]=0;
  }
  if(reserveSubject){
    for(let r=subR0;r<subR0+SR;r++)for(let c=subC0;c<subC0+SC;c++)used[r][c]=1;
  }
  function atomLat(r){
    return cumRoadAxis(r,stepLat,roadGapLat,ROWS_PERIOD)-cumRoadAxis(subR0,stepLat,roadGapLat,ROWS_PERIOD);
  }
  function atomLng(c){
    return cumRoadAxis(c,stepLng,roadGapLng,COLS_PERIOD)-cumRoadAxis(subC0,stepLng,roadGapLng,COLS_PERIOD);
  }
  function rectBoundsRaw(r0,c0,r1,c1){
    let n=1e9,s=-1e9,w=1e9,e=-1e9;
    for(let r=r0;r<=r1;r++)for(let c=c0;c<=c1;c++){
      const la=atomLat(r),ln=atomLng(c);
      n=Math.min(n,la-hAtom);s=Math.max(s,la+hAtom);
      w=Math.min(w,ln-wAtom);e=Math.max(e,ln+wAtom);
    }
    return{cx:(n+s)/2,cy:(w+e)/2,h:(s-n)/2,w:(e-w)/2};
  }
  const subB=rectBoundsRaw(subR0,subC0,subR0+SR-1,subC0+SC-1);
  const dLat=cLat-subB.cx;
  const dLng=cLng-subB.cy;
  function finLat(r){return atomLat(r)+dLat;}
  function finLng(c){return atomLng(c)+dLng;}
  function finRectBounds(r0,c0,r1,c1){
    let n=1e9,s=-1e9,w=1e9,e=-1e9;
    for(let r=r0;r<=r1;r++)for(let c=c0;c<=c1;c++){
      const la=finLat(r),ln=finLng(c);
      n=Math.min(n,la-hAtom);s=Math.max(s,la+hAtom);
      w=Math.min(w,ln-wAtom);e=Math.max(e,ln+wAtom);
    }
    return{cx:(n+s)/2,cy:(w+e)/2,h:(s-n)/2,w:(e-w)/2};
  }
  const sizes=shuffleRectSizes(subjectKey+"|mrg");
  const parcels=[];
  function canPlace(r0,c0,rh,cw){
    if(r0<0||c0<0||r0+rh>NR||c0+cw>NC)return false;
    for(let r=r0;r<r0+rh;r++)for(let c=c0;c<c0+cw;c++){
      if(used[r][c]!==0)return false;
      if(roadAtom(r,c))return false;
    }
    return true;
  }
  function mark(r0,c0,rh,cw,v){
    for(let r=r0;r<r0+rh;r++)for(let c=c0;c<c0+cw;c++)used[r][c]=v;
  }
  for(let r=0;r<NR;r++){
    for(let c=0;c<NC;c++){
      if(used[r][c]!==0||roadAtom(r,c))continue;
      let placed=false;
      for(let si=0;si<sizes.length&&!placed;si++){
        const [rh,cw]=sizes[si];
        if(canPlace(r,c,rh,cw)){
          mark(r,c,rh,cw,2);
          parcels.push({r0:r,c0:c,r1:r+rh-1,c1:c+cw-1});
          placed=true;
        }
      }
      if(!placed){
        mark(r,c,1,1,2);
        parcels.push({r0:r,c0:c,r1:r,c1:c});
      }
    }
  }
  const focusR=subR0+(SR-1)/2;
  const focusC=subC0+(SC-1)/2;
  const out=[];
  let k=0;
  for(let pi=0;pi<parcels.length&&k<TARGET;pi++){
    const{r0,c0,r1,c1}=parcels[pi];
    const area=(r1-r0+1)*(c1-c0+1);
    const seed=strSeed(subjectKey+"|p"+r0+","+c0+","+r1+","+c1);
    const mul=demoNeighbourPlotSizeMul(subjectKey,r0,c0)*(0.88+Math.min(area,9)*0.04);
    const b=finRectBounds(r0,c0,r1,c1);
    const ring=surveyParcelRing(b.cx,b.cy,seed+pi,b.h*0.995,b.w*0.995);
    const haN=Math.max(0.12,Math.min(4.5,0.14+mul*0.22*Math.sqrt(area)+((seed%17)-8)/180));
    const ha=haN.toFixed(2);
    const haNv=parseFloat(ha);
    const owner=FARMER_NAMES[(seed+k*5)%FARMER_NAMES.length];
    const hh=2+((seed+k*7)%11);
    const trees=(Math.round(haNv*1480+seed%480)).toLocaleString();
    const areaSqm=Math.round(haNv*10000).toLocaleString();
    const sid="SIM-PLOT-"+(21000+k);
    const meta={
      isSubject:false,
      region:zone.region,
      zoneName:zone.name,
      woredaName:woreda.name||"—",
      woredaUid:wId||"—",
      kebele:farmMapPickKebele(woreda,seed+k*3),
      owner,
      farmUid:sid,
      hrvId:null,
      lat:b.cx.toFixed(4),
      lng:b.cy.toFixed(4),
      ha,
      trees:String(trees),
      hh:String(hh),
      areaSqm:String(areaSqm),
      subtitle:"Merged field parcel · access lanes between blocks (demo, not survey).",
    };
    out.push({ring,meta,gr:Math.floor((r0+r1)/2),gc:Math.floor((c0+c1)/2)});
    k++;
  }
  if(reserveSubject){
    const subSeed=gridOpts&&gridOpts.subjectSeed!=null?gridOpts.subjectSeed:strSeed(subjectKey+"|trace");
    const sb=finRectBounds(subR0,subC0,subR0+SR-1,subC0+SC-1);
    const subInset=0.995;
    const subRing=surveyParcelRing(sb.cx,sb.cy,subSeed,sb.h*subInset,sb.w*subInset);
    const subExtent=farmRingRadialExtentFromCenter(sb.cx,sb.cy,subRing);
    return{parcels:out,focusR,focusC,subRing,subExtent};
  }
  let minLa=1e9,maxLa=-1e9,minLn=1e9,maxLn=-1e9;
  out.forEach(p=>{
    p.ring.forEach(ll=>{
      const la=ll[0],ln=ll[1];
      if(typeof la==="number"&&typeof ln==="number"){
        minLa=Math.min(minLa,la);maxLa=Math.max(maxLa,la);
        minLn=Math.min(minLn,ln);maxLn=Math.max(maxLn,ln);
      }
    });
  });
  const span=Math.max(maxLa-minLa,maxLn-minLn,1e-7);
  return{parcels:out,focusR,focusC,subRing:null,subExtent:Math.max(span*0.08,0.000015)};
}
function farmMapRedIcon(){
  return L.divIcon({
    className:"farm-map-pin-wrap",
    html:'<div class="farm-map-pin"></div>',
    iconSize:[30,38],
    iconAnchor:[15,34],
  });
}
function findContainerIdByScanningTraces(pred){
  for(let i=0;i<CONTAINERS.length;i++){
    const cc=CONTAINERS[i];
    if(!TRACE_OK.includes(cc.status))continue;
    const t=genTrace(cc.id);
    for(const k in t.nodes){
      if(pred(t.nodes[k],k))return cc.id;
    }
  }
  return null;
}
function resolveContainerIdFromUid(uid){
  if(!uid)return null;
  if(uid.startsWith("SHIP-"))return uid;
  if(uid.startsWith("LOT-HRV-")){
    for(const k in traceCache){
      const tr=traceCache[k];
      if(tr&&tr.nodes&&tr.nodes[uid])return k;
    }
    return findContainerIdByScanningTraces((n,id)=>id===uid);
  }
  if(uid.startsWith("FARM-")){
    for(const k in traceCache){
      const tr=traceCache[k];
      if(!tr||!tr.nodes)continue;
      const nodes=tr.nodes;
      for(const n in nodes){
        if(nodes[n].type==="HRV"&&nodes[n].actor===uid)return k;
      }
    }
    return findContainerIdByScanningTraces((n)=>n.type==="HRV"&&n.actor===uid);
  }
  return null;
}
function closeHrvMapModal(){
  const ov=document.getElementById("hrv-map-ov");
  const host=document.getElementById("hrv-map-host");
  const sum=document.getElementById("hrv-map-summary");
  if(ov){ov.classList.remove("open");ov.setAttribute("aria-hidden","true");}
  if(_hrvMap){try{_hrvMap.remove();}catch(e){}_hrvMap=null;}
  if(host)host.innerHTML="";
  if(sum){sum.innerHTML="";sum.setAttribute("hidden","");sum.classList.remove("hrv-map-summary--float","hrv-map-summary--collapsed");}
}
function openToolbarFieldMap(){
  if(!activeCont){toast("Open a shipment from the list first (cards or timeline)");return;}
  const cc=CONTAINERS.find(x=>x.id===activeCont);
  if(!cc){toast("Shipment not found");return;}
  if(!TRACE_OK.includes(cc.status)){toast("Harvest map unlocks after dispatch");return;}
  openHrvMapModal(activeCont,null,null,{exploreMergedField:true});
}
function openHrvMapModal(containerId, focusHrvId, focusFarmUid, mapOpts){
  if(typeof L==="undefined"){toast("Map library not loaded");return;}
  const c=CONTAINERS.find(x=>x.id===containerId);
  if(!c){toast("Shipment not found");return;}
  if(!TRACE_OK.includes(c.status)){toast("Harvest map unlocks after dispatch");return;}
  const _mapOpts=mapOpts&&typeof mapOpts==="object"?mapOpts:{};
  const exploreMerged=!!_mapOpts.exploreMergedField&&!focusHrvId&&!focusFarmUid;
  const tr=genTrace(c);
  const pts=[];
  Object.keys(tr.nodes).forEach(k=>{
    const node=tr.nodes[k];
    if(!node||node.type!=="HRV")return;
    const ll=parseTraceGeo(node.geo);
    if(!ll)return;
    pts.push({id:k,node,ll});
  });
  let show=pts.slice();
  if(!exploreMerged){
    if(focusHrvId)show=pts.filter(p=>p.id===focusHrvId);
    else if(focusFarmUid)show=pts.filter(p=>p.node.actor===focusFarmUid);
  }
  if((focusHrvId||focusFarmUid)&&!show.length){toast("Harvest location not found in trace");return;}
  const ov=document.getElementById("hrv-map-ov");
  const host=document.getElementById("hrv-map-host");
  const sub=document.getElementById("hrv-map-sub");
  const exp=EXPORTERS.find(e=>e.id===c.exp);
  const zone=ZONES[c.zone];
  const ttOpts={sticky:true,direction:"auto",opacity:1,className:"farm-map-tt"};
  if(focusHrvId){
    document.getElementById("hrv-map-title").textContent=focusHrvId+" · farm neighbourhood";
    sub.textContent="Default terrain · Street / satellite in layer menu · merged parcels + roads · trace + ~300 demos · Bottom-left target icon centers the selection · "+(c.grade||"")+(exp?" · "+exp.short:"");
  }else if(focusFarmUid){
    document.getElementById("hrv-map-title").textContent=focusFarmUid+" · farm neighbourhood";
    sub.textContent="Default terrain · Street / satellite in layer menu · merged parcels + roads · trace + ~300 demos · Bottom-left target icon centers the selection · "+(c.grade||"");
  }else if(exploreMerged){
    document.getElementById("hrv-map-title").textContent="Field map · "+c.id;
    sub.textContent="Merged ~300 demo parcels (terrain default) · click any polygon to select · no trace subject · target icon recenters selection or full field · "+(show.length?show.length+" harvest anchor(s) · ":"")+(c.grade||"")+(exp?" · "+exp.short:"");
  }else{
    document.getElementById("hrv-map-title").textContent="All harvest batches · "+c.id;
    sub.textContent=show.length?`Hover parcels for woreda / household / plot data · ${show.length} batch(es) — ${c.grade||""} · ${exp?exp.short:"—"}`:"No harvest GPS in trace.";
  }
  ov.classList.add("open");
  ov.setAttribute("aria-hidden","false");
  host.innerHTML="";
  if(_hrvMap){try{_hrvMap.remove();}catch(e){}_hrvMap=null;}
  const sumPanel=document.getElementById("hrv-map-summary");
  if(sumPanel){sumPanel.innerHTML="";sumPanel.setAttribute("hidden","");sumPanel.classList.remove("hrv-map-summary--float","hrv-map-summary--collapsed");}
  if(!show.length){
    host.innerHTML='<div class="hrv-map-empty">No harvest batches with map coordinates for this shipment.</div>';
    return;
  }
  setTimeout(()=>{
    _hrvMap=L.map(host,{scrollWheelZoom:true,minZoom:3,maxZoom:22});
    const lg=L.layerGroup().addTo(_hrvMap);
    const focusedNeighbourhood=!!(focusHrvId||focusFarmUid);
    const useMergedGrid=focusedNeighbourhood||exploreMerged;
    if(useMergedGrid){
      const polyGrey={color:"#78716c",weight:3,fillColor:"#a8a29e",fillOpacity:0.22,opacity:0.92};
      const polyRed={color:"#b91c1c",weight:5,fillColor:"#fecaca",fillOpacity:0.4,opacity:1};
      const primary=show[0];
      let subjectLl, subjectFarmId, wId, woreda, hrvForTip, subKey;
      if(focusedNeighbourhood){
        subjectLl={...primary.ll};
        subjectFarmId=primary.node.actor;
        if(focusFarmUid&&tr.nodes[focusFarmUid]){
          const g=parseTraceGeo(tr.nodes[focusFarmUid].gps);
          if(g){subjectLl=g;subjectFarmId=focusFarmUid;}
        }
        const farmNode=tr.nodes[subjectFarmId];
        wId=(farmNode&&farmNode.wrdaId)||primary.node.wrdaId;
        woreda=(zone&&wId&&zone.woredas[wId])||{name:"—"};
        hrvForTip=focusHrvId||(show[0]&&show[0].id)||null;
        subKey=focusHrvId||subjectFarmId||"sub";
      }else{
        let slat=0,slng=0,n=0;
        show.forEach(p=>{slat+=p.ll.lat;slng+=p.ll.lng;n++;});
        subjectLl={lat:slat/n,lng:slng/n};
        subjectFarmId=primary.node.actor;
        const farmNode2=tr.nodes[subjectFarmId];
        wId=(farmNode2&&farmNode2.wrdaId)||primary.node.wrdaId;
        woreda=(zone&&wId&&zone.woredas[wId])||{name:"—"};
        hrvForTip=null;
        subKey=c.id+"|fldExplore";
      }
      const basePlotR=0.000073;
      const subjectSeed=strSeed(String(subKey)+"|trace");
      const farmLay=genMergedPlotFieldNeighbours(subjectLl.lat,subjectLl.lng,String(focusedNeighbourhood?(focusHrvId||focusFarmUid||subjectFarmId):subKey),zone,woreda,wId,{basePlotR,subjectSeed,reserveSubject: focusedNeighbourhood});
      const nearby=farmLay.parcels;
      const subRing=farmLay.subRing;
      const subExtent=farmLay.subExtent;
      const parcelLayers=[];
      nearby.forEach(n=>{
        const pl=L.polygon(n.ring,{...polyGrey,className:"hrv-parcel-poly",interactive:true}).addTo(lg);
        pl._hrvParcel={kind:"synthetic",meta:n.meta};
        parcelLayers.push(pl);
      });
      let tracePoly=null;
      if(focusedNeighbourhood&&subRing){
        tracePoly=L.polygon(subRing,{...polyRed,className:"hrv-parcel-poly",interactive:true}).addTo(lg);
        tracePoly._hrvParcel={kind:"trace",tr,c,subjectLl:{...subjectLl},subjectFarmId,hrvId:hrvForTip};
        parcelLayers.push(tracePoly);
      }
      let selectedParcelLayer=tracePoly||null;
      let pin=null, labelMk=null;
      if(focusedNeighbourhood){
        pin=L.marker([subjectLl.lat,subjectLl.lng],{icon:farmMapRedIcon(),zIndexOffset:500,interactive:false}).addTo(lg);
        const dLat0=Math.max(subExtent*1.15,0.000018);
        labelMk=L.marker([subjectLl.lat+dLat0,subjectLl.lng],{
          icon:farmMapSubjectLabelIcon("Trace parcel"),
          interactive:false,
          zIndexOffset:460,
        }).addTo(lg);
      }
      const dLat=Math.max(subExtent*1.15,0.000018);
      function wrapSummaryBody(inner){
        return'<button type="button" class="hrv-sum-toggle" aria-expanded="true" title="Show or hide plot details">Plot details</button><div class="hrv-sum-body">'+inner+"</div>";
      }
      function setSummaryHtml(inner){
        if(!sumPanel)return;
        sumPanel.classList.remove("hrv-map-summary--collapsed");
        sumPanel.innerHTML=wrapSummaryBody(inner);
        const tb=sumPanel.querySelector(".hrv-sum-toggle");
        if(tb)tb.setAttribute("aria-expanded","true");
      }
      if(sumPanel&&!sumPanel._hrvSumToggleBound){
        sumPanel._hrvSumToggleBound=true;
        sumPanel.addEventListener("click",ev=>{
          const t=ev.target.closest(".hrv-sum-toggle");
          if(!t||!sumPanel.contains(t))return;
          ev.preventDefault();
          const collapsed=sumPanel.classList.toggle("hrv-map-summary--collapsed");
          t.setAttribute("aria-expanded",collapsed?"false":"true");
        });
      }
      function selectParcelLayer(layer){
        selectedParcelLayer=layer;
        parcelLayers.forEach(pl=>pl.setStyle(pl===layer?polyRed:polyGrey));
        const p=layer._hrvParcel;
        if(!p||!sumPanel)return;
        if(exploreMerged){
          sumPanel.classList.add("hrv-map-summary--float");
          sumPanel.removeAttribute("hidden");
        }
        if(p.kind==="trace"){
          setSummaryHtml(farmMapFocusedSummaryHTML(p.tr,p.c,p.subjectLl,p.subjectFarmId,p.hrvId,"Trace parcel"));
          if(pin&&labelMk){
            pin.setLatLng([p.subjectLl.lat,p.subjectLl.lng]);
            labelMk.setIcon(farmMapSubjectLabelIcon("Trace parcel"));
            labelMk.setLatLng(L.latLng(p.subjectLl.lat+dLat,p.subjectLl.lng));
          }
        }else{
          setSummaryHtml(farmMapSyntheticParcelSummaryHTML(p.meta));
          const ring=layer.getLatLngs()[0];
          const cen=farmMapPolygonCentroid(ring);
          if(cen){
            if(!pin){
              const su0=(p.meta.farmUid||"").replace(/^SIM-PLOT-/,"#");
              pin=L.marker([cen.lat,cen.lng],{icon:farmMapRedIcon(),zIndexOffset:500,interactive:false}).addTo(lg);
              labelMk=L.marker([cen.lat+dLat*0.35,cen.lng],{
                icon:farmMapSubjectLabelIcon(su0||"Demo plot"),
                interactive:false,
                zIndexOffset:460,
              }).addTo(lg);
            }else{
              pin.setLatLng(cen);
              const shortUid=(p.meta.farmUid||"").replace(/^SIM-PLOT-/,"#");
              labelMk.setIcon(farmMapSubjectLabelIcon(shortUid||"Demo plot"));
              labelMk.setLatLng(L.latLng(cen.lat+dLat*0.35,cen.lng));
            }
          }
        }
        layer.bringToFront();
      }
      parcelLayers.forEach(pl=>{
        pl.on("click",ev=>{
          L.DomEvent.stopPropagation(ev);
          selectParcelLayer(pl);
        });
      });
      if(tracePoly)tracePoly.bringToFront();
      if(sumPanel&&focusedNeighbourhood){
        sumPanel.classList.add("hrv-map-summary--float");
        sumPanel.classList.remove("hrv-map-summary--collapsed");
        setSummaryHtml(farmMapFocusedSummaryHTML(tr,c,subjectLl,subjectFarmId,hrvForTip,"Trace parcel"));
        sumPanel.removeAttribute("hidden");
      }
      const bInit=L.latLngBounds([]);
      if(subRing)subRing.forEach(ll=>bInit.extend(ll));
      else nearby.forEach(n=>n.ring.forEach(ll=>bInit.extend(ll)));
      if(focusedNeighbourhood)bInit.extend([subjectLl.lat,subjectLl.lng]);
      if(focusedNeighbourhood){
        _hrvMap.fitBounds(bInit.pad(0.004),{maxZoom:22,paddingTopLeft:[8,8],paddingBottomRight:[100,36]});
      }else{
        _hrvMap.fitBounds(bInit.pad(0.16),{maxZoom:16,paddingTopLeft:[12,12],paddingBottomRight:[108,52]});
      }
      const HrvCenterCtrl=L.Control.extend({
        options:{position:"bottomleft"},
        onAdd:function(map){
          const w=L.DomUtil.create("div","leaflet-bar leaflet-control hrv-map-center-ctl");
          const a=L.DomUtil.create("a","hrv-map-center-btn",w);
          a.href="#";
          a.title=exploreMerged
            ?"Center the map on the selected parcel, or on the full demo field if none is selected"
            :"Center the map on the currently selected parcel (trace or demo plot)";
          a.setAttribute("role","button");
          a.setAttribute("aria-label","Center map on selection or field");
          a.innerHTML='<svg class="hrv-map-center-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="3.25" fill="none" stroke="currentColor" stroke-width="2.25"/><path fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" d="M12 4.5V8M12 16v3.5M4.5 12H8M16 12h3.5"/></svg>';
          L.DomEvent.on(a,"click",L.DomEvent.stopPropagation).on(a,"click",L.DomEvent.preventDefault).on(a,"click",()=>{
            const lay=selectedParcelLayer;
            if(lay&&typeof lay.getBounds==="function"){
              const bb=lay.getBounds();
              if(bb&&bb.isValid()){
                map.fitBounds(bb.pad(0.06),{maxZoom:22,paddingTopLeft:[14,52],paddingBottomRight:[124,52]});
                return;
              }
            }
            if(exploreMerged){
              const bb=L.latLngBounds([]);
              parcelLayers.forEach(pl=>{
                if(typeof pl.getBounds!=="function")return;
                const b=pl.getBounds();
                if(b&&b.isValid()){
                  bb.extend(b.getSouthWest());
                  bb.extend(b.getNorthEast());
                }
              });
              if(bb.isValid())map.fitBounds(bb.pad(0.12),{maxZoom:16,paddingTopLeft:[14,52],paddingBottomRight:[124,52]});
            }
          });
          L.DomEvent.disableClickPropagation(w);
          return w;
        },
      });
      const legHtml=exploreMerged
        ?'<div class="hrv-leg-row"><span class="hrv-leg-swatch hrv-leg-subj"></span> Selected parcel</div><div class="hrv-leg-row"><span class="hrv-leg-swatch hrv-leg-nei"></span> Demo plots (~300) · tap to explore</div>'
        :'<div class="hrv-leg-row"><span class="hrv-leg-swatch hrv-leg-subj"></span> Selected parcel</div><div class="hrv-leg-row"><span class="hrv-leg-swatch hrv-leg-nei"></span> Other plots (~300 demo)</div>';
      hrvMapAddStandardControls(_hrvMap,legHtml,{defaultLayer:"topo"});
      (new HrvCenterCtrl()).addTo(_hrvMap);
    }else{
      const rings=[];
      show.forEach(p=>{
        const ring=randomFarmRing(p.ll.lat,p.ll.lng,p.id);
        rings.push(ring);
        const tip=buildTraceFarmParcelTip(tr,c,p.ll,p.node.actor,p.id,false);
        L.polygon(ring,{color:"#15803d",weight:2,fillColor:"#22c55e",fillOpacity:0.22,opacity:0.95})
          .bindTooltip(tip,ttOpts).addTo(lg);
        L.circleMarker(p.ll,{radius:6,color:"#14532d",weight:2,fillColor:"#4ade80",fillOpacity:1})
          .bindTooltip(tip,{...ttOpts,sticky:false}).addTo(lg);
      });
      const b=L.latLngBounds([]);
      rings.forEach(r=>{r.forEach(ll=>b.extend(ll));});
      show.forEach(p=>b.extend([p.ll.lat,p.ll.lng]));
      _hrvMap.fitBounds(b,{padding:[28,28],maxZoom:15});
      hrvMapAddStandardControls(_hrvMap,'<div class="hrv-leg-row"><span class="hrv-leg-swatch hrv-leg-batch"></span> Harvest parcel</div><div class="hrv-leg-row"><span class="hrv-leg-dot"></span> Batch anchor</div>');
    }
    _hrvMap.invalidateSize(true);
  },60);
}

// ═══════════════════════════════════════════════════ LAB REGISTRY (Layer 3) ══
const LAB_REGISTRY={
  "LAB-CLU-001":{name:"ECTA Coffee Liquoring Unit",city:"Addis Ababa",accred:["ECTA","CLU","Q-Grader"],since:"Apr 2018",samples:1247},
  "LAB-MOY-007":{name:"Moyee Q-Lab",city:"Addis Ababa",accred:["SCA","Q-Grader"],since:"Sep 2020",samples:486},
  "LAB-HMB-014":{name:"Hambela Cup Lab",city:"Yirgacheffe",accred:["SCA","CLU"],since:"Jan 2022",samples:312},
};
const LAB_IDS=Object.keys(LAB_REGISTRY);
function labForSample(smpId){const h=smpId.split("").reduce((a,c)=>a+c.charCodeAt(0),0);return LAB_IDS[h%LAB_IDS.length];}
function gradeBand(s){if(s>=90)return["Outstanding","#5a8a3a"];if(s>=85)return["Excellent","#7a8a3a"];if(s>=80)return["Specialty","#A87832"];if(s>=70)return["Commercial","#9a6a3a"];return["Below Spec","#9a3a3a"];}
function renderSampleResult(uid,n,c){
  const score=c?c.cup:82;const cb=c?c.cb:[8,8,8,8,8,8,8];
  const lab=labForSample(uid);const labInfo=LAB_REGISTRY[lab];
  const [band,col]=gradeBand(score);
  const attrs=["Fragrance","Flavor","Aftertaste","Acidity","Body","Balance","Uniformity"];
  const breakdown=attrs.map((k,i)=>`<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:11px;border-bottom:1px solid #f0e8d8"><span style="color:var(--tx2)">${k}</span><span style="font-weight:600;color:var(--tx)">${(cb[i]||8).toFixed(2)}</span></div>`).join("");
  return`<div class="mty">${TYPE_LABEL.SMPL} · 340g sealed</div>
    <div class="mti">${n.name}</div>
    <div style="background:${col};color:#fff;padding:10px 12px;border-radius:4px;margin:8px 0;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:9px;letter-spacing:.1em;opacity:.85">SCA CUP SCORE</div><div style="font-size:22px;font-weight:700;line-height:1.1">${score.toFixed(2)}</div></div><div style="text-align:right;font-size:11px;font-weight:600">${band}</div></div>
    ${mgr([["Sample UID",uid],["Lab UID",lab],["Lab",labInfo.name],["Seal",n.seal||"—"],["Seal Status","✓ Intact at lab"],["Submitted","Nov 2024"],["Result Status","Append-only"],["Challenge Window","7 days (closed)"]])}
    <div class="ms2">SCA Cupping Breakdown</div>
    <div style="background:#fff;border:1px solid #e5dccc;border-radius:4px;padding:8px 12px;margin-top:6px">${breakdown}</div>
    ${mrel("Parent Lot",n.parentId?[muid(n.parentId)]:[])}
    ${mrel("Lab",[muid(lab)])}
    <div style="margin-top:10px;padding:8px 10px;background:rgba(58,122,138,.08);border-left:2px solid #3a7a8a;font-size:11px;color:var(--tx2);border-radius:3px">Black-box assignment · Lab saw only sample UID, not parent or owner.</div>`;
}
function renderLabPanel(labId){
  const l=LAB_REGISTRY[labId];if(!l)return null;
  return`<div class="mty">Accredited Lab</div><div class="mti">${l.name}</div>
    ${mgr([["Lab UID",labId],["City",l.city],["Country","Ethiopia"],["Accreditation",l.accred.join(" · ")],["Active Since",l.since],["Samples Processed",l.samples.toLocaleString()],["Round-Robin","Enabled"]])}
    <div style="margin-top:10px;padding:8px 10px;background:rgba(58,122,138,.08);border-left:2px solid #3a7a8a;font-size:11px;color:var(--tx2);border-radius:3px">Black-box lab · Q-grader certified · annual calibration.</div>`;
}
// Quality history for an actor: scan trace caches for samples whose parent green-lot's actor matches
function actorQualityHistory(actorId){
  const a=ACTOR_REGISTRY[actorId];if(!a)return[];
  const out=[];const aname=a.name.toLowerCase();
  for(const cId in traceCache){
    const tr=traceCache[cId];const c=CONTAINERS.find(x=>x.id===cId);if(!c)continue;
    Object.values(tr.nodes).forEach(n=>{
      if(n.type==="SMPL"){const parent=tr.nodes[n.parentId];if(parent&&parent.actor&&(parent.actor.toLowerCase().includes(aname.split(" ")[0])||aname.includes(parent.actor.toLowerCase().split(" ")[0]))){out.push({smp:n.id,score:c.cup,c:cId,grade:c.grade});}}
    });
  }
  return out.slice(0,5);
}
function renderActorProfile(actorId){
  const a=ACTOR_REGISTRY[actorId];if(!a)return"";
  const relChips=a.related.map(r=>muid(r)).join("")||'<span style="font-size:11px;color:var(--tx3)">None declared</span>';
  const hist=actorQualityHistory(actorId);
  const histBlock=hist.length?`<div class="ms2">Quality History</div><div style="background:#fff;border:1px solid #e5dccc;border-radius:4px;padding:8px 10px;margin-top:6px">${hist.map(h=>{const[b,c]=gradeBand(h.score);return`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f0e8d8;font-size:11px"><span>${muid(h.smp)}</span><span style="color:var(--tx3)">${h.grade}</span><span style="background:${c};color:#fff;padding:2px 8px;border-radius:10px;font-weight:700;font-size:10px">${h.score.toFixed(2)}</span></div>`;}).join("")}<div style="font-size:10px;color:var(--tx3);margin-top:6px;text-align:center">Avg: ${(hist.reduce((s,h)=>s+h.score,0)/hist.length).toFixed(2)} · ${hist.length} samples</div></div>`:"";
  return`<div class="mty">${a.type} · ${a.roles.join(" + ")}</div>
    <div class="mti">${a.name} ${tierBadge(a.tier)}</div>
    ${mgr([["Actor UID",actorId],["Status",a.status],["Region",a.region],["Verified Since",a.since],["Fayda",a.fayda||"—"],["LEI",a.lei||"—"],["Verified By",a.verifiedBy]])}
    <div class="ms2">Related Parties</div><div class="mch">${relChips}</div>
    ${histBlock}
    <div style="margin-top:10px;padding:8px 10px;background:rgba(90,138,58,.08);border-left:2px solid #5a8a3a;font-size:11px;color:var(--tx2);border-radius:3px">Identity & Registry · read-only</div>`;
}
function getUIDMeta(uid){
  if(uid.startsWith("LAB-")){return renderLabPanel(uid);}
  if(uid.startsWith("ACT-FRM")||uid.startsWith("ACT-WST")||uid.startsWith("ACT-MIL")||uid.startsWith("ACT-EXP")){if(ACTOR_REGISTRY[uid])return renderActorProfile(uid);}
  if(uid.startsWith("SHIP-")){const c=CONTAINERS.find(x=>x.id===uid);if(!c)return null;const exp=EXPORTERS.find(e=>e.id===c.exp);const tr=TRACE_OK.includes(c.status)?genTrace(c):null;return`<div class="mty">Shipment Lot</div><div class="mti">${c.grade} · ${c.process} · 20ft FCL</div>${mgr([["Container",c.cno||"Pending"],["BL",c.bl||"Pending"],["Vessel",c.vessel||"—"],["Status",STATUS_LABELS[c.status]],["Weight",c.kg.toLocaleString()+" kg"],["Delivery",c.incoterm],["Departed",c.dep||"Pending"],["ETA/Arrived",c.arrived||c.eta],["Zone",c.zone],["Value",c.value.toLocaleString("en-US",{maximumFractionDigits:0})+" ETB"]])}${mrel("Exporter",[muid(c.exp)])}${mrel("Origin Zone",[muid(c.zone)])}`;}
  const knownExp=EXPORTERS.find(e=>e.id===uid);
  if(knownExp){return`<div class="mty">Licensed Exporter</div><div class="mti">${knownExp.name}</div>${mgr([["UID",knownExp.id],["City",knownExp.city],["Country","Ethiopia"],["ECX Lic.",knownExp.lic],["Since",knownExp.since],["FCL (you)",CONTAINERS.filter(c=>c.exp===uid).length+" contracts"]])}${mrel("Active Contracts",CONTAINERS.filter(c=>c.exp===uid).map(c=>muid(c.id)))}`;}
  if(uid.startsWith("ZONE-")){const z=ZONES[uid];if(!z)return null;const unionRow=z.union?[["Cooperative Union",COOP_UNIONS[z.union].short+" — "+COOP_UNIONS[z.union].name]]:[];return`<div class="mty">Administrative Zone · ECX: ${z.ecx||"—"}</div><div class="mti">${z.name}</div>${mgr([["Zone UID",uid],["Region",z.region],["Elevation",z.elev],["Rainfall",z.rain],["Farms",z.farms.toLocaleString()],["Area",z.area],["GPS",z.gps.lat+"°N "+z.gps.lng+"°E"],["Varieties",z.varieties],["Cup Profile",z.cup||"—"],...unionRow])}${mrel("Woredas",Object.keys(z.woredas).map(w=>muid(w)))}${z.union?mrel("Union",[muid(z.union)]):""}`;}
  if(uid.startsWith("WRDA-")){const zId=Object.keys(ZONES).find(z=>Object.keys(ZONES[z].woredas).includes(uid));if(!zId)return null;const w=ZONES[zId].woredas[uid];const notableRow=w.notable?[["Notable For",w.notable]]:[];const kebRel=w.kebeles?`<div class="ms2">Notable Kebeles</div><div class="mch">${w.kebeles.map(k=>`<span style="display:inline-block;padding:3px 8px;margin:2px;background:rgba(120,90,40,.15);border:1px solid rgba(160,120,60,.3);border-radius:3px;font-size:11px;color:var(--tx2)">${k}</span>`).join("")}</div>`:"";return`<div class="mty">Woreda</div><div class="mti">${w.name} Woreda</div>${mgr([["Woreda UID",uid],["Parent Zone",zId],["Farms",w.farms.toLocaleString()],["Area",w.area],...notableRow])}${mrel("Parent Zone",[muid(zId)])}${kebRel}`;}
  if(uid.startsWith("UNION-")){const u=COOP_UNIONS[uid];if(!u)return null;const rows=[["Union UID",uid],["Short",u.short],["Founded",String(u.founded)],["HQ",u.hq],["Member Coops",String(u.coops||u.coopsEstimate||"—")]];if(u.households)rows.push(["Farmer Households","~"+u.households.toLocaleString()]);if(u.hectares)rows.push(["Coffee Area",u.hectares.toLocaleString()+" ha"]);if(u.annualTonnes)rows.push(["Annual Production","~"+u.annualTonnes.toLocaleString()+" t"]);if(u.washedPct)rows.push(["Washed Share",u.washedPct+"%"]);rows.push(["Certifications",(u.certs||[]).join(", ")||"—"]);if(u.note)rows.push(["Note",u.note]);return`<div class="mty">Cooperative Union</div><div class="mti">${u.name}</div>${mgr(rows)}<div style="margin-top:10px;padding:8px 10px;background:rgba(58,122,138,.08);border-left:2px solid #3a7a8a;font-size:11px;color:var(--tx2);border-radius:3px">Cooperative Registry</div>`;}
  if(uid.startsWith("FLG-")){const f=ANOMALY_FLAGS[uid];if(f){flgShowDetail(uid);return"";}return null;}
  if(uid.startsWith("POL-")){const p=POLICIES[uid];if(p){polShowDetail(uid);return"";}return null;}
  if(uid.startsWith("CLM-")){const cl=CLAIMS[uid];if(cl){clmShowDetail(uid);return"";}return null;}
  if(uid.startsWith("INS-")){const ins=INSURERS[uid];if(!ins)return null;return '<div class="mty">Insurer · Pre-approved Partner</div><div class="mti">'+ins.name+'</div>'+mgr([["Insurer UID",uid],["Short",ins.short],["Type",ins.type],["Rating",ins.rating],["Capacity",ins.capacity],["HQ",ins.hq]])+'<div class="ms2">Product Lines</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">'+ins.products.map(function(pr){return '<span style="font-size:10px;background:rgba(26,58,106,.1);color:#1a3a6a;padding:3px 8px;border-radius:8px;border:1px solid rgba(26,58,106,.3)">'+pr+'</span>';}).join("")+'</div><div style="margin-top:10px;padding:8px 10px;background:rgba(26,58,106,.06);border-left:2px solid #1a3a6a;font-size:11px;color:var(--tx2);border-radius:3px">Pre-approved partner · NBE/EIA licensed or internationally recognized · API integration with event stream</div>';}
  if(uid.startsWith("PAY-")){const p=PAYMENTS[uid];if(p){payShowDetail(uid);return"";}return null;}
  if(uid.startsWith("BNK-")){const b=BANK_PANEL[uid];if(!b)return null;return`<div class="mty">Partner Bank · Bank Panel</div><div class="mti">${b.name}</div>${mgr([["Bank UID",uid],["Short",b.short],["Type",b.type],["Trade Desk",b.desk],["Rate",b.rate]])}<div class="ms2">Capabilities</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">${b.capabilities.map(c=>`<span style="font-size:10px;background:rgba(58,122,138,.1);color:#3a7a8a;padding:3px 8px;border-radius:8px;border:1px solid rgba(58,122,138,.3)">${c}</span>`).join("")}</div><div style="margin-top:10px;padding:8px 10px;background:rgba(58,122,138,.06);border-left:2px solid #3a7a8a;font-size:11px;color:var(--tx2);border-radius:3px">Pre-approved partner panel · NBE-licensed or correspondent-capable</div>`;}
  if(uid.startsWith("CTR-")){const c=CONTRACTS[uid];if(c){ctrShowDetail(uid);return"";}return null;}
  if(uid.startsWith("LIST-")){const L=LISTINGS[uid];if(!L)return null;const c=LISTING_STATE_COLOR[L.state]||"#666";const stateBadge=`<span style="display:inline-block;padding:2px 7px;border-radius:10px;font-size:9px;font-weight:700;letter-spacing:.05em;background:${c};color:#fff">${L.state}</span>`;const rows=[["Listing UID",uid],["Type",LISTING_TYPE_LABEL[L.type]],["State",L.state]];if(L.lot)rows.push(["Lot",L.lot]);if(L.weight)rows.push(["Weight",L.weight.toLocaleString()+" kg"]);if(L.grade)rows.push(["Grade / Spec",L.grade]);if(L.quality)rows.push(["Quality",L.quality]);rows.push(["Price Mode",L.priceMode]);if(L.priceUSDkg)rows.push(["Asking",L.priceUSDkg+" USD/kg"]);if(L.reserveUSDkg)rows.push(["Reserve",L.reserveUSDkg+" USD/kg"]);if(L.currentUSDkg)rows.push(["Current Bid",L.currentUSDkg+" USD/kg"]);if(L.ceilingUSDkg)rows.push(["Ceiling",L.ceilingUSDkg+" USD/kg"]);if(L.currentLowUSDkg)rows.push(["Current Low",L.currentLowUSDkg+" USD/kg"]);if(L.differential)rows.push(["Differential",L.differential]);if(L.minIncrement)rows.push(["Min Increment",L.minIncrement]);if(L.incoterm)rows.push(["Incoterm",L.incoterm]);if(L.duration)rows.push(["Duration",L.duration]);if(L.ends)rows.push(["Closes",L.ends]);if(L.antiSniping)rows.push(["Anti-Sniping",L.antiSniping]);if(L.bids!==undefined)rows.push(["Bids",String(L.bids)]);if(L.offers!==undefined)rows.push(["Offers Received",String(L.offers)]);if(L.bidsReceived!==undefined)rows.push(["Sealed Bids",String(L.bidsReceived)+" (blind)"]);rows.push(["Visibility",L.visibility.join(" + ")]);if(L.eudr)rows.push(["EUDR","Eligible"]);const idLine=L.sellerVisible===false?"Seller: anonymous (revealed at match)":(L.seller?"Seller: "+L.seller:(L.buyer?"Buyer: "+L.buyer+" — "+L.buyerCompany:""));const sheetHero=L.endsAt&&(L.state==="LIVE"||L.state==="ENGAGED")&&(L.type==="ENG"||L.type==="SEALED"||L.type==="REV");const cdHead=L.type==="SEALED"?"Sealed auction closes in":L.type==="ENG"?"English auction closes in":"Reverse auction closes in";const countdownHtml=sheetHero?`<div class="l4-sheet-hero" role="timer" aria-live="polite"><div class="l4-sheet-hero__kicker">${cdHead}<span class="l4-sheet-hero__demo-tag"> · demo</span></div><div class="l4-sheet-hero__time"><span class="l4-timer" data-l4-timer="${L.endsAt}">${l4FmtTimer(L.endsAt-Date.now())}</span></div><div class="l4-sheet-hero__foot"><span>Published schedule</span><b>${L.ends||"—"}</b></div></div>`:"";return`${countdownHtml}<div class="mty">Marketplace Listing ${stateBadge}</div><div class="mti">${LISTING_TYPE_LABEL[L.type]}</div>${mgr(rows)}<div class="ms2">${idLine}</div>${L.lot?mrel("Lot",[muid(L.lot)]):""}${L.note?`<div style="margin-top:8px;padding:8px 10px;background:rgba(124,58,237,.08);border-left:2px solid #7C3AED;font-size:11px;color:var(--tx2);border-radius:3px">${L.note}</div>`:""}<div style="margin-top:8px;padding:8px 10px;background:rgba(124,58,237,.08);border-left:2px solid #7C3AED;font-size:11px;color:var(--tx2);border-radius:3px">Matchmaking & Price Discovery · on match → Contracting</div>`;}
  
  
  if(uid.startsWith("FARM-")){let fn=null,farmCid=null;for(const cId in traceCache){const n=traceCache[cId].nodes[uid];if(n){fn=n;farmCid=cId;break;}}if(!fn)return`<div class="mty">Registered Farm</div><div class="mti">${uid}</div><div style="font-size:11px;color:var(--tx3);margin-top:8px">Expand trace tree first to load farm data.</div>`;const aid=actorLookup(fn.farmer)||"ACT-FRM-0241";const fc=farmCid?CONTAINERS.find(x=>x.id===farmCid):null;const farmGps=fn.gps&&(fc&&TRACE_OK.includes(fc.status))?`<span class="gps-val-wrap"><span class="gps-txt">${fn.gps}</span><button type="button" class="gps-map-btn-inline" onclick="event.stopPropagation();openHrvMapModal('${farmCid}',null,'${uid}')" title="Map harvests at this farm">${HRV_MAP_SVG12}</button></span>`:fn.gps;return`<div class="mty">Registered Farm</div><div class="mti">${fn.farmer}</div>${mgr([["Farm UID",uid],["Farmer",fn.farmer],["Plot",fn.ha+" ha"],["GPS",farmGps],["Woreda",fn.wrdaId||"—"],["Zone",fn.zoneId||"—"],["Variety",fn.variety||"—"],["Verified Since",fn.since]])}${mrel("Operator",[muid(aid)])}${mrel("Woreda",fn.wrdaId?[muid(fn.wrdaId)]:[])}${mrel("Zone",fn.zoneId?[muid(fn.zoneId)]:[])}`;} 
  if(uid==="ACT-IMP-0029")return`<div class="mty">Foreign Buyer · Read-Only Traceability</div><div class="mti">Nordic Imports B.V.</div>${mgr([["UID","ACT-IMP-0029"],["Company","Nordic Imports B.V."],["Type","Post-export traceability viewer"],["Access","Read-only · scoped to purchased shipments"],["Role","Not a platform trading counterparty"],["Since","2019"]])}<div style="margin-top:10px;padding:10px 12px;background:rgba(124,58,237,.06);border-left:3px solid #7C3AED;border-radius:4px;font-size:10px;color:var(--tx2);line-height:1.5">Foreign buyers do not trade on the platform. They receive a traceability dossier from their Ethiopian exporter after off-platform commercial settlement. This profile is a placeholder for the future foreign buyer persona fork.</div>`;
  let ln=null,cId=null;for(const id in traceCache){const n=traceCache[id].nodes[uid];if(n){ln=n;cId=id;break;}}
  if(ln&&ln.type==="SMPL"){const c=CONTAINERS.find(x=>x.id===cId);return renderSampleResult(uid,ln,c);}
  if(ln){const c=CONTAINERS.find(x=>x.id===cId);const pW=ln.parentId&&traceCache[cId]?.nodes[ln.parentId]?.weight;const yld=pW&&pW!==ln.weight?` (${(ln.weight/pW*100).toFixed(1)}% yield)`:"";const opAid=actorLookup(ln.actor);const opRel=opAid?mrel("Operator",[muid(opAid)]):"";const gpsMgr=ln.geo&&ln.type==="HRV"&&c&&TRACE_OK.includes(c.status)?`<span class="gps-val-wrap"><span class="gps-txt">${ln.geo}</span><button type="button" class="gps-map-btn-inline" onclick="event.stopPropagation();openHrvMapModal('${c.id}','${uid}')" title="Map this harvest">${HRV_MAP_SVG12}</button></span>`:ln.geo;return`<div class="mty">${TYPE_LABEL[ln.type]||"Lot"}</div><div class="mti">${ln.name}</div>${ln.note?`<div class="vck">✓ Volume conservation verified · ${ln.note}</div>`:""}${mgr([["UID",uid],["Type",TYPE_LABEL[ln.type]||ln.type],["Form",ln.form],["Weight",ln.weight.toLocaleString()+" kg"+yld],["Date",ln.date],["GPS",gpsMgr]])}${opRel}${mrel("Parent",ln.parentId?[muid(ln.parentId)]:[])}${mrel("Children",ln.children&&ln.children.length?ln.children.map(cid=>muid(cid)):[])}${mrel("Container",c?[muid(c.id)]:[])}`;}
  return null;
}

// ═══════════════════════════════════════════════ KEYBOARD / MISC ═
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    const hrvOv=document.getElementById("hrv-map-ov");
    if(hrvOv&&hrvOv.classList.contains("open"))closeHrvMapModal();
    else if(wizOpen)closeWizard();
    else if(bsOpen)closeBackstage();
    else if(notifOpen)toggleNotif();
    else if(activeCont)closeDetail();
  }
  if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();document.getElementById("qat-search-input").focus();}
  if((e.ctrlKey||e.metaKey)&&e.key==="n"){e.preventDefault();openWizard();}
  if(!e.ctrlKey&&!e.metaKey&&e.key.toLowerCase()==="t"&&document.activeElement.tagName!=="INPUT"){setView(viewMode==="cards"?"timeline":"cards");}
});

function toast(msg){
  const t=document.createElement("div");
  t.style.cssText="position:fixed;bottom:36px;left:50%;transform:translateX(-50%);background:var(--dark);color:var(--amber);padding:7px 16px;border-radius:20px;font-size:11px;z-index:999;font-family:'SF Mono',Menlo,monospace;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.25);transition:opacity .3s";
  t.textContent=msg;document.body.appendChild(t);
  setTimeout(()=>{t.style.opacity="0";setTimeout(()=>t.remove(),300);},2200);
}

// ═══════════════════════════════════════════════════════ INIT ════
relocateQatBrandToSidebar();
renderView();
renderRibbon();
updateStatusBar();
if(typeof showBsPortfolioPreview==="function")showBsPortfolioPreview();

// Boot Risk layer (Layer 9) on page load
setTimeout(function(){if(typeof bootRiskLayer==="function")bootRiskLayer();},100);
