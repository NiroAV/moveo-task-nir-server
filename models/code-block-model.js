const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const codeBlockSchema = new Schema({
    title:{type: String},
    code: {type: String }
})

const codeBlockModel = mongoose.model("codeBlockModel", codeBlockSchema, "code_block")

module.exports =  codeBlockModel

   