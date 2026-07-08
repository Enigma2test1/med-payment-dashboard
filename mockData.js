// Mock data matching the Excel spreadsheet "ยอดบิลจ่ายค่ายาเวชภัณฑ์รพ."
// Cycles:
// - "2026-05" (Due Date: 25 พ.ค. 2569)
// - "2026-01" (Due Date: 25 ม.ค. 2569) - Paid on 3 ก.พ. 2569
// - "2026-02" (Due Date: 25 ก.พ. 2569) - Paid on 5 มี.ค. 2569
// - "2026-03" (Due Date: 25 มี.ค. 2569) - Paid on 5 เม.ย. 2569

const DEFAULT_COMPANIES = [
  {
    id: "co-1",
    name: "ร้านเชียงรายเภสัช",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0281105906",
    accountName: "นายสมชัย ยงเมธาวุฒิ",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-2",
    name: "ร้านเวชสิน",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "1542557601",
    accountName: "นางอุไร ดีลายวัฒน์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-3",
    name: "บ.ส.เจริญ",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0441035195",
    accountName: "บ. ส.เจริญเภสัช เทรดดิ้ง จำกัด",
    branch: "สาขาแขวงบูรพาภิรมย์",
    feeNote: ""
  },
  {
    id: "co-4",
    name: "บ.โปลิฟาร์ม จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "3402340712",
    accountName: "บ.โปลิฟาร์ม",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-5",
    name: "บ.LBS.",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "7272625470",
    accountName: "บจก.แอล.บี.เอส. แลบบอราตอรี่ จำกัด",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-6",
    name: "บ.7-star.",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "3311029877",
    accountName: "บจก.ห้างขายยาเจ็ดดาว",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-7",
    name: "บ.HIVAN",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "6101006016",
    accountName: "บจก. ไฮแวน เมดิคอล",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-8",
    name: "บ.ASIAN Pharma",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0712050268",
    accountName: "บ.เอเชี่ยน ฟาร์มาซูติคัล จำกัด",
    branch: "สาขาซอยจารุรัตน์",
    feeNote: ""
  },
  {
    id: "co-9",
    name: "บ.T.P. drug",
    bankName: "ธ.กรุงไทย",
    accountNumber: "0861065611",
    accountName: "บ. ที.พี. ดรัก แลบบอราทอรี่ (1996)จำกัด",
    branch: "สาขาเซ็นทรัลบางนา",
    feeNote: "ค่าธรรมเนียมโอนจ่ายหักในยอดของบริษัท."
  },
  {
    id: "co-10",
    name: "DKSH",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0351096012",
    accountName: "บ.ดีเคเอสเอช เคลเลอร์ โลจิสติก จำกัด",
    branch: "",
    feeNote: ""
  },
  // Companies for Jan 69
  {
    id: "co-11",
    name: "บ.ATC",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0351092718",
    accountName: "บ.แอลแลนด์ดิส ฟาร์มาซูติคอล จำกัด",
    branch: "สาขาสุขุมวิท101",
    feeNote: ""
  },
  {
    id: "co-12",
    name: "บ. Rx. จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0153511934",
    accountName: "บจก.อาร์เอ็กซ์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-13",
    name: "บจก.ไบโอฟาร์มเคมิคัลส์",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0961049679",
    accountName: "บจก.ไบโอฟาร์มเคมิคัลส์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-14",
    name: "บ.ANB.",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0882122559",
    accountName: "บ.เอ.เอ็น.บี. แลบบอราตอรี่ จำกัด",
    branch: "สาขารามอินทรา",
    feeNote: ""
  },
  {
    id: "co-15",
    name: "บ.ไทยก๊อส จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "7391009982",
    accountName: "บจก. ไทยก๊อส",
    branch: "สาขาถนนศรีนครินทร์ กม.9",
    feeNote: ""
  },
  {
    id: "co-16",
    name: "GPO(องค์การเภสัชกรรม)",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0991197559",
    accountName: "องค์การเภสัชกรรมสำนักงานใหญ่.",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-17",
    name: "บ.คอนเนคไดแอก.",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "7962033304",
    accountName: "บ.คอนเนคไดแอกโนสติกส์ จำกัด",
    branch: "สาขาซอยวัชรพล",
    feeNote: ""
  },
  {
    id: "co-18",
    name: "บจก.คอนติเนนทัล-ฟาร์ม (CP)",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "4702438522",
    accountName: "บจก.คอนติเนนทัล-ฟาร์ม",
    branch: "ถนนแจ้งวัฒนะ",
    feeNote: ""
  },
  {
    id: "co-19",
    name: "บ.NLPS (ค่ายา Kidmin)",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0502854712",
    accountName: "นางพรพินิต ทรัพย์ปีติ์ดี",
    branch: "",
    feeNote: ""
  },
  // Companies for Feb 69
  {
    id: "co-20",
    name: "บ.Berlin",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0271150504",
    accountName: "บ.เบอร์ลิน",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-21",
    name: "บ.คอนดรักส์",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "1001004804",
    accountName: "บจก.คอนดรักส์ อินเตอร์เนชั่นแนล",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-22",
    name: "ร้าน ส. นำชัย เมดิคอล",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "2111767508",
    accountName: "ส.นำชัย เมดิคอล",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-23",
    name: "บ. ATP",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0011573207",
    accountName: "นายธวัชชัย โพธิ์เนียร",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-24",
    name: "บ.Biogenetech",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "7191017182",
    accountName: "บ.ไบโอจีนีเทค",
    branch: "สาขาซอยอุดมสุข/กระแสรายวัน",
    feeNote: ""
  },
  // New company for Mar 69
  {
    id: "co-25",
    name: "หจก.ภิญโญ ฟาร์มาซี",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0191080416",
    accountName: "หจก.ภิญโญฟาร์มาซี",
    branch: "สาขาพรานนก",
    feeNote: ""
  },
  {
    id: "co-26",
    name: "หจก. ภิญโญฟาร์มาซี",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0208899996",
    accountName: "กีรติ",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-27",
    name: "DKSH-Aerocare",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0351096012",
    accountName: "บ.ดีเทแฮล์ม เคลเลอร์ โลจิสติก จำกัด",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-28",
    name: "บ.HIVAN",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "7132148931",
    accountName: "นางมุกดา เชียรหิรัญ",
    branch: "",
    feeNote: ""
  },
  // Companies for Dental Clinic Materials
  {
    id: "co-dent-1",
    name: "บริษัท พานิช 1988 จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "1542557601",
    accountName: "นางอุไร ลีลายุวัฒน์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-2",
    name: "ห้างหุ้นส่วนจำกัด เวชสิน",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "1542557601",
    accountName: "นางอุไร ลีลายุวัฒน์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-3",
    name: "บ.แปซิฟิค เฮลธ์แคร์(ประเทศไทย)จำกัด",
    bankName: "ธ.ไทยพาณิชย์",
    accountNumber: "2382031559",
    accountName: "บ.แปซิฟิค เฮลธ์แคร์(ประเทศไทย)จำกัด",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-4",
    name: "บจก.ที เอช เฮลท์",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0091077027",
    accountName: "บจก.ที เอช เฮลท์",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-5",
    name: "บ.เด็นท์-เมท จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0272410445",
    accountName: "บจก.เด็นท์-เมท",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-6",
    name: "บริษัท ดีเคเอสเอช(ประเทศไทย) จำกัด",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "0272725195",
    accountName: "บ.ดีเคเอสเอช (ประเทศไทย) จำกัด",
    branch: "",
    feeNote: ""
  },
  {
    id: "co-dent-7",
    name: "ส.นำชัย เมดิคอล",
    bankName: "ธ.กสิกรไทย",
    accountNumber: "2111767508",
    accountName: "ส.นำชัย เมดิคอล",
    branch: "",
    feeNote: ""
  },
  // Companies for Lab Chemicals
  {
    id: "co-lab-1",
    name: "บริษัท ไนน์ โกลเด้นท์ กรุ๊ป จำกัด",
    bankName: "ธ.กรุงไทย",
    accountNumber: "5396017171",
    accountName: "บจก.ไนน์ โกลเด้นท์ กรุ๊ป",
    branch: "",
    feeNote: ""
  }
];

