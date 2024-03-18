const scene = spatialDocument.scene;

export async function createRawTexture(texture: ArrayBuffer) {
  const bitmap = await createImageBitmap(new Blob([texture], { type: 'image/png' }))
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return new BABYLON.RawTexture(
    imageData.data,
    imageData.width,
    imageData.height,
    BABYLON.Engine.TEXTUREFORMAT_RGBA,
    scene,
    false,
    false,
    BABYLON.Texture.TRILINEAR_SAMPLINGMODE
  );
}