const { DATABASE_SCHEMA, DATABASE_URL, SHOW_PG_MONITOR } = require('./config');
const massive = require('massive');
const monitor = require('pg-monitor');
const fetchDataUSAAPI = require('./fetchAPI');

// Call start
(async () => {
    console.log('main.js: before start');

    const db = await massive({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }, {
        // Massive Configuration
        scripts: process.cwd() + '/migration',
        allowedSchemas: [DATABASE_SCHEMA],
        whitelist: [`${DATABASE_SCHEMA}.%`],
        excludeFunctions: true,
    }, {
        // Driver Configuration
        noWarnings: true,
        error: function (err, client) {
            console.log(err);
            //process.emit('uncaughtException', err);
            //throw err;
        }
    });

    if (!monitor.isAttached() && SHOW_PG_MONITOR === 'true') {
        monitor.attach(db.driverConfig);
    }

    const execFileSql = async (schema, type) => {
        return new Promise(async resolve => {
            const objects = db['user'][type];

            if (objects) {
                for (const [key, func] of Object.entries(objects)) {
                    console.log(`executing ${schema} ${type} ${key}...`);
                    await func({
                        schema: DATABASE_SCHEMA,
                    });
                }
            }

            resolve();
        });
    };

    //public
    const migrationUp = async () => {
        return new Promise(async resolve => {
            await execFileSql(DATABASE_SCHEMA, 'schema');

            //cria as estruturas necessarias no db (schema)
            await execFileSql(DATABASE_SCHEMA, 'table');
            await execFileSql(DATABASE_SCHEMA, 'view');

            console.log(`reload schemas ...`)
            await db.reload();

            resolve();
        });
    };

    try {
        await migrationUp();

        //exemplo de insert
        const USAPopulationList = await fetchDataUSAAPI();

        const USAPopulationSum = USAPopulationList.reduce((accumulator, { Year, Population }) => {
            const validYearsList = ['2020', '2019', '2018']
            if(validYearsList.includes(Year)) {
                return accumulator + Population;
            }
            return accumulator;
        }, 0);

        console.log('result1 >>>', USAPopulationSum);
        await db[DATABASE_SCHEMA].api_data.insert({
                doc_record: USAPopulationList,
        });

        //exemplo select
        const result2 = await db[DATABASE_SCHEMA].api_data.query(
            'SELECT SUM(Population) FROM doc_record WHERE Year IN ("2018", "2019", "2020")'
        );
        console.log('result2 >>>', result2);

    } catch (e) {
        console.log(e.message)
    } finally {
        console.log('finally');
    }
    console.log('main.js: after start');
})();