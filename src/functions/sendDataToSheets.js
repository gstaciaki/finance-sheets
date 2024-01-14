import axios from 'axios';
import { parse } from 'csv-parse';
import { promisify } from 'util';
import credentials from '../../tokens.json' assert { type: 'json'}
import getAccessTokenByJWT from '../functions/getAccessTokenByJWT.js';

const parsePromise = promisify(parse);

const sendDataToSheets = async (csvString) => {
    try {
        const data = await parsePromise(csvString);

        const date = data[1][0];
        const extractMonth = date.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, '$2/$3');

        const accessToken = await getAccessTokenByJWT();
        const sheetsId = credentials.sheets_id;

        const queryParams = {
            valueInputOption: 'RAW'
        };

        const values = data.map(row => [row[0], row[1], row[3]])
        const body = {
            range: `'${extractMonth}'!A4:C`,
            majorDimension: 'ROWS',
            values
        };

        const response = await axios.put(
            `https://content-sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/'${encodeURIComponent(extractMonth)}'!A4%3AC`,
            body,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                params: queryParams
            }
        );
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default sendDataToSheets;
