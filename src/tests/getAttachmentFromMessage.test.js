import { parse } from 'csv-parse';
import getAttachmentFromMessage from '../functions/getAttachmentFromMessage';

const messageId = '18cfa90d16c4198e';

test('expects attachment to be a valid CSV', async () => {
    try {
        const attachment = await getAttachmentFromMessage(messageId);

        const parsedData = await new Promise((resolve, reject) => {
            parse(attachment, { delimiter: ',' }, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        expect(parsedData).toBeInstanceOf(Array);
    } catch (error) {
        console.error('Error:', error);
        fail(error);
    }
});
