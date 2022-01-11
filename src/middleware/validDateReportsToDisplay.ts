import { Request, Response } from "express";
const { configReport } = require( "../helpers/dataConfig");

class ValidDateReport {

    private days_of_date_range(start_date: any, final_date: any) {
        const result = start_date/(1000 * 60 * 60 * 24)
        const result2 = final_date/(1000 * 60 * 60 * 24)
        console.log(result2-result)
        return result2- result;
    }

    valid_date_reports_to_display = (req: Request, res: Response, next: any) => {
        const { start_date = 0, final_date = 0 } = req.query;
        if (start_date > final_date) {
            return res.json({
                status: 400,
                message: 'fechas invalidas para buscar reportes'
            })
        }
        if (start_date === NaN || final_date === NaN) {
            return res.json({
                status: 400,
                message: "Rango de fecha no definida"
            })
        }
        if (this.days_of_date_range(start_date, final_date) > configReport.max_days_to_display_reports){
            return res.json({
                status:400,
                message: "rango de fecha no permitido"
            })
        };
        next();
    }

}


export = new ValidDateReport