export default function (req,res){
    console.log(req.body);
    res.status(200).json({
        status:"ok"
    });
}