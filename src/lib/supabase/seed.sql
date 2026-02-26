-- ============================================================
-- MyChinaMed — Seed Data
-- ============================================================
--
-- HOW TO USE:
-- 1. Make sure schema.sql has been executed FIRST
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Click "New query"
-- 4. Paste this entire file
-- 5. Click "Run" (or Ctrl+Enter)
--
-- This script inserts:
--   • 8 cities
--   • 40 hospitals (with city references)
--   • 18 treatment procedures
--
-- It is safe to run multiple times — ON CONFLICT clauses
-- prevent duplicate slug errors.
-- ============================================================


-- ============================================================
-- 1. CITIES (8)
-- ============================================================

INSERT INTO cities (name_en, name_zh, slug, airport_code, hospital_count, top_specialties, description_en, description_zh) VALUES
  ('Beijing',   '北京', 'beijing',   'PEK', 15,
    '{"oncology","cardiac","neurology","tcm"}',
    'China''s capital and home to the nation''s top-ranked hospitals including Peking Union and PLA 301.',
    '中国首都，拥有协和、301等全国顶级医院。'),
  ('Shanghai',  '上海', 'shanghai',  'PVG', 14,
    '{"oncology","cosmetic","orthopedic","fertility"}',
    'China''s most international city with world-class hospitals like Huashan and Zhongshan.',
    '中国最国际化的城市，拥有华山、中山等世界一流医院。'),
  ('Guangzhou',  '广州', 'guangzhou', 'CAN', 4,
    '{"oncology","cardiac","dental"}',
    'Southern China''s medical hub, famous for oncology and organ transplant.',
    '华南医疗中心，以肿瘤和器官移植闻名。'),
  ('Shenzhen',  '深圳', 'shenzhen',  'SZX', 2,
    '{"checkup","fertility","cosmetic"}',
    'Modern tech city bordering Hong Kong, growing rapidly in medical tourism.',
    '毗邻香港的现代科技城市，医疗旅游快速发展。'),
  ('Hangzhou',  '杭州', 'hangzhou',  'HGH', 2,
    '{"eye","tcm","checkup"}',
    'Beautiful lakeside city with top Zhejiang University hospitals.',
    '美丽的湖畔城市，拥有浙江大学顶尖附属医院。'),
  ('Chengdu',   '成都', 'chengdu',   'CTU', 1,
    '{"dental","orthopedic","oncology"}',
    'Western China''s medical center, home to the legendary West China Hospital.',
    '中国西部医疗中心，华西医院享誉全国。'),
  ('Xi''an',    '西安', 'xian',      'XIY', 1,
    '{"cardiac","neurology","orthopedic"}',
    'Ancient capital city with Xijing Hospital, a top military medical center.',
    '千年古都，西京医院是顶尖军事医疗中心。'),
  ('Changsha',  '长沙', 'changsha',  'CSX', 1,
    '{"oncology","neurology","fertility"}',
    'Central China hub, home to the prestigious Xiangya Hospital (est. 1906).',
    '中部枢纽城市，拥有百年名院湘雅医院。')
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- 2. HOSPITALS (40)
-- ============================================================

-- --------------------------------------------------------
-- BEIJING (15)
-- --------------------------------------------------------

INSERT INTO hospitals (name_en, name_zh, slug, city_id, grade, jci_accredited, international_dept, languages_supported, bed_count, description_en, website, featured) VALUES

-- 1. 协和
('Peking Union Medical College Hospital',
 '北京协和医院',
 'peking-union-medical-college-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en","ja"}',
 2000,
 'Founded in 1921 by the Rockefeller Foundation. Consistently ranked #1 in China. World-renowned for complex diagnostics, rare diseases, and multidisciplinary treatment. International Medical Service center provides English-speaking coordinators.',
 'https://www.pumch.cn', true),

