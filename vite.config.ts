import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          caseStudies: path.resolve(__dirname, 'case-studies.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          virtualAssistant: path.resolve(__dirname, 'virtual-assistant.html'),
          customerSupport: path.resolve(__dirname, 'customer-support.html'),
          appointmentSetting: path.resolve(__dirname, 'appointment-setting.html'),
          leadGenerationResearch: path.resolve(__dirname, 'lead-generation-research.html'),
          socialMediaManagement: path.resolve(__dirname, 'social-media-management.html'),
          emailMarketingAutomation: path.resolve(__dirname, 'email-marketing-automation.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          notFound: path.resolve(__dirname, '404.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
          terms: path.resolve(__dirname, 'terms.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
