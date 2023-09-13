import Pocketbase from 'pocketbase';

const pb = new Pocketbase(process.env.APP_SERVER);

export default pb;