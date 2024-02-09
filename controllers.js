const { json } = require('body-parser');
const fs = require('fs')
const path = __dirname
console.log(path);

const saveMessage = (req, res) => {
    let data = (req.body)
    let name = (data.name)
    fs.writeFile(`${path}/messages/${name}.json`, `${JSON.stringify(data)}`, 'utf-8', (e) => {
        if (e) {
            console.log(e);
            res.status(500).send(e.code)
        }
        res.status(200).send(data)
    })
}

const readMessage = (req, res) => {
    let messages = []
    let dir = `${path}/messages/`
    try {
        let fileObjs = fs.readdirSync(dir).map(function (v) {
            return {
                name: v,
                time: fs.statSync(dir + v).mtime.getTime()
            };
        })
            .sort(function (a, b) { return b.time - a.time; })
            .map(function (v) { return v.name; });
        fileObjs.forEach(message => {
            let filePath = `${dir}/${message}`
            const data = fs.readFileSync(filePath, 'utf8');
            messages.push(JSON.parse(data))
        })
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send([{ code: error.code }])
    }
}

const readMessageName = (req, res) => {
    let message = req.params.name
    let dir = `${path}/messages/`
    let messages = []
    let filePath = `${dir}/${message}.json`
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        messages.push(JSON.parse(data))
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send([{ code: error.code }])
    }
}

const deleteMessage = (req, res) => {
    let message = req.params.name
    let dir = `${path}/messages/${message}.json`
    try {
        fs.unlinkSync(`${dir}`)
        res.status(200).send('Deleted')
    } catch (error) {
        res.status(500).send([{ code: error.code }])
    }
}

module.exports = {
    saveMessage,
    readMessage,
    readMessageName,
    deleteMessage
}