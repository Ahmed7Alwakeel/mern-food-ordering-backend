"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
//SendGrid send with SMTP protocol with nodemailer
class Email {
    constructor(user, url, code) {
        this.createTransport = () => {
            //for dev
            return nodemailer_1.default.createTransport({
                service: "SendGrid",
                secure: false, // Ensure port is a number
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        };
        //sendgrid
        this.send = (template, subject) => __awaiter(this, void 0, void 0, function* () {
            //1-render html based on pug template
            const html = pug_1.default.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
                name: this.name,
                subject,
                url: this.url,
                code: this.code
            });
            //2-define the email options
            const mailOptions = {
                from: `team <${this.from}>`,
                to: this.to,
                subject,
                html,
                text: (0, html_to_text_1.htmlToText)(html),
            };
            //3-create transport and send email
            yield this.createTransport().sendMail(mailOptions);
        });
        this.sendWelcome = () => __awaiter(this, void 0, void 0, function* () {
            yield this.send("welcome", "Welcome to the family!");
        });
        this.sendReset = () => __awaiter(this, void 0, void 0, function* () {
            yield this.send("passwordReset", "Password Reset");
        });
        this.sendVerifyEmail = () => __awaiter(this, void 0, void 0, function* () {
            yield this.send("verifyEmail", "Verify email");
        });
        this.name = user.name.split(" ")[0];
        this.to = user.email;
        this.url = url;
        this.from = process.env.EMAIL_SENDER;
        this.code = code;
    }
}
exports.Email = Email;
