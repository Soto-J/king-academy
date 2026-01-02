export const cloudinaryImage = (publicId: string) => {
  const base = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  return {
    thumb: `${base}/w_400,q_60,f_webp/${publicId}`,
    medium: `${base}/w_1600,q_75,f_webp/${publicId}`,
    full: `${base}/q_90,f_webp/${publicId}`,
    blur: `${base}/w_20,q_10,e_blur:1000/${publicId}`,
  };
};
