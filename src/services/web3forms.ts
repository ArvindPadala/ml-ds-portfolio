const WEB3FORMS_API_KEY = process.env.REACT_APP_WEB3FORMS_API_KEY || '23a80e18-3ec9-46d5-8c6e-9eab66f5e77a';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

class Web3FormsService {
  private async submitToWeb3Forms(data: any): Promise<ApiResponse> {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          ...data,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          message: 'Message sent successfully! We\'ll get back to you soon.'
        };
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Web3Forms submission failed:', error);
      throw new Error('Failed to send message. Please try again later.');
    }
  }

  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    return this.submitToWeb3Forms({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      'h-captcha': 'false',
    });
  }

  async subscribeToNewsletter(data: NewsletterData): Promise<ApiResponse> {
    return this.submitToWeb3Forms({
      email: data.email,
      subject: 'Newsletter Signup',
      message: `New newsletter signup: ${data.email}`,
      'h-captcha': 'false',
    });
  }
}

export const web3formsService = new Web3FormsService(); 