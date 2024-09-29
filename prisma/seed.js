const { prisma } = require('./prisma')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path');

const data = JSON.parse(readFileSync(resolve('prisma', 'seed.json')))

prisma.notice.createMany({ data: data.notices })
    .then(async () => {
        await prisma.$disconnect()
        console.log(`Foram inseridos ${data.notices.length} dados no banco de dados.`)
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })