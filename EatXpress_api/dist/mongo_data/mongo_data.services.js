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
exports.MongoDataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongo_data_generic_repository_1 = require("./mongo_data.generic_repository");
const fsModels = require("./models/models");
let MongoDataService = class MongoDataService {
    constructor(TransactionRepository, AddressRepository, DispatchRepository, OrderRepository, MenuRepository, UserRepository) {
        this.TransactionRepository = TransactionRepository;
        this.AddressRepository = AddressRepository;
        this.DispatchRepository = DispatchRepository;
        this.OrderRepository = OrderRepository;
        this.MenuRepository = MenuRepository;
        this.UserRepository = UserRepository;
    }
    onApplicationBootstrap() {
        this.transactions = new mongo_data_generic_repository_1.MongoGenericRepository(this.TransactionRepository);
        this.dispatchs = new mongo_data_generic_repository_1.MongoGenericRepository(this.DispatchRepository);
        this.orders = new mongo_data_generic_repository_1.MongoGenericRepository(this.OrderRepository);
        this.menus = new mongo_data_generic_repository_1.MongoGenericRepository(this.MenuRepository);
        this.users = new mongo_data_generic_repository_1.MongoGenericRepository(this.UserRepository);
        this.address = new mongo_data_generic_repository_1.MongoGenericRepository(this.AddressRepository);
    }
};
MongoDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fsModels.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(fsModels.Address.name)),
    __param(2, (0, mongoose_1.InjectModel)(fsModels.Dispatch.name)),
    __param(3, (0, mongoose_1.InjectModel)(fsModels.Order.name)),
    __param(4, (0, mongoose_1.InjectModel)(fsModels.Menu.name)),
    __param(5, (0, mongoose_1.InjectModel)(fsModels.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MongoDataService);
exports.MongoDataService = MongoDataService;
//# sourceMappingURL=mongo_data.services.js.map