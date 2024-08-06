export interface LoginResult {
  token: string;
}

export function login(username: string) {
  return new Promise<LoginResult>((resolve, reject) => {
    setTimeout(() => {
      if (!username) {
        reject(new Error('invalid username'));
      } else {
        resolve({ token: `token#${new Date().toISOString()}@${encodeURIComponent(username)}` });
      }
    }, 300);
  });
}

export interface UserProfile {
  username: string;
  avatar: string;
  login_at: string;
}

export function fetchUserProfile(token: string) {
  return new Promise<UserProfile>((resolve, reject) => {
    setTimeout(() => {
      const matched = token.match(/^token#([0-9A-Z.:-]+)@(.+)$/);
      const date = matched?.[1];
      const username = matched?.[2];
      if (!date || !username) {
        reject(new Error('invalid token'));
        return;
      }
      resolve({
        username,
        avatar: `https://avatar.vercel.sh/${encodeURIComponent(username)}`,
        login_at: date,
      });
    }, 200);
  });
}

export function logout() {
  return Promise.resolve();
}
