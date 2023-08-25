import { sign, verify } from 'jsonwebtoken';
import AppError from '../src/http/error/AppError';


const secret: string = process.env.JWT_SECRET;

export const generateAccessToken = (
  userId: number,
  userName: string,
  userEmail: string,
  userPixKey: string,
  userPhone: string,
  userActive: boolean,
  userAdmin: boolean
): string => {
  const accessToken = sign(
    {
      userId,
      userName,
      userEmail,
      userPixKey,
      userPhone,
      userActive,
      userAdmin
    },
    secret,
    { expiresIn: '2h' }
  );
  return accessToken;
};

export const generateRefreshToken = (
  userId: number,
  userName: string,
  userEmail: string,
  userPixKey: string,
  userPhone: string,
  userActive: boolean,
  userAdmin: boolean
): string => {
  const refreshToken = sign(
    {
      userId,
      userName,
      userEmail,
      userPixKey,
      userPhone,
      userActive,
      userAdmin
    },
    secret,
    { expiresIn: '8h' }
  );
  return refreshToken;
};

export const decodeToken = async (token: string): Promise<{
  userId: number,
  userName: string,
  userEmail: string,
  userPixKey: string,
  userPhone: string,
  userActive: boolean,
  userAdmin: boolean, exp: number
}> => {
  const decodedToken = verify(token, secret) as {
    userId: number,
    userName: string,
    userEmail: string,
    userPixKey: string,
    userPhone: string,
    userActive: boolean,
    userAdmin: boolean, exp: number
  };
  return decodedToken;
}

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const tokenDecodificado = await decodeToken(token)

    const { exp } = tokenDecodificado;
    const momentoAtual = Math.floor(Date.now() / 1000);

    return momentoAtual < exp;
  } catch (error) {
    throw new AppError('Token invalido', 401);
  }
};
