import express, { NextFunction, Request, Response } from "express";
import * as db from '../db/queries'; 

export async function getAllMessages(req: Request, res: Response) {
    try {
        const messages = await db.getAllMessages();
        res.render("index", {
            messages: messages
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

export async function createMessageGet(req: Request, res: Response) {
    res.render("form", {});
}

export async function createMessagePost(req: Request, res: Response) {
    try {
        const { message, username } = req.body;
        await db.insertMessage(message, username);
        res.redirect("/");
    } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).send("Internal Server Error");
    }
}
export function viewUserMessageGet(req: Request, res: Response, next: NextFunction) {
    (async () => {
        const id = req.params.id;

        if (typeof id !== "string") {
            return res.status(400).send("Invalid ID format");
        }

        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            return res.status(400).send("Invalid ID format");
        }

        try {
            const singleView = await db.selectUserMessage(numericId);
            if (singleView) {
                res.render("single-message", { title: "Mini Messageboard", message: singleView });
            } else {
                res.status(404).send("Message not found");
            }
        } catch (error) {
            console.error("Error fetching single message:", error);
            res.status(500).send("Internal Server Error");
        }
    })().catch(next);
}




// indexRouter.get("/", (req: Request, res: Response) => {
//     res.render("index", { title: "Mini Messageboard", messages: messages })
// })

// indexRouter.get("/new", (req: Request, res: Response) => {
//     res.render("form", { title: "Mini Messageboard", messages: messages })
// })

// indexRouter.get("/messages/:id",(req: Request, res: Response) => {
//  const messageId = parseInt(req.params.id, 10);
//  const singleView = messages.find((message) => message.id === messageId);
  
//  if (singleView) {
//   res.render("single-message", { title: "Mini Messageboard", message: singleView });
// } else {
//   res.status(404).send("Message not found"); // Handle the case when the message is not found
// }
// })

// indexRouter.post("/new", (req: Request, res: Response) => {
//     const {messageText} = req.body;
//     const {messageUser} = req.body;
//     messages.push({ id: ++id, text: messageText, user: messageUser, added: new Date() });
//     res.redirect("/")
//     console.log(messages)
// })


// indexRouter.get('*', (req: Request, res: Response) => {
//   res.status(404).send("There was an error with your request");
// });