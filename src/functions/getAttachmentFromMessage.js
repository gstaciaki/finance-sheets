import axios from 'axios'
import getGoogleAccessToken from './getGoogleAccessToken.js'

const getAttachmentFromMessage = async (messageId) => {

    if (!messageId) throw 'Message Id not Informed'

    try {

        const accesToken = `Bearer ${await getGoogleAccessToken()}`

        const response = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
            {
                headers: {
                    'Authorization': accesToken
                }
            }
        )

        const attachmentId = response.data.payload.parts.find(e => e.mimeType === 'text/csv').body.attachmentId

        const attachmentResponse = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`,
            {
                headers: {
                    'Authorization': accesToken
                }
            }
        )

        const attachmentBase64 = attachmentResponse.data.data
        const attachment = Buffer.from(attachmentBase64, 'base64').toString()

        return attachment
    } catch (error) {
        throw error.response ?? error
    }

}

export default getAttachmentFromMessage