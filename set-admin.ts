import { input, password as passwordInput } from '@inquirer/prompts';
import argon2 from 'argon2';
import fs from 'fs';

const username = await input({ message: '请输入管理员用户名：' });
const password = await passwordInput({
  message: '请输入管理员密码：',
  mask: true,
});
const passwordHash = await argon2.hash(password);

const env = `ADMIN_USERNAME = ${username}
ADMIN_PASSWORD_HASH = ${passwordHash}`;
fs.writeFileSync('./.env', env);

console.log('✅ 设置成功！');
