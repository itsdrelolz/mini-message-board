import  { Router, Request, Response } from "express";

export const indexRouter = Router();

interface Messages { 
    text: string;
    user: string;
    added: Date;
}

const messages: Messages[]  = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];






indexRouter.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "Mini Messageboard", messages: messages })
})



indexRouter.get("/new", (req: Request, res: Response) => {
    res.render("form", { title: "Mini Messageboard", messages: messages })
})


indexRouter.post("/new", (req: Request, res: Response) => {
    const {messageText} = req.body;
    const {messageUser} = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/")
})