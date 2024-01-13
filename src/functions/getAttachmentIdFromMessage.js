import axios from 'axios'
import getGoogleAccessToken from './getGoogleAccessToken'

const getAttachmentIdFromMessage = async (messageId) => {

    if (!messageId) throw 'Message Id not Informed'

    try {
        const response = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
            {
                headers: {
                    'Authorization': `Bearer ${await getGoogleAccessToken()}`
                }
            }
        )

        const attachmentId = response.data.payload.parts.find(e => e.mimeType === 'text/csv').body.attachmentId

        return attachmentId
    } catch (error) {
        throw error.response ?? error
    }

}

export default getAttachmentIdFromMessage