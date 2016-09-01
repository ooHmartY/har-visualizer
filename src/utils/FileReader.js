export default function fileReader(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(file);

        reader.addEventListener('error', reject);
        reader.addEventListener('abort', reject);

        reader.addEventListener('loadend', e => {
            resolve(e.target.result);
        });

        reader.readAsText(file);
    });
}
