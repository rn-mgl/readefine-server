const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");

const uploadAdminFile = async (req, res) => {
  const file = req.files.file;
  const tempFilePath = file.tempFilePath;
  const name = file.name;

  const data = await cloudinary.uploader.upload(tempFilePath, {
    resource_type: "image",
    public_id: name,
    unique_filename: true,
  });

  if (!data) {
    throw new BadRequestError(`Error in uploading image ${name}. Try again later.`);
  }

  res.status(StatusCodes.OK).json({ url: data.secure_url });
};

const uploadClientFile = async (req, res) => {
  console.log(req);
};

module.exports = { uploadAdminFile, uploadClientFile };
