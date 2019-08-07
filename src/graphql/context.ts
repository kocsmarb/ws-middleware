import jwt from 'jsonwebtoken';
import hash from 'object-hash';

// TODO: it is just a dummy fingerprint
const getFingetprint = headers =>
  hash([
    headers.origin,
    headers['user-agent'],
    headers['accept-encoding'],
    headers['accept-language'],
    process.env.HASH_GEN_SALT,
  ]);

const compareFingerprint = (f1, f2) => f1 === f2;

const getUser = (token, fingerprint) => {
  try {
    if (token) {
      const user: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      if (!compareFingerprint(user.fingerprint, fingerprint)) {
        throw new Error('Fingerprint missmatch');
      }
      return user;
    }
    return null;
  } catch (err) {
    return null;
  }
};

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const fingerprint = getFingetprint(req.headers);
  const currentUser = getUser(token, fingerprint);

  return {
    currentUser,
    fingerprint,
    getFingetprint: () => fingerprint,
  };
};

export default context;
