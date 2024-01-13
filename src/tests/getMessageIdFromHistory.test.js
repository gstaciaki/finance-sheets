import getMessageIdFromHistory from '../functions/getMessageIdFromHistory'
import webhookResponse from './data/webhookResponse.json'


test('retrieve mail id', async () => {
    const messageId = await getMessageIdFromHistory(webhookResponse)
    expect(messageId).toBe('18cfa90d16c4198e')
})