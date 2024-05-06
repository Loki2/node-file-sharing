import db from '../configs/database.js';

export const createFolderInterface = async (filename, path, userId) => {
  try {
    const response = await db.query(`INSERT INTO folders (name, path, parent_key, create_by) VALUES ('${filename}', '${path}', '${userId}', '${userId}')`);

    const folder = response.rows;

    return folder;
  } catch (error) {
    console.error(error);
  }
}

export const fetchAllDirectInterface = async () => {
  try {
    const response = await db.query(`SELECT * FROM folders`);

    const folders = response.rows;

    return folders;
  } catch (error) {
    console.error(error);
  }
}

export const deleteDirectInterface = async (dirId) => {
  try {
    const result = await db.query(`DELETE FROM folders WHERE id ='${dirId}'`);

    return result;
  } catch (error) {
    console.error(error);
  }
} 