import pako from 'pako';
import { Buffer } from 'buffer';


export function UnZip(base64str, callback) {
  const binaryData = Buffer.from(base64str, 'base64');
  
  // Inflate binary data
  try {
    const inflatedData = pako.inflate(binaryData, { to: 'string' });
    const jsonData = JSON.parse(inflatedData);
    callback(null, jsonData);
  } catch (error) {
    callback(error, null);
  }
}







