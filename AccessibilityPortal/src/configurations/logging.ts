// Default namespace for log messages
const DEFAULT_NAMESPACE = 'Client';

// Function to log 'info' level messages
const info = (message: any, namespace?: string) => {
    // Check if message is a string for appropriate formatting
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO] ${message}`);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO]`, message);
    }
};

// Function to log 'warn' level messages
const warn = (message: any, namespace?: string) => {
    // Similar structure to 'info' for warning messages
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN] ${message}`);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN]`, message);
    }
};

// Function to log 'error' level messages
const error = (message: any, namespace?: string) => {
    // Similar structure to 'info' for error messages
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR] ${message}`);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR]`, message);
    }
};

// Utility function to get the current date in ISO format
const getDate = () => {
    return new Date().toISOString();
};

// Grouping the log functions into a single object for export
const logging = {info, warn, error};

export default logging;
