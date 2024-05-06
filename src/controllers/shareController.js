import fs from 'fs';
import { createFolderInterface } from '../interfaces/folderInterface.js';
import { fetchAllSharedFileIdInterface, fetchAllSharedFilesInterface } from '../interfaces/sharesInterface.js';
import { fetchFileByIdInterface } from '../interfaces/fileInterface.js';

// Upload file to shares
export const shareFile = async (req, res) => {
  try {
    const user = req.user;
    // Choose file 
    const file = req.files.file;

    // CREATE new directory for share file
    if (file) {
      const filename = file.name;
      const date = Date.now();
      fs.mkdirSync(`./public/${date}/shares`);

      const path = `./public/${date}/shares`;

      // Save directory path to folder table
      const folder = await createFolderInterface(filename, path, user.id);

      // Save file  to database
      const newFile = await createFileInterface(folder.id, name, path, user.id);

      // Share to folder --> files information --> file table
      await createShareFileInterface(newFile.id, name, path, user.id);

      // 1.) move file to directory path
      file.mv(`${path}/`, (err) => {
        if (err) throw err;
        else
          res.send("file uploaded to shares successfully...!")
      });
    }
  } catch (error) {
    console.error(error)
  }
}


//Fetch all shared files by user id
export const getAllSharedFiles = async (req, res, next) => {
  try {
    const user = req.user;
    const sharedFiles = await fetchAllSharedFilesInterface(user.id);

    res.send(200).json(sharedFiles);
  } catch (error) {
    console.error(error);
  }
}


// Fetch Shared file by id
export const getSharedFileById = async (req, res, next) => {
  try {
    const fileId = req.para.file_id;
    const sharedFileById = await fetchAllSharedFileIdInterface(fileId);

    res.send(200).json(sharedFileById);
  } catch (error) {
    console.error(error);
  }
}


// Delete shared file by ID
export const deleteSharedFileById = async (req, res, next) => {
  try {
    const fileId = req.para.file_id;

    const fileData = await fetchFileByIdInterface(fileId);

    fs.unlinkSync(fileData.path);

    fs.rm(fileData.path, fileData.name);

    await deleteSharedFileInterface(fileId);

    res.send(200).json({ message: "delete share file successfully...!" });
  } catch (error) {
    console.error(error);
  }
}