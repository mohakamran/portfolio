// Translation Data
const translations = {
    en: {
        // Navigation
        home: 'Home',
        skills: 'Skills',
        services: 'Services',
        education: 'Education',
        certificates: 'Certificates',
        portfolio: 'Portfolio',
        gallery: 'Gallery',
        contact: 'Contact',
        
        // Hero Section
        heroTitle: 'Full Stack Developer',
        heroSubtitle: 'Building Digital Solutions with Modern Technologies',
        heroDescription: 'Passionate developer with expertise in web technologies, creating innovative solutions for businesses worldwide.',
        downloadResumeEn: 'Download Resume (EN)',
        downloadResumeJp: 'Download Resume (JP)',
        
        // Common
        learnMore: 'Learn More',
        viewProject: 'View Project',
        getInTouch: 'Get In Touch',
        
        // Footer
        footerTagline: 'Building the future, one line of code at a time.',
        quickLinks: 'Quick Links',
        services: 'Services',
        webDevelopment: 'Web Development',
        dataAnalysis: 'Data Analysis',
        ecommerce: 'E-commerce Solutions'
    },
    
    jp: {
        // Navigation  
        home: 'ホーム',
        skills: 'スキル',
        services: 'サービス',
        education: '学歴',
        certificates: '証明書',
        portfolio: 'ポートフォリオ',
        gallery: 'ギャラリー',
        contact: 'お問い合わせ',
        
        // Hero Section
        heroTitle: 'フルスタック開発者',
        heroSubtitle: '最新技術でデジタルソリューションを構築',
        heroDescription: 'ウェブ技術の専門知識を持つ情熱的な開発者として、世界中の企業に革新的なソリューションを提供しています。',
        downloadResumeEn: '履歴書ダウンロード (英語)',
        downloadResumeJp: '履歴書ダウンロード (日本語)',
        
        // Common
        learnMore: '詳細を見る',
        viewProject: 'プロジェクトを見る',
        getInTouch: 'お問い合わせ',
        
        // Footer
        footerTagline: '一行のコードから未来を築く。',
        quickLinks: 'クイックリンク',
        services: 'サービス',
        webDevelopment: 'ウェブ開発',
        dataAnalysis: 'データ分析',
        ecommerce: 'Eコマースソリューション'
    }
};

// Translation Manager Class
class TranslationManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.updatePageLanguage();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-switcher')) {
                e.preventDefault();
                this.toggleLanguage();
            }
        });
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'jp' : 'en';
        localStorage.setItem('language', this.currentLang);
        this.updatePageLanguage();
        this.updateLanguageSwitcher();
    }

    updatePageLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLang][key]) {
                element.textContent = translations[this.currentLang][key];
            }
        });
    }

    updateLanguageSwitcher() {
        const switchers = document.querySelectorAll('.lang-switcher');
        switchers.forEach(switcher => {
            const flag = switcher.querySelector('.flag');
            const text = switcher.querySelector('.lang-text');
            
            if (this.currentLang === 'en') {
                flag.textContent = '🇯🇵';
                text.textContent = '日本語';
            } else {
                flag.textContent = '🇺🇸';
                text.textContent = 'English';
            }
        });
    }
}