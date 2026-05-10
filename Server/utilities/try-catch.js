
export const errorHandler = (nanay) => {
    return async (req, res, next )=>{
        try {
            await nanay(req,res)
        } catch (error) {
            next(error)
        }
    }
}
