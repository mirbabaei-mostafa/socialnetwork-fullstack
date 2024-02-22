export const dataurlToBlob = async (url: string): Promise<Blob> => {
  return await (await fetch(url)).blob();
};

// export const blobToDataUrl = async (blob: Blob) => {
//   let reader = new FileReader();
//   reader.readAsDataURL(blob);
//   await new Promise(
//     (resolve) =>
//       (reader.onload = function () {
//         resolve();
//       })
//   );
//   return reader.result;
// };
