"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
let ProductsController = class ProductsController {
    findAll(request, response) {
        console.log(request);
        return response.json({ msg: 'Find ALL' });
    }
    store(response) {
        return response.json({ msg: 'Stored' });
    }
    delete(response) {
        return response.json({ msg: 'Deleted' });
    }
    update(response) {
        return response.json({ msg: 'Updated' });
    }
    pattern(response) {
        return response.json({ msg: 'Pattern matched' });
    }
    getDocs(version) {
        if (version && version === '5') {
            return { url: 'https://nextjs.org/docs/v5/' };
        }
    }
    findOne(param) {
        return param;
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.HttpCode)(204),
    (0, common_1.Header)('Authorization', 'Bearer XADDSDSADSADSA@#@!#XC'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "store", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('ab*cd'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "pattern", null);
__decorate([
    (0, common_1.Get)('/docs'),
    (0, common_1.Redirect)('https://nextjs.org/docs', 302),
    __param(0, (0, common_1.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getDocs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProductsController.prototype, "findOne", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products')
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map