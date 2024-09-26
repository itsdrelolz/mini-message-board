import  { Router, Request, Response } from "express";

export const indexRouter = Router();

let id = 0;
interface Messages { 
    id: number;
    text: string;
    user: string;
    added: Date;
}

const messages: Messages[]  = [
    {
      id: ++id,
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      id: ++id,
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

indexRouter.get("/messages/:id",(req: Request, res: Response) => {
 const messageId = parseInt(req.params.id, 10);
 const singleView = messages.find((message) => message.id === messageId);
  
 if (singleView) {
  res.render("single-message", { title: "Mini Messageboard", message: singleView });
} else {
  res.status(404).send("Message not found"); // Handle the case when the message is not found
}
})

indexRouter.post("/new", (req: Request, res: Response) => {
    const {messageText} = req.body;
    const {messageUser} = req.body;
    messages.push({ id: ++id, text: messageText, user: messageUser, added: new Date() });
    res.redirect("/")
    console.log(messages)
})


indexRouter.get('*', (req: Request, res: Response) => {
  res.status(404).send("There was an error with your request");
});
