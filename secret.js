import crypto from 'crypto';

const randomSecret = crypto.randomBytes(64).toString('hex');
console.log(randomSecret);