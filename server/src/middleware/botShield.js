/**
 * BotShield Middleware
 * Intercepts malicious automated scanners, exploit probes, path traversals,
 * and vulnerability probing before any controller or database logic runs.
 */

const BLOCKED_PATTERNS = [
  /\.\./,                          // Directory traversal (..)
  /%2e%2e/i,                      // URL encoded directory traversal
  /\/\.env/i,                     // Probing environment files
  /\/\.git/i,                     // Probing git repository
  /\/(wp-admin|wp-login|xmlrpc)/i,// WordPress exploit scanners
  /\/phpmyadmin/i,                // phpMyAdmin scanner
  /\/cgi-bin\//i,                 // CGI-bin shellshock exploits
  /\/etc\/passwd/i,               // Unix password file probing
  /win\.ini/i,                    // Windows INI file probing
  /%00/,                          // Null byte injection
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Direct script tags in URL
  /\b(union\s+select|information_schema|benchmark\s*\(|sleep\s*\()/i, // SQL injection probes in URL
];

export const botShield = (req, res, next) => {
  const url = decodeURI(req.originalUrl || req.url || '');
  const userAgent = req.headers['user-agent'] || '';

  // 1. Check for blocked malicious URL patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(url)) {
      console.warn(`[SHIELD BLOCKED PROBE] IP: ${req.ip} | URL: ${req.originalUrl} | User-Agent: ${userAgent}`);
      return res.status(403).json({
        success: false,
        message: 'Request blocked by application security firewall.',
      });
    }
  }

  // 2. Block suspicious automated penetration testing tools & vulnerability scanners
  const scannerSignatures = [
    'sqlmap',
    'nikto',
    'acunetix',
    'nessus',
    'masscan',
    'nmap',
    'w3af',
    'havij',
    'burpcollaborator',
  ];

  const lowerUa = userAgent.toLowerCase();
  for (const sig of scannerSignatures) {
    if (lowerUa.includes(sig)) {
      console.warn(`[SHIELD BLOCKED SCANNER] IP: ${req.ip} | Scanner Signature: ${sig}`);
      return res.status(403).json({
        success: false,
        message: 'Automated vulnerability scanner access forbidden.',
      });
    }
  }

  next();
};
