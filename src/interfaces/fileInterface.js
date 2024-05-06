import db from '../configs/database.js';

export const createFileInterface = async (folderId, fileName, path, userId) => {
  try {
    const response = await db.query(`INSERT INTO files (folder_id, name, path, parent_key, create_by) VALUES ('${folderId}', '${fileName}', '${path}', '${userId}', '${userId}')`);

    const file = response.rows;

    return file;
  } catch (error) {
    console.error(error);
  }
}

// Fetch Single file by id
export const fetchFileByIdInterface = async (fileId) => {
  try {
    const response = await db.query(`SELECT * FROM files WHERE id = '${fileId}'`);

    const file = response.rows;

    return file;
  } catch (error) {
    console.error(error);
  }
}