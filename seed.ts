import { db } from '~/server/db';

const config = await db.config.findFirst();
if (!config) {
  await db.config.create({});
}

console.log('✅ 数据库初始化成功！');
