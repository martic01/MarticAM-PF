// EmailJS Configuration
// Sign up at https://www.emailjs.com to get your keys
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY', // Get from EmailJS dashboard
    serviceID: 'YOUR_SERVICE_ID', // Create a service
    templateID: 'YOUR_TEMPLATE_ID' // Create an email template
};

// Initialize EmailJS
(function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized');
    } else {
        console.error('EmailJS not loaded');
    }
})();

// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.statusDiv = document.querySelector('.form-status');
        this.formGroups = document.querySelectorAll('.form-group');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputAnimations();
    }
    
    setupInputAnimations() {
        this.formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const icon = group.querySelector('i');
            
            if (input && icon) {
                // Add floating effect on focus
                input.addEventListener('focus', () => {
                    icon.style.transform = 'translateY(-50%) scale(1.1)';
                    icon.style.color = 'var(--drgold)';
                });
                
                input.addEventListener('blur', () => {
                    icon.style.transform = 'translateY(-50%) scale(1)';
                    icon.style.color = 'var(--primarycl)';
                });
            }
        });
    }
    
    showStatus(message, type) {
        if (this.statusDiv) {
            this.statusDiv.textContent = message;
            this.statusDiv.className = 'form-status ' + type;
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                this.statusDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    setLoading(isLoading) {
        if (this.submitBtn) {
            if (isLoading) {
                this.submitBtn.classList.add('loading');
                this.submitBtn.innerHTML = '<span>Sending</span><i class="fa-solid fa-spinner"></i>';
                this.submitBtn.disabled = true;
            } else {
                this.submitBtn.classList.remove('loading');
                this.submitBtn.innerHTML = '<span>Send Message</span><i class="fa-regular fa-paper-plane"></i>';
                this.submitBtn.disabled = false;
            }
        }
    }
    
    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.length < 2) {
            return 'Please enter a valid name (min 2 characters)';
        }
        
        if (!emailRegex.test(data.email)) {
            return 'Please enter a valid email address';
        }
        
        if (!data.subject || data.subject.length < 3) {
            return 'Please enter a subject (min 3 characters)';
        }
        
        if (!data.message || data.message.length < 10) {
            return 'Please enter a message (min 10 characters)';
        }
        
        return null;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value.trim(),
            email: document.getElementById('email')?.value.trim(),
            subject: document.getElementById('subject')?.value.trim(),
            message: document.getElementById('message')?.value.trim()
        };
        
        // Validate
        const error = this.validateForm(formData);
        if (error) {
            this.showStatus(error, 'error');
            return;
        }
        
        // Show loading
        this.setLoading(true);
        this.showStatus('Sending message...', 'sending');
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Matthew', // Your name
                    reply_to: formData.email
                }
            );
            
            if (response.status === 200) {
                // Success
                this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
                
                // Add success animation to form
                this.form.classList.add('success-animation');
                setTimeout(() => {
                    this.form.classList.remove('success-animation');
                }, 1000);
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // For demo purposes - simulate success if EmailJS not configured
            if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
                this.showStatus('Demo mode: Message would be sent! (Configure EmailJS for actual sending)', 'success');
                this.form.reset();
            } else {
                this.showStatus('Failed to send message. Please try again later.', 'error');
            }
            
        } finally {
            this.setLoading(false);
        }
    }
}

// CV Download Handler
class CVDownloadHandler {
    constructor() {
        this.downloadBtn = document.getElementById('download-cv');
        this.iframe = document.getElementById('download-iframe');
        
        if (this.downloadBtn) {
            this.init();
        }
    }
    
    init() {
        this.downloadBtn.addEventListener('click', (e) => this.handleDownload(e));
    }
    
    handleDownload(e) {
        e.preventDefault();
        
        // Add download animation
        this.downloadBtn.classList.add('downloading');
        
        // Create a sample CV (in real implementation, this would link to actual PDF)
        this.generateSampleCV();
        
        // Show success message
        setTimeout(() => {
            this.downloadBtn.classList.remove('downloading');
            this.showDownloadNotification();
        }, 1500);
    }
    
    generateSampleCV() {
        // In a real implementation, this would link to your actual CV file
        // For demo, we'll create a simple text file
        const cvContent = this.createCVContent();
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Matthew_Aboyade_C