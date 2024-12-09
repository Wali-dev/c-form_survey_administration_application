import express, { Request, Response } from "express";
import userRoute from "./user.route";
import formRoute from "./form.route";
import responseRoute from "./formResponse.route";
// import clicksRoute from "./clickRoute";
// import profileVisitRoute from "./profileVisitRoute";
// import authRoute from "./authRoute";

const apiRouter = express.Router();

const demo = (req: Request, res: Response) => {
    res.send("This is the resposne route")
}
const routers = [
    { path: "/user", router: userRoute },
    { path: "/form", router: formRoute },
    { path: "/response", router: responseRoute },
    // { path: "/profilevisit", router: profileVisitRoute },
    // { path: "/auth", router: authRoute },
    { path: "/this", router: demo }
];

routers.forEach((routerObject) => {
    apiRouter.use(routerObject.path, routerObject.router);
});

export default apiRouter;
