import fs from 'fs';
import Post from './models/Post.js';

export const backupDatabase = async () => {
  try {
    const posts = await Post.find();
    if (!fs.existsSync('./backups')) {
      fs.mkdirSync('./backups');
    }
    fs.writeFileSync('./backups/posts_backup.json', JSON.stringify(posts, null, 2));
    console.log('Резервная копия создана!!!');
  } catch (err) {
    console.error('Ошибка копирования:', err);
  }
};  