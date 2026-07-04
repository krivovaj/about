const facts = {
  en: [
    'Julia helped scale a talent ecosystem from roughly 10 interns to 2,000 participants per year. That is less a funnel and more a small town.',
    '1,500+ interviews in one month works out to roughly one interview every 29 working minutes. The calendar survived.',
    'After its redesign, Yandex Cup welcomed 8,000+ participants from around the world. That is a lot of algorithms.',
    'Two years with zero mentor attrition. Retention level: legendary.',
    'Julia’s professional toolkit combines psychology, analytics, strategic HR, and AI agents.',
    'Julia recruited rare research specialists for CERN-related projects. Sometimes recruitment really is rocket science.',
    'Her Student Care ecosystem included 20 mentors, 3 coordinators, and as many as 30 reviewers.',
    'Julia is a trained psychologist with postgraduate studies in acmeology — the science of human development and achievement.',
    'Her recruitment portfolio spans C++, Python, Java, machine learning, data science, product, and business roles.',
    'Julia has owned the numbers behind hiring: funnels, time-to-hire, conversion, candidate satisfaction, and hiring-manager satisfaction.',
    'She helped introduce Machine Learning and Optimization tracks to Yandex Cup.',
    'Her everyday toolkit includes Jira, Confluence, Notion, Miro, Trello, Excel, DataLens, LMS, and ATS platforms.',
    'Julia supports careers beyond work as a mentor with MyBridge in Serbia.',
    'She also co-organizes NSTech Talk, contributing to Serbia’s technology community.',
    'Her recent learning journey spans Business Analysis, Strategic HR, and AI Agents.',
    'Julia works in both Russian and English and has built programs for international audiences.'
  ],
  ru: [
    'Юлия помогла экосистеме талантов вырасти примерно с 10 стажёров до 2000 участников в год. Это уже не воронка — это маленький город.',
    '1500+ интервью за один месяц — примерно одно интервью каждые 29 минут рабочего времени. Календарь выжил.',
    'В Yandex Cup после редизайна пришли 8000+ участников со всего мира. Да, это много алгоритмов.',
    'Два года без единого ухода ментора из команды. Удержание уровня «легендарный».',
    'В профессиональном наборе инструментов Юлии одновременно живут психология, аналитика, стратегия управления персоналом и ИИ-агенты.',
    'Юлия работала с редкими исследовательскими вакансиями для проектов, связанных с ЦЕРН. Иногда рекрутмент — буквально космос.',
    'Экосистема сопровождения студентов под руководством Юлии включала 20 менторов, 3 координатора и до 30 ревьюеров.',
    'Юлия — дипломированный психолог с аспирантурой по акмеологии, науке о развитии человека и достижении мастерства.',
    'Её рекрутинговый портфель охватывает C++, Python, Java, машинное обучение, Data Science, продуктовые и бизнес-роли.',
    'Юлия работала со всей аналитикой найма: воронками, сроком закрытия вакансий, конверсией и удовлетворённостью кандидатов и нанимающих менеджеров.',
    'Она помогла добавить в Yandex Cup направления машинного обучения и оптимизации.',
    'В её рабочем наборе — Jira, Confluence, Notion, Miro, Trello, Excel, DataLens, системы управления обучением и наймом.',
    'Юлия помогает развивать карьеру другим как ментор MyBridge в Сербии.',
    'Она также выступает соорганизатором NSTech Talk и участвует в технологическом сообществе Сербии.',
    'Её недавний образовательный маршрут включает бизнес-анализ, стратегическое управление персоналом и ИИ-агентов.',
    'Юлия работает на русском и английском языках и создавала программы для международной аудитории.'
  ]
};

const translatedNodes = [...document.querySelectorAll('[data-ru]')];
translatedNodes.forEach(node => { node.dataset.en = node.innerHTML; });
const languageToggle = document.querySelector('#languageToggle');
const styleToggle = document.querySelector('#styleToggle');
const panel = document.querySelector('#factPanel');
const factText = document.querySelector('#factText');
let language = localStorage.getItem('site-language') || 'en';
let previous = -1;

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  translatedNodes.forEach(node => { node.innerHTML = node.dataset[language]; });
  document.querySelectorAll('[data-alt-ru]').forEach(image => { image.alt = language === 'en' ? 'Portrait of Julia Krivova' : image.dataset.altRu; });
  languageToggle.textContent = language === 'en' ? 'RU' : 'EN';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Russian' : 'Переключить на английский');
  styleToggle.setAttribute('aria-label', language === 'en' ? 'Enable minimal style' : 'Включить лаконичный стиль');
  document.querySelector('#closeFact').setAttribute('aria-label', language === 'en' ? 'Close fact' : 'Закрыть факт');
  document.title = language === 'en' ? 'Julia Krivova — Talent Programs & Project Management' : 'Юлия Кривова — талант-программы и управление проектами';
  document.querySelector('meta[name="description"]').content = language === 'en' ? 'Julia Krivova — Talent Acquisition, Talent Programs, Program and Project Management.' : 'Юлия Кривова — подбор талантов, развитие программ, управление проектами.';
  panel.hidden = true;
  localStorage.setItem('site-language', language);
}

languageToggle.addEventListener('click', () => setLanguage(language === 'en' ? 'ru' : 'en'));
setLanguage(language);

document.querySelector('#surpriseButton').addEventListener('click', () => {
  do previous = Math.floor(Math.random() * facts[language].length); while (facts[language].length > 1 && factText.textContent === facts[language][previous]);
  factText.textContent = facts[language][previous]; panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.querySelector('#closeFact').addEventListener('click', () => { panel.hidden = true; });

if (localStorage.getItem('site-style') === 'minimal') { document.body.classList.add('minimal'); styleToggle.checked = true; }
styleToggle.addEventListener('change', () => {
  document.body.classList.toggle('minimal', styleToggle.checked);
  localStorage.setItem('site-style', styleToggle.checked ? 'minimal' : 'bright');
});
