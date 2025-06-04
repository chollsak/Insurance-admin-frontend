function getServerUrl(): string {
    return import.meta.env.VITE_API_URL || 'http://localhost:8080';
}

export function getImageUrl(imagePath?: string): string | undefined {
    if (imagePath) {
        return `${getServerUrl()}/attachments/${imagePath}`;
    }
    return undefined;
}