-- 2. 301
('PLA General Hospital (301 Hospital)',
 '中国人民解放军总医院（301医院）',
 'pla-general-hospital-301',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 4000,
 'China''s top military hospital established in 1953. National leader in cardiac surgery, orthopedics, and neurosurgery. Treats senior government officials and offers VIP international patient services. 7 medical centers across Beijing.',
 'https://www.301hospital.com.cn', true),

-- 3. 天坛
('Beijing Tiantan Hospital',
 '首都医科大学附属北京天坛医院',
 'beijing-tiantan-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1650,
 'China''s #1 neurosurgery and neuroscience center since 1956. Performs the most brain surgeries in the world annually. Specializes in brain tumors, epilepsy, Parkinson''s DBS, and cerebrovascular diseases. New campus opened 2018 with cutting-edge imaging facilities.',
 'https://www.bjtth.org', true),

-- 4. 同仁
('Beijing Tongren Hospital',
 '首都医科大学附属北京同仁医院',
 'beijing-tongren-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1800,
 'Founded in 1886 by American missionaries. China''s #1 ranked ophthalmology and otolaryngology (ENT) center. Pioneers in LASIK, corneal transplant, and cochlear implant surgery. Treats over 3 million outpatients annually.',
 'https://www.trhos.com', false),

-- 5. 积水潭
('Beijing Jishuitan Hospital',
 '北京积水潭医院',
 'beijing-jishuitan-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, false,
 '{"zh","en"}',
 1500,
 'China''s top orthopedic and burn treatment hospital since 1956. National leader in joint replacement, sports medicine, spinal surgery, and hand reconstruction. Pioneered robotic-assisted orthopedic surgery in China.',
 'https://www.jst-hosp.com.cn', false),

-- 6. 阜外
('Fuwai Hospital (National Center for Cardiovascular Diseases)',
 '中国医学科学院阜外医院',
 'fuwai-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1400,
 'The world''s largest cardiovascular disease center. Ranked #1 in China for cardiac surgery. Performs 15,000+ cardiac surgeries annually including heart transplant, TAVR, and complex congenital heart repairs. Affiliated with CAMS and Peking Union.',
 'https://www.fuwai.com', true),

-- 7. 肿瘤医院
('National Cancer Center / Cancer Hospital, CAMS',
 '中国医学科学院肿瘤医院',
 'national-cancer-center-cams',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1200,
 'China''s premier oncology institution and national cancer research center. Leads clinical trials for CAR-T, immunotherapy, and precision oncology. Specializes in lung, gastric, esophageal, and liver cancers. Directly develops national cancer treatment guidelines.',
 'https://www.cicams.ac.cn', true),

-- 8. 中日友好
('China-Japan Friendship Hospital',
 '中日友好医院',
 'china-japan-friendship-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en","ja"}',
 1700,
 'Built in 1984 as a Sino-Japanese cooperation project. National leader in traditional Chinese medicine integrated with Western medicine, pulmonology, and organ transplant. One of Beijing''s most foreigner-friendly hospitals with Japanese-speaking staff.',
 'https://www.zryhyy.com.cn', false),

-- 9. 友谊
('Beijing Friendship Hospital',
 '首都医科大学附属北京友谊医院',
 'beijing-friendship-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1500,
 'Founded 1952. National leader in liver transplantation, digestive diseases, and tropical medicine. Strong international department serving embassy personnel. Pioneered living donor liver transplant in China.',
 'https://www.bfh.com.cn', false),

-- 10. 广安门
('Guang''anmen Hospital, CACMS',
 '中国中医科学院广安门医院',
 'guanganmen-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en","ja","ko"}',
 1000,
 'China''s #1 traditional Chinese medicine hospital, affiliated with the national TCM academy. Renowned for TCM oncology (cancer support), diabetes management, acupuncture pain relief, and rheumatology. Popular with international patients seeking authentic TCM treatment.',
 'https://www.gamhospital.ac.cn', true),

