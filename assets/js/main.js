/**
 * TECH FORCE AGENCY — MASTER JAVASCRIPT
 * Vanilla JS for Navigation, Interactive Calculators, FAQs, and Lead Qualification Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFaqAccordion();
  initScopeEstimator();
  initLeadForms();
  initHeaderScroll();
  highlightActiveNav();
});

/* --- Header & Mobile Navigation --- */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      
      // Toggle icon between hamburger and close
      const icon = toggleBtn.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
          icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* --- Sticky Header Shadow on Scroll --- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Active Navigation Highlight --- */
function highlightActiveNav() {
  const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const targetPage = href.split('#')[0].split('?')[0];
    
    if (
      targetPage === pageName ||
      (pageName === 'index.html' && (targetPage === 'index.html' || targetPage === './' || targetPage === '')) ||
      (pageName === '' && (targetPage === 'index.html' || targetPage === './'))
    ) {
      link.classList.add('active');
    }
  });
}

/* --- FAQ Accordions --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items in the same container
      const parent = item.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingBtn = sibling.querySelector('.faq-question');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', (!isActive).toString());
    });
  });
}

/* --- Interactive Hours / Role Scope Estimator --- */
function initScopeEstimator() {
  const serviceSelect = document.getElementById('calc-service');
  const hoursSlider = document.getElementById('calc-hours');
  const hoursVal = document.getElementById('calc-hours-val');
  const estimatedRole = document.getElementById('calc-role-name');
  const weeklyHours = document.getElementById('calc-weekly-hours');
  const inHouseCost = document.getElementById('calc-inhouse-cost');
  const tfCost = document.getElementById('calc-tf-cost');
  const savings = document.getElementById('calc-savings');

  if (!serviceSelect || !hoursSlider) return;

  const serviceData = {
    'virtual-assistant': {
      title: 'Dedicated Virtual Assistant',
      usHourly: 35,
      tfHourly: 14,
    },
    'customer-support': {
      title: 'Customer Support Specialist',
      usHourly: 32,
      tfHourly: 13,
    },
    'appointment-setting': {
      title: 'Outbound Appointment Setter',
      usHourly: 38,
      tfHourly: 16,
    },
    'lead-generation-research': {
      title: 'B2B Lead Research Specialist',
      usHourly: 36,
      tfHourly: 15,
    },
    'social-media-management': {
      title: 'Social Media Coordinator',
      usHourly: 34,
      tfHourly: 14,
    },
    'email-marketing-automation': {
      title: 'Email Automation Specialist',
      usHourly: 40,
      tfHourly: 17,
    }
  };

  function calculate() {
    const key = serviceSelect.value || 'virtual-assistant';
    const hours = parseInt(hoursSlider.value, 10) || 20;
    const item = serviceData[key] || serviceData['virtual-assistant'];

    if (hoursVal) hoursVal.textContent = `${hours} hrs / week`;
    if (estimatedRole) estimatedRole.textContent = item.title;
    if (weeklyHours) weeklyHours.textContent = `${hours} hours / week`;

    // Monthly calculation (4.33 weeks per month)
    const monthlyHours = hours * 4.33;
    const monthlyInHouse = Math.round(monthlyHours * item.usHourly + (hours >= 30 ? 600 : 200)); // payroll taxes/benefits
    const monthlyTf = Math.round(monthlyHours * item.tfHourly);
    const monthlySavings = Math.max(0, monthlyInHouse - monthlyTf);

    if (inHouseCost) inHouseCost.textContent = `$${monthlyInHouse.toLocaleString()} / mo`;
    if (tfCost) tfCost.textContent = `$${monthlyTf.toLocaleString()} / mo`;
    if (savings) savings.textContent = `$${monthlySavings.toLocaleString()} / mo (~${Math.round((monthlySavings / monthlyInHouse) * 100)}%)`;
  }

  serviceSelect.addEventListener('change', calculate);
  hoursSlider.addEventListener('input', calculate);
  calculate();
}

/* --- Accessible Lead Form Validation & Submission --- */
function initLeadForms() {
  const forms = document.querySelectorAll('form[data-lead-form="true"], #contact-form, #quick-quote-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const serviceSelect = form.querySelector('[name="service"]');
      const hoursSelect = form.querySelector('[name="hours"]');
      const messageInput = form.querySelector('[name="message"]');
      const alertBox = form.querySelector('.form-alert');
      const submitBtn = form.querySelector('button[type="submit"]');

      // Validation
      let isValid = true;
      let errorMsg = '';

      if (nameInput && !nameInput.value.trim()) {
        isValid = false;
        errorMsg = 'Please enter your full name.';
        nameInput.focus();
      } else if (emailInput && (!emailInput.value.trim() || !validateEmail(emailInput.value))) {
        isValid = false;
        errorMsg = 'Please enter a valid business email address.';
        emailInput.focus();
      } else if (serviceSelect && !serviceSelect.value) {
        isValid = false;
        errorMsg = 'Please select a core service needed.';
        serviceSelect.focus();
      }

      if (!isValid) {
        if (alertBox) {
          alertBox.className = 'form-alert error';
          alertBox.textContent = errorMsg;
        } else {
          showToast(errorMsg);
        }
        return;
      }

      // Submission state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.origText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting Request...';
      }

      // Simulate network request with verified lead confirmation
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.origText || 'Get Started';
        }

        if (alertBox) {
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = `<strong>Thank you, ${escapeHtml(nameInput.value.trim())}!</strong> Your request for <em>${escapeHtml(serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Remote Support')}</em> has been received. A dedicated account director will review your operational requirements and contact you within 1 business day.`;
        }

        showToast('Consultation request submitted successfully!');
        form.reset();
      }, 700);
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* --- Toast Notification Utility --- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A6F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
