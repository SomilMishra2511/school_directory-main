// pages/addSchool.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);

  // 🧠 Image preview handle karne ke liye
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // ✅ Append all text fields manually
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    // ✅ Append image correctly
    const fileInput = data.image?.[0];
    if (fileInput) {
      formData.append("image", fileInput);
      console.log("📦 Image attached:", fileInput.name);
    } else {
      console.warn("⚠️ No image selected in form!");
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("🟢 Upload result:", result);

      if (res.ok) {
        alert("School added successfully!");
        reset();
        setPreview(null);
      } else {
        alert("Error: " + (result.message || "Unknown"));
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Error uploading school data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Add School</h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
        {/* School Name */}
        <div>
          <label className="block text-sm font-medium">School Name</label>
          <input
            className="mt-1 block w-full border rounded p-2"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            className="mt-1 block w-full border rounded p-2"
            {...register("address", { required: true })}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              className="mt-1 block w-full border rounded p-2"
              {...register("city", { required: true })}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">City is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              className="mt-1 block w-full border rounded p-2"
              {...register("state", { required: true })}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">State is required</p>}
          </div>
        </div>

        {/* Contact & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Contact</label>
            <input
              className="mt-1 block w-full border rounded p-2"
              {...register("contact", {
                required: true,
                pattern: /^[0-9]{10,15}$/,
              })}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                Provide valid contact (10-15 digits)
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="mt-1 block w-full border rounded p-2"
              {...register("email_id", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">Provide valid email</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 hover:text-blue-400"
            {...register("image", { required: true })}
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded-md border"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add School
          </button>
        </div>
      </form>
    </div>
  );
}
