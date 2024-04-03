const request = require('supertest');
const app = require('../server');
const crypto = require('crypto');

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBtX3gndjVlGaeBidgRZymH
UeMhHtQuXLsfh8anRZVpnVW70ejRHXeObU4hHJtedGYfqaBwdOqTjwsDa+7RNWKn
h/CR36H9MDJYR1wYlUW8n5fDrUWBpk52j3nt+s69fmHB3h191IP+4NkBuLVlicOv
4+zfKUspODZ53swzc+0sGkeu+fI/aqPGuVojSw1Hfia8CptKoVWQU44JyMaymm/U
kkCFpMphR+seizXXY9xkYwvFd3olGRO7gUp4P/71qCePZj6QT+4hkjaTyAojJCtX
p6kib7otHEqQ2bW55EsmwPMfovj7c7o0tPPAU0TZpvu94XWRtNYvSleZNAb0A5IM
FHGT+cq3Qq5L5cRHwZ3aDa30N2MEiLwYWtbcysodsZv9JKm7Q4TFN+0+zdqwzPU1
RPrLbxqSIl2V+TcDjqrMqtg9bj5KlxetR4Fj23MDho+vNEi0FdI3zVV5Dzz20hKj
ItYegqztTiq34OBU9/d1Qk130D/eXTMdrrYGktowEJD6yu2sPTjRJKKfxYvK4WrE
vrXiyIA4y6pRpoQXF/gng9sSYz5x+TGVddD9TfGx5UlDQN4Rr9GasnCOP/f/xeWb
J36/x1KBQygxXoASz2J8MGRnZGnT4JEdjy7hvCbahonakd5JIqhWNk/50vBrllGb
dJqNrWO3BghCBXtn7DQDQwIDAQAB
-----END PUBLIC KEY-----`;

// will be call by the data provider
async function encryptData(data) {

    const buff_key = Buffer.from(publicKey, 'utf-8');

    const key = await crypto.createPublicKey(buff_key);

    // Encrypt the data using the public key
    const encryptedData = crypto.publicEncrypt(key,Buffer.from(data));

    // Return the encrypted data as a Base64-encoded string
    return encryptedData.toString('base64');
}

describe('Test server endpoint for decryption', () => {
    test('Decrypt encrypted data', async () => {

        const encryptedData = await encryptData('test'); // assume encryptData is already tested

        console.log('Encrypted data:', encryptedData);

        // Make a GET request to the /decrypt/:encryptedData endpoint with the encrypted data
        const response = await request(app).get(`/decrypt/${encodeURIComponent(encryptedData)}`);
        
        // Verify that the response status is 200
        expect(response.status).toBe(200);

        // Verify that the decrypted data returned by the endpoint matches the original word "test"
        expect(response.body).toBe('test');
    });
});
