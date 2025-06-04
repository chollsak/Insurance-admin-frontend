export async function imageUrlToFile(url: string, filename: string, mimeType?: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const type = mimeType || blob.type || "image/jpeg";
    return new File([blob], filename, { type });
}