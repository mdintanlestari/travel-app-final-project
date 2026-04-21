import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadImage = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  console.log("isinya pa", imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) {
      toast.error("Pilih gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        },
      )
      .then((res) => {
        console.log("ini data", res.data);
        console.log("ini respon", res);
        const url = res.data.url;
        setImageUrl(url);
        toast.success("Successfully uploaded!");
        if (onUploadSuccess) {
          onUploadSuccess(url); // kirim ke parent
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Upload failed");
      });
  };

  return (
    <div className="space-y-3">
      <input type="file" onChange={handleImageChange} />

      <button
        onClick={() => {
          console.log("button klik");
          handleUpload();
        }}
        className="rounded bg-slate-300 hover:bg-slate-400 p-2 border cursor-pointer"
      >
        Upload
      </button>

      {imageUrl && (
        <div>
          <p className="text-sm text-gray-600">Preview:</p>
          <img src={imageUrl} alt="Preview" className="w-32 mt-1 rounded" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
