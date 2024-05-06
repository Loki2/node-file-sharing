import db from '../configs/database.js';

export const createShareFileInterface = async (fileId, name, path, userId) => {
  try {
    const response = await db.query(`INSERT INTO shares (file_id, name, path, parent_key, create_by) VALUES('${fileId}', '${name}', '${path}', '${userId}', '${userId}')`);

    const share = response.rows;

    return share;
  } catch (error) {
    console.error(error);
  }
}

export const fetchAllSharedFilesInterface = async (userId) => {
  try {
    const resp = await db.query(`SELECT * FROM shares WHERE create_by = '${userId}'`);

    const sharedFiles = resp.rows;

    return sharedFiles;
  } catch (error) {
    console.error(error);
  }
}


export const fetchAllSharedFileIdInterface = async (fileId) => {
  try {
    const response = await db.query(`SELECT * FROM shares WHERE file_id = '${fileId}'`);

    const file = response.rows;

    return file;
  } catch (error) {
    console.error(error);
  }
}

export const deleteSharedFileInterface = async (fileId) => {
  try {
    const result = await db.query(`DELETE FROM shares WHERE file_id ='${fileId}'`);

    return result;
  } catch (error) {
    console.error(error)
  }
}