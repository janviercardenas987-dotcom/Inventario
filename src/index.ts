import app from "./app.js";
import { PORT } from "./config.js";
import { AppDataSource } from "./data-source.js";
import 'reflect-metadata'

async function main(){
    try{
        await AppDataSource.initialize();
        app.listen(PORT, () => {
            console.log(`Listen on port ${PORT}`);
        })
    }catch(error){
        console.error(error);
    }
}


main();
