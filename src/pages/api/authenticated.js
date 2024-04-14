
import jwt from 'jsonwebtoken';

//export default function authenticated(req, res, next) {
export default function authenticated(req, res) {
    //const token = req.headers.authorization?.split(' ')[1];
    const token = req.headers.authorization;

    //console.log ("received: ", req.headers.authorization);
    //console.log("token: ", token);

    // Verify JWT token
    if (!token) {
        console.log ("no token")
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        //next();
        console.log("good token")
        return res.status(200).json({username: req.user})
    } catch (err) {
        console.log ("invalid token")
        return res.status(401).json({ error: 'Invalid token' });
    }
}
