import map from 'lodash/map';
import get from 'lodash/get';
import split from 'lodash/split';
import last from 'lodash/last';
import first from 'lodash/first';

import * as fixture from './www.nordstromrack.com.json';

export default function parseHarFileData(data = fixture) {
    return map(
        get(data, 'log.entries', []),
        entry => {
            const { time } = entry;
            const url = get(entry, 'request.url');
            const end = last(split(url, '/'));
            const fileName = first(split(end, '?'));
            const mimeType = get(entry, 'response.content.mimeType');
            const size = get(entry, 'response.content.size', 0)/1024;
            const timings = get(entry, 'timings');
            return {
                time,
                url,
                mimeType,
                size,
                timings,
                fileName: fileName.length ? fileName : '/'
            };
        }
    );
}
