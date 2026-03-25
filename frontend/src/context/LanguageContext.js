import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    name: 'English', flag: '🇬🇧',
    dashboard: 'Dashboard', detectDisease: 'Disease Detection', findServices: 'Find Services',
    alerts: 'Alerts', signOut: 'Sign Out', chat: 'AI Chat', admin: 'Admin Panel',
    welcome: 'Welcome', farmer: 'Farmer', loading: 'Loading...', noImage: 'No image selected',
    selectCrop: 'Select a crop', analyze: 'Analyze', analyzing: 'Analyzing...',
    result: 'Result', healthy: 'Healthy', diseased: 'Diseased', confidence: 'Confidence',
    treatment: 'Treatment', prevention: 'Prevention', symptoms: 'Symptoms',
    uploadImage: 'Upload Image', takePhoto: 'Take Photo', language: 'Language',
    sendMessage: 'Send', typeMessage: 'Ask me anything about crops...', aiChat: 'AI Crop Assistant',
    notACrop: 'Not a crop image', notACropMsg: 'Please upload a photo of a crop or plant.',
    users: 'Users', roles: 'Roles', ban: 'Ban', unban: 'Unban', delete: 'Delete',
    adminPanel: 'Admin Panel', totalUsers: 'Total Users', search: 'Search',
    settings: 'Settings', profile: 'Profile', history: 'History',
    severity: 'Severity', immediateActions: 'Immediate Actions', spreadRisk: 'Spread Risk',
    organicTreatment: 'Organic Treatment', chemicalTreatment: 'Chemical Treatment',
    culturalPractices: 'Cultural Practices', recoveryTime: 'Recovery Time',
    crops: 'Crops', home: 'Home', features: 'Features', pricing: 'Pricing',
    getStarted: 'Get Started', signIn: 'Sign In',
  },
  rw: {
    name: 'Kinyarwanda', flag: '🇷🇼',
    dashboard: 'Ikibaho', detectDisease: 'Kumenya Indwara', findServices: 'Shakisha Serivisi',
    alerts: 'Inzitizi', signOut: 'Sohoka', chat: 'Ikiganiro na AI', admin: 'Ikibaho cy\'Ubuyobozi',
    welcome: 'Murakaza neza', farmer: 'Umuhinzi', loading: 'Gutegereza...', noImage: 'Nta ifoto yatoranyijwe',
    selectCrop: 'Hitamo igihingwa', analyze: 'Suzuma', analyzing: 'Gusuzuma...',
    result: 'Inzitizi', healthy: 'Muzima', diseased: 'Indwara', confidence: 'Icyizere',
    treatment: 'Ubuvuzi', prevention: 'Kwirinda', symptoms: 'Ibimenyetso',
    uploadImage: 'Ohereza Ifoto', takePhoto: 'Fata Ifoto', language: 'Ururimi',
    sendMessage: 'Ohereza', typeMessage: 'Baza ikibazo cy\'ubuhinzi...', aiChat: 'Umufasha wa AI',
    notACrop: 'Ntabwo ari igihingwa', notACropMsg: 'Ohereza ifoto y\'igihingwa cyangwa imbuto.',
    users: 'Abakoresha', roles: 'Inshingano', ban: 'Buza', unban: 'Emera', delete: 'Siba',
    adminPanel: 'Ikibaho cy\'Ubuyobozi', totalUsers: 'Abakoresha Bose', search: 'Shakisha',
    settings: 'Igenamiterere', profile: 'Umwirondoro', history: 'Amateka',
    severity: 'Ubukana', immediateActions: 'Ibikorwa by\'Ubu', spreadRisk: 'Inzira y\'Indwara',
    organicTreatment: 'Ubuvuzi bw\'Imiti ya Kamere', chemicalTreatment: 'Ubuvuzi bw\'Imiti ya Laboratoire',
    culturalPractices: 'Imikorere Myiza', recoveryTime: 'Igihe cyo Gukira',
    crops: 'Ibihingwa', home: 'Ahabanza', features: 'Serivisi', pricing: 'Ibiciro',
    getStarted: 'Tangira', signIn: 'Injira',
  },
  fr: {
    name: 'Français', flag: '🇫🇷',
    dashboard: 'Tableau de Bord', detectDisease: 'Détection de Maladies', findServices: 'Trouver des Services',
    alerts: 'Alertes', signOut: 'Déconnexion', chat: 'Chat IA', admin: 'Panneau Admin',
    welcome: 'Bienvenue', farmer: 'Agriculteur', loading: 'Chargement...', noImage: 'Aucune image sélectionnée',
    selectCrop: 'Sélectionner une culture', analyze: 'Analyser', analyzing: 'Analyse en cours...',
    result: 'Résultat', healthy: 'Sain', diseased: 'Malade', confidence: 'Confiance',
    treatment: 'Traitement', prevention: 'Prévention', symptoms: 'Symptômes',
    uploadImage: 'Télécharger une Image', takePhoto: 'Prendre une Photo', language: 'Langue',
    sendMessage: 'Envoyer', typeMessage: 'Posez une question sur vos cultures...', aiChat: 'Assistant IA Agricole',
    notACrop: 'Pas une image de culture', notACropMsg: 'Veuillez télécharger une photo d\'une culture ou d\'une plante.',
    users: 'Utilisateurs', roles: 'Rôles', ban: 'Bannir', unban: 'Débannir', delete: 'Supprimer',
    adminPanel: 'Panneau d\'Administration', totalUsers: 'Total Utilisateurs', search: 'Rechercher',
    settings: 'Paramètres', profile: 'Profil', history: 'Historique',
    severity: 'Sévérité', immediateActions: 'Actions Immédiates', spreadRisk: 'Risque de Propagation',
    organicTreatment: 'Traitement Bio', chemicalTreatment: 'Traitement Chimique',
    culturalPractices: 'Pratiques Culturales', recoveryTime: 'Temps de Récupération',
    crops: 'Cultures', home: 'Accueil', features: 'Fonctionnalités', pricing: 'Tarifs',
    getStarted: 'Commencer', signIn: 'Connexion',
  },
  sw: {
    name: 'Kiswahili', flag: '🇰🇪',
    dashboard: 'Dashibodi', detectDisease: 'Gundua Magonjwa', findServices: 'Tafuta Huduma',
    alerts: 'Tahadhari', signOut: 'Toka', chat: 'Mazungumzo na AI', admin: 'Paneli ya Msimamizi',
    welcome: 'Karibu', farmer: 'Mkulima', loading: 'Inapakia...', noImage: 'Picha haijachaguliwa',
    selectCrop: 'Chagua zao', analyze: 'Changanua', analyzing: 'Inachanganua...',
    result: 'Matokeo', healthy: 'Yenye Afya', diseased: 'Mgonjwa', confidence: 'Uhakika',
    treatment: 'Matibabu', prevention: 'Kuzuia', symptoms: 'Dalili',
    uploadImage: 'Pakia Picha', takePhoto: 'Piga Picha', language: 'Lugha',
    sendMessage: 'Tuma', typeMessage: 'Uliza swali kuhusu mazao...', aiChat: 'Msaidizi wa AI wa Kilimo',
    notACrop: 'Si picha ya zao', notACropMsg: 'Tafadhali pakia picha ya zao au mmea.',
    users: 'Watumiaji', roles: 'Majukumu', ban: 'Zuia', unban: 'Ruhusu', delete: 'Futa',
    adminPanel: 'Paneli ya Msimamizi', totalUsers: 'Watumiaji Wote', search: 'Tafuta',
    settings: 'Mipangilio', profile: 'Wasifu', history: 'Historia',
    severity: 'Ukali', immediateActions: 'Hatua za Haraka', spreadRisk: 'Hatari ya Kuenea',
    organicTreatment: 'Matibabu ya Asili', chemicalTreatment: 'Matibabu ya Kemikali',
    culturalPractices: 'Mazoea ya Kilimo', recoveryTime: 'Muda wa Kupona',
    crops: 'Mazao', home: 'Nyumbani', features: 'Vipengele', pricing: 'Bei',
    getStarted: 'Anza', signIn: 'Ingia',
  },
  es: {
    name: 'Español', flag: '🇪🇸',
    dashboard: 'Panel', detectDisease: 'Detectar Enfermedades', findServices: 'Encontrar Servicios',
    alerts: 'Alertas', signOut: 'Cerrar Sesión', chat: 'Chat IA', admin: 'Panel de Admin',
    welcome: 'Bienvenido', farmer: 'Agricultor', loading: 'Cargando...', noImage: 'Sin imagen',
    selectCrop: 'Seleccionar cultivo', analyze: 'Analizar', analyzing: 'Analizando...',
    result: 'Resultado', healthy: 'Sano', diseased: 'Enfermo', confidence: 'Confianza',
    treatment: 'Tratamiento', prevention: 'Prevención', symptoms: 'Síntomas',
    uploadImage: 'Subir Imagen', takePhoto: 'Tomar Foto', language: 'Idioma',
    sendMessage: 'Enviar', typeMessage: 'Pregunta sobre tus cultivos...', aiChat: 'Asistente IA Agrícola',
    notACrop: 'No es una imagen de cultivo', notACropMsg: 'Por favor sube una foto de un cultivo o planta.',
    users: 'Usuarios', roles: 'Roles', ban: 'Banear', unban: 'Desbanear', delete: 'Eliminar',
    adminPanel: 'Panel de Administración', totalUsers: 'Total de Usuarios', search: 'Buscar',
    settings: 'Configuración', profile: 'Perfil', history: 'Historial',
    severity: 'Gravedad', immediateActions: 'Acciones Inmediatas', spreadRisk: 'Riesgo de Propagación',
    organicTreatment: 'Tratamiento Orgánico', chemicalTreatment: 'Tratamiento Químico',
    culturalPractices: 'Prácticas Culturales', recoveryTime: 'Tiempo de Recuperación',
    crops: 'Cultivos', home: 'Inicio', features: 'Características', pricing: 'Precios',
    getStarted: 'Comenzar', signIn: 'Iniciar Sesión',
  },
  ar: {
    name: 'العربية', flag: '🇸🇦',
    dashboard: 'لوحة التحكم', detectDisease: 'كشف الأمراض', findServices: 'البحث عن خدمات',
    alerts: 'التنبيهات', signOut: 'تسجيل الخروج', chat: 'محادثة AI', admin: 'لوحة المشرف',
    welcome: 'أهلاً', farmer: 'مزارع', loading: 'جاري التحميل...', noImage: 'لم يتم اختيار صورة',
    selectCrop: 'اختر المحصول', analyze: 'تحليل', analyzing: 'جاري التحليل...',
    result: 'النتيجة', healthy: 'صحي', diseased: 'مريض', confidence: 'الثقة',
    treatment: 'العلاج', prevention: 'الوقاية', symptoms: 'الأعراض',
    uploadImage: 'رفع صورة', takePhoto: 'التقاط صورة', language: 'اللغة',
    sendMessage: 'إرسال', typeMessage: 'اسأل عن محاصيلك...', aiChat: 'مساعد الذكاء الاصطناعي الزراعي',
    notACrop: 'ليست صورة محصول', notACropMsg: 'يرجى رفع صورة للمحصول أو النبات.',
    users: 'المستخدمون', roles: 'الأدوار', ban: 'حظر', unban: 'رفع الحظر', delete: 'حذف',
    adminPanel: 'لوحة الإدارة', totalUsers: 'إجمالي المستخدمين', search: 'بحث',
    settings: 'الإعدادات', profile: 'الملف الشخصي', history: 'السجل',
    severity: 'الشدة', immediateActions: 'الإجراءات الفورية', spreadRisk: 'خطر الانتشار',
    organicTreatment: 'العلاج العضوي', chemicalTreatment: 'العلاج الكيميائي',
    culturalPractices: 'الممارسات الزراعية', recoveryTime: 'وقت التعافي',
    crops: 'المحاصيل', home: 'الرئيسية', features: 'الميزات', pricing: 'الأسعار',
    getStarted: 'ابدأ', signIn: 'تسجيل الدخول',
  },
  hi: {
    name: 'हिंदी', flag: '🇮🇳',
    dashboard: 'डैशबोर्ड', detectDisease: 'रोग पहचान', findServices: 'सेवाएं खोजें',
    alerts: 'सतर्कता', signOut: 'साइन आउट', chat: 'AI चैट', admin: 'एडमिन पैनल',
    welcome: 'स्वागत है', farmer: 'किसान', loading: 'लोड हो रहा है...', noImage: 'कोई छवि नहीं',
    selectCrop: 'फसल चुनें', analyze: 'विश्लेषण करें', analyzing: 'विश्लेषण हो रहा है...',
    result: 'परिणाम', healthy: 'स्वस्थ', diseased: 'रोगग्रस्त', confidence: 'विश्वास',
    treatment: 'उपचार', prevention: 'रोकथाम', symptoms: 'लक्षण',
    uploadImage: 'छवि अपलोड करें', takePhoto: 'फोटो लें', language: 'भाषा',
    sendMessage: 'भेजें', typeMessage: 'फसलों के बारे में पूछें...', aiChat: 'AI कृषि सहायक',
    notACrop: 'फसल की छवि नहीं', notACropMsg: 'कृपया फसल या पौधे की फोटो अपलोड करें।',
    users: 'उपयोगकर्ता', roles: 'भूमिकाएं', ban: 'प्रतिबंध', unban: 'प्रतिबंध हटाएं', delete: 'हटाएं',
    adminPanel: 'एडमिन पैनल', totalUsers: 'कुल उपयोगकर्ता', search: 'खोजें',
    settings: 'सेटिंग्स', profile: 'प्रोफ़ाइल', history: 'इतिहास',
    severity: 'गंभीरता', immediateActions: 'तत्काल कार्रवाई', spreadRisk: 'फैलने का खतरा',
    organicTreatment: 'जैविक उपचार', chemicalTreatment: 'रासायनिक उपचार',
    culturalPractices: 'कृषि पद्धतियां', recoveryTime: 'ठीक होने का समय',
    crops: 'फसलें', home: 'होम', features: 'विशेषताएं', pricing: 'मूल्य निर्धारण',
    getStarted: 'शुरू करें', signIn: 'साइन इन',
  },
  pt: {
    name: 'Português', flag: '🇧🇷',
    dashboard: 'Painel', detectDisease: 'Detectar Doenças', findServices: 'Encontrar Serviços',
    alerts: 'Alertas', signOut: 'Sair', chat: 'Chat IA', admin: 'Painel Admin',
    welcome: 'Bem-vindo', farmer: 'Agricultor', loading: 'Carregando...', noImage: 'Sem imagem',
    selectCrop: 'Selecionar cultura', analyze: 'Analisar', analyzing: 'Analisando...',
    result: 'Resultado', healthy: 'Saudável', diseased: 'Doente', confidence: 'Confiança',
    treatment: 'Tratamento', prevention: 'Prevenção', symptoms: 'Sintomas',
    uploadImage: 'Enviar Imagem', takePhoto: 'Tirar Foto', language: 'Idioma',
    sendMessage: 'Enviar', typeMessage: 'Pergunte sobre suas culturas...', aiChat: 'Assistente IA Agrícola',
    notACrop: 'Não é uma imagem de cultura', notACropMsg: 'Por favor, envie uma foto de uma cultura ou planta.',
    users: 'Usuários', roles: 'Funções', ban: 'Banir', unban: 'Desbanir', delete: 'Excluir',
    adminPanel: 'Painel de Administração', totalUsers: 'Total de Usuários', search: 'Pesquisar',
    settings: 'Configurações', profile: 'Perfil', history: 'Histórico',
    severity: 'Gravidade', immediateActions: 'Ações Imediatas', spreadRisk: 'Risco de Propagação',
    organicTreatment: 'Tratamento Orgânico', chemicalTreatment: 'Tratamento Químico',
    culturalPractices: 'Práticas Culturais', recoveryTime: 'Tempo de Recuperação',
    crops: 'Culturas', home: 'Início', features: 'Recursos', pricing: 'Preços',
    getStarted: 'Começar', signIn: 'Entrar',
  },
};

export const SUPPORTED_LANGUAGES = Object.entries(translations).map(([code, t]) => ({
  code,
  name: t.name,
  flag: t.flag,
}));

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('appLanguage') || 'en');

  const t = (key) => {
    const lang = translations[language] || translations.en;
    return lang[key] || translations.en[key] || key;
  };

  const changeLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem('appLanguage', code);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
