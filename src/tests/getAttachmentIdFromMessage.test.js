import getAttachmentIdFromMessage from "../functions/getAttachmentIdFromMessage"

const messageId = '18cfa90d16c4198e'

test('expects attachment id from email', async () => {
    const attachmentId = await getAttachmentIdFromMessage(messageId)

    expect(attachmentId).toBeDefined()
})