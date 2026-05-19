import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function cloudinaryConfigurado(): boolean {
  const configurado = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
  if (!configurado) {
    console.warn("[Cloudinary] Credenciais não encontradas no ambiente.");
  }
  return configurado;
}

export async function uploadImagem(
  base64: string,
  pasta: string
): Promise<string> {
  const resultado = await cloudinary.uploader.upload(base64, {
    folder: `gaapo/${pasta}`,
  });
  return resultado.secure_url;
}

export async function deletarImagem(url: string): Promise<void> {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/);
  if (!match) return;
  await cloudinary.uploader.destroy(match[1]);
}
