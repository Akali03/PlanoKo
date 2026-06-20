import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        let token;
        // Cookie authentication
        if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
        }

    // Authorization header authentication
  else if (
      req.headers.authorization?.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET);
         req.userId = decoded.userId;

        next();
        
    } catch (error) {
           return res.status(401).json({
              error: "Invalid token",
         });
    }
}