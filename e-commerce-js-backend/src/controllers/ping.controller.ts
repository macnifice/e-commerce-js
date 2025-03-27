import { Response, Request } from 'express'

export const getPong = (_req: Request, res: Response) => {
    res.send('pong');
}
