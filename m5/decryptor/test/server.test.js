const request = require('supertest');
const app = require('../server');
const NodeRSA = require('node-rsa');


const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5ox8dFEBD+lcWPUI19N
S3qf06i9wMKasGCZZq5eI7U/biPD7PtV4pkJhjmLjM5h0hweOPeW2E0DLJ8+Wc8C
AEsHTBG3+bMOwXhDKK8cWW8z+boL6G9lpcOM8tt7xUbmCnq15s0JRn2K6LOYS6DO
Fb5hhOnU3HtfS+f9RG0/ENO9FZOXhV4x1nhPHYiw6JGM6Nxv2rv32nQ/C8dNZdEb
FgVmkoxDnDluShuxBTXkh2C0S505WcE46/nrsD5RWyMYU6VkX514mj1Vp3Dsvzji
YP3/MJdrUJHEseETXPFTZuMVvU/OMWEEAQKDViU8ES91LedGkCmplTyn44yhA/qI
KQIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAv5ox8dFEBD+lcWPUI19NS3qf06i9wMKasGCZZq5eI7U/biPD
7PtV4pkJhjmLjM5h0hweOPeW2E0DLJ8+Wc8CAEsHTBG3+bMOwXhDKK8cWW8z+boL
6G9lpcOM8tt7xUbmCnq15s0JRn2K6LOYS6DOFb5hhOnU3HtfS+f9RG0/ENO9FZOX
hV4x1nhPHYiw6JGM6Nxv2rv32nQ/C8dNZdEbFgVmkoxDnDluShuxBTXkh2C0S505
WcE46/nrsD5RWyMYU6VkX514mj1Vp3DsvzjiYP3/MJdrUJHEseETXPFTZuMVvU/O
MWEEAQKDViU8ES91LedGkCmplTyn44yhA/qIKQIDAQABAoIBAD5aoAZiZBA95kmQ
g2k/ipgVwA3RzG7+5figd0vDUz+rrIjbeteUs86an07fS1r3jz4hiHRhnuWlqnLL
IC95/ty5jhZjbcwFSbgMu05yLnesiO2sblOmbR4VFbmzVARPnm2qoagK8gnOsXYp
fFagbnEFFBd9QZi/TbQWO4YZR3zh22a26KHGG9FD6fljl6VNSeaNoia/9xyXC8M2
B6OgYOdl0qPN7F26YoQfQ4lDof5OxCa4leF1KKWZ4Yk02BptMxA2yENO+5HZCqmy
AGjieSkKzfoJjpp35llpkmkiMNrw7xO8m+HAXFL/AovsPyjlGJb31+hZYa3PFQVv
8goqCAECgYEA4pXJaPhuYzzCYJpFuH1toN0VoDQrDZUCzpgF8BgQWtYiMLSJxA+j
jteRDmeWnL8q1/NGF2X7NB7EIebCCxLbOQqwBFHePMrfrfBL9egpikEJrHZPaegT
Un9VVbQutzGxED13iQEvTOcxWwXKiwB3NlbABZ3k9yWjbF39vXaX6nkCgYEA2HnO
/aqG+kyCtkZpXhjicXknToqxlsWPrr6h7i8e/f7lAqq55uxWHCcLmXyyKHR35U4z
c9YQy9OEcTdCpPiEZb/o+33Q6l8nihtu+TS+qNa8i4QIhqQkjsv+QGlUQTYiWGh3
e466F6kkDkGUv8qSM7+34RyyC0SSF78c6icSHzECgYEAn72P2ARE9otwUeCRRKaQ
sjcLNv1wWMvzxahhj0m3xgJu6j1tXp7T5TFOX4RiJzGSx9oHURmhhrYl+eyQYnQx
vz4sp278KYmxNhRRyRSarJB7fG2QQQ7PCHsisyArSxWqSdO7wQfny+S15ADqMSLr
6JAyIgOV1zNeylhdOcQxB6kCgYAdw6nNQQwsECcMzuOf94XzGjhoWTOPynw2B6oW
KM53F/v/AOBsuuQgHNJAeV+5pkHx+m2iqLVIgT29n15/dlgl8VwkcCkwgILcP2dj
xnfMmTH1cOMHODx6kdvUmWbnTH0ucLa0+2vk4vG9MBE2ybCOgvbScfKdEAGSWEmu
fE7GkQKBgQCPH2GTXybmM/bb7VPQKahrpFQSBEQQsLLJT+kHcv1BypjHY7sjJnzp
tQ+9EoJZvkGiERYyE55fq9EyVLck/n1zqS3Vp8XI+X5dJGu5cKrrvhkCIljz/Toz
XrUTE5ONzAEXND4/ll5CR0U7qvn9WCIzlGg2s5KGcw+8FKMwiouMbA==
-----END RSA PRIVATE KEY-----`;

// will be call by the data provider
async function encryptData(data) {

    const key = new NodeRSA(privateKey);

    // Encrypt data using the public key
    const encryptedData = key.encrypt(data, 'base64');

    // Return the encrypted data as a Base64-encoded string
    return encryptedData;
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
        expect(response.text).toBe('test');
    });
});
