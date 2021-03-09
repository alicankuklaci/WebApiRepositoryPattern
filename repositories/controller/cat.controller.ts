import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Cat } from "../models/Cat";
import "reflect-metadata";
import { CatService } from "../services";

@controller("/cat")
export class CatController implements interfaces.Controller {

    constructor( @inject("CatService") private fooService: CatService ) {}

    @httpGet("/")
    private async index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Cat> {
     
        return await this.fooService.findByID('604670d96f92fe8559a196e5')
    }

 
    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this.fooService.create(req.body);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

  
}