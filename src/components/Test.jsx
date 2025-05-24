import { useEffect, useState } from "react";

function Test() {
  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    const imageUrl = "https://mrniqahwkvvomtiacjkl.supabase.co/storage/v1/object/public/diagnosis-image//diagnosis.jpg";

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result); // ini sudah dalam format base64: data:image/jpeg;base64,...
        };
        reader.readAsDataURL(blob);
      });
  }, []);
  console.log(base64Image)

  return (
    <div>
      {base64Image ? (
        <img src={base64Image} alt="Converted" className="w-64 h-auto" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default Test;