-- 11. 北大一院
('Peking University First Hospital',
 '北京大学第一医院',
 'peking-university-first-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1800,
 'Founded 1915. China''s first national hospital. Top-ranked in nephrology, urology, dermatology, and pediatrics. Pioneered kidney transplant in China. Strong academic research with Peking University Health Science Center.',
 'https://www.bddyyy.com.cn', false),

-- 12. 北大三院
('Peking University Third Hospital',
 '北京大学第三医院',
 'peking-university-third-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 2000,
 'China''s #1 reproductive medicine center — birthplace of mainland China''s first IVF baby (1988). Also top-ranked in orthopedics and sports medicine. Served as official hospital for Beijing 2008 and 2022 Olympics. Over 20,000 IVF cycles per year.',
 'https://www.puh3.net.cn', true),

-- 13. 北大人民
('Peking University People''s Hospital',
 '北京大学人民医院',
 'peking-university-peoples-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 1700,
 'Established 1918. National leader in hematology (blood cancers, bone marrow transplant), orthopedics (joint replacement), and hepatobiliary surgery. Performed China''s first successful bone marrow transplant.',
 'https://www.pkuph.cn', false),

-- 14. 北大国际
('Peking University International Hospital',
 '北京大学国际医院',
 'peking-university-international-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', true, true,
 '{"zh","en","ja","ko","ru"}',
 1800,
 'Opened 2014 as Peking University''s flagship international-standard hospital. JCI accredited. Purpose-built for international patients with multilingual staff, single-patient rooms, and Western-style service. Full range of specialties with PKU faculty physicians.',
 'https://www.pkuih.edu.cn', true),

-- 15. 儿童医院
('Beijing Children''s Hospital',
 '首都医科大学附属北京儿童医院',
 'beijing-childrens-hospital',
 (SELECT id FROM cities WHERE slug = 'beijing'),
 '三甲', false, true,
 '{"zh","en"}',
 970,
 'China''s #1 pediatric hospital since 1942. National center for pediatric oncology, cardiac surgery, neurosurgery, and rare diseases. Treats the most complex pediatric cases in the country. International department for overseas families.',
 'https://www.bch.com.cn', false),


-- --------------------------------------------------------
-- SHANGHAI (14)
-- --------------------------------------------------------

-- 16. 华山
('Huashan Hospital, Fudan University',
 '复旦大学附属华山医院',
 'huashan-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en","ja"}',
 1216,
 'Founded 1907. China''s #1 ranked neurosurgery center and top infectious diseases hospital. World leader in hand surgery and brain tumor treatment. Internationally recognized dermatology department. Treats 40,000+ inpatients annually.',
 'https://www.huashan.org.cn', true),

-- 17. 中山
('Zhongshan Hospital, Fudan University',
 '复旦大学附属中山医院',
 'zhongshan-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 2005,
 'Founded 1937. Consistently top-3 in China. National leader in cardiac surgery (TAVR pioneer), liver cancer (surgical + interventional), gastroenterology, and pulmonology. One of the highest volume liver transplant centers in the world.',
 'https://www.zs-hospital.sh.cn', true),

-- 18. 瑞金
('Ruijin Hospital, Shanghai Jiao Tong University',
 '上海交通大学医学院附属瑞金医院',
 'ruijin-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en","fr"}',
 2100,
 'Founded 1907 as a French hospital. Pioneered the cure for acute promyelocytic leukemia (APL) earning global acclaim. China''s top endocrinology/diabetes center and hematology center. Strong burn surgery and organ transplant programs.',
 'https://www.rjh.com.cn', true),

-- 19. 华东
('Huadong Hospital, Fudan University',
 '复旦大学附属华东医院',
 'huadong-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en","ja"}',
 1200,
 'Founded 1951. Shanghai''s premier geriatric and health screening center serving senior officials and international VIPs. Known for executive health checkup packages, geriatric medicine, and minimally invasive surgery. Quiet garden-style campus.',
 'https://www.huadong-hospital.com', false),

