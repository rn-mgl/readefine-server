const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadFile = async (req, res) => {
  const file = req.files.file;
  const tempFilePath = file.tempFilePath;
  const name = file.name + uuidv4();

  const data = await cloudinary.uploader.upload(tempFilePath, {
    resource_type: "auto",
    public_id: name,
    unique_filename: true,
    folder: "readefine-uploads",
  });

  if (!data) {
    throw new BadRequestError(`There was a problem uploading image ${name}.`);
  }

  fs.unlinkSync(file.tempFilePath);
  res.status(StatusCodes.OK).json({ url: data.secure_url });
};

module.exports = { uploadFile };
