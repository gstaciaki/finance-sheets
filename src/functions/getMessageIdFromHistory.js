import axios from 'axios'
import getGoogleAccessToken from './getGoogleAccessToken.js'

const getMessageIdFromHistory = async (responseBody) => {

    const base64Data = responseBody.message.data
    const data = Buffer.from(base64Data, 'base64').toString()

    const historyId = JSON.parse(data).historyId

    try {
        const response = await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/history?startHistoryId=${historyId}`,
            {
                headers: {
                    'Authorization': `Bearer ${await getGoogleAccessToken()}`
                }
            }
        )

        return response.data.history[0].messages[0].id
    } catch (error) {
        throw error
    }
}

export default getMessageIdFromHistory