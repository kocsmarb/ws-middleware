import jwt from 'jsonwebtoken';

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, 'my-secret-from-env-file-in-prod');
    }
    return null;
  } catch (err) {
    return null;
  }
};

const context = ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const currentUser = getUser(token);

  return {
    currentUser,
  };
};

export default context;
