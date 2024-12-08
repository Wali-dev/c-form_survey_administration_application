import express, { Request, Response } from "express";
// import userRoute from "./userRoute";
// import linksRoute from "./linkRoute";
// import clicksRoute from "./clickRoute";
// import profileVisitRoute from "./profileVisitRoute";
// import authRoute from "./authRoute";

const apiRouter = express.Router();

const demo = (req: Request, res: Response) => {
    res.send("This is the resposne route")
}
const routers = [
    // { path: "/user", router: userRoute },
    // { path: "/link", router: linksRoute },
    // { path: "/click", router: clicksRoute },
    // { path: "/profilevisit", router: profileVisitRoute },
    // { path: "/auth", router: authRoute },
    { path: "/this", router: demo }
];

routers.forEach((routerObject) => {
    apiRouter.use(routerObject.path, routerObject.router);
});

export default apiRouter;