-- 20. 仁济
('Renji Hospital, Shanghai Jiao Tong University',
 '上海交通大学医学院附属仁济医院',
 'renji-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 2200,
 'Founded 1844 — Shanghai''s first Western hospital. China''s top center for digestive diseases, liver transplant, and rheumatology. National leader in stem cell research. Four campuses across Shanghai with 2,200 beds.',
 'https://www.renji.com', false),

-- 21. 新华
('Xinhua Hospital, Shanghai Jiao Tong University',
 '上海交通大学医学院附属新华医院',
 'xinhua-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, false,
 '{"zh","en"}',
 2000,
 'Founded 1958. Top-ranked in pediatric surgery, pediatric cardiology, and clinical nutrition. China''s largest neonatal intensive care unit. Strong ENT and ophthalmology departments. Treats complex congenital malformations.',
 'https://www.xinhuamed.com.cn', false),

-- 22. 市一
('Shanghai General Hospital (First People''s Hospital)',
 '上海市第一人民医院',
 'shanghai-general-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 1800,
 'Founded 1864. Shanghai''s oldest public hospital. National leader in ophthalmology (especially retinal diseases), urology, and pancreatic surgery. Two campuses — North (Hongkou) and South (Songjiang). Strong health screening program.',
 'https://www.shdsyy.com.cn', false),

-- 23. 市六
('Shanghai Sixth People''s Hospital',
 '上海市第六人民医院',
 'shanghai-sixth-peoples-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, false,
 '{"zh","en"}',
 2100,
 'China''s #1 orthopedics and fracture surgery center. World-famous for limb reattachment (microsurgery pioneer — reattached a severed hand in 1963, a world first). Also top-ranked in endocrinology and metabolic diseases.',
 'https://www.sdlryy.cn', false),

-- 24. 复旦儿科
('Children''s Hospital of Fudan University',
 '复旦大学附属儿科医院',
 'fudan-childrens-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 800,
 'China''s top-ranked pediatric hospital alongside Beijing Children''s. National leader in neonatal medicine, pediatric surgery, pediatric nephrology, and rare genetic diseases. Strong international referral program for complex cases.',
 'https://ch.shmu.edu.cn', false),

-- 25. 儿童医学中心
('Shanghai Children''s Medical Center',
 '上海儿童医学中心',
 'shanghai-childrens-medical-center',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 700,
 'Established 1998 with support from the US-based Project HOPE. China''s #1 pediatric cardiac surgery center — performs 3,000+ pediatric heart surgeries per year. Also strong in pediatric hematology/oncology and immunology.',
 'https://www.scmc.com.cn', false),

-- 26. 龙华
('Longhua Hospital, Shanghai University of TCM',
 '上海中医药大学附属龙华医院',
 'longhua-hospital-shanghai',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en","ja","ko"}',
 1000,
 'Shanghai''s #1 traditional Chinese medicine hospital. Founded 1960. Renowned for TCM oncology (integrative cancer care), TCM orthopedics (bone-setting), and dermatology. Popular with international patients for acupuncture and herbal medicine programs.',
 'https://www.longhua.net', false),

-- 27. 国妇婴
('Obstetrics & Gynecology Hospital of Fudan University',
 '复旦大学附属妇产科医院（红房子医院）',
 'fudan-obstetrics-gynecology-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 800,
 'Known as "Red House Hospital" — China''s most prestigious OB/GYN hospital, established 1884. National leader in gynecological oncology, high-risk pregnancy, and reproductive endocrinology. Pioneered many gynecological surgical techniques in China.',
 'https://www.fckyy.org.cn', false),

-- 28. 一妇婴
('Shanghai First Maternity and Infant Hospital',
 '上海市第一妇婴保健院',
 'shanghai-first-maternity-infant-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en"}',
 900,
 'Founded 1947. One of China''s top maternity and IVF centers. Performs 15,000+ deliveries annually. Strong assisted reproduction department (IVF, IUI). Comprehensive prenatal diagnostics and fetal medicine program.',
 'https://www.51mch.com', false),

