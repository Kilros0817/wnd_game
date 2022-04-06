import md5 from 'crypto-js/md5';

export const getAvatar = (account: string) => {
  return `https://secure.gravatar.com/avatar/${md5(account)}?d=retro`;
};