const DEFAULT_BILLS = [
  // May 2569 bills (original set)
  {
    id: "bill-1",
    companyId: "co-1",
    billNumber: "DO6905-0153",
    amount: 33883.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-2",
    companyId: "co-2",
    billNumber: "IV6900339",
    amount: 2180.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-3",
    companyId: "co-3",
    billNumber: "26NO5444",
    amount: 22000.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-4",
    companyId: "co-4",
    billNumber: "IVU-69006553",
    amount: 40900.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-5",
    companyId: "co-5",
    billNumber: "910419",
    amount: 7700.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-6",
    companyId: "co-5",
    billNumber: "910418",
    amount: 3910.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-7",
    companyId: "co-5",
    billNumber: "910917",
    amount: 23810.00,
    discount: 1062.00, // 3% manual discount applied
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-8",
    companyId: "co-5",
    billNumber: "910288",
    amount: 4268.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-9",
    companyId: "co-6",
    billNumber: "ss2609788",
    amount: 24000.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-10",
    companyId: "co-7",
    billNumber: "HV 69050784",
    amount: 9600.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-11",
    companyId: "co-8",
    billNumber: "358138",
    amount: 29643.20,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-12",
    companyId: "co-9",
    billNumber: "VIV126012427",
    amount: 10600.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-13",
    companyId: "co-9",
    billNumber: "VIV126012428",
    amount: 4750.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-14",
    companyId: "co-9",
    billNumber: "VIV12601184",
    amount: 10800.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-15",
    companyId: "co-9",
    billNumber: "VIV126041294",
    amount: 10875.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-16",
    companyId: "co-10",
    billNumber: "5449458072",
    amount: 6420.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-17",
    companyId: "co-10",
    billNumber: "5449458857",
    amount: 2086.00,
    discount: 0.00,
    cycle: "2026-05",
    status: "pending",
    paidDate: ""
  },

  // January 2569 bills (Paid on 3 Feb 2569)
  {
    id: "bill-jan-1",
    companyId: "co-2",
    billNumber: "IV6900046",
    amount: 3725.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-2",
    companyId: "co-2",
    billNumber: "IV6900045",
    amount: 20750.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-3",
    companyId: "co-2",
    billNumber: "IV69000063",
    amount: 6500.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-4",
    companyId: "co-2",
    billNumber: "IV6901156",
    amount: 2970.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-5",
    companyId: "co-2",
    billNumber: "IV6900066",
    amount: 990.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-6",
    companyId: "co-1",
    billNumber: "DO6901-0290/0359",
    amount: 43718.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-7",
    companyId: "co-1",
    billNumber: "DO6901-0767/0923",
    amount: 26750.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-8",
    companyId: "co-4",
    billNumber: "IVU-68046360",
    amount: 19000.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-9",
    companyId: "co-4",
    billNumber: "IVU-68046281",
    amount: 22000.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-10",
    companyId: "co-11",
    billNumber: "PIN2541030",
    amount: 15220.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-11",
    companyId: "co-11",
    billNumber: "PIN2542818",
    amount: 600.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-12",
    companyId: "co-12",
    billNumber: "IV25-12101604",
    amount: 25262.70,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-13",
    companyId: "co-12",
    billNumber: "IV25-10104159",
    amount: 12572.50,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-14",
    companyId: "co-13",
    billNumber: "111634683",
    amount: 20758.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-15",
    companyId: "co-5",
    billNumber: "รายละเอียดLBS",
    amount: 46400.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-16",
    companyId: "co-14",
    billNumber: "8370958767",
    amount: 27255.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-17",
    companyId: "co-14",
    billNumber: "8370965996",
    amount: 2850.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-18",
    companyId: "co-9",
    billNumber: "VIV125121443",
    amount: 5800.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-19",
    companyId: "co-9",
    billNumber: "VIV125122824",
    amount: 8100.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-20",
    companyId: "co-15",
    billNumber: "IV6850626",
    amount: 17600.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-21",
    companyId: "co-16",
    billNumber: "3020113574",
    amount: 16103.50,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-22",
    companyId: "co-8",
    billNumber: "352151",
    amount: 19113.85,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-23",
    companyId: "co-17",
    billNumber: "IV6812090",
    amount: 11250.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-24",
    companyId: "co-18",
    billNumber: "251200488",
    amount: 12804.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-25",
    companyId: "co-10",
    billNumber: "5449392644",
    amount: 1712.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-26",
    companyId: "co-10",
    billNumber: "5449373978",
    amount: 12572.50,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-27",
    companyId: "co-10",
    billNumber: "5449371707",
    amount: 1284.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-28",
    companyId: "co-10",
    billNumber: "5449376740",
    amount: 3477.50,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },
  {
    id: "bill-jan-29",
    companyId: "co-19",
    billNumber: "EX 6901000224",
    amount: 12540.00,
    discount: 0.00,
    cycle: "2026-01",
    status: "paid",
    paidDate: "2026-02-03"
  },

  // February 2569 bills (Paid on 5 มี.ค. 2569)
  {
    id: "bill-feb-1",
    companyId: "co-2",
    billNumber: "IV6900111",
    amount: 4200.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-2",
    companyId: "co-2",
    billNumber: "IV6900069",
    amount: 1180.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-3",
    companyId: "co-2",
    billNumber: "IV6900086",
    amount: 1500.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-4",
    companyId: "co-2",
    billNumber: "IV6900128",
    amount: 2700.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-5",
    companyId: "co-2",
    billNumber: "IV6900140",
    amount: 5950.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-6",
    companyId: "co-2",
    billNumber: "IV6900151",
    amount: 1470.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-7",
    companyId: "co-1",
    billNumber: "DO6902-0406/0505",
    amount: 23920.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-8",
    companyId: "co-1",
    billNumber: "DO6902-0205/0260",
    amount: 46150.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-9",
    companyId: "co-1",
    billNumber: "DO6901-1307/1081",
    amount: 42939.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-10",
    companyId: "co-4",
    billNumber: "IVU-68050797",
    amount: 34800.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-11",
    companyId: "co-4",
    billNumber: "IVU-68051631",
    amount: 500.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-12",
    companyId: "co-12",
    billNumber: "IV26-01105435",
    amount: 26198.95,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-13",
    companyId: "co-5",
    billNumber: "898283",
    amount: 14980.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-14",
    companyId: "co-5",
    billNumber: "898451",
    amount: 5500.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-15",
    companyId: "co-5",
    billNumber: "898888",
    amount: 560.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-16",
    companyId: "co-5",
    billNumber: "899191",
    amount: 1200.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-17",
    companyId: "co-5",
    billNumber: "899782 (ค้างจ่าย 847 บาท..เกินดีล.)",
    amount: 6000.00,
    discount: 847.00, // 3% discount deducted to match the grand total
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-18",
    companyId: "co-14",
    billNumber: "8370975059",
    amount: 16210.50,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-19",
    companyId: "co-9",
    billNumber: "VIV126011286",
    amount: 2800.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-20",
    companyId: "co-9",
    billNumber: "VIV125122824",
    amount: 7600.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-21",
    companyId: "co-9",
    billNumber: "VIV126011287",
    amount: 2300.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-22",
    companyId: "co-16",
    billNumber: "3020113862",
    amount: 3638.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-23",
    companyId: "co-16",
    billNumber: "3020114235",
    amount: 2461.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-24",
    companyId: "co-20",
    billNumber: "6910104566",
    amount: 20758.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-25",
    companyId: "co-6",
    billNumber: "ss2561777",
    amount: 17000.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-26",
    companyId: "co-3",
    billNumber: "25N42822",
    amount: 34500.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-27",
    companyId: "co-21",
    billNumber: "690550",
    amount: 4200.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-28",
    companyId: "co-22",
    billNumber: "90/2569 (ช่องซิปใส่ยาตรา รพส.)",
    amount: 14000.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-29",
    companyId: "co-22",
    billNumber: "91/2569 (ถุงหิ้วใส่ยาตรา รพส.)",
    amount: 15000.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-30",
    companyId: "co-23",
    billNumber: "A69/11 (สติกเกอร์บาร์โค้ด)",
    amount: 30000.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-31",
    companyId: "co-24",
    billNumber: "IV251002876",
    amount: 16350.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },
  {
    id: "bill-feb-32",
    companyId: "co-24",
    billNumber: "IV250902091",
    amount: 5200.00,
    discount: 0.00,
    cycle: "2026-02",
    status: "paid",
    paidDate: "2026-03-05"
  },

  // March 2569 bills (Paid on 5 เม.ย. 2569)
  // co-2 (ร้านเวชสิน) - Mar 69
  {
    id: "bill-mar-1",
    companyId: "co-2",
    billNumber: "IV6900068",
    amount: 800.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-2",
    companyId: "co-2",
    billNumber: "IV6900239",
    amount: 27640.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-1 (ร้านเชียงรายเภสัช) - Mar 69
  {
    id: "bill-mar-3",
    companyId: "co-1",
    billNumber: "DO6903-0690",
    amount: 28540.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-4",
    companyId: "co-1",
    billNumber: "DO6903-0570",
    amount: 14170.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-5",
    companyId: "co-1",
    billNumber: "DO6902-0978",
    amount: 20226.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-6",
    companyId: "co-1",
    billNumber: "DO6902-1174",
    amount: 22760.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-4 (บ.โปลิฟาร์ม จำกัด) - Mar 69
  {
    id: "bill-mar-7",
    companyId: "co-4",
    billNumber: "IVU-68053567",
    amount: 26500.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-12 (บ. Rx. จำกัด) - Mar 69
  {
    id: "bill-mar-8",
    companyId: "co-12",
    billNumber: "IV26-02102281",
    amount: 16980.90,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-5 (บ.LBS.) - Mar 69
  {
    id: "bill-mar-9",
    companyId: "co-5",
    billNumber: "904389",
    amount: 2100.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-10",
    companyId: "co-5",
    billNumber: "904826",
    amount: 3000.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-11",
    companyId: "co-5",
    billNumber: "904980",
    amount: 3000.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-12",
    companyId: "co-5",
    billNumber: "905186",
    amount: 18200.00,
    discount: 789.00, // 3% discount of 26,300
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-13",
    companyId: "co-5",
    billNumber: "ยอดค้าง ก.พ.69",
    amount: 847.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-18 (บจก.คอนติเนนทัล-ฟาร์ม (CP)) - Mar 69
  {
    id: "bill-mar-14",
    companyId: "co-18",
    billNumber: "260201034",
    amount: 14259.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-9 (บ.T.P. drug) - Mar 69
  {
    id: "bill-mar-15",
    companyId: "co-9",
    billNumber: "VIV126021136",
    amount: 21125.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-16",
    companyId: "co-9",
    billNumber: "VIV126012513",
    amount: 12960.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-11 (บ.ATC) - Mar 69
  {
    id: "bill-mar-17",
    companyId: "co-11",
    billNumber: "PIN2545270",
    amount: 1740.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-18",
    companyId: "co-11",
    billNumber: "PIN2601815",
    amount: 40270.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-19",
    companyId: "co-11",
    billNumber: "PIN2603650",
    amount: 1230.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-20",
    companyId: "co-11",
    billNumber: "PIN2604746",
    amount: 820.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-21",
    companyId: "co-11",
    billNumber: "PIN2605973",
    amount: 2050.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-25 (หจก.ภิญโญ ฟาร์มาซี) - Mar 69
  {
    id: "bill-mar-22",
    companyId: "co-25",
    billNumber: "IV6905767",
    amount: 8980.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-20 (บ.Berlin) - Mar 69
  {
    id: "bill-mar-23",
    companyId: "co-20",
    billNumber: "6910205651",
    amount: 23571.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-6 (บ.7-star.) - Mar 69
  {
    id: "bill-mar-24",
    companyId: "co-6",
    billNumber: "SS2572346",
    amount: 24500.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  {
    id: "bill-mar-25",
    companyId: "co-6",
    billNumber: "SS2573757",
    amount: 8000.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-3 (บ.ส.เจริญ) - Mar 69
  {
    id: "bill-mar-26",
    companyId: "co-3",
    billNumber: "25N46838",
    amount: 37700.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-22 (ร้าน ส. นำชัย เมดิคอล) - Mar 69
  {
    id: "bill-mar-27",
    companyId: "co-22",
    billNumber: "95/2569",
    amount: 3930.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  },
  // co-13 (บจก.ไบโอฟาร์มเคมิคัลส์) - Mar 69
  {
    id: "bill-mar-28",
    companyId: "co-13",
    billNumber: "111658712",
    amount: 6596.00,
    discount: 0.00,
    cycle: "2026-03",
    status: "paid",
    paidDate: "2026-04-05"
  }
,
  // June 2569 bills
  {
    id: "bill-jun-1",
    companyId: "co-1",
    billNumber: "DO6906-0411",
    amount: 25845.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-2",
    companyId: "co-1",
    billNumber: "SR6906-0099",
    amount: 3660.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-3",
    companyId: "co-1",
    billNumber: "DO6905-0974",
    amount: 38775.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-4",
    companyId: "co-1",
    billNumber: "DO6905-1194",
    amount: 27754.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-5",
    companyId: "co-16",
    billNumber: "51123439",
    amount: 16777.60,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-6",
    companyId: "co-2",
    billNumber: "IV6900435",
    amount: 19770.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-7",
    companyId: "co-2",
    billNumber: "IV6900449",
    amount: 600.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-8",
    companyId: "co-3",
    billNumber: "26N10915",
    amount: 18000.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-9",
    companyId: "co-5",
    billNumber: "915416",
    amount: 4365.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-10",
    companyId: "co-6",
    billNumber: "ss2615964",
    amount: 31000.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-11",
    companyId: "co-9",
    billNumber: "VIV126021138",
    amount: 11500.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-12",
    companyId: "co-9",
    billNumber: "VIV126021140",
    amount: 3150.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-13",
    companyId: "co-27",
    billNumber: "5449461543",
    amount: 7383.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-14",
    companyId: "co-12",
    billNumber: "IV26-04103171",
    amount: 18446.80,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-15",
    companyId: "co-26",
    billNumber: "IV6922629",
    amount: 7020.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-16",
    companyId: "co-24",
    billNumber: "IV260300483",
    amount: 18570.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-17",
    companyId: "co-24",
    billNumber: "IV260102728",
    amount: 2600.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-18",
    companyId: "co-24",
    billNumber: "IV251202899",
    amount: 19250.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-19",
    companyId: "co-24",
    billNumber: "IV251202493",
    amount: 19250.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-20",
    companyId: "co-24",
    billNumber: "IV251201689",
    amount: 21000.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-jun-21",
    companyId: "co-24",
    billNumber: "IV251102689",
    amount: 16350.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: ""
  }
,
  // April 2569 bills
  {
    id: "bill-apr-1",
    companyId: "co-1",
    billNumber: "DO6904-0335,0393",
    amount: 26729.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-2",
    companyId: "co-1",
    billNumber: "DO6903-1219,1018",
    amount: 37205.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-3",
    companyId: "co-1",
    billNumber: "DO6904-0751,0628",
    amount: 50660.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-4",
    companyId: "co-2",
    billNumber: "IV6900318",
    amount: 19880.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-5",
    companyId: "co-4",
    billNumber: "IVU-69001730",
    amount: 19800.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-6",
    companyId: "co-4",
    billNumber: "IVU-69003066",
    amount: 5000.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-7",
    companyId: "co-12",
    billNumber: "IV26-03103992",
    amount: 22582.70,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-8",
    companyId: "co-5",
    billNumber: "906335",
    amount: 4400.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-9",
    companyId: "co-5",
    billNumber: "906615",
    amount: 6000.00,
    discount: 320.00, // Adjusted from 312 to match Excel math error (10,080 net)
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-10",
    companyId: "co-9",
    billNumber: "VIV126030924",
    amount: 4400.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-11",
    companyId: "co-9",
    billNumber: "VIV126032241",
    amount: 4180.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-12",
    companyId: "co-20",
    billNumber: "6000169958",
    amount: 16781.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-13",
    companyId: "co-6",
    billNumber: "SS2602603",
    amount: 16000.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-14",
    companyId: "co-6",
    billNumber: "SS2600241",
    amount: 4000.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-15",
    companyId: "co-13",
    billNumber: "111660725",
    amount: 22504.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-16",
    companyId: "co-15",
    billNumber: "IV6915923",
    amount: 7800.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-17",
    companyId: "co-19",
    billNumber: "QA-6904000025",
    amount: 12540.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  {
    id: "bill-apr-18",
    companyId: "co-28",
    billNumber: "HV 6901856",
    amount: 16000.00,
    discount: 0.00,
    cycle: "2026-04",
    status: "pending",
    paidDate: ""
  },
  // June 2569 bills (Dental Clinic Materials & Consumables)
  {
    id: "bill-jun-dent-1",
    companyId: "co-dent-1",
    billNumber: "AN6901513",
    amount: 31400.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-2",
    companyId: "co-dent-2",
    billNumber: "AN6900451",
    amount: 9780.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-3",
    companyId: "co-dent-3",
    billNumber: "25/6/2569",
    amount: 71278.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-4",
    companyId: "co-dent-4",
    billNumber: "IV6906414",
    amount: 94368.44,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-5",
    companyId: "co-dent-5",
    billNumber: "IVG00075978",
    amount: 8500.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-6",
    companyId: "co-dent-6",
    billNumber: "5346028522",
    amount: 20886.40,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  {
    id: "bill-jun-dent-7",
    companyId: "co-dent-7",
    billNumber: "97/2569",
    amount: 14200.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "dental"
  },
  // June 2569 bills (Lab Chemicals)
  {
    id: "bill-jun-lab-1",
    companyId: "co-lab-1",
    billNumber: "IV6905009",
    amount: 29570.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "lab"
  },
  {
    id: "bill-jun-lab-2",
    companyId: "co-lab-1",
    billNumber: "IV6905011",
    amount: 17900.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "lab"
  },
  {
    id: "bill-jun-lab-3",
    companyId: "co-lab-1",
    billNumber: "IV6905029",
    amount: 22000.00,
    discount: 0.00,
    cycle: "2026-06",
    status: "pending",
    paidDate: "",
    category: "lab"
  }
];

const DEFAULT_POS = [
  {
    id: "po-1",
    poNumber: "PO-20260706-6979",
    date: "2026-07-06",
    supplier: "ร้านเชียงรายเภสัช",
    status: "รอใบเสนอราคา",
    items: [
      { index: 1, name: "Calcium 1000 mg. (CAL1000)", quantity: 5, unit: "กระปุก 1x (1 x1000 tab)" },
      { index: 2, name: "Erfuzide syrup ( 0.218g/5ml 60 mL) (EFZS60)", quantity: 3, unit: "แพ๊ค 1x ( 10 x 60 ml)" },
      { index: 3, name: "fixxumull (เทปแต่งแผล) 5 cm. (F.5cm.)", quantity: 2, unit: "ม้วน" },
      { index: 4, name: "LIdocaine 2% (ธรรมดา) (LIdocaine 2%NO-A)", quantity: 5, unit: "ขวด*50ml." },
      { index: 5, name: "LIdocaine 2% with Adrenaline (LIdocaine 2%+ A)", quantity: 5, unit: "ขวด*50ml." },
      { index: 6, name: "Medicut เข็มให้น้ำเกลือ no.24 (M.24)", quantity: 5, unit: "กล่อง" },
      { index: 7, name: "Micropore ชนิดเยื่อกระดาษ กล่องสีฟ้า1. นิ้ว", quantity: 2, unit: "กล่อง" },
      { index: 8, name: "ORS (เกลือแร่ผู้เด็ก) (ORS02)", quantity: 5, unit: "กล่อง 1x (100 ซอง)" },
      { index: 9, name: "ORS (เกลือแร่ผู้ใหญ่) (ORS01)", quantity: 10, unit: "กล่อง 1x (100 ซอง)" },
      { index: 10, name: "Paracetamol 325 mg. (PARA325)", quantity: 10, unit: "กระปุก 1x (1 x1000 tab)" },
      { index: 11, name: "Starmina 500 ml./inj. (STAMAI)", quantity: 2, unit: "กล่อง 1 x (1 x 500 ml. )" },
      { index: 12, name: "TA 0.1 %Lotion 30 ml. (TAL3T0)", quantity: 10, unit: "โหล 1 x ( 12 x 30 ml. )" },
      { index: 13, name: "Tensoplast (พลาสเตอร์)", quantity: 2, unit: "กล่อง 1 x (100 แผ่น )" },
      { index: 14, name: "transpore (เทปแต่งแผลกันน้ำ) 1 นิ้ว", quantity: 5, unit: "กล่อง" },
      { index: 15, name: "Vitamin C 25 mg. (VTMC25)", quantity: 10, unit: "กระปุก 1x (1 x1000 tab)" },
      { index: 16, name: "ตลับพลาสติกแบ่งใส่ยาครีมขนาด 10 gm. (container 10 gm.)", quantity: 5, unit: "แพค 100 ชิ้น*1pack" },
      { index: 17, name: "ตลับพลาสติกแบ่งใส่ยาครีมขนาด 5 gm. (container 5 gm.)", quantity: 5, unit: "แพค 100 ชิ้น*1pack" },
      { index: 18, name: "น้ำตาเทียม Opsil tears (eye d.) (OSTEAR)", quantity: 10, unit: "โหล 1 x(12 x10 ml.)" }
    ]
  },
  {
    id: "po-2",
    poNumber: "PO-20260706-9222",
    date: "2026-07-06",
    supplier: "บริษัท โปลิฟาร์ม จำกัด",
    status: "รออนุมัติ",
    items: [
      { index: 1, name: "Acyclovir 200 mg. (ACV200)", quantity: 10, unit: "กล่อง 1x (10 x 10 tab)" },
      { index: 2, name: "Anasic balm หลอด 25 g. (ANSB25)", quantity: 500, unit: "หลอด 1 x ( 1x 25 g )" },
      { index: 3, name: "Betamethasons 0.1% (valerbet) cream 5g. (VLBC5)", quantity: 5, unit: "กระปุก 1 x 500 g." },
      { index: 4, name: "Betamethasons0.1%+Neomycin หลอด 5 g. (BTMN5)", quantity: 10, unit: "โหล 1 x ( 12x 5 g. )" },
      { index: 5, name: "Cinnarizine 25 mg. (CNRZ25)", quantity: 5, unit: "กระปุก 1x (1000 tab)" },
      { index: 6, name: "Domperidone 10 mg. (DPRD10)", quantity: 5, unit: "กล่อง 1x (10 x 100 tab)" }
    ]
  },
  {
    id: "po-3",
    poNumber: "PO-20260705-5205",
    date: "2026-07-05",
    supplier: "ห้างหุ้นส่วนจำกัด ภิญโญฟาร์มาซี",
    status: "อนุมัติแล้ว",
    items: [
      { index: 1, name: "Adenosine injection 6mg/2ml. (ADNSI)", quantity: 2, unit: "กล่อง (1กล่อง x 5amp)" },
      { index: 2, name: "Amiodalone 150 mg./3ml injection. (AMODL)", quantity: 2, unit: "กล่อง 1 x (1 x 5 amp)" },
      { index: 3, name: "Ceftriazone 1 g./inj. (CTAZ1)", quantity: 60, unit: "กล่อง 1 x (1 x 10 vial )" },
      { index: 4, name: "Omeprazole 40 mg./inj. (OMEPZ40)", quantity: 300, unit: "กล่อง x ( 1 x vial )" }
    ]
  },
  {
    id: "po-4",
    poNumber: "PO-20260708-8094",
    date: "2026-07-08",
    supplier: "บริษัท อาร์เอ็กซ์ จำกัด",
    status: "ส่งใบสั่งซื้อ",
    items: [
      { index: 1, name: "Clindamycin 300 mg. (CDMC300)", quantity: 10, unit: "กล่อง 1x (10 x 10 tab)" },
      { index: 2, name: "Dicloxacillin 500 mg. (DCX5001)", quantity: 3, unit: "กล่อง 1x (10 x 25 cap)" },
      { index: 3, name: "Gabapentin 300 mg. (GBPT300)", quantity: 10, unit: "กล่อง 1x (10 x 10 cap)" }
    ]
  },
  {
    id: "po-5",
    poNumber: "PO-20260708-8737",
    date: "2026-07-08",
    supplier: "บริษัท ไบโอฟาร์ม เคมิคัลส์ จำกัด",
    status: "ส่งใบสั่งซื้อ",
    items: [
      { index: 1, name: "Tolperisone 50 mg. (TPS50)", quantity: 10, unit: "กล่อง 1x (10 x 100 tab)" },
      { index: 2, name: "Flanil balm หลอด 30 g . (FNB30)", quantity: 50, unit: "แพ๊ค 1 x ( 10x 30 g.)" },
      { index: 3, name: "Antacid Gel ( Aluminium Hydroxide) 240 mL. (ATC240)", quantity: 15, unit: "ลัง 1x (20 x 240 ml.)" }
    ]
  },
  {
    id: "po-6",
    poNumber: "PO-20260708-8272",
    date: "2026-07-08",
    supplier: "บริษัท คอนติเนนเติล-ฟาร์ม จำกัด",
    status: "ส่งใบสั่งซื้อ",
    items: [
      { index: 1, name: "Bromhexine syrup 4 mg/5 ml 60 mL. (BHXS60)", quantity: 10, unit: "ลัง 1 x(24 x 60 ml. )" },
      { index: 2, name: "GYNECONT VAGINAL TAB (GNCT)", quantity: 2, unit: "กล่อง 1x (10 x 10 tab)" }
    ]
  }
];
