import axios from 'axios';

// Point directly to backend to avoid proxy issues
const baseURL = 'http://localhost:8080';

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Log all requests for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🔵 Before Axios serialization:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      dataType: typeof config.data,
      dataIsString: typeof config.data === 'string',
      dataValue: config.data,
    });

    // Ensure data is not double-stringified
    if (typeof config.data === 'string' && config.data.startsWith('{')) {
      try {
        config.data = JSON.parse(config.data);
        console.log('⚠️ Fixed double-stringified JSON data');
      } catch (e) {
        console.warn('Could not parse data string:', e);
      }
    }
    
    console.log('🟢 After fix, before Axios sends:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      dataType: typeof config.data,
      headers: config.headers['Content-Type']
    });
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (r) => r,
  (error) => {
    // Normalize error and log for debugging
    const status = error?.response?.status;
    const serverData = error?.response?.data;
    
    // Extract error message from backend response
    let msg = 'Request failed';
    if (serverData) {
      msg = serverData.error || serverData.message || msg;
      // If there are validation details, append them
      if (serverData.details && Array.isArray(serverData.details)) {
        msg += ': ' + serverData.details.join(', ');
      }
    } else {
      msg = error.message || msg;
    }
    
    // Log full error for debugging
    console.error('API Error Details:', {
      status,
      message: msg,
      fullResponse: serverData,
      url: error?.config?.url,
      method: error?.config?.method,
      requestPayload: error?.config?.data
    });
    
    const normalized = new Error(`${status ? status + ' - ' : ''}${msg}`.trim());
    return Promise.reject(normalized);
  }
);