-- 29. 九院
('Shanghai Ninth People''s Hospital',
 '上海交通大学医学院附属第九人民医院',
 'shanghai-ninth-peoples-hospital',
 (SELECT id FROM cities WHERE slug = 'shanghai'),
 '三甲', false, true,
 '{"zh","en","ko"}',
 2000,
 'China''s #1 ranked plastic and reconstructive surgery hospital. Also #1 in oral/maxillofacial surgery and dental implants. The go-to destination for cosmetic surgery (rhinoplasty, facelift) and complex craniofacial reconstruction. Over 50,000 cosmetic procedures annually.',
 'https://www.9hospital.com.cn', true),


-- --------------------------------------------------------
-- GUANGZHOU (4)
-- --------------------------------------------------------

-- 30. 中山一院
('The First Affiliated Hospital of Sun Yat-sen University',
 '中山大学附属第一医院',
 'sun-yat-sen-first-affiliated-hospital',
 (SELECT id FROM cities WHERE slug = 'guangzhou'),
 '三甲', false, true,
 '{"zh","en"}',
 3500,
 'South China''s #1 hospital. Founded 1910. National leader in organ transplant (liver, kidney, heart), hepatobiliary surgery, and endocrinology. One of the largest hospitals in China with 3,500 beds. Strong international patient department.',
 'https://www.fahsysu.org.cn', true),

-- 31. 省人民
('Guangdong Provincial People''s Hospital',
 '广东省人民医院',
 'guangdong-provincial-peoples-hospital',
 (SELECT id FROM cities WHERE slug = 'guangzhou'),
 '三甲', false, true,
 '{"zh","en"}',
 2800,
 'Guangdong''s largest hospital. National leader in cardiac surgery (performs 8,000+ cardiac procedures/year), structural heart disease, and lung cancer surgery. Strong pediatric cardiac surgery program. Modern international medical center wing.',
 'https://www.gdghospital.org.cn', false),

-- 32. 南方医院
('Nanfang Hospital, Southern Medical University',
 '南方医科大学南方医院',
 'nanfang-hospital',
 (SELECT id FROM cities WHERE slug = 'guangzhou'),
 '三甲', false, true,
 '{"zh","en"}',
 2200,
 'Formerly a top military hospital, transferred to civilian use. National leader in hepatology, organ transplant, and hematology (bone marrow transplant). Strong digestive endoscopy and minimally invasive surgery programs.',
 'https://www.nfyy.com', false),

-- 33. 复大肿瘤
('Fuda Cancer Hospital',
 '暨南大学附属复大肿瘤医院',
 'fuda-cancer-hospital',
 (SELECT id FROM cities WHERE slug = 'guangzhou'),
 '三甲', true, true,
 '{"zh","en","ar","id","ms","ru"}',
 800,
 'JCI-accredited cancer hospital specializing in cryosurgery (cryoablation), irreversible electroporation (NanoKnife), and combined immunotherapy for advanced cancers. Treats 3,000+ international patients annually from 80+ countries. Multilingual coordinators for Southeast Asian and Middle Eastern patients.',
 'https://www.fudahospital.com', true),


-- --------------------------------------------------------
-- SHENZHEN (2)
-- --------------------------------------------------------

-- 34. 港大深圳
('The University of Hong Kong-Shenzhen Hospital',
 '香港大学深圳医院',
 'hku-shenzhen-hospital',
 (SELECT id FROM cities WHERE slug = 'shenzhen'),
 '三甲', true, true,
 '{"zh","en","yue"}',
 2000,
 'JCI-accredited. Hong Kong-managed public hospital in Shenzhen, opened 2012. Combines HKU medical standards with mainland accessibility. International-standard appointment system, single-patient rooms, and bilingual staff. Strong in general surgery, oncology, and health screening.',
 'https://www.hku-szh.org', true),

