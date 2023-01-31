const codeBlockModel = require("../../Backend/models/code-block-model")

async function getCodeBlocks(){
    const codeBlocks = await codeBlockModel.find().exec()
    return codeBlocks
}

async function getCodeBlockById(_id){
    const codeBlock = await codeBlockModel.findById(_id).exec()
    return codeBlock
}

async function updateCodeBlock(_id,update){
    const updatedCodeBlock = await codeBlockModel.findByIdAndUpdate(_id,update,{new : true })
    return updatedCodeBlock
}



module.exports = {
    getCodeBlocks,
    getCodeBlockById,
    updateCodeBlock
}