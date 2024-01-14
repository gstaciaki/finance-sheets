import { parse } from 'csv-parse';
import getAttachmentFromMessage from '../functions/getAttachmentFromMessage';

const messageId = '18cfa90d16c4198e';

test('expects attachment CSV', async () => {
    const attachment = await getAttachmentFromMessage(messageId);

    parse(attachment, { delimiter: ',' }, (err, data) => {
        expect(data).toBeInstanceOf(Array);
    });

});
