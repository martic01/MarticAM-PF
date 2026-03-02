// EmailJS Configuration - YOUR ACTUAL KEYS
const EMAILJS_CONFIG = {
    publicKey: 'vCsN7slbNpRz8Pxjl', // Your public key
    serviceID: 'service_mailEA', // Your service ID
    templateID: 'template_portg' // Your template ID
};

// Cloudinary Configuration - YOUR ACTUAL CV URL
const CLOUDINARY_CONFIG = {
    cvUrl: 'https://res.cloudinary.com/dq46c3lf3/image/upload/v1772486720/ACEDU_Corporate_Proposal_with_Logo_c3mdme.pdf',
    // For forced download (adds fl_attachment flag)
    downloadUrl: 'https://res.cloudinary.com/dq46c3lf3/image/upload/fl_attachment/v1772486720/ACEDU_Corporate_Proposal_with_Logo_c3mdme.pdf'
};

// Initialize EmailJS
(function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized with public key');
    } else {
        console.error('EmailJS not loaded - check if script is included');
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
            this.statusDiv.style.display = 'block';
            
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
        
        const formData = {
            name: document.getElementById('name')?.value.trim(),
            email: document.getElementById('email')?.value.trim(),
            subject: document.getElementById('subject')?.value.trim(),
            message: document.getElementById('message')?.value.trim()
        };
        
        const error = this.validateForm(formData);
        if (error) {
            this.showStatus(error, 'error');
            return;
        }
        
        this.setLoading(true);
        this.showStatus('Sending message...', 'sending');
        
        try {
            // Send email using EmailJS with your actual configuration
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Matthew Aboyade',
                    reply_to: formData.email
                }
            );
            
            if (response.status === 200) {
                this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
                
                this.form.classList.add('success-animation');
                setTimeout(() => {
                    this.form.classList.remove('success-animation');
                }, 1000);
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showStatus('Failed to send message. Please try again later or email me directly.', 'error');
            
        } finally {
            this.setLoading(false);
        }
    }
}

// CV Download Handler with Cloudinary
class CVDownloadHandler {
    constructor() {
        this.downloadButtons = document.querySelectorAll('#download-cv, #download-cv-footer');
        this.iframe = document.getElementById('download-iframe');
        
        if (this.downloadButtons.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.downloadButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDownload(e));
        });
    }
    
    handleDownload(e) {
        e.preventDefault();
        
        const button = e.currentTarget;
        this.addDownloadAnimation(button);
        
        // Download from Cloudinary
        this.downloadFromCloudinary(button);
    }
    
    addDownloadAnimation(button) {
        button.classList.add('downloading');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading CV...';
        button.dataset.originalText = originalText;
        button.disabled = true;
    }
    
    removeDownloadAnimation(button) {
        button.classList.remove('downloading');
        if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
        }
        button.disabled = false;
    }
    
    downloadFromCloudinary(button) {
        // Method 1: Using fetch and blob (more control, better for tracking)
        fetch(CLOUDINARY_CONFIG.cvUrl, {
            mode: 'cors',
            credentials: 'same-origin'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                // Create a download link
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Matthew_Aboyade_CV.pdf'; // Set the filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up
                window.URL.revokeObjectURL(url);
                
                // Show success
                this.removeDownloadAnimation(button);
                this.showNotification('CV Downloaded Successfully!', 'success');
            })
            .catch(error => {
                console.error('Download failed:', error);
                
                // Method 2: Fallback - use download URL with attachment flag
                this.fallbackDownload(button);
            });
    }
    
    fallbackDownload(button) {
        try {
            // Use the download URL with fl_attachment flag
            const downloadLink = document.createElement('a');
            downloadLink.href = CLOUDINARY_CONFIG.downloadUrl;
            downloadLink.download = 'Matthew_Aboyade_CV.pdf';
            downloadLink.target = '_blank';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            this.removeDownloadAnimation(button);
            this.showNotification('CV Download Started!', 'success');
        } catch (error) {
            console.error('Fallback download failed:', error);
            
            // Method 3: Last resort - open in new tab
            window.open(CLOUDINARY_CONFIG.cvUrl, '_blank');
            this.removeDownloadAnimation(button);
            this.showNotification('CV opened in new tab', 'info');
        }
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        
        let icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'info') icon = 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: type === 'success' ? 'var(--primarycl)' : 
                       type === 'error' ? '#f44336' : '#2196F3',
            color: type === 'success' ? '#000' : '#fff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            animation: 'slideUp 0.3s ease',
            fontWeight: 'bold',
            fontFamily: "'Share Tech', sans-serif"
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize everything when document is ready
$(document).ready(function() {
    console.log('Initializing contact modules...');
    
    // Initialize Contact Form
    new ContactFormHandler();
    
    // Initialize CV Download with Cloudinary
    new CVDownloadHandler();
    
    // Add smooth scroll for contact links
    $('a[href="#contact"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 50
        }, 500);
    });
    
    // Test Cloudinary connection (optional)
    fetch(CLOUDINARY_CONFIG.cvUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Cloudinary CV is accessible');
            } else {
                console.warn('⚠️ Cloudinary CV might not be accessible');
            }
        })
        .catch(err => {
            console.warn('⚠️ Could not verify Cloudinary connection:', err);
        });
    
    console.log('Contact and CV modules initialized with Cloudinary');
});