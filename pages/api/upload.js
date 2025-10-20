import formidable from "formidable";
import fs from "fs";
import cloudinary from "cloudinary";
import pool from "../../lib/db.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  console.log("➡️ Received form submission");

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(500).json({ message: "Form parse error" });
    }

    console.log("✅ Form parsed successfully");
    console.log("Fields:", fields);
    console.log("Files:", files);

    try {
      let imageUrl = null;
      let uploadedFile = null;

      // ✅ Handle both array or single file formats
      if (Array.isArray(files.image) && files.image.length > 0) {
        uploadedFile = files.image[0];
      } else if (files.image) {
        uploadedFile = files.image;
      }

      if (uploadedFile && uploadedFile.filepath) {
        console.log("📤 Uploading to Cloudinary...");

        const uploadRes = await cloudinary.v2.uploader.upload(
          uploadedFile.filepath,
          {
            folder: "schools", // auto-create by Cloudinary
            use_filename: true,
            unique_filename: true,
            resource_type: "image",
          }
        );

        console.log("✅ Uploaded:", uploadRes.secure_url);
        imageUrl = uploadRes.secure_url;

        // delete local temp file
        try {
          fs.unlinkSync(uploadedFile.filepath);
        } catch (err) {
          console.warn("⚠️ Could not delete temp file:", err.message);
        }
      } else {
        console.log("⚠️ Image not found or invalid format.");
      }

      // ✅ Save into MySQL
      const { name, address, city, state, contact, email_id } = fields;
      const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        name?.toString() || "",
        address?.toString() || "",
        city?.toString() || "",
        state?.toString() || "",
        contact?.toString() || "",
        imageUrl,
        email_id?.toString() || "",
      ];

      const [result] = await pool.query(sql, params);
      console.log("✅ School saved to DB, id:", result.insertId);

      return res.status(200).json({
        success: true,
        message: "School saved successfully",
        id: result.insertId,
        imageUrl,
      });
    } catch (e) {
      console.error("🔥 Error uploading or saving:", e);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: e.message });
      }
    }
  });
}
