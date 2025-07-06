// Script to create initial admin user after deployment
// Usage: node create-admin.js <backend-url>

const https = require('https');
const http = require('http');

const backendUrl = process.argv[2] || 'http://localhost:5000';
const adminData = {
  name: 'Super Admin',
  email: 'admin@parlour.com',
  password: 'admin123456',
  role: 'superadmin'
};

console.log(`🔧 Creating admin user at: ${backendUrl}`);

const postData = JSON.stringify(adminData);
const url = new URL(`${backendUrl}/api/auth/register`);

const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const client = url.protocol === 'https:' ? https : http;

const req = client.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);
    
    if (res.statusCode === 201) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@parlour.com');
      console.log('🔑 Password: admin123456');
      console.log('⚠️  Please change the password after first login!');
    } else {
      console.log('❌ Failed to create admin user');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(postData);
req.end();