import sendDataToSheets from "../functions/sendDataToSheets";
import exampleCsv from './data/example-bank-extract.json'

test('send the csv data to sheets', async () => {
    try {
        const response = await sendDataToSheets(exampleCsv)
        expect(response.updatedRange).toBeDefined()
    } catch(error) {
        throw error
    }
})