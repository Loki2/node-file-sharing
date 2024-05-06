import { fetchAllDirectInterface } from "../interfaces/folderInterface.js";



export const getAllDirectories = async (req, res, next) => {
  try {
    const directories = await fetchAllDirectInterface();

    res.send(200).json(directories);
  } catch (error) {
    console.error(error);
  }
}


export const deleteDirById = async (req, res, next) => {
  try {
    const dirId = req.para.dir_id;

    await deleteDirectInterface(dirId);

    res.send(200).json({ message: "Delete Folder successfully...!" });
  } catch (error) {
    console.error(error);
  }
}