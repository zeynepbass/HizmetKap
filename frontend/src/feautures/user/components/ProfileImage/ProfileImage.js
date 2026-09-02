export function ProfileImage({
    resim,
    preview,
    handleFileChange,
  }) {
    return (
      <div className="flex flex-col items-center gap-4">
        {resim && (
          <img
            src={preview}
            alt="Profil Fotoğrafı"
            className="rounded-2xl w-40 h-40 object-cover border border-gray-200"
          />
        )}
  
        <label className="cursor-pointer text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
          Fotoğraf Seç
  
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    );
  }