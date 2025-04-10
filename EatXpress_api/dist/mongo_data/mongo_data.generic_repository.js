"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGenericRepository = void 0;
const common_1 = require("@nestjs/common");
class MongoGenericRepository {
    constructor(repository) {
        this._repository = repository;
    }
    count() {
        try {
            return this._repository.find().count().exec();
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    getAll() {
        try {
            return this._repository.find({}, { password: 0 }).exec();
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    getById(id) {
        try {
            return this._repository.findById(id, { password: 0 }).exec();
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    getOne(prop, value) {
        try {
            let filter = this._generateFilter(prop, value);
            if ((this._containsAnyField(Object.keys(filter), ['email']))
                && prop === 'auth_email') {
                return this._repository.findOne(filter).exec();
            }
            else {
                return this._repository.findOne(filter, { password: 0 }).exec();
            }
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    getByField(prop, value) {
        try {
            let filter = this._generateFilter(prop, value);
            if (this._containsAnyField(Object.keys(filter), ['email', 'phone', 'role'])) {
                return this._repository.find(filter, { password: 0 }).exec();
            }
            else if (this._containsAnyField(Object.keys(filter), ['user'])) {
                return this._repository.find(filter, { password: 0 })
                    .lean()
                    .populate({ path: 'user', select: '-password' })
                    .exec();
            }
            else {
                return this._repository.find(filter).exec();
            }
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    getWithPagination(prop, value, page) {
        try {
            let limit = 11;
            let offset = page <= 1 ? 0 : (page - 1) * limit;
            let filter = this._generateFilter(prop, value);
            if (this._containsAnyField(Object.keys(filter), ['email', 'phone', 'role'])) {
                return this._repository.find(filter, { password: 0 })
                    .lean()
                    .skip(offset)
                    .limit(limit)
                    .exec();
            }
            else if (this._containsAnyField(Object.keys(filter), ['user'])) {
                return this._repository.find(filter, { password: 0 })
                    .lean()
                    .populate({ path: 'user', select: '-password' })
                    .skip(offset)
                    .limit(limit)
                    .exec();
            }
            else {
                return this._repository.find(filter)
                    .lean()
                    .skip(offset)
                    .limit(limit)
                    .exec();
            }
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    create(item) {
        try {
            return this._repository.create(item);
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    update(id, item) {
        try {
            this._repository.findByIdAndUpdate(id, item).exec();
        }
        catch (error) {
            throw new common_1.NotAcceptableException(error.message);
        }
    }
    _containsAnyField(list, fields) {
        for (let i = 0; i < fields.length; i++) {
            if (list.includes(fields[i])) {
                return true;
            }
        }
        return false;
    }
    _generateFilter(prop, value) {
        let filter;
        switch (prop) {
            case 'auth_email':
                filter = { email: value };
                break;
            case 'email':
                filter = { email: value };
                break;
            case 'phone':
                filter = { phone: value };
                break;
            case 'role':
                filter = { role: value };
                break;
            case 'menu_vendor':
                filter = { vendor: value };
                break;
            case 'menu_vendorId':
                filter = { vendorId: value };
                break;
            case 'order_user':
                filter = { user: value };
                break;
            case 'order_vendor':
                filter = { vendor: value };
                break;
            case 'order_reference':
                filter = { payment_reference: value };
                break;
            case 'order_rider':
                filter = { rider: value };
                break;
            case 'dispatch_order':
                filter = { order: value };
                break;
            case 'dispatch_rider':
                filter = { rider: value };
                break;
            case 'user_defualt_address':
                filter = { user: value, default: true };
                break;
            case 'profile_user':
                filter = { user: value, default: true };
                break;
            case 'user_address':
                filter = { user: value };
                break;
            default:
                filter = {};
        }
        return filter;
    }
}
exports.MongoGenericRepository = MongoGenericRepository;
//# sourceMappingURL=mongo_data.generic_repository.js.map