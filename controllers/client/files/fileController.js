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
    resource_type: "image",
    public_id: name,
    unique_filename: true,
    folder: "readefine-uploads",
  });

  if (!data) {
    throw new BadRequestError(`Error in uploading image ${name}. Try again later.`);
  }

  fs.unlinkSync(file.tempFilePath);
  res.status(StatusCodes.OK).json({ url: data.secure_url });
};

module.exports = { uploadFile };
