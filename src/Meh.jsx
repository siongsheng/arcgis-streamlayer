export default function Meh() {
    const worker = new Worker(new URL('./worker/test.js', import.meta.url), { type: "module" });
    return (
        <div>
            Testing
        </div>
    )
};
