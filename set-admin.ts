import { input, password as passwordInput } from '@inquirer/prompts';
import argon2 from 'argon2';
import fs from 'fs';
import { nanoid } from 'nanoid';

const username = await input({ message: '请输入管理员用户名：' });
const password = await passwordInput({
  message: '请输入管理员密码：',
  mask: true,
});
await passwordInput({
  message: '请再次输入密码：',
  mask: true,
  validate: (value) => value === password || '重复密码不正确',
});
const passwordHash = await argon2.hash(password);

const env = `ADMIN_USERNAME = ${username}
ADMIN_PASSWORD_HASH = ${passwordHash.replaceAll('$', '\\$')}
JWT_SECRET_KEY = ${nanoid()}`;
fs.writeFileSync('./.env', env);

console.log('✅ 设置成功！');