-- 35. 中山七院
('The Seventh Affiliated Hospital of Sun Yat-sen University',
 '中山大学附属第七医院',
 'sun-yat-sen-seventh-affiliated-hospital',
 (SELECT id FROM cities WHERE slug = 'shenzhen'),
 '三甲', false, true,
 '{"zh","en"}',
 4000,
 'Shenzhen''s newest mega-hospital, opened 2018 with Sun Yat-sen University backing. Modern facilities, AI-assisted diagnostics. Strong in gastroenterology, oncology, and minimally invasive surgery. 4,000-bed planned capacity.',
 'https://www.zsqyy.com', false),


-- --------------------------------------------------------
-- HANGZHOU (2)
-- --------------------------------------------------------

-- 36. 浙一
('The First Affiliated Hospital of Zhejiang University',
 '浙江大学医学院附属第一医院',
 'zhejiang-university-first-hospital',
 (SELECT id FROM cities WHERE slug = 'hangzhou'),
 '三甲', false, true,
 '{"zh","en"}',
 3200,
 'Zhejiang''s #1 hospital. China''s top-ranked in liver transplant (highest volume globally), hepatobiliary-pancreatic surgery, and kidney transplant. Strong infectious disease department (led COVID-19 treatment research). 3,200 beds across two campuses.',
 'https://www.zy91.com', true),

-- 37. 浙二
('The Second Affiliated Hospital of Zhejiang University',
 '浙江大学医学院附属第二医院',
 'zhejiang-university-second-hospital',
 (SELECT id FROM cities WHERE slug = 'hangzhou'),
 '三甲', false, true,
 '{"zh","en"}',
 3200,
 'Top-ranked in ophthalmology, neurosurgery, and orthopedics. Pioneered telemedicine in China. National leader in LASIK and vitreoretinal surgery. Strong burn surgery and emergency medicine. Modern international medical center.',
 'https://www.z2hospital.com', false),


-- --------------------------------------------------------
-- CHENGDU (1)
-- --------------------------------------------------------

-- 38. 华西
('West China Hospital, Sichuan University',
 '四川大学华西医院',
 'west-china-hospital',
 (SELECT id FROM cities WHERE slug = 'chengdu'),
 '三甲', false, true,
 '{"zh","en"}',
 4300,
 'Consistently ranked #2 in China (after Peking Union). Founded 1892 by Western missionaries. The largest single-site hospital in the world with 4,300 beds. National leader in evidence-based medicine, oral/dental surgery, pulmonology, and clinical pharmacy. West China School of Stomatology is China''s #1 dental school.',
 'https://www.wchscu.cn', true),


-- --------------------------------------------------------
-- CHANGSHA (1)
-- --------------------------------------------------------

-- 39. 湘雅
('Xiangya Hospital, Central South University',
 '中南大学湘雅医院',
 'xiangya-hospital',
 (SELECT id FROM cities WHERE slug = 'changsha'),
 '三甲', false, true,
 '{"zh","en"}',
 3500,
 'One of China''s most prestigious hospitals, founded 1906 by Yale-China Association. Known as "the Johns Hopkins of China". National leader in neurology, neurosurgery, thoracic surgery, and rehabilitation medicine. Performed China''s first human genome sequencing for clinical diagnosis.',
 'https://www.xiangya.com.cn', true),


-- --------------------------------------------------------
-- XI'AN (1)
-- --------------------------------------------------------

-- 40. 西京
('Xijing Hospital, Air Force Medical University',
 '空军军医大学西京医院',
 'xijing-hospital',
 (SELECT id FROM cities WHERE slug = 'xian'),
 '三甲', false, true,
 '{"zh","en"}',
 3000,
 'Northwest China''s #1 hospital and top military medical center. Performed China''s first heart-lung combined transplant and the world''s first in-utero spina bifida repair. National leader in plastic/burn surgery, dermatology, and digestive endoscopy. Founded 1939.',
 'https://www.xjhosp.com', true)

ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- 3. TREATMENTS (18)
-- ============================================================

