const PIECES = [
    "Без языка, а говорит; ",
    "без ушей, а слышит; ",
    "без тела, а отзывается. ",
    "Что это?"
];

const enc = new TextEncoder();

function shuffleBySeed(arr, seed = "s1") {
    const a = [...arr];
    let n = [...seed].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);
    for (let i = a.length - 1; i > 0; i--) {
        n = (n * 1664525 + 1013904223) >>> 0;
        const j = n % (i + 1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function toBinary(str) {
    return Array.from(enc.encode(str))
        .map(b => b.toString(2).padStart(8, "0"))
        .join(" ");
}

export function makeBinaryRiddle(seed = "s1") {
    const text = shuffleBySeed(PIECES, seed).join("");
    return toBinary(text);
}
