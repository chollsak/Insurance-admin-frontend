import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  welcome: 'Welcome to the Insurance Portal',
  login: 'Login',
  dashboard: 'Dashboard',
  
  home: {
    intro: 'Welcome to your comprehensive insurance management platform. Easily manage your policies, claims, and customer information in one place.',
    policyManagement: {
      title: 'Policy Management',
      description: 'Create, view and manage insurance policies for your customers.',
      button: 'View Policies'
    },
    claimsProcessing: {
      title: 'Claims Processing',
      description: 'Process insurance claims efficiently and track their status.',
      button: 'Manage Claims'
    },
    customerProfiles: {
      title: 'Customer Profiles',
      description: 'Access and update customer information and policy details.',
      button: 'View Customers'
    },
    goToDashboard: 'Go to Dashboard'
  }
};

// Thai translations
const thTranslations = {
  welcome: 'ยินดีต้อนรับสู่พอร์ทัลประกันภัย',
  login: 'เข้าสู่ระบบ',
  dashboard: 'แดชบอร์ด',
  
  home: {
    intro: 'ยินดีต้อนรับสู่แพลตฟอร์มการจัดการประกันภัยที่ครอบคลุม จัดการกรมธรรม์ การเรียกร้อง และข้อมูลลูกค้าของคุณได้อย่างง่ายดายในที่เดียว',
    policyManagement: {
      title: 'การจัดการกรมธรรม์',
      description: 'สร้าง ดู และจัดการกรมธรรม์ประกันภัยสำหรับลูกค้าของคุณ',
      button: 'ดูกรมธรรม์'
    },
    claimsProcessing: {
      title: 'การจัดการเคลม',
      description: 'ดำเนินการเคลมประกันภัยอย่างมีประสิทธิภาพและติดตามสถานะของพวกเขา',
      button: 'จัดการเคลม'
    },
    customerProfiles: {
      title: 'โปรไฟล์ลูกค้า',
      description: 'เข้าถึงและอัปเดตข้อมูลลูกค้าและรายละเอียดกรมธรรม์',
      button: 'ดูลูกค้า'
    },
    goToDashboard: 'ไปที่แดชบอร์ด'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      th: {
        translation: thTranslations
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;