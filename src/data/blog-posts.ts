export type BlogCategory = 'dental' | 'eye' | 'cosmetic' | 'oncology' | 'orthopedic' | 'general'

export interface BlogPost {
  slug: string
  title_en: string
  title_zh: string
  title_ru: string
  excerpt_en: string
  excerpt_zh: string
  excerpt_ru: string
  content_en: string
  content_zh: string
  content_ru: string
  category: BlogCategory
  date: string
  readingTime: number
  metaDescription_en: string
  metaDescription_zh: string
  metaDescription_ru: string
}

export const blogCategories: BlogCategory[] = [
  'dental',
  'eye',
  'cosmetic',
  'oncology',
  'orthopedic',
  'general',
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'dental-implants-china-complete-guide',
    title_en: 'Dental Implants in China: A Complete Guide for International Patients',
    title_zh: '中国种植牙：国际患者完整指南',
    title_ru: 'Зубные импланты в Китае: полное руководство для иностранных пациентов',
    excerpt_en: 'Everything you need to know about getting dental implants in China — from costs and hospitals to the treatment process and what to expect.',
    excerpt_zh: '关于在中国做种植牙您需要了解的一切——从费用和医院到治疗流程和注意事项。',
    excerpt_ru: 'Всё, что нужно знать о зубных имплантах в Китае — от стоимости и больниц до процесса лечения и чего ожидать.',
    category: 'dental',
    date: '2026-02-15',
    readingTime: 8,
    metaDescription_en: 'Complete guide to dental implants in China for international patients. Compare costs, top hospitals, treatment timeline, and tips for a successful dental trip.',
    metaDescription_zh: '国际患者在中国做种植牙的完整指南。比较费用、顶级医院、治疗时间线和成功就医的建议。',
    metaDescription_ru: 'Полное руководство по зубным имплантам в Китае для иностранных пациентов. Сравнение цен, лучшие больницы, сроки лечения и советы.',
    content_en: `
<h2 id="why-china">Why Choose China for Dental Implants?</h2>
<p>China has become one of the world's leading destinations for dental tourism, and for good reason. The country offers a compelling combination of advanced dental technology, highly trained specialists, and costs that are 60–80% lower than in the United States, Canada, or Western Europe.</p>
<p>Chinese dental hospitals use the same implant brands trusted worldwide — Straumann, Nobel Biocare, and Osstem — but at a fraction of the Western price. Many top hospitals have dedicated international patient departments with English-speaking coordinators.</p>

<h2 id="cost-comparison">Cost Comparison: China vs Other Countries</h2>
<p>Here's what you can expect to pay for a single dental implant (including crown):</p>
<ul>
<li><strong>China:</strong> $1,500–$3,000</li>
<li><strong>United States:</strong> $3,000–$6,000</li>
<li><strong>South Korea:</strong> $1,800–$2,500</li>
<li><strong>Thailand:</strong> $1,500–$2,200</li>
</ul>
<p>For full mouth implants (All-on-4 or All-on-6), the savings are even more dramatic — patients regularly save $20,000–$40,000 compared to US prices.</p>

<h2 id="top-hospitals">Top Dental Hospitals in China</h2>
<p>Several hospitals stand out for dental implant procedures:</p>
<ul>
<li><strong>Shanghai Ninth People's Hospital</strong> — One of Asia's largest dental centers with over 500 implant procedures per month</li>
<li><strong>Peking University School of Stomatology</strong> — China's top-ranked dental institution with cutting-edge research facilities</li>
<li><strong>West China Hospital of Stomatology</strong> — Affiliated with Sichuan University, known for complex implant cases</li>
</ul>

<h2 id="treatment-process">The Treatment Process</h2>
<p>A typical dental implant journey in China follows these steps:</p>
<h3 id="initial-consultation">1. Initial Consultation (Remote)</h3>
<p>Before traveling, you'll share your dental X-rays and medical history with the hospital. The doctor will create a preliminary treatment plan and cost estimate.</p>
<h3 id="arrival-examination">2. Arrival & Examination</h3>
<p>On arrival, you'll undergo a comprehensive dental examination including a 3D CT scan. The doctor will finalize your treatment plan.</p>
<h3 id="implant-surgery">3. Implant Surgery</h3>
<p>The implant post is placed into the jawbone under local anesthesia. The procedure typically takes 30–60 minutes per implant. Most patients experience minimal discomfort.</p>
<h3 id="healing-period">4. Healing Period</h3>
<p>The implant needs 3–6 months to integrate with the bone. You can return home during this period. Some hospitals offer same-day temporary crowns.</p>
<h3 id="crown-placement">5. Crown Placement</h3>
<p>On your second visit, the permanent crown is attached to the implant. This visit usually takes 3–5 days.</p>

<h2 id="tips">Tips for International Dental Patients</h2>
<ul>
<li>Request a detailed treatment plan and cost breakdown before traveling</li>
<li>Ask about the implant brand and warranty — reputable hospitals use internationally certified brands</li>
<li>Plan for two trips if getting traditional implants (surgery + crown placement)</li>
<li>Many hospitals offer airport pickup and hotel recommendations near the hospital</li>
<li>Keep all dental records and receipts for potential insurance reimbursement</li>
</ul>
`,
    content_zh: `
<h2 id="why-china">为什么选择在中国做种植牙？</h2>
<p>中国已成为世界领先的牙科旅游目的地之一，原因是多方面的。中国提供了先进的牙科技术、训练有素的专家以及比美国、加拿大或西欧低60-80%的费用的完美组合。</p>
<p>中国的牙科医院使用全球信赖的同品牌种植体——士卓曼（Straumann）、诺贝尔（Nobel Biocare）和奥齿泰（Osstem）——但价格仅为西方的一小部分。许多顶级医院设有专门的国际患者部，配备英语协调员。</p>

<h2 id="cost-comparison">费用对比：中国 vs 其他国家</h2>
<p>单颗种植牙（含牙冠）的预期费用如下：</p>
<ul>
<li><strong>中国：</strong>$1,500–$3,000</li>
<li><strong>美国：</strong>$3,000–$6,000</li>
<li><strong>韩国：</strong>$1,800–$2,500</li>
<li><strong>泰国：</strong>$1,500–$2,200</li>
</ul>
<p>对于全口种植（All-on-4或All-on-6），节省更加显著——与美国价格相比，患者通常可节省$20,000–$40,000。</p>

<h2 id="top-hospitals">中国顶级牙科医院</h2>
<p>以下医院在种植牙手术方面尤为突出：</p>
<ul>
<li><strong>上海第九人民医院</strong> — 亚洲最大的牙科中心之一，每月完成超过500例种植手术</li>
<li><strong>北京大学口腔医院</strong> — 中国排名第一的牙科机构，拥有尖端研究设施</li>
<li><strong>华西口腔医院</strong> — 四川大学附属，以复杂种植病例著称</li>
</ul>

<h2 id="treatment-process">治疗流程</h2>
<p>在中国做种植牙的典型流程如下：</p>
<h3 id="initial-consultation">1. 初步咨询（远程）</h3>
<p>出行前，您将与医院分享牙科X光片和病史。医生会制定初步治疗方案和费用估算。</p>
<h3 id="arrival-examination">2. 到达与检查</h3>
<p>到达后，您将接受全面的牙科检查，包括3D CT扫描。医生将最终确定治疗方案。</p>
<h3 id="implant-surgery">3. 种植手术</h3>
<p>在局部麻醉下将种植体植入颌骨。每颗种植体手术通常需要30-60分钟。大多数患者感觉不适感很小。</p>
<h3 id="healing-period">4. 愈合期</h3>
<p>种植体需要3-6个月与骨骼融合。此期间您可以回国。一些医院提供当天临时牙冠。</p>
<h3 id="crown-placement">5. 安装牙冠</h3>
<p>第二次来访时，将永久牙冠安装到种植体上。此次就诊通常需要3-5天。</p>

<h2 id="tips">国际牙科患者建议</h2>
<ul>
<li>出行前要求详细的治疗方案和费用明细</li>
<li>询问种植体品牌和保修——正规医院使用国际认证品牌</li>
<li>如果做传统种植牙，计划两次行程（手术+安装牙冠）</li>
<li>许多医院提供机场接送和医院附近的酒店推荐</li>
<li>保留所有牙科记录和收据，以备保险报销</li>
</ul>
`,
    content_ru: `
<h2 id="why-china">Почему стоит выбрать Китай для зубных имплантов?</h2>
<p>Китай стал одним из ведущих направлений стоматологического туризма в мире, и на то есть веские причины. Страна предлагает передовые стоматологические технологии, высококвалифицированных специалистов и цены на 60–80% ниже, чем в США, Канаде или Западной Европе.</p>
<p>Китайские стоматологические больницы используют те же бренды имплантов, которым доверяют во всём мире — Straumann, Nobel Biocare и Osstem — но по значительно более низкой цене. Многие ведущие больницы имеют специализированные международные отделения с англоязычными координаторами.</p>

<h2 id="cost-comparison">Сравнение цен: Китай vs другие страны</h2>
<p>Ориентировочная стоимость одного зубного импланта (с коронкой):</p>
<ul>
<li><strong>Китай:</strong> $1 500–$3 000</li>
<li><strong>США:</strong> $3 000–$6 000</li>
<li><strong>Южная Корея:</strong> $1 800–$2 500</li>
<li><strong>Таиланд:</strong> $1 500–$2 200</li>
</ul>
<p>При полной имплантации (All-on-4 или All-on-6) экономия ещё значительнее — пациенты обычно экономят $20 000–$40 000 по сравнению с ценами в США.</p>

<h2 id="top-hospitals">Лучшие стоматологические больницы Китая</h2>
<p>Несколько больниц особенно выделяются в области имплантации:</p>
<ul>
<li><strong>Шанхайская девятая народная больница</strong> — Один из крупнейших стоматологических центров Азии, более 500 имплантаций в месяц</li>
<li><strong>Стоматологическая школа Пекинского университета</strong> — Ведущее стоматологическое учреждение Китая с передовыми исследовательскими лабораториями</li>
<li><strong>Западнокитайская стоматологическая больница</strong> — При Сычуаньском университете, известна сложными случаями имплантации</li>
</ul>

<h2 id="treatment-process">Процесс лечения</h2>
<p>Типичный путь пациента при имплантации в Китае:</p>
<h3 id="initial-consultation">1. Первичная консультация (удалённо)</h3>
<p>Перед поездкой вы поделитесь рентгеновскими снимками и медицинской историей с больницей. Врач составит предварительный план лечения и смету.</p>
<h3 id="arrival-examination">2. Прибытие и обследование</h3>
<p>По прибытии вас ждёт комплексное стоматологическое обследование, включая 3D КТ-сканирование. Врач утвердит окончательный план лечения.</p>
<h3 id="implant-surgery">3. Операция по имплантации</h3>
<p>Имплант устанавливается в челюстную кость под местной анестезией. Процедура обычно занимает 30–60 минут на один имплант. Большинство пациентов испытывают минимальный дискомфорт.</p>
<h3 id="healing-period">4. Период заживления</h3>
<p>Импланту требуется 3–6 месяцев для интеграции с костью. В этот период можно вернуться домой. Некоторые больницы предлагают временные коронки в день операции.</p>
<h3 id="crown-placement">5. Установка коронки</h3>
<p>Во время второго визита постоянная коронка крепится к импланту. Этот визит обычно занимает 3–5 дней.</p>

<h2 id="tips">Советы для иностранных пациентов</h2>
<ul>
<li>Запросите подробный план лечения и разбивку расходов перед поездкой</li>
<li>Уточните марку импланта и гарантию — авторитетные больницы используют международно сертифицированные бренды</li>
<li>Планируйте две поездки при традиционной имплантации (операция + установка коронки)</li>
<li>Многие больницы предлагают трансфер из аэропорта и рекомендации по отелям рядом с больницей</li>
<li>Сохраняйте все медицинские записи и чеки для возможного страхового возмещения</li>
</ul>
`,
  },
  {
    slug: 'lasik-eye-surgery-china-what-to-expect',
    title_en: 'LASIK Eye Surgery in China: What to Expect and How Much You Can Save',
    title_zh: 'LASIK近视手术在中国：期望什么以及能节省多少',
    title_ru: 'LASIK в Китае: чего ожидать и сколько можно сэкономить',
    excerpt_en: 'China is home to some of the world\'s busiest LASIK centers. Learn about the procedure, costs, and why thousands of international patients choose China for vision correction.',
    excerpt_zh: '中国拥有世界上最繁忙的LASIK中心。了解手术流程、费用，以及为什么数千名国际患者选择在中国矫正视力。',
    excerpt_ru: 'В Китае расположены одни из самых загруженных LASIK-центров мира. Узнайте о процедуре, стоимости и почему тысячи иностранных пациентов выбирают Китай для коррекции зрения.',
    category: 'eye',
    date: '2026-02-10',
    readingTime: 6,
    metaDescription_en: 'Guide to LASIK eye surgery in China. Compare costs, learn about top eye hospitals, and understand the procedure timeline for international patients.',
    metaDescription_zh: '中国LASIK近视手术指南。比较费用，了解顶级眼科医院，以及国际患者的手术时间线。',
    metaDescription_ru: 'Руководство по LASIK-хирургии в Китае. Сравнение цен, лучшие глазные больницы и сроки процедуры для иностранных пациентов.',
    content_en: `
<h2 id="overview">LASIK in China: An Overview</h2>
<p>China performs more LASIK procedures annually than any other country in the world. With hospitals like Beijing Tongren Hospital and Zhongshan Ophthalmic Center handling thousands of cases per year, Chinese eye surgeons have unmatched experience.</p>
<p>The latest technologies — including femtosecond lasers, SMILE (Small Incision Lenticule Extraction), and ICL implants — are all widely available in major Chinese cities.</p>

<h2 id="cost-savings">Cost Savings</h2>
<p>LASIK pricing in China is significantly lower than Western countries:</p>
<ul>
<li><strong>China:</strong> $1,200–$2,500 (both eyes)</li>
<li><strong>United States:</strong> $4,000–$6,000</li>
<li><strong>United Kingdom:</strong> $3,500–$5,000</li>
<li><strong>South Korea:</strong> $1,800–$2,500</li>
</ul>
<p>Even including flights and accommodation, most patients save 40–60% compared to having the procedure done at home.</p>

<h2 id="procedure-types">Available Procedures</h2>
<h3 id="traditional-lasik">Traditional LASIK</h3>
<p>The most common procedure, using a microkeratome or femtosecond laser to create a corneal flap. Recovery is fast — most patients see clearly within 24 hours.</p>
<h3 id="smile">SMILE</h3>
<p>A newer, minimally invasive technique that corrects vision through a tiny incision. Less dry eye symptoms and faster recovery than traditional LASIK.</p>
<h3 id="icl">ICL (Implantable Collamer Lens)</h3>
<p>For patients with high myopia or thin corneas who aren't candidates for LASIK. A biocompatible lens is implanted inside the eye. Reversible and excellent visual quality.</p>

<h2 id="top-eye-hospitals">Top Eye Hospitals</h2>
<ul>
<li><strong>Beijing Tongren Hospital</strong> — China's most famous eye hospital, performing 10,000+ refractive surgeries annually</li>
<li><strong>Zhongshan Ophthalmic Center (Guangzhou)</strong> — Sun Yat-sen University affiliated, a leader in ophthalmology research</li>
<li><strong>Eye & ENT Hospital of Fudan University (Shanghai)</strong> — One of Asia's top eye centers with cutting-edge equipment</li>
</ul>

<h2 id="timeline">Treatment Timeline</h2>
<p>One of the best things about LASIK is how quick the entire process is:</p>
<ul>
<li><strong>Day 1:</strong> Comprehensive eye exam and consultation</li>
<li><strong>Day 2:</strong> LASIK procedure (15–20 minutes)</li>
<li><strong>Day 3:</strong> Post-operative check-up</li>
<li><strong>Day 4–5:</strong> Final check and clearance to fly home</li>
</ul>
<p>Most international patients need only 4–5 days in China for the entire trip.</p>

<h2 id="preparation">How to Prepare</h2>
<ul>
<li>Stop wearing contact lenses at least 2 weeks before the procedure (4 weeks for hard lenses)</li>
<li>Bring your most recent eye prescription and any previous exam records</li>
<li>Arrange for someone to accompany you on the day of surgery</li>
<li>Pack sunglasses — your eyes will be sensitive to light for a few days</li>
</ul>
`,
    content_zh: `
<h2 id="overview">中国LASIK手术概述</h2>
<p>中国每年进行的LASIK手术数量居世界第一。北京同仁医院、中山眼科中心等医院每年处理数千例病例，中国眼科医生拥有无与伦比的经验。</p>
<p>最新技术——包括飞秒激光、SMILE（全飞秒）和ICL人工晶体植入——在中国各大城市均已广泛应用。</p>

<h2 id="cost-savings">费用节省</h2>
<p>中国LASIK手术价格远低于西方国家：</p>
<ul>
<li><strong>中国：</strong>$1,200–$2,500（双眼）</li>
<li><strong>美国：</strong>$4,000–$6,000</li>
<li><strong>英国：</strong>$3,500–$5,000</li>
<li><strong>韩国：</strong>$1,800–$2,500</li>
</ul>
<p>即使算上机票和住宿，大多数患者与在本国手术相比仍可节省40-60%。</p>

<h2 id="procedure-types">可选手术类型</h2>
<h3 id="traditional-lasik">传统LASIK</h3>
<p>最常见的手术方式，使用角膜微切刀或飞秒激光制作角膜瓣。恢复快——大多数患者在24小时内即可看清。</p>
<h3 id="smile">全飞秒SMILE</h3>
<p>一种较新的微创技术，通过微小切口矫正视力。比传统LASIK干眼症状更少，恢复更快。</p>
<h3 id="icl">ICL（可植入式接触镜）</h3>
<p>适用于高度近视或角膜较薄、不适合做LASIK的患者。将生物相容性镜片植入眼内。可逆且视觉质量优异。</p>

<h2 id="top-eye-hospitals">顶级眼科医院</h2>
<ul>
<li><strong>北京同仁医院</strong> — 中国最著名的眼科医院，每年进行10,000+例屈光手术</li>
<li><strong>中山眼科中心（广州）</strong> — 中山大学附属，眼科研究领导者</li>
<li><strong>复旦大学附属眼耳鼻喉科医院（上海）</strong> — 亚洲顶级眼科中心之一，设备先进</li>
</ul>

<h2 id="timeline">治疗时间线</h2>
<p>LASIK最大的优势之一就是整个过程非常快：</p>
<ul>
<li><strong>第1天：</strong>全面眼科检查和咨询</li>
<li><strong>第2天：</strong>LASIK手术（15-20分钟）</li>
<li><strong>第3天：</strong>术后复查</li>
<li><strong>第4-5天：</strong>最终检查，可以乘飞机回家</li>
</ul>
<p>大多数国际患者整个行程只需在中国停留4-5天。</p>

<h2 id="preparation">如何准备</h2>
<ul>
<li>手术前至少2周停止戴隐形眼镜（硬性镜片需4周）</li>
<li>携带最近的验光处方和以前的检查记录</li>
<li>安排手术当天有人陪同</li>
<li>带上太阳镜——术后几天眼睛会对光线敏感</li>
</ul>
`,
    content_ru: `
<h2 id="overview">LASIK в Китае: обзор</h2>
<p>Китай проводит больше LASIK-операций в год, чем любая другая страна мира. Такие больницы, как Пекинская больница Тунжэнь и Офтальмологический центр Чжуншань, выполняют тысячи операций ежегодно, что даёт китайским хирургам непревзойдённый опыт.</p>
<p>Новейшие технологии — фемтосекундные лазеры, SMILE и ICL-импланты — широко доступны во всех крупных городах Китая.</p>

<h2 id="cost-savings">Экономия</h2>
<p>Стоимость LASIK в Китае значительно ниже, чем в западных странах:</p>
<ul>
<li><strong>Китай:</strong> $1 200–$2 500 (оба глаза)</li>
<li><strong>США:</strong> $4 000–$6 000</li>
<li><strong>Великобритания:</strong> $3 500–$5 000</li>
<li><strong>Южная Корея:</strong> $1 800–$2 500</li>
</ul>
<p>Даже с учётом перелёта и проживания большинство пациентов экономят 40–60% по сравнению с операцией дома.</p>

<h2 id="procedure-types">Доступные процедуры</h2>
<h3 id="traditional-lasik">Традиционный LASIK</h3>
<p>Самая распространённая процедура с использованием микрокератома или фемтосекундного лазера для создания роговичного лоскута. Быстрое восстановление — большинство пациентов видят чётко в течение 24 часов.</p>
<h3 id="smile">SMILE</h3>
<p>Более новая, минимально инвазивная техника коррекции зрения через крошечный разрез. Меньше симптомов сухого глаза и быстрое восстановление.</p>
<h3 id="icl">ICL (имплантируемая линза)</h3>
<p>Для пациентов с высокой миопией или тонкой роговицей. Биосовместимая линза имплантируется внутрь глаза. Обратимая процедура с отличным качеством зрения.</p>

<h2 id="top-eye-hospitals">Лучшие глазные больницы</h2>
<ul>
<li><strong>Пекинская больница Тунжэнь</strong> — Самая известная глазная больница Китая, 10 000+ рефракционных операций в год</li>
<li><strong>Офтальмологический центр Чжуншань (Гуанчжоу)</strong> — При университете Сунь Ятсена, лидер офтальмологических исследований</li>
<li><strong>Глазная больница Фуданьского университета (Шанхай)</strong> — Один из лучших центров Азии с современным оборудованием</li>
</ul>

<h2 id="timeline">Сроки лечения</h2>
<p>Одно из главных преимуществ LASIK — скорость всего процесса:</p>
<ul>
<li><strong>День 1:</strong> Комплексное обследование глаз и консультация</li>
<li><strong>День 2:</strong> Процедура LASIK (15–20 минут)</li>
<li><strong>День 3:</strong> Послеоперационный осмотр</li>
<li><strong>День 4–5:</strong> Финальный осмотр и разрешение на перелёт</li>
</ul>
<p>Большинству иностранных пациентов для всей поездки достаточно 4–5 дней в Китае.</p>

<h2 id="preparation">Как подготовиться</h2>
<ul>
<li>Прекратите носить контактные линзы минимум за 2 недели до процедуры (4 недели для жёстких линз)</li>
<li>Возьмите последний рецепт на очки и результаты предыдущих обследований</li>
<li>Организуйте сопровождение в день операции</li>
<li>Возьмите солнечные очки — глаза будут чувствительны к свету несколько дней</li>
</ul>
`,
  },
  {
    slug: 'medical-tourism-china-first-time-guide',
    title_en: 'Your First Medical Trip to China: Everything You Need to Know',
    title_zh: '首次来中国就医：您需要了解的一切',
    title_ru: 'Первая медицинская поездка в Китай: всё, что нужно знать',
    excerpt_en: 'Planning your first medical trip to China? This comprehensive guide covers visas, travel tips, hospital etiquette, and how to make the most of your medical journey.',
    excerpt_zh: '计划首次来中国就医？本综合指南涵盖签证、出行建议、医院礼仪以及如何充分利用您的医疗之旅。',
    excerpt_ru: 'Планируете первую медицинскую поездку в Китай? Это руководство охватывает визы, советы по путешествию, больничный этикет и как максимально использовать поездку.',
    category: 'general',
    date: '2026-02-05',
    readingTime: 10,
    metaDescription_en: 'First-time medical tourism guide to China. Visa requirements, travel tips, hospital etiquette, costs, and step-by-step planning for international patients.',
    metaDescription_zh: '首次来中国医疗旅游指南。签证要求、出行建议、医院礼仪、费用和国际患者的逐步规划。',
    metaDescription_ru: 'Руководство по медицинскому туризму в Китае для новичков. Визовые требования, советы по поездке, больничный этикет и пошаговое планирование.',
    content_en: `
<h2 id="why-medical-tourism">Why Medical Tourism in China?</h2>
<p>China's healthcare system has undergone a remarkable transformation in the past decade. Today, the country boasts over 2,000 Grade III-A hospitals (the highest classification), many with JCI accreditation and dedicated international patient departments.</p>
<p>The combination of world-class medical expertise, cutting-edge technology, and significantly lower costs makes China an increasingly attractive destination for medical tourists from around the world.</p>

<h2 id="visa-requirements">Visa Requirements</h2>
<p>Most international patients will need a tourist visa (L visa) or a medical visa (M visa) to enter China:</p>
<ul>
<li><strong>Tourist Visa (L):</strong> Suitable for short medical trips (up to 30 days). The easiest to obtain — just need a valid passport, photo, and completed application form.</li>
<li><strong>Medical Visa (M):</strong> For longer treatments. Requires an invitation letter from the hospital. Your MyChinaMed coordinator can help arrange this.</li>
</ul>
<p>Processing typically takes 4–7 business days. We recommend applying at least 3 weeks before your planned travel date.</p>

<h2 id="planning-your-trip">Planning Your Trip</h2>
<h3 id="choosing-a-city">Choosing a City</h3>
<p>China's top medical cities each have their strengths:</p>
<ul>
<li><strong>Beijing:</strong> Best for cardiac surgery, neurology, and general surgery. Home to Peking Union and Fuwai hospitals.</li>
<li><strong>Shanghai:</strong> Excellent for dental, ophthalmology, and cosmetic procedures. Most international-friendly city.</li>
<li><strong>Guangzhou:</strong> Strong in oncology and traditional Chinese medicine. Close to Hong Kong for easy transit.</li>
<li><strong>Chengdu:</strong> Known for dental and orthopedic care at West China Hospital. Lower living costs.</li>
</ul>

<h3 id="what-to-pack">What to Pack</h3>
<ul>
<li>All medical records, test results, and imaging (digital copies preferred)</li>
<li>Current medications with original labels</li>
<li>Travel insurance documents</li>
<li>Comfortable clothing for hospital visits</li>
<li>A power adapter (China uses Type A and Type I plugs)</li>
</ul>

<h2 id="at-the-hospital">At the Hospital</h2>
<h3 id="international-departments">International Patient Departments</h3>
<p>Most major hospitals have dedicated international departments that offer:</p>
<ul>
<li>English/multilingual staff and translators</li>
<li>VIP wards with private rooms</li>
<li>Expedited scheduling (shorter wait times)</li>
<li>Assistance with insurance documentation</li>
</ul>

<h3 id="hospital-etiquette">Hospital Etiquette</h3>
<ul>
<li>Arrive 30 minutes early for appointments</li>
<li>Bring a companion if possible — they can help navigate and communicate</li>
<li>Chinese hospitals can be crowded; the international department bypasses most queues</li>
<li>Payment is typically upfront; keep all receipts for insurance claims</li>
</ul>

<h2 id="costs-and-payment">Costs and Payment</h2>
<p>Chinese hospitals typically accept:</p>
<ul>
<li><strong>Cash (CNY):</strong> Widely accepted. ATMs are plentiful. Exchange at the airport or banks.</li>
<li><strong>Credit Cards:</strong> Visa and Mastercard accepted at international departments</li>
<li><strong>WeChat Pay / Alipay:</strong> You can set these up with a foreign passport — very convenient for daily expenses</li>
<li><strong>Wire Transfer:</strong> For larger procedures, hospitals may accept international wire transfers</li>
</ul>
<p>Most procedures are 50–80% cheaper than in Western countries, even before considering the lower cost of living during your stay.</p>

<h2 id="after-treatment">After Treatment</h2>
<ul>
<li>Attend all follow-up appointments before leaving China</li>
<li>Get a complete medical report in English (request this before discharge)</li>
<li>Ask your doctor about post-treatment care instructions and medications</li>
<li>Your MyChinaMed coordinator can arrange remote follow-up consultations with your doctor after you return home</li>
</ul>

<h2 id="mychinamed-support">How MyChinaMed Helps</h2>
<p>As your medical tourism coordinator, we handle the logistics so you can focus on your health:</p>
<ul>
<li>Free hospital and doctor matching based on your condition</li>
<li>Appointment scheduling and treatment planning</li>
<li>Visa invitation letters (for M visa)</li>
<li>Airport pickup and hotel recommendations</li>
<li>Translation and interpretation during consultations</li>
<li>Post-treatment follow-up coordination</li>
</ul>
<p>Our service is 100% free for patients — we work directly with hospitals.</p>
`,
    content_zh: `
<h2 id="why-medical-tourism">为什么选择中国医疗旅游？</h2>
<p>过去十年，中国的医疗体系经历了显著转型。如今，中国拥有超过2,000家三甲医院（最高等级），其中许多获得了JCI认证，并设有专门的国际患者部。</p>
<p>世界级的医疗专业技术、尖端技术和显著更低的费用的结合，使中国成为越来越受世界各地医疗游客欢迎的目的地。</p>

<h2 id="visa-requirements">签证要求</h2>
<p>大多数国际患者需要旅游签证（L签证）或医疗签证（M签证）才能入境中国：</p>
<ul>
<li><strong>旅游签证（L）：</strong>适用于短期医疗行程（最长30天）。最容易获得——只需有效护照、照片和填写完整的申请表。</li>
<li><strong>医疗签证（M）：</strong>适用于较长的治疗。需要医院的邀请函。您的MyChinaMed协调员可以帮助安排。</li>
</ul>
<p>办理通常需要4-7个工作日。建议至少在计划出行日期前3周申请。</p>

<h2 id="planning-your-trip">规划行程</h2>
<h3 id="choosing-a-city">选择城市</h3>
<p>中国顶级医疗城市各有优势：</p>
<ul>
<li><strong>北京：</strong>心脏外科、神经科和普通外科最佳选择。协和医院和阜外医院所在地。</li>
<li><strong>上海：</strong>牙科、眼科和整形手术优秀。对外国人最友好的城市。</li>
<li><strong>广州：</strong>肿瘤学和中医方面实力强劲。靠近香港，交通便利。</li>
<li><strong>成都：</strong>华西医院的牙科和骨科闻名。生活费用较低。</li>
</ul>

<h3 id="what-to-pack">打包清单</h3>
<ul>
<li>所有病历、检查结果和影像资料（优先使用电子版）</li>
<li>目前服用的药物，保留原始标签</li>
<li>旅行保险文件</li>
<li>去医院时穿的舒适衣物</li>
<li>电源转换器（中国使用A型和I型插头）</li>
</ul>

<h2 id="at-the-hospital">在医院</h2>
<h3 id="international-departments">国际患者部</h3>
<p>大多数大型医院设有专门的国际部，提供：</p>
<ul>
<li>英语/多语言工作人员和翻译</li>
<li>VIP病房，配有独立房间</li>
<li>加急安排（缩短等待时间）</li>
<li>保险文件协助</li>
</ul>

<h3 id="hospital-etiquette">医院礼仪</h3>
<ul>
<li>预约前30分钟到达</li>
<li>尽可能带一个同伴——可以帮助导航和沟通</li>
<li>中国医院可能很拥挤；国际部可以绕过大部分排队</li>
<li>通常需要预付费用；保留所有收据以备保险理赔</li>
</ul>

<h2 id="costs-and-payment">费用和支付</h2>
<p>中国医院通常接受以下支付方式：</p>
<ul>
<li><strong>现金（人民币）：</strong>广泛接受。ATM很多。可在机场或银行兑换。</li>
<li><strong>信用卡：</strong>国际部接受Visa和Mastercard</li>
<li><strong>微信支付/支付宝：</strong>可以用外国护照开通——日常消费非常方便</li>
<li><strong>电汇：</strong>对于较大的手术，医院可能接受国际电汇</li>
</ul>
<p>大多数手术比西方国家便宜50-80%，更不用说住宿期间较低的生活费用。</p>

<h2 id="after-treatment">治疗后</h2>
<ul>
<li>离开中国前参加所有随访预约</li>
<li>获取完整的英文医疗报告（出院前申请）</li>
<li>向医生询问治疗后护理说明和用药</li>
<li>您的MyChinaMed协调员可以在您回国后安排与医生的远程随访</li>
</ul>

<h2 id="mychinamed-support">MyChinaMed如何帮助您</h2>
<p>作为您的医疗旅游协调员，我们处理后勤事务，让您专注于健康：</p>
<ul>
<li>根据您的病情免费匹配医院和医生</li>
<li>预约安排和治疗规划</li>
<li>签证邀请函（M签证）</li>
<li>机场接送和酒店推荐</li>
<li>就诊时的翻译和口译</li>
<li>治疗后随访协调</li>
</ul>
<p>我们对患者的服务100%免费——我们直接与医院合作。</p>
`,
    content_ru: `
<h2 id="why-medical-tourism">Почему медицинский туризм в Китае?</h2>
<p>За последнее десятилетие система здравоохранения Китая претерпела значительную трансформацию. Сегодня в стране более 2 000 больниц категории III-A (высшая классификация), многие из которых имеют аккредитацию JCI и специализированные международные отделения.</p>
<p>Сочетание медицинских специалистов мирового уровня, передовых технологий и значительно более низких цен делает Китай всё более привлекательным направлением для медицинских туристов со всего мира.</p>

<h2 id="visa-requirements">Визовые требования</h2>
<p>Большинству иностранных пациентов потребуется туристическая виза (L) или медицинская виза (M):</p>
<ul>
<li><strong>Туристическая виза (L):</strong> Подходит для коротких медицинских поездок (до 30 дней). Проще всего получить — нужны действующий паспорт, фото и заполненная анкета.</li>
<li><strong>Медицинская виза (M):</strong> Для длительного лечения. Требуется приглашение от больницы. Ваш координатор MyChinaMed поможет его организовать.</li>
</ul>
<p>Оформление обычно занимает 4–7 рабочих дней. Рекомендуем подавать заявку минимум за 3 недели до планируемой поездки.</p>

<h2 id="planning-your-trip">Планирование поездки</h2>
<h3 id="choosing-a-city">Выбор города</h3>
<p>Каждый из ведущих медицинских городов Китая имеет свои сильные стороны:</p>
<ul>
<li><strong>Пекин:</strong> Лучший для кардиохирургии, неврологии и общей хирургии. Здесь расположены больницы Пекин Юнион и Фувай.</li>
<li><strong>Шанхай:</strong> Отличный для стоматологии, офтальмологии и косметических процедур. Самый удобный город для иностранцев.</li>
<li><strong>Гуанчжоу:</strong> Силён в онкологии и традиционной китайской медицине. Близко к Гонконгу для удобного транзита.</li>
<li><strong>Чэнду:</strong> Известен стоматологией и ортопедией в Западнокитайской больнице. Более низкая стоимость проживания.</li>
</ul>

<h3 id="what-to-pack">Что взять с собой</h3>
<ul>
<li>Все медицинские записи, результаты анализов и снимки (предпочтительно в электронном виде)</li>
<li>Текущие лекарства с оригинальными этикетками</li>
<li>Документы туристической страховки</li>
<li>Удобную одежду для посещения больницы</li>
<li>Переходник для розеток (в Китае используются типы A и I)</li>
</ul>

<h2 id="at-the-hospital">В больнице</h2>
<h3 id="international-departments">Международные отделения</h3>
<p>Большинство крупных больниц имеют специализированные международные отделения:</p>
<ul>
<li>Англоязычный/многоязычный персонал и переводчики</li>
<li>VIP-палаты с отдельными комнатами</li>
<li>Ускоренная запись (меньше ожидания)</li>
<li>Помощь с документами для страховки</li>
</ul>

<h3 id="hospital-etiquette">Больничный этикет</h3>
<ul>
<li>Приходите за 30 минут до назначенного времени</li>
<li>По возможности возьмите сопровождающего</li>
<li>Китайские больницы могут быть многолюдными; международное отделение обходит большинство очередей</li>
<li>Оплата обычно производится заранее; сохраняйте все чеки для страховых выплат</li>
</ul>

<h2 id="costs-and-payment">Расходы и оплата</h2>
<p>Китайские больницы обычно принимают:</p>
<ul>
<li><strong>Наличные (юани):</strong> Принимаются повсеместно. Банкоматов много. Обмен в аэропорту или банках.</li>
<li><strong>Кредитные карты:</strong> Visa и Mastercard принимаются в международных отделениях</li>
<li><strong>WeChat Pay / Alipay:</strong> Можно привязать к иностранному паспорту — очень удобно для ежедневных расходов</li>
<li><strong>Банковский перевод:</strong> Для крупных процедур больницы могут принять международный перевод</li>
</ul>
<p>Большинство процедур на 50–80% дешевле, чем в западных странах, не считая более низкой стоимости проживания.</p>

<h2 id="after-treatment">После лечения</h2>
<ul>
<li>Посетите все контрольные осмотры перед отъездом из Китая</li>
<li>Получите полный медицинский отчёт на английском языке (запросите перед выпиской)</li>
<li>Уточните у врача рекомендации по уходу и назначенные лекарства</li>
<li>Ваш координатор MyChinaMed организует дистанционные консультации с врачом после возвращения домой</li>
</ul>

<h2 id="mychinamed-support">Как MyChinaMed помогает</h2>
<p>Как ваш координатор медицинского туризма, мы берём на себя логистику, чтобы вы могли сосредоточиться на здоровье:</p>
<ul>
<li>Бесплатный подбор больницы и врача по вашему диагнозу</li>
<li>Запись на приём и планирование лечения</li>
<li>Приглашение для медицинской визы (M виза)</li>
<li>Трансфер из аэропорта и рекомендации по отелям</li>
<li>Перевод и сопровождение на консультациях</li>
<li>Координация послеоперационного наблюдения</li>
</ul>
<p>Наш сервис для пациентов полностью бесплатный — мы работаем напрямую с больницами.</p>
`,
  },
]

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return getBlogPosts().filter((post) => post.category === category)
}
