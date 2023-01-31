const express = require("express")
const codeBlockLogic = require("../../Backend/logic/code-block-logic");
const router = express.Router()


router.get("/api/code-block/" ,async (req,res,next) => {
    try {
        const codeBlocks = await codeBlockLogic.getCodeBlocks()
        res.json(codeBlocks)
       
    } catch (err) {
        next(err);
    }
});


router.get("/api/code-block/:_id" ,async (req,res,next) => {
    try {
        const _id = req.params._id
        const codeBlock = await codeBlockLogic.getCodeBlockById(_id)
        res.json(codeBlock)
       
    } catch (err) {
        next(err);
    }
});



module.exports = router
  