INSERT INTO treatments (category, name_en, name_zh, name_ru, slug, price_range_min, price_range_max, popular, duration_days_min, duration_days_max, recovery_days, hospital_stay_required, description_en) VALUES
  ('dental',
   'Dental Implant (Single)', '单颗种植牙', 'Зубной имплант (один)',
   'dental-implant-single', 800, 3000, true,
   1, 3, 90, false,
   'Single tooth dental implant using premium materials (Straumann, Nobel Biocare). Includes consultation, CT scan, implant placement, and crown. China offers the same implant brands used in Western clinics at 60-80% savings.'),

  ('dental',
   'Full Mouth Implants', '全口种植牙', 'Полные зубные импланты',
   'full-mouth-implants', 8000, 20000, true,
   3, 7, 120, false,
   'All-on-4 or All-on-6 full arch restoration. Includes implants, temporary and permanent prosthetics. May require bone grafting. Two trips typically needed: placement + final crown fitting 3-4 months later.'),

  ('dental',
   'Dental Veneers (per tooth)', '牙贴面（单颗）', 'Виниры (за зуб)',
   'dental-veneers', 300, 800, false,
   2, 5, 7, false,
   'Porcelain or composite veneers for cosmetic improvement. Includes consultation, preparation, and placement. Most patients do 6-10 teeth for a complete smile makeover.'),

  ('eye',
   'LASIK Surgery', '近视激光手术', 'Лазерная коррекция зрения LASIK',
   'lasik-surgery', 1200, 2500, true,
   1, 2, 7, false,
   'Bladeless LASIK or SMILE laser vision correction for myopia, hyperopia, and astigmatism. Uses latest Zeiss VisuMax or Alcon platforms. Same-day procedure for both eyes. 20/20 vision typically achieved within 24 hours.'),

  ('eye',
   'ICL Implant', 'ICL 晶体植入', 'Имплантация ICL линз',
   'icl-implant', 2500, 4000, false,
   1, 2, 14, false,
   'Implantable Collamer Lens for high myopia (-6D to -20D) or patients unsuitable for LASIK. Reversible procedure using Visian ICL. Same-day procedure, one eye at a time.'),

  ('oncology',
   'CAR-T Cell Therapy', 'CAR-T 细胞治疗', 'CAR-T клеточная терапия',
   'car-t-therapy', 30000, 80000, true,
   21, 60, 90, true,
   'Chimeric Antigen Receptor T-cell therapy for blood cancers (leukemia, lymphoma). China has 6 NMPA-approved CAR-T products at 1/5 to 1/10 the US price. Includes cell collection, manufacturing, infusion, and monitoring. Potential for complete remission.'),

  ('tcm',
   'TCM Pain Management', '中医疼痛调理', 'Лечение боли методами ТКМ',
   'tcm-pain-management', 500, 3000, true,
   7, 21, 0, false,
   'Comprehensive traditional Chinese medicine program combining acupuncture, herbal medicine, tuina massage, and cupping for chronic pain conditions. Treats back pain, arthritis, migraines, and fibromyalgia. Programs at top TCM hospitals.'),

  ('tcm',
   'Acupuncture Program', '针灸疗程', 'Курс акупунктуры',
   'acupuncture-program', 300, 2000, false,
   7, 14, 0, false,
   'Structured acupuncture treatment program (10-20 sessions) for pain, stress, fertility support, and neurological conditions. Performed by licensed TCM practitioners at accredited hospitals. Often combined with herbal medicine.'),

  ('orthopedic',
   'Knee Replacement', '膝关节置换', 'Замена коленного сустава',
   'knee-replacement', 6000, 10000, true,
   5, 10, 60, true,
   'Total or partial knee arthroplasty using premium implants (Zimmer, DePuy, Smith & Nephew). Includes pre-op assessment, surgery, hospital stay (5-7 days), and initial rehabilitation. Robotic-assisted surgery available at top hospitals.'),

  ('orthopedic',
   'Spinal Fusion', '脊柱融合手术', 'Спондилодез',
   'spinal-fusion', 8000, 15000, false,
   7, 14, 90, true,
   'Anterior or posterior spinal fusion for herniated disc, spinal stenosis, or spondylolisthesis. Minimally invasive options available. Includes hardware (screws, rods, cages), hospital stay, and rehabilitation planning.'),

  ('cosmetic',
   'Rhinoplasty', '隆鼻手术', 'Ринопластика',
   'rhinoplasty', 2000, 5000, true,
   1, 3, 14, false,
   'Nose reshaping surgery (augmentation, reduction, or revision). Uses autologous cartilage, silicone, or Gore-Tex depending on case. Shanghai Ninth People''s Hospital is China''s #1 center for this procedure.'),

  ('cosmetic',
   'Facelift', '面部提升', 'Подтяжка лица',
   'facelift', 3000, 8000, false,
   1, 3, 21, false,
   'Full or mini facelift (rhytidectomy) for facial rejuvenation. Options include deep plane, SMAS, or thread lift. Often combined with blepharoplasty (eyelid surgery) and fat grafting.'),

  ('fertility',
   'IVF Cycle', '试管婴儿', 'Цикл ЭКО',
   'ivf-cycle', 4000, 8000, true,
   21, 35, 14, false,
   'Complete in-vitro fertilization cycle including ovarian stimulation, egg retrieval, fertilization, embryo culture, and transfer. PGT-A genetic testing available. China''s top centers (PKU Third Hospital, CITIC-Xiangya) have success rates comparable to US clinics.'),

  ('cardiac',
   'Heart Bypass Surgery', '心脏搭桥手术', 'Аортокоронарное шунтирование',
   'heart-bypass', 10000, 25000, false,
   10, 21, 60, true,
   'Coronary artery bypass grafting (CABG) for blocked heart arteries. On-pump or off-pump options. China''s top cardiac centers (Fuwai, Zhongshan) perform thousands annually with outcomes matching global standards.'),

  ('checkup',
   'Executive Health Screening', '高端体检套餐', 'Комплексное медобследование',
   'executive-health-check', 300, 2000, true,
   1, 2, 0, false,
   'Comprehensive VIP health checkup including blood tests, imaging (CT, MRI, ultrasound), cardiac assessment, cancer markers, genetic screening, and specialist consultations. Completed in 1-2 days with bilingual reports. Available at premium centers in all major cities.'),

  ('stem_cell',
   'Stem Cell Therapy', '干细胞治疗', 'Терапия стволовыми клетками',
   'stem-cell-therapy', 5000, 25000, true,
   7, 21, 30, false,
   'Autologous or allogeneic stem cell treatments for degenerative conditions, autoimmune diseases, and anti-aging. Includes mesenchymal stem cell (MSC) infusions. China has NMPA-approved stem cell clinical trial centers. Programs tailored to each patient.'),

  ('neurology',
   'Deep Brain Stimulation', '脑深部电刺激', 'Глубокая стимуляция мозга',
   'deep-brain-stimulation', 15000, 25000, false,
   7, 14, 30, true,
   'DBS implant surgery for Parkinson''s disease, essential tremor, and dystonia. Includes electrode placement, stimulator implantation, and programming. Beijing Tiantan Hospital is China''s leading center for this procedure.'),

  ('bariatric',
   'Gastric Sleeve', '胃袖状切除', 'Рукавная гастрэктомия',
   'gastric-sleeve', 5000, 12000, false,
   3, 7, 30, true,
   'Laparoscopic sleeve gastrectomy for obesity (BMI 35+). Removes ~80% of stomach. Includes pre-op assessment, surgery, 2-3 day hospital stay, and nutritional counseling. Average excess weight loss of 60-70% within first year.')

ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- Update city hospital_count to match actual inserted data
-- ============================================================

UPDATE cities SET hospital_count = (
  SELECT COUNT(*) FROM hospitals WHERE hospitals.city_id = cities.id
);
