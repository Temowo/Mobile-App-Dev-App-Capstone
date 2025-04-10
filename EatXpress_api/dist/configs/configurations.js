"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT),
    dbUri: process.env.NODE_ENV === "development" ? process.env.DB_TEST_URI : process.env.DB_PROD_URI,
    jwtSecret: process.env.JWT_SECRET,
    smsId: process.env.TERMII_SENDER_ID,
    smsKey: process.env.TERMII_KEY,
    smsUrl: process.env.TERMII_URL,
    mailKey: process.env.MAILJET_KEY,
    mailSecret: process.env.MAILJET_SECRET,
    mailJetUser: process.env.MAILJET_USER,
    mailJetPass: process.env.MAILJET_PASS,
    mailJetHost: process.env.MAILJET_HOST,
    mailJetPort: process.env.MAILJET_PORT,
    mailHost: process.env.MAIL_HOST,
    appMail: process.env.APP_MAIL,
    orgName: process.env.ORG_NAME,
    fsBucket: process.env.FS_S3_BUCKET,
    cloudName: process.env.CLOUD_NAME,
    cloudKey: process.env.CLOUD_KEY,
    cloudSecret: process.env.CLOUD_SECRET,
    s3Region: process.env.S3_REGION,
    s3Key: process.env.S3_KEY,
    s3Secret: process.env.S3_SECRET,
    s3Bucket: process.env.S3_BUCKET,
    linodeToken: process.env.LINODE_TOKEN,
    linodeBucketId: process.env.LINODE_BUCKET_ID,
    paystackSecret: process.env.PAYSTACK_SECRET_KEY,
    paystackKey: process.env.PAYSATCK_API_KEY,
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    },
    mailingUser: process.env.MAIL_USER,
    mailingId: process.env.MAIL_ID,
    mailingKey: process.env.MAIL_KEY
});
//# sourceMappingURL=configurations.js.map