import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
/*
    0: { search: 'Joao'} 

    1: [['search', 'Joao']]
*/
    select(table, search) {
        let data = this.#database[table] ?? []

        if(search) {
            data = data.filter((row) => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data) {
        const isArray = Array.isArray(this.#database[table])

        if(isArray) {
            this.#database[table].push(data)
        }

        if(!isArray) {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(item => item.id == id)

        if(rowIndex > -1) {
            const currentItem = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = { ...currentItem, ...data }
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(item => item.id == id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}