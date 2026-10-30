import type { Language, Page } from '../lib/routes';
import content from './content';
export const company = 'Heral Metal';
export const contactEmail = content.business.email;
// FormSubmit recipients are public browser configuration, not private credentials.
export const formRecipient = import.meta.env.PUBLIC_FORMSUBMIT_RECIPIENT || 'contact@heralmetal.com.mk';
export const formEndpoint = `https://formsubmit.co/${encodeURIComponent(formRecipient)}`;
export const formAjaxEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(formRecipient)}`;
export const copy = {
  mk: {
    home: 'Почетна', services: 'Услуги', projects: 'Проекти', about: 'За нас', contact: 'Контакт', quote: 'Побарај понуда', privacy: 'Приватност',
    skip: 'Прескокни до содржината', menu: 'Мени', close: 'Затвори', industry: 'ИНДУСТРИСКИ РЕШЕНИЈА',
    hero: ['ИНЖЕНЕРСТВО.', 'ИЗРАБОТКА.', 'МОНТАЖА.'], tagline: content.home.mk.tagline,
    expertise: 'Нашата експертиза', precision: 'ПРЕЦИЗНОСТ', value: 'ДОЛГОРОЧНА ВРЕДНОСТ',
    aboutTitle: content.about.mk.aboutTitle,
    aboutBody: content.about.mk.aboutBody,
    certificates: 'СЕРТИФИКАТИ', certificatesTitle: content.about.mk.certificatesTitle,
    certificatesBody: content.about.mk.certificatesBody,
    quoteHeading: ['ПОБАРАЈТЕ', 'ПОНУДА.'], quoteIntro: 'Кажете ни повеќе за вашиот проект. Ќе подготвиме понуда за изработка, монтажа или сервис според вашите потреби.',
    formEyebrow: 'ФОРМУЛАР ЗА ПОНУДА', formTitle: 'Споделете ги деталите од проектот', formIntro: 'Пополнете ги податоците и приложете ја документацијата за проектот.',
    details: 'Контактни податоци', name: 'Име и презиме', namePlaceholder: 'Внесете го вашето име и презиме', company: 'Компанија', companyPlaceholder: 'Внесете го името на компанијата', email: 'Е-пошта', phone: 'Телефон',
    selectService: 'Изберете услуга', projectDetails: 'Детали од проектот', description: 'Краток опис на проектот', descriptionPlaceholder: 'Опишете го обемот, локацијата, рокот и други важни барања од проектот.',
    attachments: 'Прикачени документи', upload: 'Прикачете документ, скица или спецификација', fileHint: 'PDF, JPG, PNG или DWG до 5 MB',
    consent: 'Се согласувам да бидам контактиран/а во врска со ова барање за понуда.', submit: 'Испрати барање', sending: 'Се испраќа…', success: 'Вашето барање е успешно испратено.', error: 'Барањето не е испратено. Обидете се повторно или контактирајте нè преку е-пошта.', fileError: 'Изберете PDF, JPG, PNG или DWG документ до 5 MB.', remove: 'Отстрани документ', required: 'Задолжително', optional: 'незадолжително',
    servicesTitle: 'РЕШЕНИЈА ЗА ВАШИОТ ПРОЕКТ.', servicesIntro: 'Од планирање до изработка и монтажа. Разгледајте ја нашата експертиза и споделете ги техничките барања за вашиот проект.', learn: 'Повеќе за услугата', scope: 'Опсег на услугата', process: 'Од барање до реализација',
    steps: ['Споделете ги барањата', 'Техничко разгледување', 'Договорен опсег и изведба'], stepDetails: ['Опишете го проектот, локацијата и потребниот рок. Приложете ја достапната техничка документација.', 'Барањата и документацијата се основа за разгледување на соодветното техничко решение.', 'Понудата го дефинира опсегот на работата. Изработката, монтажата или сервисот се договараат според потребите на проектот.'],
    projectsTitle: 'КОНСТРУКЦИИ. ОПРЕМА. СИСТЕМИ.', projectsIntro: 'Визуелен преглед на областите во кои работиме.', illustrative: 'Илустративни фотографии од дизајнот. Не претставуваат документирани завршени проекти.', viewImage: 'Отвори фотографија', previous: 'Претходна фотографија', next: 'Следна фотографија',
    contactTitle: 'ДА РАЗГОВАРАМЕ ЗА ВАШИОТ ПРОЕКТ.', contactIntro: 'За изработка, монтажа или сервис, испратете ни ги вашите барања преку формуларот за понуда.', emailUs: 'Пишете ни', emailNote: content.business.mk.note || '', ready: 'Имате техничко барање?', readyBody: 'Споделете го опсегот и документацијата за да го започнеме разговорот.',
    faq: 'Прашања пред да побарате понуда', questions: ['Кои информации да ги приложам?', 'Може ли да побарам сервис?', 'Како се одредува понудата?'], answers: ['Опишете го обемот, локацијата и рокот. Ако имате скици, спецификации или технички цртежи, приложете ги.', 'Да. Изберете „Машинско одржување“ и опишете ја опремата и потребниот сервис.', 'Понудата се подготвува според конкретните технички барања и договорениот опсег на работата.'],
    privacyTitle: 'Информации за приватност', privacyIntro: 'Како оваа веб-страница ги обработува податоците што ги испраќате преку формуларот.', privacySections: [
      ['Податоци во формуларот', 'Формуларот собира име, е-пошта, избрана услуга, опис на проектот и согласност за контакт. Компанијата, телефонскиот број и документот се незадолжителни. Податоците се користат за комуникација за вашето барање.'],
      ['Испраќање преку FormSubmit', 'Кога ќе го испратите формуларот, внесените податоци и избраниот документ се испраќаат до FormSubmit за обработка и доставување. Не прикачувајте чувствителни информации што не се потребни за барањето.'],
      ['Локално чување и следење', 'Оваа веб-страница нема аналитички скрипти или маркетиншки колачиња. Не ги зачувува внесените податоци во локалното складиште на прелистувачот. GitHub Pages и FormSubmit може да обработуваат технички податоци според своите политики.'],
      ['Контакт', 'За прашања за вашето барање или податоците, користете ја контактната е-пошта. Контактната адреса е привремена и треба да биде заменета со потврдена деловна адреса пред јавна деловна употреба.'],
    ], notFound: 'Страницата не е пронајдена.', notFoundBody: 'Линкот можеби е променет. Продолжете од почетната страница или разгледајте ги нашите услуги.', backHome: 'Кон почетната',
  },
  en: {
    home: 'Home', services: 'Services', projects: 'Projects', about: 'About', contact: 'Contact', quote: 'Request a quote', privacy: 'Privacy',
    skip: 'Skip to content', menu: 'Menu', close: 'Close', industry: 'INDUSTRIAL SOLUTIONS', hero: ['ENGINEERING.', 'FABRICATION.', 'INSTALLATION.'], tagline: content.home.en.tagline, expertise: 'Our expertise', precision: 'PRECISION', value: 'LONG-TERM VALUE',
    aboutTitle: content.about.en.aboutTitle, aboutBody: content.about.en.aboutBody,
    certificates: 'CERTIFICATES', certificatesTitle: content.about.en.certificatesTitle, certificatesBody: content.about.en.certificatesBody,
    quoteHeading: ['REQUEST', 'A QUOTE.'], quoteIntro: 'Tell us more about your project. We will prepare a quote for fabrication, installation or maintenance based on your requirements.', formEyebrow: 'QUOTE REQUEST FORM', formTitle: 'Share your project details', formIntro: 'Complete your details and attach your project documentation.',
    details: 'Contact details', name: 'Full name', namePlaceholder: 'Enter your full name', company: 'Company', companyPlaceholder: 'Enter your company name', email: 'Email', phone: 'Phone', selectService: 'Choose a service', projectDetails: 'Project details', description: 'Brief project description', descriptionPlaceholder: 'Describe the scope, location, timeline and other important project requirements.', attachments: 'Attached documents', upload: 'Attach a document, sketch or specification', fileHint: 'PDF, JPG, PNG or DWG up to 5 MB', consent: 'I agree to be contacted about this quote request.', submit: 'Send request', sending: 'Sending…', success: 'Your request has been sent successfully.', error: 'Your request was not sent. Please try again or contact us by email.', fileError: 'Choose a PDF, JPG, PNG or DWG document up to 5 MB.', remove: 'Remove document', required: 'Required', optional: 'optional',
    servicesTitle: 'SOLUTIONS FOR YOUR PROJECT.', servicesIntro: 'From planning to fabrication and installation. Explore our expertise and share the technical requirements for your project.', learn: 'Explore the service', scope: 'Service scope', process: 'From requirements to delivery', steps: ['Share your requirements', 'Technical review', 'Agreed scope and execution'], stepDetails: ['Describe the project, location and required timeline. Include any available technical documentation.', 'Your requirements and documentation provide the basis for reviewing the appropriate technical solution.', 'The quote defines the scope of work. Fabrication, installation or maintenance is agreed according to your project requirements.'],
    projectsTitle: 'STRUCTURES. EQUIPMENT. SYSTEMS.', projectsIntro: 'A visual introduction to the areas we work in.', illustrative: 'Illustrative images supplied in the design. These are not documented completed projects.', viewImage: 'Open photograph', previous: 'Previous photograph', next: 'Next photograph', contactTitle: 'LET’S DISCUSS YOUR PROJECT.', contactIntro: 'For fabrication, installation or maintenance, send us your requirements using the quote request form.', emailUs: 'Email us', emailNote: content.business.en.note || '', ready: 'Have a technical requirement?', readyBody: 'Share the scope and documentation to start the conversation.',
    faq: 'Before you request a quote', questions: ['What information should I include?', 'Can I request maintenance?', 'How is a quote prepared?'], answers: ['Describe the scope, location and timeline. Include sketches, specifications or technical drawings if available.', 'Yes. Select “Machine maintenance” and describe the equipment and service required.', 'Each quote is prepared according to the specific technical requirements and agreed scope of work.'], privacyTitle: 'Privacy information', privacyIntro: 'How this website processes the information you submit through the form.', privacySections: [
      ['Form information', 'The form collects your name, email, selected service, project description and consent to contact. Company, phone number and document are optional. This information is used to communicate about your request.'],
      ['Submission through FormSubmit', 'When you submit the form, your details and selected document are sent to FormSubmit for processing and delivery. Please avoid attaching sensitive information that is unnecessary for your request.'],
      ['Local storage and tracking', 'This website uses no analytics scripts or marketing cookies. It does not save your form details in browser local storage. GitHub Pages and FormSubmit may process technical information according to their own policies.'],
      ['Contact', 'Use the contact email for questions about your request or information. This address is temporary and must be replaced with a verified business address before public business use.'],
    ], notFound: 'Page not found.', notFoundBody: 'The link may have changed. Continue from the home page or explore our services.', backHome: 'Back to home',
  },
};
const serviceRoutes = [
  { id: 'metal-structures', number: '01', image: 'connections' },
  { id: 'machine-maintenance', number: '02', image: 'maintenance' },
  { id: 'gas-pipelines', number: '03', image: 'pipeline' },
] as const;
export const services = serviceRoutes.map(service => ({ ...service, ...content.services[service.id] }));
export const projects = content.projects.filter(project => project.visible);
export const homeContent = content.home;
export const certificates = [
  { image: 'iso-9001', title: 'ISO 9001:2015', mk: 'Управување со квалитет — стандард за систематско планирање, изработка и доставување на услуги.', en: 'Quality management — a standard for systematic planning, fabrication and delivery of services.' },
  { image: 'iso-45001', title: 'ISO 45001:2018', mk: 'Безбедност и здравје при работа — стандард за заштита на вработени и минимизирање ризици на работното место.', en: 'Occupational health and safety — a standard for protecting employees and minimizing workplace risks.' },
  { image: 'iso-14001', title: 'ISO 14001:2015', mk: 'Управување со животната средина — стандард за одржливост, контрола на влијанието врз околината и ефикасно управување со ресурси.', en: 'Environmental management — a standard for sustainability, controlling environmental impact and efficient resource management.' },
] as const;
export function metadata(page: Page | '404', lang: Language) {
  const c = copy[lang];
  const service = services.find(s => page === `services/${s.id}`);
  const project = projects.find(project => page === `projects/${project.slug}`);
  if (project) return { title: `${project[lang].title} | ${c.projects} | Heral Metal`, description: project[lang].description || `${project[lang].title}. ${c.projectsIntro}` };
  if (service) return { title: `${service[lang].title} | Heral Metal`, description: service[lang].description };
  const meta = {
    home: { title: `Heral Metal | ${c.industry.toLocaleLowerCase(lang)}`, description: `${c.tagline} ${services.map(s => s[lang].title).join(', ')}.` },
    services: { title: `${c.services} | Heral Metal`, description: c.servicesIntro },
    projects: { title: `${c.projects} | Heral Metal`, description: c.projectsIntro },
    about: { title: `${c.about} | Heral Metal`, description: c.aboutBody.slice(0, 190) },
    contact: { title: `${c.contact} | Heral Metal`, description: c.contactIntro },
    quote: { title: `${c.quote} | Heral Metal`, description: c.quoteIntro },
    privacy: { title: `${c.privacyTitle} | Heral Metal`, description: c.privacyIntro },
    '404': { title: `404 | Heral Metal`, description: c.notFoundBody },
  };
  return meta[page as keyof typeof meta];
}
