import { Response } from 'express';
import { emailsService } from '@modules/emails/services/emails.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
const { EMAIL_API_KEY } = require('@configs/vars');

@Service()
export class emailsController {
    
constructor(private _emailService: emailsService) {}

theURL: String = "http://localhost:4200"

    public async sendFirmConfirmation(req: any, resp: Response): Promise<any> {
        try {
            var API_KEY = EMAIL_API_KEY;
            var DOMAIN = 'mg.epfirms.com';
            var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
            var token = this._emailService.createConfirmationToken(req.body);
            var theHTML = 'Click <a href="' + this.theURL + '/verify?token=' + await(token) + '">here</a> to verify your account\'s email.'
            const data = {
                from: 'EPFirms <me@mg.epfirms.com>',
                to: req.body.user.email,
                subject: 'Confirm Email for EPFIRMS',
                html: theHTML
            };

            mailgun.messages().send(data, function (error, body) {
                resp.status(StatusConstants.OK).send("Email Sent!");
              });
            
        } catch(error) {
        resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    public async verify(req: any, resp: Response): Promise<any> {
        // Get token out of request

        // Call the verify with the token
        this._emailService.verify(req.token)
    }



    /* 
    ReviewFeedback
        Inputs:
            req: the HTTP Request.  The body of this request should be a matter obejct, like a case.
                req.body.client.email: The email for the client associated to the matter.  The email that the review will be sent to.
                req.body.id: The ID of the review in question, used for the HTML link for 1-4 stars.
                req.body.matter_id: The ID of the matter in question.
                req.body.firm_id: The ID for the firm associated with the matter. Used to get the link for the 5 star reviews.
        Outputs:
            theHTML: This is the contents of the email being sent.
        Function:
            Sends an email requesting the client to submit a review for the firm.  Either they choose 1-4 stars, and go back to EPFirms to submit feedback, or they choose 5 starts, and
            go the firms Google Review Page to write a review.
    */
    // public async reviewFeedback(req: any, resp: Response): Promise<any> {
    //     var firm_id = req.body.firm_id;
    //     var reviewURL = this._firmService.getReviewURL(await (firm_id));
    //     var firmName = this._firmService.getFirmName(await (firm_id));

    //     var review = await reviewsService.getReviewFromDatabase(req.body.id);
    //     if(req.body.reviews.length == 0) {
    //         review = reviewsService.addReviewToDatabase("",0,req.body.id);
    //     }
    //     try {
    //         var API_KEY = EMAIL_API_KEY;
    //         var DOMAIN = 'mg.epfirms.com';
    //         var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

    //     var theTempHTML = await fs.readFileSync(
    //     'src/modules/emails/templates/reviewEmail.html',
    //     'utf-8',
    //   );
    //         var reviewU = await (reviewURL)

    //         var theHTML = ``
    //         theTempHTML.split("__").forEach(element => {
    //             if(element == "firstname"){
    //                 element = "FIRST NAME"
    //             } else if(element == "firmname") 
    //             {
    //                 element = "FIRM NAME"
    //             } else if(element == "5StarLink") {
    //                 element = reviewU
    //             } else if(element == "14StarLink") {
    //                 element = this.theURL + `/feedback?id=` + review.id
    //             }
    //             theHTML += element
    //         });
    //         const htmlFileData = {
    //             first_name: "First",
    //             firm_name: "FirmName"
    //         };
    //         const data = {
    //             from: 'EPFirms <me@mg.epfirms.com>',
    //             to: req.body.client.email,
    //             subject: 'Confirm Email for EPFIRMS',
    //             htmlFileData,
    //             html: theHTML,
    //         };

    //         mailgun.messages().send(data, function (error, body) {
    //           });
            
    //     } catch(error) {
    //     resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    //     }
    // }

    public async forgotPassword(req: any, resp: Response): Promise<any> {
        try {
          const { email } = req.body;

          await this._emailService.requestPasswordReset(email);
    
          resp.status(StatusConstants.OK).send({success: true});
        } catch (error) {
          resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
        }
      }

    public async sendStatementNotification(req, res : Response) : Promise<any> {
        try{
            let notificationData = {
                email: req.body.email,
                origin: req.headers.origin
            }

            console.log(notificationData);
            console.log("SEND STATEMENT NOTIFICATION");
            const email = await this._emailService.sendFromTemplate(notificationData.email, "EPFirms Billing Alert: New Statement Available",
             "statement-notification", {'v:url': notificationData.origin});
            res.status(200).send();
        }
        catch(err) {
            console.error(err);
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
        }
    }


    public async sendIntakeNotification(req, res : Response) : Promise<any> {
        try{
            let notificationData = {
                email: req.body.email,
                origin: req.headers.origin
            }

            console.log(notificationData);
            console.log("SEND INTAKE NOTIFICATION");
            const email = await this._emailService.sendFromTemplate(notificationData.email, "EPFirms Intake Alert: New Intake Available",
             "intake-notification", {'v:url': notificationData.origin});
            res.status(200).send();
        }
        catch(err) {
            console.error(err);
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
        }
    }
}
/*
                      <a href="` + this.theURL + `/feedback?id=` + await review.id + `" class="mt-2 text-base text-gray-500">1-4 Stars!</a>
                      <a href="` + await (reviewURL) + `" class="mt-2 text-base text-gray-500">5 Stars!</a>

*/