// Нормализация и SHA-256 (hex)
export async function sha256Hex(input) {
    const norm = String(input || "")
        .trim()
        .toLowerCase()
        .replace(/ё/g, "е");
    const bytes = new TextEncoder().encode(norm);
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(buf)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Хэш правильного ответа "эхо" (нормализовано как выше)
export const ANSWER_HASH = "55190d215ab0f34478403b58aee214e6cbc00842819379a08f1853894095b2bf";
