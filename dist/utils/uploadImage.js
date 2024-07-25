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
const multer_1 = __importDefault(require("multer"));
const appError_1 = __importDefault(require("./appError"));
const sharp_1 = __importDefault(require("sharp"));
const catchAsync_1 = require("./catchAsync");
class UploadImage {
    constructor() {
        this.multerStorage = multer_1.default.memoryStorage();
        this.multerFilter = (req, file, cb) => {
            if (file.mimetype.startsWith("image")) {
                cb(null, true);
            }
            else {
                cb(new appError_1.default("Please upload image", "FAIL", 400), false);
            }
        };
        this.upload = (0, multer_1.default)({
            storage: this.multerStorage,
            fileFilter: this.multerFilter,
        });
        this.resizeHelper = (key, folder, id, condition, imageName) => __awaiter(this, void 0, void 0, function* () {
            if (condition) {
                key.path = `images/${folder}/`;
                key.name = `${id}-${imageName}.jpeg`;
                yield (0, sharp_1.default)(condition[0].buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`src/public/images/${folder}/${key.name}`);
            }
        });
        this.resizeImages = (folder) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files)
                return next();
            const { bannerImage, cardImage } = req.files;
            // Process banner image
            if (bannerImage) {
                req.body.bannerImage = {}; // Initialize the object if necessary
                yield this.resizeHelper(req.body.bannerImage, folder, req.params.id, bannerImage, 'banner');
            }
            // Process card image
            if (cardImage) {
                req.body.cardImage = {}; // Initialize the object if necessary
                yield this.resizeHelper(req.body.cardImage, folder, req.params.id, cardImage, 'card');
            }
            next();
        }));
        this.createResizeImages = (folder) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files)
                return next();
            const { bannerImage, cardImage } = req.files;
            // Process banner image
            if (bannerImage) {
                req.body.bannerImage = {}; // Initialize the object if necessary
                yield this.resizeHelper(req.body.bannerImage, folder, req.body.name, bannerImage, 'banner');
            }
            // Process card image
            if (cardImage) {
                req.body.cardImage = {}; // Initialize the object if necessary
                yield this.resizeHelper(req.body.cardImage, folder, req.body.name, cardImage, 'card');
            }
            next();
        }));
    }
    uploadImage(imagesArray) {
        return this.upload.fields(imagesArray);
    }
}
exports.default = new UploadImage();
